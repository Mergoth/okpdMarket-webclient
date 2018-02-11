 <img src="https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiVHN1Y1FjTEppdGNYSnRDWTJIMVk5SEJGU2pvWnlXRHJuVDdsMkl4V29jRWJUU0xhMHZPSVliL0pMQmJVNUdLV1YraXVzbXE4OHhYWUJtZEdPWlhLYzFFPSIsIml2UGFyYW1ldGVyU3BlYyI6Im9STVZSWjBJbzdkOFY1ajUiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=develop"/>
------

- sudo apt-get update
- sudo apt-get install nodejs
- sudo apt-get install npm
- npm install -g @angular/cli



## Environment settings:
/src/environments/
      environment.prod.ts - production environment
      environment.ts      - test & dev environment
      
```   
   {
      serverUrl: "http://localhost:8080" 
   }
```      

ng build --env=prod


# OkpdMarketFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
