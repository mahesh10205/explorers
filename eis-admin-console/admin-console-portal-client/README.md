# admin-console-portal-client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.

## Development server

Run `ng serve --proxy-config proxy.conf.json` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Runtime dependencies

Must run either admin-console-portal-service or admin-console-portal-service-mock, and either alert-service or alert-service-mock.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Architecture

## Development

The admin-console-portal-client can be run with either the admin-console-portal-service spring boot application or admin-console-portal-service-mock nodejs application.

![Alt text](resources/Development-client-server.jpg?raw=true "Development-client-server")

## Application bootstrap (ACP to ACAs)

When the amdin-console-portal-client starts, it requests from the backend service (admin-console-portal-service spring boot application or admin-console-portal-service-mock nodejs application) the list of applications the user is authorized to view.

From this response the application ACAs are dynamically created and the HTML page is populated accordingly with only thos ACAs.
 
![Alt text](resources/ACP-bootstrap-sequence-diagram.jpg?raw=true "ACP-bootstrap-sequence-diagram")