# Armada Mining - Official Website

This repository contains the source code for the official landing page of **Armada Mining**, a technology-driven company advancing Ethiopian gold mining through precise data, geological mapping, and disciplined field execution.

## 🚀 Tech Stack

*   **Framework:** React 18+
*   **Build Tool:** Vite
*   **Styling:** Modern Vanilla CSS (with responsive fluid typography and CSS variables)
*   **Hosting:** Configured for seamless deployment on Vercel
*   **API:** National Bank of Ethiopia (NBE) Live Rates API

## 💎 Core Features

*   **Premium Dark UI:** Designed with a sophisticated navy-blue/gold aesthetic tailored for high-end investors and stakeholders.
*   **Live Gold Ticker:** A persistent, real-time widget located in the site's header that fetches live 24k gold rates (USD & ETB) directly from the NBE (`https://api.nbe.gov.et/api/filter-gold-rates`).
*   **Smooth Scroll Animations:** Integrated IntersectionObserver hooks sequentially reveal data grids and text sections as users scroll down the page.
*   **Glassmorphism Header:** A sleek, fully-responsive sticky navigation bar utilizing background-blur effects for dynamic visibility.
*   **Fully Responsive:** Completely optimized for mobile platforms using dynamic viewport CSS clamps and flexbox drawers.

## 💻 Running the Project Locally

To run the platform on your own machine, you will need [Node.js](https://nodejs.org/) installed.

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-link>
   cd Armada_website
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5174/` (or the port Vite provides) to view the live site.

## 🐳 Running with Docker

If you prefer not to install Node locally, you can run the site inside Docker:

1. **Build and start the container**
   ```bash
   docker compose up --build
   ```

2. **Open the site**
   Visit `http://localhost:5173/`

The container runs the Vite dev server and mounts the project directory, so code changes are reflected automatically.

## 📦 Deployment (Vercel)
This project is configured to be deployed automatically on **Vercel**. 
Whenever you push to the `main` branch, Vercel will trigger a build utilizing the command:
```bash
npm run build
```
*(Note: A custom `.gitignore` file is included to prevent `node_modules` pollution and strictly handle Linux-based permission requirements for Vite builds during serverless deployments).*

## 📡 Live API Integration
The website utilizes a live external API to feed the gold pricing cards. 

**Endpoint:**
`GET https://api.nbe.gov.et/api/filter-gold-rates`

The internal logic (`fetchGoldRates`) grabs the first index representing 24-Karat gold, strips any duplicate currency labels, formats the numbers beautifully, and places them directly into the DOM seamlessly. It also has an integrated fallback if the API happens to go offline, ensuring the layout never breaks.

## ✉️ Contact 
*   **Website:** [armadaeth.com](https://armadaeth.com)
*   **Email:** admin@armadaeth.com
*   **Phone:** +251 911 967 525
