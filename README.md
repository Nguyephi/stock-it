# Stock It

Stock it is an application that allows users to load product variant's SKU from Printify to Etsy seamlessly.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Developer Notes](#developer-notes)

## Features

- **Current app features:**
   
    Auth
    - Login with email
    - Sign up with email
    - Forgot password
    - Reset password
    - Verify email
    - Resend email
    - Facebook oAuth

    Payments
    - Stripe payments (coming soon...)

## Tech Stack

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

    Depending on the oAuth provider you want to use, you will need to add the following to your .env file. For example, if you want to use Google OAuth, you would add the following:
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
## Deploying to Vercel

- **Deploy on vercel (or use the cli):**

    Personally I deploy on [Vercel](https://vercel.com/). Simply sign in, create new project, connect your github repo, add env variables and deploy.
    - Note: When you set the NEXTAUTH_URL env variable it can be set to http://localhost:3000 in order to deploy, however you will need to get the apps url after deploying. Change your NEXTAUTH_URL in vercel env variablesto the url you get after deploying.

- **Deploying with oAuth:**

    If you are deploying with an oAuth provider, you will need to change its callback url to your vercel url. To find the callback url append /api/auth/providers to you app url. This will give you all the callback urls for the different providers you have set up.
  
## Developer Notes

- **README.md formatted view:**

    ```sh
    Cmd + Shift + V
    ```
