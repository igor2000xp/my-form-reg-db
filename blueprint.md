# Blueprint

## Overview

This project is a form-based registration application with a database backend. It's built with the latest Angular features, including standalone components, signals for state management, and modern control flow syntax. The application will feature user authentication and a reactive registration form.

## Implemented Features

### Project Setup
- Initial Angular project structure.
- Firebase SDKs for authentication integrated.
- Basic routing configuration.
- Strict TypeScript settings and modern Angular best practices enforced.

### Styling & Design
- Global styles file is set up, but no specific design has been implemented yet.

### Authentication
- **Logout Functionality:** Implemented a streamlined, async logout method in `AuthService` that signs the user out from Firebase, clears local session data, and redirects to the login page. The navigation component was updated to correctly invoke this method.

## Current Task: Improve Logout Functionality

### Plan
1.  **Simplify `AuthService`:** Refactor the `logout` method in `auth.service.ts` to be a simple `async` function that signs the user out and navigates to the login page.
2.  **Update Navigation Component:** Modify the `logout` method in `navigation.ts` to correctly call the new `async` `logout` method in `AuthService`.
3.  **Verify Changes:** Run `ng build` to ensure that the changes do not introduce any compilation errors.