# Video

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI, use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## General Explanation of Working Frontend Code and the Partial Backend Code

In the frontend, there is no password entry because the backend is incomplete, so no password functionality is implemented yet. The rest of the frontend is complete. I used HTML, CSS, and TypeScript (Angular) for the code.

For the backend, I used Java Spring Boot and MySQL. I also used Spring Initializr and Maven 3.3.3 with Java 17, MySQL Driver, Lombok, Spring Boot Dev Tools, Spring Web, Spring Data JPA, and Spring Boot Actuator dependencies. I also loaded screenshoot to my selections incease of any mistake/lack of information

Most of the CRUD operations are done in the `BookingService`. I used `BookingService` to handle interactions with the backend and manage state for reservations, maintenance days, holidays, and tables.

I used the `Booking` model to define the structure of a booking (referred to as "booking" instead of "reservation") object in the reservation system. This interface includes the properties necessary for managing reservations and allows handling of both current and temporary states during booking creation or modification.

The `TheScripts` folder contains the TypeScript files, `ThePages` is for HTML files, and `TheStyles` is for CSS files. All code explanations are commented.

### Some Recommended Changes (Incomplete Due to Time Constraints)

1. Add or remove background images in the Ayarlama component and fix others.
2. Add a filter to allow users to check for existing reservations.
3. Implement pagination or subpages after a certain number of reservations/holidays/maintenance entries to improve user experience.

### Bugs or Incomplete Parts of the Code

1. The backend is incomplete, so there is no password entry for the frontend, affecting both user and admin logins. A simple frontend code for pseudo-login is used instead.
2. There is a bug in handling holidays and maintenance days: although they are added to the backend, they do not get deleted properly. Even if deleted in the frontend, they reload.
3. There may be other bugs or mistakes that I am not yet aware of.
