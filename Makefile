SRC_PATH := $(shell pwd)
GHOST_MANIFEST_PATH := ${SRC_PATH}/plugins/gatsby-plugin-ghost-manifest

define HELP
This is the Stockholm project Makefile.

Usage:

make install         - Install NPM dependencies of project and plugins.
make build           - Create & a production build.
make serve           - Create & a production build and serve it locally.
make clean           - Purge cache, modules, & lockfiles.
make reset           - Clean & reinstall all dependencies.
make update          - Update production dependencies.

endef
export HELP

.PHONY: install serve dev clean update help

all help:
	@echo "$$HELP"

.PHONY: install
install:
	echo "Installing project dependencies..."
	cd ${SRC_PATH}
	npm i --force
	echo "Installing plugin dependencies..."
	cd "${GHOST_MANIFEST_PATH}"
	npm i --force
	cd ${SRC_PATH}

.PHONY: build
build:
	gatsby build

.PHONY: serve
serve:
	gatsby build && gatsby serve -o

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

.PHONY: dev
dev:
	npm run dev

.PHONY: clean
clean:
	if [ -d "./node_modules" ]; then gatsby clean; fi
	rm -rf 'node_modules'
	rm -rf 'plugins/gatsby-plugin-ghost-manifest/node_modules'
	find . -name 'package-lock.json' -delete
	find . -name 'yarn.lock' -delete
	find . -name '.pnp.cjs' -delete
	find . -wholename '**/.yarn' -delete
	find . -wholename '*/*.log' -delete
	find . -wholename 'public' -delete

.PHONY: update
update:
	echo "Updating plugin dependencies..."
	cd "${GHOST_MANIFEST_PATH}"
	ncu -u
	npm i --force
	echo "Updating main project dependencies..."
	cd ${SRC_PATH}
	ncu -u
	npm i --force
