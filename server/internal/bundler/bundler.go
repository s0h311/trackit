package bundler

import (
	"fmt"
	"io"
	"log"
	"os"
	"path"
)

type BundlerConfigs struct {
	EntryPoint       string
	OutputPath       string
	PublicPath       string
	IncludeFileTypes []string
	ExcludePaths     []string
	Minify           bool
}

func Bundle(config *BundlerConfigs) {
	currentWorkingDirectory, _ := os.Getwd()

	projectRootPath := path.Dir(currentWorkingDirectory)
	absoluteOutputPath := fmt.Sprintf("%s/%s", projectRootPath, config.OutputPath)

	os.RemoveAll(absoluteOutputPath)
	os.MkdirAll(absoluteOutputPath, os.ModePerm)

	// copy index.html to output
	CopyFile(projectRootPath+"/index.html", outputPath+"/index.html")

	// copy pages content to output
	CopyFilesInDir(projectRootPath+"/pages", outputPath)
}

func CopyFilesInDir(srcDir string, dist string) {
	files, rDErr := os.ReadDir(srcDir)

	if rDErr != nil {
		log.Fatalf("Cannot read files directory, error: %s", rDErr)
	}

	for _, file := range files {
		CopyFile(srcDir+"/"+file.Name(), dist+"/"+file.Name())
	}
}

func CopyFile(src string, dist string) {
	r, rErr := os.Open(src)

	if rErr != nil {
		log.Fatalf("Cannot init reader, error: %s", rErr)
	}

	defer r.Close()

	w, wErr := os.Create(dist)

	if wErr != nil {
		log.Fatalf("Cannot init writer, error: %s", wErr)
	}

	defer w.Close()

	io.Copy(w, r)
}
