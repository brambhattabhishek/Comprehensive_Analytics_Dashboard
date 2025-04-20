# Welcome to Comprehensive Analytics Dashboard



**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

# Comprehensive Analytics Dashboard

A fully-featured analytics dashboard built using Next.js, React, TypeScript, SCSS/CSS, and Tailwind CSS, showcasing data fetched from multiple APIs. The dashboard integrates advanced animations, interactive charts, a modular UI, and various APIs (Weather, News, and Finance) to provide an engaging and high-performance user experience. This project adheres to best practices in state management, performance optimization, accessibility, and testing.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation Instructions](#installation-instructions)
- [How to Run the Project](#how-to-run-the-project)
- [Testing Instructions](#testing-instructions)
- [Deployment Details](#deployment-details)
- [Environment Variables](#environment-variables)
- [API Setup](#api-setup)
- [Additional Features](#additional-features)
- [Screenshots](#screenshots)
- [Live Demo](#live-demo)

## Project Overview

This application provides a dynamic dashboard that pulls data from three primary APIs: OpenWeatherMap for weather updates, NewsAPI for the latest news headlines, and Alpha Vantage for real-time stock market data. Additionally, the dashboard offers interactive charts, advanced animations, and a user-friendly interface. It supports features like dark mode, customizable widgets, real-time updates, and advanced data fetching strategies.

### Features:
- **Weather Data**: Displays real-time weather information and a 7-day forecast.
- **News Headlines**: Latest news articles categorized by type (Technology, Sports, etc.).
- **Finance Data**: Real-time stock prices and interactive charts.
- **Advanced Animations**: Smooth transitions, animated data charts, dynamic backgrounds using 3.js and Lottie.
- **User Authentication**: Secure sign-up, login, and user profile management with NextAuth.js.
- **Real-Time Data**: Integration of WebSockets/SSE for live data updates.
- **Theme Toggle**: Supports dark and light modes with smooth transitions.

## Technologies Used

- **Frontend**: Next.js, React, TypeScript
- **Styling**: SCSS/CSS, Tailwind CSS
- **State Management**: Redux Toolkit, RTK Query
- **API Integration**: OpenWeatherMap, NewsAPI, Alpha Vantage
- **Animations**: 3.js, Lottie
- **Data Visualization**: Recharts, D3.js, Chart.js
- **Authentication**: NextAuth.js
- **Testing**: Jest, React Testing Library, Cypress, Playwright
- **Deployment**: Vercel/Netlify (CI/CD)

## Installation Instructions

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/brambhattabhishek/Comprehensive_Analytics_Dashboard.git

# Step 2: Navigate to the project directory.
cd Comprehensive_Analytics_Dashboard

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```
4. Set up environment variables as described below.

## How to Run the Project

1. Start the development server:
    ```bash
    npm run dev
    ```
2. Visit `http://localhost:3000` in your browser to view the project.

## Testing Instructions

1. To run unit tests:
    ```bash
    npm run test
    ```
2. To run integration tests:
    ```bash
    npm run test:integration
    ```
3. To run end-to-end tests with Cypress or Playwright:
    ```bash
    npm run test:e2e
    ```
4. View the test coverage report in the terminal or by visiting `coverage/`.

## Deployment Details

The project is deployed on Vercel/Netlify for seamless CI/CD integration. Once pushed to the main branch, automated tests run, and the app is deployed.

Live demo: [link-to-deployed-app](https://tiny-peony-fd4430.netlify.app/)

## Environment Variables

Ensure to add the following environment variables in your `.env.local` file:

- `OPENWEATHERMAP_API_KEY` - API Key for OpenWeatherMap.
- `NEWSAPI_KEY` - API Key for NewsAPI.
- `ALPHA_VANTAGE_API_KEY` - API Key for Alpha Vantage.
- `NEXTAUTH_SECRET` - Secret key for NextAuth.js authentication.

Example `.env.local` file:

```env
OPENWEATHERMAP_API_KEY=your-openweathermap-api-key
NEWSAPI_KEY=your-newsapi-key
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-api-key
NEXTAUTH_SECRET=your-nextauth-secret
```

##live-demo
[![Watch the video](https://img.youtube.com/vi/mc7Bm2txh0E/maxresdefault.jpg)](https://youtu.be/mc7Bm2txh0E)


