package main

import (
	"github.com/s0h311/trackit/internal/server"
)

func main() {
	server.Start(&server.ServerConfigs{
		Port:                8080,
		DistDirAbsolutePath: "/Users/soheil.nazari/funprojects/trackit/dist",
	})
}
