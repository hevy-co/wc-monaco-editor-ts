TS_SRC := $(wildcard src/*.ts)
SRC    := $(filter-out $(TS_SRC), $(wildcard src/*))
DIST   := dist
TYPES  := types

default: build

build: $(DIST)

rebuild: clean-dist $(DIST)

package: types
	NODE_MODULES_PATH=$(shell npm root) node fuse.js

types:
	npx tsc -d --declarationDir $(TYPES) --declarationMap --emitDeclarationOnly

clean:
	rm -rf .cache dist node_modules

clean-dist:
	rm -rf dist

install:
	yarn install
