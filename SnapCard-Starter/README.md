# SnapCard Fashion Store

A starter full-stack fashion e-commerce website.

## Included
- React + Vite frontend (responsive header, hero, categories, product cards, search, category filter, cart drawer, footer)
- Spring Boot Maven backend with product REST API and MySQL configuration
- MySQL schema + sample products

## Open in VS Code / Open Code
Open the `frontend` folder as a project. The React source files are in `frontend/src/`.

## Backend in Eclipse
Import the `backend` folder as **Existing Maven Project**. In `backend/src/main/resources/application.properties`, update the MySQL username/password for your computer. Run `SnapCardApplication.java` as a Spring Boot App.

## MySQL Workbench
Open `database/snapcard.sql` and execute it. Update the database credentials in `application.properties` to match your MySQL setup.

## Run locally
Frontend requires Node.js and npm. Open a terminal in `frontend`, run `npm install`, then `npm run dev`.
Backend requires Java 21+ and Maven. Run from Eclipse or use Maven `spring-boot:run`.
Frontend uses `http://localhost:8080/api/products` when backend is available; it falls back to sample display data so the design still loads without the backend.
