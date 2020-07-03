build:
	npm run-script build
	mkdir -p functions
	GOOS=linux
	GOARCH=amd64
	GOBIN=${PWD}/functions go install ./...
