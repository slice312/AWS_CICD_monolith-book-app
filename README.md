<h1 align="center">Book App </h1>
<!-- <h3 align="center">
    <a href="https://slice312.github.io/zeon-module-2_MathQuiz/">Visit the live app</a>
</h3> -->

## About
- A study project to learn how to work with server API (CRUD operations),
multipages site, native web components
- The structure of the client application was developed by [Feature-Sliced Design methodology](https://feature-sliced.design/en/)

## Features
- ES6 modules, ES2022 classes
- Web Components
- Feature-Sliced Design
- Custom webpack setup
- ESLint

## How to run
### Run server API and dev server for client
Install all dependencies for server and client side
```sh
npm run install-dependencies
```
Start API server
```sh
npm run api-server
```
Start dev server for client
```sh
npm run client
```

This script run `webpack-dev-server` and auto open browser with `https://localhost:5007`.  
If no browser is opened, you must manually open this URL in the browser.  
Port `5007` specified in `webpack.config.json` in devConfig.
