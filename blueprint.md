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

## Current Task: Add Environment Files

### Plan
1.  **Create Environment Directory:** A new directory `src/environments` will be created to hold environment-specific configuration files.
2.  **Create Development Environment File:** Create `src/environments/environment.ts`. This file will contain configuration for the development environment, including `production: false` and placeholder credentials for Firebase.
3.  **Create Production Environment File:** Create `src/environments/environment.prod.ts`. This file will contain configuration for the production environment, including `production: true` and placeholder credentials for Firebase. This setup allows for different settings (like API keys) between development and production builds.
