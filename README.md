# Monorepo - Pokedex

## Problem Statement

- Create a monorepo (preferable lerna). This should include 3 different codebases. 2 packages named components and utils where you store any reusable code and 1 project called pokedex which includes tha main functionality.

- The packages should be compiled to cjs or/and esm in order to be imported as external dependencies.

- Create a new NextJs project with redux, next-redux-wrapper and typescript.
  Load the pokemon api (https://pokeapi.co/api/v2/pokemon) and add the pokemon to a datagrid (@mui/x-data-grid) with paging.

- By clicking a pokemon you should be redirected to a pokemon page (using client side redirections, without losing the previous redux state set by the initial call).
  There you should be able to view some information about the specific pokemon.

## Table of Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Stay in touch](#stay-in-touch)

## Features

- _Quick start_
- _Simple and Standard scaffolding_
- _Common Error Handler_
- Docker integrated project
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Redux** : integrated with the help of [Redux toolkit](https://redux-toolkit.js.org/)
- **Linting**: with https://eslint.org and https://prettier.io

## Getting started

Makes easier to write good redux applications and speeds up development.

- Node <https://nodejs.org/en/> use the LTS version
- NPM
- [TypeScript](https://www.typescriptlang.org/docs/)

### Application Setup

Use template strings, object destructuring, arrow functions, Interfaces, JSX syntax and more.

```bash
// clone the application
$ git clone https://github.com/prashant-s25/pokedex_v2.git
```
#### Setting up the Application

```bash
// Install the required npm modules
$ npm run bootstrap
//creating the dist distributables
$ npm run build
```
#### Running the application in development mode

```bash
$ npm run package:pokedex
```
#### Running the Test Cases

```bash
$ npm run test
```
#### Running in Production mode

```bash
$ npm run start
```

#### Running using docker

```bash
// Creating docker image from base folder
$ docker build .

// Runnnig the docker image using imageID
$ docker run -d -p <EXPOSED PORT>:<CONTAINER PORT> <imageId>
```
#### Running the scripts

All the different build steps are orchestrated via https://docs.npmjs.com/misc/scripts.
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:

| Npm Script          | Description                                     |
| ---------------     | ----------------------------------------------- |
| `bootstrap`         | Install all the dependencies for all code bases |
| `build`             | Full build. Runs ALL build tasks                |
| `package:pokedex`   | This script runs project in development mode    |
| `start`             | This script runs project in production mode     |
| `test`              | This script runs the Test case present in the project     |


## NPM Modules

Node Modules folder is the repository of modules/library which you are using inside your project. What ever you are importing in your project that module or library should present inside the mode_module folder.When you do npm install that time that module or the library install inside the node_module folder and one entry added in package.json file

- [MUI-Component](https://mui.com/material-ui/react-grid/)
- [MUI datagrid](https://mui.com/x/react-data-grid/)
- [react-dom](https://reactjs.org/docs/react-dom.html)
- [react-redux](https://react-redux.js.org/)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [redux-toolkit](https://redux-toolkit.js.org/)
- [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper)
- [Testing library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/docs/getting-started)
- [redux-mock-store](https://www.npmjs.com/package/redux-mock-store)
- [axios](https://www.npmjs.com/package/axios)
## Stay in touch

- GitHub - https://github.com/prashant-s25/pokedex_v2
