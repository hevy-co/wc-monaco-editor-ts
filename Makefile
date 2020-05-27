TS_SRC := $(wildcard src/*.ts)
SRC    := $(filter-out $(TS_SRC), $(wildcard src/*))
DIST   := dist
TYPES  := types

default: build

build: $(DIST)

rebuild: clean-dist $(DIST)

package: component workers types

component:
	npx parcel build src/wc-monaco-editor.ts

workers:
	tools/parallel \
	"npx parcel build node_modules/monaco-editor/esm/vs/language/json/json.worker.js" \
	"npx parcel build node_modules/monaco-editor/esm/vs/language/css/css.worker.js" \
	"npx parcel build node_modules/monaco-editor/esm/vs/language/html/html.worker.js" \
	"npx parcel build node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js" \
	"npx parcel build node_modules/monaco-editor/esm/vs/editor/editor.worker.js"

types:
	npx tsc -d --declarationDir $(TYPES) --declarationMap --emitDeclarationOnly

clean:
	rm -rf .cache dist node_modules

clean-dist:
	rm -rf dist

install:
	yarn install

watch:
	node fuse.js

$(DIST): $(TS_SRC) $(SRC)
	npx tsc
	cp -av $(SRC) dist/
