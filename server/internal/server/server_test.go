package server

import (
	"testing"
)

func TestGetResourcePath(t *testing.T) {
	testCases := []struct {
		input    string
		expected string
	}{
		{
			"/",
			"index.html",
		},
		{
			"/page1",
			"page1.html",
		},
		{
			"/file.js",
			"file.js",
		},
		{
			"/file.png",
			"file.png",
		},
	}

	for _, testCase := range testCases {
		actual := GetResourcePath(testCase.input)

		if actual != testCase.expected {
			t.Errorf("actual must be %s, got: %s", testCase.expected, actual)
		}
	}
}

func TestGetContentType(t *testing.T) {
	testCases := []struct {
		input    string
		expected string
	}{
		{
			"index.html",
			"text/html",
		},
		{
			"file.js",
			"text/javascript",
		},
		{
			"file.png",
			"text/plain",
		},
	}

	for _, testCase := range testCases {
		actual := GetContentType(testCase.input)

		if actual != testCase.expected {
			t.Errorf("actual must be %s, got: %s", testCase.expected, actual)
		}
	}
}
