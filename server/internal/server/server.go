package server

import (
	"fmt"
	"net/http"
	"os"
	"strings"
)

type ServerConfigs struct {
	Port                int32
	DistDirAbsolutePath string
}

var serverConfigs ServerConfigs

func Start(config *ServerConfigs) {
	serverConfigs = *config
	router := http.NewServeMux()

	router.HandleFunc("GET /", ResourceHandler)

	server := http.Server{
		Addr:    fmt.Sprintf(":%d", config.Port),
		Handler: router,
	}

	server.ListenAndServe()
}

func ResourceHandler(w http.ResponseWriter, req *http.Request) {
	path := req.URL.Path

	resourcePath := GetResourcePath(path)

	resource, err := GetResource(resourcePath)

	if err != nil {
		w.WriteHeader(404)
		w.Write([]byte("Not found"))
		return
	}

	contentType := GetContentType(resourcePath)

	w.Header().Add("Content-Type", contentType)

	w.WriteHeader(200)
	fmt.Fprint(w, resource)
}

func GetResourcePath(resourcePath string) string {
	if resourcePath == "/" {
		resourcePath = "index.html"
	} else if !strings.Contains(resourcePath, ".") {
		resourcePath = strings.TrimPrefix(resourcePath, "/") + ".html"
	} else {
		resourcePath = strings.TrimPrefix(resourcePath, "/")
	}

	return resourcePath
}

func GetResource(resourceName string) (string, error) {
	data, err := os.ReadFile(fmt.Sprintf("%s/%s", serverConfigs.DistDirAbsolutePath, resourceName))

	return string(data), err
}

func GetContentType(resourceName string) string {
	split := strings.Split(resourceName, ".")
	fileExtension := split[len(split)-1]

	switch fileExtension {
	case "html":
		return "text/html"
	case "js":
		return "text/javascript"
	default:
		return "text/plain"
	}
}
