SRCPATH := $(CURDIR)

define HELP
This is the Stockholm project Makefile.

Usage:

make build           - Build site & Lambdas for production.
make serve           - Build & serve production build locally.
make clean           - Purge cache & modules.
make reset           - Purge cache & reinstall modules.
make update          - Update npm production dependencies.
endef
export HELP

.PHONY: build serve clean reset update help

all help:
	@echo "$$HELP"

build:
	npm run-script build
	mkdir -p functions
	GOOS=linux
	GOARCH=amd64
	GOBIN=${PWD}/functions go get ./...
	GOBIN=${PWD}/functions go build -o functions/scrape ./...

functions:
	mkdir -p functions
	GOOS=linux
	GOARCH=amd64
	GOBIN=${PWD}/functions-src/scrape go get
	GOBIN=${PWD}/functions-src/scrape go build -o functions/scrape ./...


.PHONY: serve
serve:
	gatsby clean
	gatsby build
	gatsby serve

.PHONY: clean
clean:
	gatsby clean
	find . -name 'package-lock.json' -delete
	find . -name 'yarn.lock' -delete
	find . -wholename '.yarn' -delete
	find . -name 'node_modules' -delete

.PHONY: reset
reset: clean
	npm i
	npm audit fix

.PHONY: update
update:
	ncu -u --dep=prod
	npm i
	npm audit fix
