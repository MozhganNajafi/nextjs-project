# NextJS Project

## Table of contents
- [Overview ](#overview)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)

## Overview
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project is designed to evaluate frontend technical skills and utilises NextJS, Typescript, Apollo Client, Graphql, and Chakra UI.
It includes three pages:

The first page is used for User details (Username & Job title) and serves as the homepage. [http://localhost:3000](http://localhost:3000)

The second page is defined to provide users a place to view their details in full and also edit them. [http://localhost:3000/profile](http://localhost:3000/profile)

The third page displays a list of paginated character information including their image. [http://localhost:3000/information?page=1](http://localhost:3000/information?page=1)

## Getting Started
When running the project for the first time you will need to do the following in order for it to get up and running.

First, run the development server:
### run, Compile and Hot-Reload for Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Folder structure

All app source code is placed in `app` folder.

- `/app`: This is a special directory in Next.js where each file represents a route of the application. Files within app/ are automatically mapped to their respective URLs. For example, app/page.tsx corresponds to the root URL /, and app/profile/page.tsx corresponds to /profile.

- `/app/page.module.css`: Contains global stylesheets (CSS, Sass, or CSS modules) used across the application. Next.js supports CSS Modules by default.

- `/components`: This directory typically houses reusable React components used throughout the application. These components are not pages but are used within pages and other components.

- `/context`: Contains context providers and custom hooks for managing global state and sharing data across components without prop drilling.

- `/lib`: Contains external libraries, configuration files (like Apollo client setup), or utilities specific to the application.

- `/public`: Stores static assets like images, fonts, or other files that Next.js serves statically. Files placed here can be accessed using the / URL.
