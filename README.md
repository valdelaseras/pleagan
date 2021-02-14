# Pleagan

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

[data model](https://www.npmjs.com/package/pleagan-model)

## Set up

[backend](https://github.com/valdelaseras/pleagan-service)

## Development server

### App

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Service and database

Clone [pleagan-service](https://github.com/valdelaseras/pleagan-service)
Run the following commands:

npm:

```bash
$ npm install
$ docker-compose up -d  // run mysql 8 in docker container
$ npm start             // or npm run start:dev for live reload
```

yarn:

```bash
$ yarn
$ docker-compose up -d  // run mysql 8 in docker container
$ yarn start            // or yarn start:dev for live reload
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
