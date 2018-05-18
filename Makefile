all: dist/index.html dist/index.js

dist/index.html: index.pug
	pug index.pug -o dist

dist/index.js: index.ts tsconfig.json webpack.config.js
	webpack
