# Vishwa Daily 🌍

![Vishwa Daily Banner](https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop)

> **"Curating today's top stories with AI."**

**Vishwa Daily** is a modern, AI-powered news aggregation platform that leverages Google's **Gemini 2.0 Flash** models to generate real-time news articles, summaries, and trend insights. It offers a premium, reading-focused user experience with instant load times and dynamic category generation.

---

## 🚀 Features

*   **🤖 AI-Generated Content**: Uses Google's Gemini API to hallucinate realistic news scenarios or summarize real-world topics on the fly.
*   **⚡ Instant Load Caching**: Smart local caching system ensures pages load instantly after the first visit, with a 24-hour validity period.
*   **🔄 On-Demand Refresh**: "Fresh News" buttons allow users to bypass the cache and trigger new AI generations instantly.
*   **📱 Modern UI/UX**: Fully responsive design built with **Tailwind CSS**, featuring glassmorphism, smooth transitions, and a clean serif typography for readability.
*   **📂 Dynamic Categories**: Browse news by Tech, World, Science, and Lifestyle categories.

## 🛠️ Tech Stack

*   **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **AI Model**: [Google Gemini 2.0 Flash](https://deepmind.google/technologies/gemini/) (via `google-generative-ai` SDK)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Toast Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/vishwa-daily.git
    cd vishwa-daily
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Key**
    Create a `.env.local` file in the root directory and add your Google Gemini API key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
    > *Need a key? Get one at [Google AI Studio](https://aistudio.google.com/).*

4.  **Run the application**
    ```bash
    npm run dev
    ```

## 📸 Screenshots

| Home Page | Trending & Latest |
|:---:|:---:|
| ![Home Page](./screenshots/home-page.png) | ![Trending & Latest](./screenshots/trending-latest.png) |


## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
