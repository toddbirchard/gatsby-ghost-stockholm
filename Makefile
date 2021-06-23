SRC_PATH := $(shell pwd)

define HELP
This is the Stockholm project Makefile.

Usage:

make build           - Build site & Lambdas for production.
make serve           - Build & serve production build locally.
make clean           - Purge cache, modules, & lockfiles.
make reset           - Make clean & reinstall modules.
make update          - Update npm production dependencies.

endef
export HELP

.PHONY: build serve clean reset update help

all help:
	@echo "$$HELP"

build:
	npm run-script build

buildbackup:
	npm run-script build
	mkdir -p functions
	GOOS=linux
	GOARCH=amd64
	GOBIN=${PWD}/functions go install ./...
	GOBIN=${PWD}/functions go build -o functions/scrape ./...

testfunctions:
	mkdir -p functions
	GOOS=linux
	GOARCH=amd64
	GOBIN=${PWD}/functions-src/scrape go install ./...
	# go build -o functions ./...


.PHONY: serve
serve:
	gatsby clean
	gatsby build
	gatsby serve -o

.PHONY: clean
clean:
	if [ -d "./node_modules" ]; then gatsby clean; fi
	find . -name 'package-lock.json' -delete
	find . -name 'yarn.lock' -delete
	find . -wholename '.yarn' -delete
	find . -wholename '**/node_modules' -delete
	find . -wholename '*/*.log' -delete

.PHONY: reset
reset: clean
	cd ${SRC_PATH}/plugins/gatsby-plugin-ghost-manifest
	yarn install && yarn link
	cd ${SRC_PATH}
	yarn install && yarn link "gatsby-plugin-ghost-manifest"

.PHONY: update
update:
	yarn upgrade
	yarn check
