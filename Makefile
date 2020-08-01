SRCPATH := $(CURDIR)

define HELP
This is the Stockholm project Makefile.

Usage:

make build           - Build site & Lambdas for production.
make reset           - Purge cache & reinstall modules.
endef
export HELP

.PHONY: build clean help

all help:
	@echo "$$HELP"

build:
	npm run-script build
	mkdir -p functions
	GOOS=linux
	GOARCH=amd64
	GO111MODULE=on
	GOBIN=${PWD}/functions go get ./...
	GOBIN=${PWD}/functions go build ./...

.PHONY: reset
reset:
	gatsby clean
	find . -maxdepth 1 -name "package-lock.json" -delete
	rm -rf "node_modules"
	npm i
	npm audit fix
