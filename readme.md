React+Redux Sandbox
=======

This is a barebones project designed to break things, or start them anew. It contains my personal preferences in terms of node modules and linter configuration.

Installation
---------

This React project is built with [Node.js](https://nodejs.org) for dependency management and webpack dev server. If you don't have it, install it on your system (it's great).
To get things started, you'll only need to open a console on the project's base folder and execute:
```node
npm install
```
You'll also want some hot reloading going on. For that, just run:
```node
npm run dev
```
This will create a local webserver with *webpack-dev-server* that will update when anything changes in your code. Just access **localhost/** and be amazed (Just make sure nothing else is running on port 80, like Skype on Windows).

Sublime Text plugins that will help you
---------

- **ESlint**: Great linter with react rules. Highly customizable.
- **Babel**: For JSX color highlighting.
- **Sass**: The project uses sass loaders that automatically compile sass with webpack updates.

Indent style
---------

The project is indented using 2 space tabs. Consider it my way of vindicating tabs before spaces.