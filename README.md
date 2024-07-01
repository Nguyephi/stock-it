# Stock It

Stock it is an application that allows users to load SKU from Printify to Etsy seamlessly.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Developer Notes](#developer-notes)

## Features

Set up an nextjs app with this boilerplate using this tech stack
- NextJs
- TypeScript
- Redux (state management, hooks)
- TailwindCSS/DaisyUI
- NextAuth (version 5 beta)
- Prisma
- PostgreSQL
- Stripe

## Installation

- **Clone the repository:**

    ```sh
    git clone https://github.com/Nguyephi/nextjs-app-boilerplate.git
    cd stock-it-saas
    ```

- **Install dependencies:**

    ```sh
    npm install
    ```

## Environment Variables

- **PostgreSQL:**

    Set up a local postgres db in order to create a db url.
    [MacOs Set up guide](https://dev.to/rinsama77/easy-setup-postgresql-on-macos-37ii)

    ```sh
    DATABASE_URL="postgresql://your_name:your_password@localhost:5432/your_db_name"
    ```

- **Next Auth:**

    Next Auth needs two env variables

    ```sh
    AUTH_SECRET=your_secret
    ```

    You can quickly create a good (NEXTAUTH_SECRET) value on the command line via this openssl command.
    [Next Auth configuration options guide](https://next-auth.js.org/configuration/options)
    ```sh
    openssl rand -base64 32
    ```

## Running the Application

- **Run app in dev:**

    ```sh
    npm run dev
    ```

## Developer Notes

- **Read formatted md:**

    ```sh
    Cmd + Shift + V
    ```
