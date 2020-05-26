TS_SRC := $(wildcard src/*.ts)
SRC    := $(filter-out $(TS_SRC), $(wildcard src/*))
DIST   := dist

default: build

build: $(DIST)

rebuild: clean-dist $(DIST)

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
