SRC_PATH := $(shell pwd)
GHOST_MANIFEST_PATH := ${SRC_PATH}/plugins/gatsby-plugin-ghost-manifest
GATSBY_FUNCTIONS_PATH := ${SRC_PATH}/functions

define HELP
This is the Stockholm project Makefile.

Usage:

make install         - Install NPM dependencies of project and plugins.
make build           - Create production build.
make serve           - Create production build and serve it locally.
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
	echo "Installing plugin dependencies..."
	cd "${GHOST_MANIFEST_PATH}"
	npm i --force
	echo "Installing project dependencies..."
	cd ${SRC_PATH}
	npm i --force


.PHONY: build
build:
	gatsby build

.PHONY: serve
serve:
	gatsby build && gatsby serve -o

.PHONY: functions
functions:
	GOOS=linux
	GOARCH=amd64
	GOBIN=${PWD}/functions/scrape go install ./...
	GOBIN=${PWD}/functions go build -o functions/scrape functions/scrape/main.go

.PHONY: dev
dev:
	npm run dev

.PHONY: clean
clean:
	if [ -d "./node_modules" ]; then gatsby clean; fi
	find . -name 'package-lock.json' -delete
	find . -name 'yarn.lock' -delete
	find . -name '.pnp.cjs' -delete
	find . -wholename 'node_modules' -delete
	find . -wholename 'plugins/gatsby-plugin-ghost-manifest/node_modules' -delete
	find . -wholename '**/.yarn' -delete
	find . -wholename '*/*.log' -delete
	find . -wholename 'public' -delete

.PHONY: update
update:
	echo "1. Ensure latest version of NPM, NCU & Gatsby-ClI"
	npm i -g npm@latest
	npm i -g npm-check-updates
	npm i -g gatsby-cli@latest
	echo "2. Updating plugin dependencies..."
	cd "${GHOST_MANIFEST_PATH}"
	ncu -u
	npm i --force
	echo "3. Updating main project dependencies..."
	cd ${SRC_PATH}
	ncu -u
	npm i --force
