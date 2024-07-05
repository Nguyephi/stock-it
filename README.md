# Stock It

Stock it is an application that allows users to load SKU from Printify to Etsy seamlessly.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Developer Notes](#developer-notes)

## Features

Set up an nextjs app with a boilerplate using this tech stack
- NextJs
- TypeScript
- Zustand; or Jotai (state management, hooks)
- TailwindCSS
- DaisyUI; other options - shadcn/ui or flowbite
- Auth (NextAuth v5 - beta)
- Prisma
- Supabase
- PostgreSQL
- Resend
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

- **Supabase/ PostgreSQL:**

    Set up a supabase postgres db
    [Supabase](https://supabase.com/)
    - Create a new project > click connect > click ORMs to get prisma credentials
    - To reset pw go to project settings > under configuration click database > you can reset pw here

    ```sh
    DATABASE_URL="postgresql://..."
    DIRECT_URL="postgresql://..."
    ```

- **Auth (Next Auth v5 - beta):**

    Add the following env variables to your .env file for NextAuth

    ```sh
    AUTH_SECRET="your_secret"
    NEXTAUTH_URL="http://localhost:3000"
    ```

    You can quickly create a good (AUTH_SECRET) value on the command line via this openssl command.
    [Next Auth configuration options guide](https://next-auth.js.org/configuration/options)
    ```sh
    openssl rand -base64 32
    ```

    Depending on the provider you want to use, you will need to add the following to your .env file. For example, if you want to use Google OAuth, you would add the following:
    ```sh
    AUTH_GOOGLE_ID="your_client_id"
    AUTH_GOOGLE_SECRET="your_client_secret"
    ```

- **Resend:**

    After signing up for Resend, you will need to add the following to your .env file.

    ```sh
    RESEND_API_KEY="your_api_key"
    RESEND_FROM="onboarding@resend.dev"
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
