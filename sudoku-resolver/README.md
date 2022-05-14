![workflow status badge](https://github.com/CrlsMrls/sudoku-resolver/workflows/CI/badge.svg)  
[![Netlify Status](https://api.netlify.com/api/v1/badges/1a49a666-ffbd-4c37-aaac-1b949b33cedc/deploy-status)](https://app.netlify.com/sites/sudoku-resolver/deploys)

# Sudoku resolver

This little web application resolves Sudoku problems. Just insert the values and click on 'Resolve' button.

[Link to demo](https://sudoku-resolver.netlify.app/)

## Description

Steps for resolving a sudoku problem:

-   Insert the numbers to resolve the sudoku
-   The small web app can be used from
    -   **a mobile device:** using the number pad on the screen
    -   **desktop:** using the keyboard (arrow keys and numbers)
-   If any value is invalid, the UI will highlight the invalid zone
-   Click on resolve. The algorithm will show the first valid result

<div style="text-align:center; height: 200px"><img src="sudoku-resolver-screenshot.png" /></div>

## Goals of this lab

### Objectives

-   Use a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) for resolving the brief data-intensive computation
-   Implement a state management store using [RxJS](https://rxjs.dev/) (using Observables and no Redux) and TypeScript. The goal is to have Undo / Redo actions
-   Access to my own sudoku resolver from mobile device
-   Prove myself sudoku resolver can be implemented with a basic recursive algorithm

### Lessons learned

-   Service worker correctly improved the UI responsiveness, by moving work off the UI thread and thereby reducing DOM-blocking. Since the DOM is synchronous, when JavaScript does something computing-intensive, the DOM is also blocked. The tricky part was sending messages from user scope to service worker scope and configuring Webpack to correctly include /install it.
-   For small projects, managing the store with RxJS works really great. This pattern could be extended to modules inside big applications too.
-   Yay!! no more non-resolvable Sudokus!
-   Yes, it works very nice

works great removing work from the [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

## Commands

### Development

```bash
yarn

yarn serve
```

Browse to [http://localhost:8080/](http://localhost:8080/). Changes in code or CSS automatically update the web.

### Build

```bash
yarn

yarn build
```

The `/dist` folder contains `index.html` and static files for CSS, JS and images.

### Unit test

Some unit tests implemented with Jest

```bash
yarn test
```

## Code structure

-   **index.ts** - includes all dependencies, creates objects
-   **template.ts** - responsible for the view: show board, buttons, etc.
-   **board.ts** - this class represent the model, they are immutable objects
-   **store.ts** - simple stack that keeps track of all changes, user can go back/next this stack
-   **resolver.worker.ts** - Web Worker that resolves the sudoku in a background thread

## Setup

-   Webpack bundles the code
-   Jest runs the tests
-   Sass preprocess the CSS files
