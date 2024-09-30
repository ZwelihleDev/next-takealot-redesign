![Takealot Redesign](./public/assets/Hero.png)

# Takealot Redesign

This project is a redesign of the Takealot e-commerce platform using **Next.js** with modern libraries and tools for state management, authentication, and UI components. The database uses **Neon** for a scalable and serverless PostgreSQL solution.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Setup and Installation](#setup-and-installation)
4. [Scripts](#scripts)
5. [Environment Variables](#environment-variables)
6. [Database Setup (Neon & Prisma)](#database-setup-neon--prisma)
7. [Key Features](#key-features)
8. [Folder Structure](#folder-structure)
9. [Contributing](#contributing)


## Project Overview

Takealot Redesign is a modern e-commerce web app built with **Next.js**. It leverages **Tailwind CSS** for styling, **Prisma** for database management, and **Radix UI** components for user interface development. The backend is powered by **Neon Tech** for database hosting, and **Upstash Redis** is used for caching. The project emphasizes performance, accessibility, and a seamless user experience.

## Tech Stack

- **Next.js**: React framework for server-side rendering, static site generation, and routing.
- **React**: UI library for building reusable components.
- **Tailwind CSS**: Utility-first CSS framework.
- **Prisma**: ORM for working with PostgreSQL (Neon Tech).
- **Radix UI**: Primitives for building accessible, unstyled components.
- **React Hook Form**: Form management and validation with Zod schema integration.
- **Kinde Authentication**: Seamless authentication with the Kinde auth provider.
- **Redis (Upstash)**: Serverless Redis for caching.
- **Embla Carousel**: Carousel/slider for product display.
- **Sonner**: Toast notification system.
- **Neon Tech**: Serverless PostgreSQL database.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/next-takealot-redesign.git
   cd next-takealot-redesign
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup Prisma and the Database:**

   - Ensure you have a **Neon Tech** PostgreSQL instance ready. Set up the `.env` file with your database URL:
     ```env
     DATABASE_URL=postgresql://username:password@hostname/neondb
     ```
   - Generate Prisma client:
     ```bash
     npx prisma generate
     ```
   - Run database migrations:
     ```bash
     npx prisma migrate dev
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Go to `http://localhost:3000` in your browser to view the app.

## Scripts

- **`dev`**: Runs the development server.
- **`build`**: Builds the application for production.
- **`start`**: Starts the production build.
- **`lint`**: Runs ESLint to check for linting issues.

## Environment Variables

You will need to create a `.env` file at the root of the project. Below are the necessary variables:

```env
# Neon PostgreSQL Database
DATABASE_URL=your-neon-database-url

# Kinde Authentication
KINDE_CLIENT_ID=your-client-id
KINDE_CLIENT_SECRET=your-client-secret
KINDE_DOMAIN=your-auth-domain

# Upstash Redis
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

## Database Setup (Neon & Prisma)

1. Set up a Neon PostgreSQL instance for your database.
2. Configure your `.env` file with the `DATABASE_URL`.
3. Use Prisma to handle schema and migrations:
   - Create the initial migration with `npx prisma migrate dev`.
   - View the database schema in Prisma Studio using `npx prisma studio`.

## Key Features

- **Responsive Design**: Mobile-first and optimized for various screen sizes.
- **State Management**: Forms and validation are handled with `React Hook Form` and `Zod`.
- **Authentication**: Integrated with Kinde for secure login and registration.
- **Embla Carousel**: For smooth and performant product carousels.
- **Neon PostgreSQL**: Serverless, highly-scalable database.
- **Redis Caching**: Use of Upstash Redis for optimizing query performance.

## Folder Structure

```
.
├── /app               # Next.js App Router (pages, layouts, API routes)
│   ├── /api           # API routes
│   ├── /auth          # Authentication logic
│   ├── /products      # Product pages
├── /components        # Reusable React components
├── /prisma            # Prisma schema and migrations
├── /styles            # Global styles (Tailwind)
├── /public            # Public assets (images, fonts, etc.)
└── /utils             # Utility functions
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes.
4. Submit a pull request.



---

Feel free to modify the structure or content as per your project's specific requirements!
