# 🌍 AI Trip Planner

An intelligent travel planning application that leverages **Google Gemini AI** to generate personalized itineraries based on your preferences. Built with React, Vite, and Tailwind CSS.

![Project Preview](/public/logo.svg)

## ✨ Features

- **🚀 AI-Powered Itineraries**: Generates detailed day-by-day travel plans using Google Gemini 2.0 Flash model.
- **📍 Smart Destination Search**: Integrated with **Google Places API** for accurate location selection and photo fetching.
- **🏨 Hotel Recommendations**: Suggests hotels with images, prices, and ratings tailored to your budget.
- **📱 Fully Responsive**: Optimized for both desktop and mobile devices.
- **🔐 Secure Authentication**: Google Sign-In integration for user management.
- **☁️ Cloud Sync**: Saves your generated trips to **Firebase Firestore** so you can access them anytime.
- **🎨 Modern UI**: Built with **Shadcn UI** and **Tailwind CSS** for a sleek, accessible design.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **AI Model**: Google Gemini 2.0 Flash
- **APIs**: Google Places API (New), Google Maps JavaScript API
- **Backend/Database**: Firebase (Firestore, Authentication)
- **Deployment**: Vercel (Recommended)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- A Google Cloud Project with the following APIs enabled:
  - Google Gemini API (Generative Language API)
  - Places API (New) (Google Maps)
- A Firebase Project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-trip-planner-web.git
   cd ai-trip-planner-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your API keys:

   ```env
   VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
   VITE_GOOGLE_GEMINI_AI_API_KEY=your_google_gemini_api_key
   VITE_GOOGLE_AUTH_CLIENT_ID=your_google_auth_client_id
   ```

   > **Note:** Ensure your Google Gemini Key has access to the `gemini-2.0-flash` model.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components (Hero, Header, etc.)
├── constants/          # Static options and AI prompts
├── create-trip/        # Trip generation logic and form
├── service/            # API configurations (Firebase, Gemini, GlobalApi)
├── view-trip/          # Trip details page components (Hotels, Itinerary)
└── main.jsx            # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
