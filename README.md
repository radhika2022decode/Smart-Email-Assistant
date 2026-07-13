# Smart Email Assistant

An AI-powered email reply assistant that integrates directly into Gmail via a Chrome extension. It generates context-aware, tone-adjustable email replies using the Google Gemini API, backed by a Spring Boot service and a React frontend.

## Overview

Writing thoughtful email replies takes time. Smart Email Assistant reads the content of an email, sends it to Google's Gemini API, and generates a polished reply in a tone of your choosing (e.g., professional, friendly, casual, formal). It's available two ways:

- **As a standalone web app** (React frontend) where you can paste email content and get a generated reply.
- **As a Chrome extension** embedded directly inside Gmail, so you can generate replies without leaving your inbox.

## Features

- 🤖 AI-generated email replies powered by the Google Gemini API
- 🎭 Adjustable reply tone (e.g., professional, friendly, formal, casual)
- 📬 Chrome extension that embeds directly into the Gmail compose/reply UI
- ⚛️ Standalone React web interface for generating replies outside Gmail
- ⚙️ RESTful Spring Boot backend that handles prompt construction and Gemini API calls

## Architecture

```
┌─────────────────────┐        ┌──────────────────────┐        ┌────────────────────┐
│   Chrome Extension   │        │   React Frontend      │        │                    │
│  (embedded in Gmail) │──────▶│  (Email Reply         │──────▶│   Spring Boot       │
│                      │  HTTP  │   Generator UI)        │  HTTP  │   Backend           │
└─────────────────────┘        └──────────────────────┘        │                    │
                                                                  │  - REST Controller  │
                                                                  │  - Gemini API client│
                                                                  └─────────┬──────────┘
                                                                            │
                                                                            ▼
                                                                  ┌────────────────────┐
                                                                  │  Google Gemini API  │
                                                                  └────────────────────┘
```

Both the Chrome extension and the React frontend call the same Spring Boot backend, which handles prompt construction, tone injection, and communication with the Gemini API.

## Tech Stack

| Layer            | Technology                                  |
|-------------------|----------------------------------------------|
| Backend           | Java 25, Spring Boot 4.1.0, Spring Web (WebFlux) |
| Frontend          | React, Material UI (MUI)                     |
| Browser Extension | Chrome Extension, JavaScript/HTML/CSS |
| AI Model          | Google Gemini API                            |
| Build Tools       | Maven (backend), npm/Vite (frontend)         |


## Prerequisites

- Java 25
- Maven 3.9+
- Node.js 18+ and npm
- A Google Gemini API key ([Google AI Studio](https://aistudio.google.com/))
- Google Chrome (for the extension)

## Setup Instructions

### 1. Backend (Spring Boot)

```bash
cd mail-writer
```

Add your Gemini API key to `src/main/resources/application.properties`:

```properties
gemini.api.key=YOUR_GEMINI_API_KEY
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent
```

Run the backend:

```bash
./mvnw spring-boot:run
```

By default the backend runs on `http://localhost:8080`.

### 2. Frontend (React)

```bash
cd mail-writer-react
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

Make sure the frontend is configured to call your backend URL, typically in a config or `.env` file:

```
VITE_API_BASE_URL=http://localhost:8080
```

### 3. Chrome Extension

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select the `email-writer-ext/` folder.
4. Open Gmail — the extension should now inject the "AI Reply" option into the reply window.

## API Endpoints (Backend)

| Method | Endpoint              | Description                              |
|--------|------------------------|-------------------------------------------|
| POST   | `/api/email/generate`  | Accepts email content and tone, returns an AI-generated reply |

**Sample Request:**

```json
{
  "emailContent": "Hi team, can we push the deadline to next Friday?",
  "tone": "professional"
}
```

**Sample Response:**

```json
{
  "reply": "Hi, thanks for reaching out. Pushing the deadline to next Friday works on my end..."
}
```

> Adjust this section to match your actual request/response schema.

## Usage

1. Start the backend and frontend (or load the Chrome extension in Gmail).
2. Paste or select the original email content.
3. Choose a tone for the reply (e.g., professional, friendly, formal).
4. Click **Generate Reply** — the AI-generated response will appear, ready to copy or insert directly into Gmail.

## Roadmap / Future Improvements

- Support for multiple languages
- Reply length customization (short/medium/long)
- Save reply templates/history
- Support for additional email providers (Outlook)

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.
