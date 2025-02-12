# Angular POC - Dynamic Form Receiver & Zoneless Web Component

## Overview
This project is a **Proof of Concept (POC)** built using **Angular v19**, demonstrating:
- The **use of `@Input()` and `@Output()`** to create a **dynamic form receiver** for a financial application.
- An **experiment with the Zoneless feature** in Angular to enable seamless integration as a **web component**, avoiding zone conflicts when embedding within other Angular applications.
- A **pure RxJS + Signal** approach for state management, eliminating reliance on Angular zones.

Additionally, this POC implements a **custom Angular Material TreeView** to:
- Visually represent **complex business logic** for adding **multi-entity account structures** in a financial application form.
- Dynamically update form layouts based on **account relationships** and **entity-dependent dropdown options**.

## Features
-  **Dynamic Form Handling**: Uses `@Input()` and `@Output()` to create a configurable form structure.
-  **Zoneless Web Component**: Eliminates Zone.js dependencies to prevent conflicts when embedding in external Angular applications.
-  **RxJS + Signals + NGRx**: Implements a reactive, signal-based, redux approach for UI state management.
-  **Angular Material TreeView Integration**: Displays **account-entity relationships** with hierarchical structure.
-  **Styled with Angular Material + TailwindCSS**: Provides a modern UI/UX.

This `README.md` effectively highlights:
- The **purpose** of the project.
- **Key features** such as dynamic forms, zoneless web components, and treeview integration.
- **Setup instructions** for running and testing.
- **Technology stack** used.

## Getting Started

npm install
ng serve application-form
ng test
