# 🌿 Mindora.ai (Mental Wellness Platform)

Welcome to **Mindora.ai**, a premium, Top 1% aesthetics frontend application aimed at mental wellness and emotional tracking. This project has been significantly upgraded to match industry-level design standards, focusing on a soothing user experience, glassmorphic UI, and smooth animations.

---

## ✨ Features

1. **Dynamic Theming**: True dark mode support, where ambient colors intelligently shift from soft pastels to deep navys/purples depending on user preference and interaction.
2. **Intelligent State Management**: Recreated `useEffect` state synchronization to properly use lazy initialization (`useState(() => ...)`) to avoid expensive cascading re-renders. 
3. **Modern Topography**: Integrated *Outfit* (for bold, structured headings) and *Inter* (for clean, readable body text) via Google Fonts.W

---

## 🏗️ Project Architecture

This project is built with a modern and scalable frontend architecture, leveraging industry best practices.

**Core Technologies:**

*   **Framework:** [React](https://react.dev/) is used for building the user interface with a component-based approach.
*   **Build Tool:** [Vite](https://vitejs.dev/) provides a fast and lean development experience with features like Hot Module Replacement (HMR).
*   **Routing:** [React Router](https://reactrouter.com/) handles all client-side routing, enabling a seamless single-page application (SPA) experience.
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand) is used for centralized state management, offering a simple and unopinionated way to manage application state.
*   **API Communication:** [Axios](https://axios-http.com/) is used for making HTTP requests to the backend services.

**Codebase Structure:**

The codebase is organized using a **feature-sliced architecture**. This means that the code is grouped by feature, making it easier to maintain and scale the application.

```text
src/
├── assets/              # Static assets (images, icons, etc.)
├── components/          # Shared, reusable UI components
│   ├── layout/          # Layout components (Navbar, Footer)
│   └── ui/              # Basic UI primitives (Button, Card, Input)
├── features/            # Feature-based modules
│   ├── auth/            # Authentication feature (services, store)
│   ├── chat/            # Chat feature (components, services)
│   ├── journal/         # Journal feature
│   └── mood/            # Mood tracking feature
├── hooks/               # Custom React hooks
├── pages/               # Top-level page components for each route
├── services/            # Global API services (apiClient, aiClient)
├── store/               # Global Zustand store setup
├── utils/               # Utility functions and helpers
├── App.jsx              # Root component with layout structure
├── main.jsx             # Application entry point
└── routes.jsx           # Centralized routing configuration
```

**Key Architectural Patterns:**

*   **Component-Based UI:** The UI is built from small, reusable components.
*   **Centralized State:** Zustand provides a global store, while feature-specific logic can be encapsulated within its own slice of the store.
*   **Service Layer:** API interactions are abstracted into a dedicated service layer, separating business logic from UI components.
*   **Hooks for Reusability:** Custom hooks are used to encapsulate and reuse stateful logic across components.
*   **Form Handling:** [React Hook Form](https://react-hook-form.com/) is used for efficient and flexible form management, paired with [Zod](https://zod.dev/) for schema validation.

---

## 🚀 Pages Breakdown

* **Home (`/`)**: A calming entry point welcoming users to start their journey, featuring floating background orbs and a strong call-to-action.
* **Mood Tracker (`/mood`)**: Users select an emotion, set their intensity (1-10 slider), and pick influencing factors (Work, Sleep, Health, etc.). The page's ambient gradient changes dynamically based on the mood selected.
* **Journal Space (`/journal`)**: A focused writing area. It features a "random prompt" generator to cure writer's block and uses a mock sentiment analysis engine to tag previous entries (✨ Positive, 🌧️ Struggling, ☁️ Neutral).
* **Analytics Dashboard (`/dashboard`)**: Fully integrated with `localStorage` to compute realtime stats (Current Streak, Check-ins, Average Intensity).
* **Authentication (`/login`, `/register`)**: Standard onboarding flows redesigned to feel like an expensive SaaS product, utilizing deep inset shadows and floating elements.

---

## 💻 Tech Stack

- **React:** `^18.2.0`
- **Vite:** `^5.2.0` (Build Tool)
- **React Router DOM:** `^6.22.3` (Routing)
- **Zustand:** `^4.5.2` (State Management)
- **Axios:** `^1.6.8` (API Communication)
- **React Hook Form:** `^7.51.3` (Form Handling)
- **Zod:** `^3.23.4` (Validation)
- **Lucide React:** `^0.378.0` (Icons)
- **ESLint:** `^8.57.0` (Linting)

---

## 🛠️ Run Locally

1. Ensure you have Node.js installed.
2. Navigate to the `frontend` directory in your terminal:
   ```bash
   cd frontend
   ```
3. Install the dependencies (if you haven't already):
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`. Enjoy the serene experience!
