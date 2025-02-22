<div align="center">
  <br />
    <img src="https://github.com/user-attachments/assets/80af65ca-c4a3-42a6-943e-4ef96316a7a1" alt="Project Banner">
  <br />

  <h3 align="center">A Full Stack CHat APP</h3>

</div>

<div align="center">
  <br />
    <video src="https://github.com/user-attachments/assets/ffd941fa-942e-4b79-bf81-cdea923c0e0c" alt="Project Video">
  <br />

  <h3 align="center">Demo</h3>

</div>

# Chat App

A full-stack chat application featuring real-time messaging and user authentication. This project is structured as a multi-package repository with separate directories for the backend service and the frontend client.

## Live Demo

Check out the deployed app on Render:\
[Chat App - Sign In](https://hr-408-chat-app.onrender.com)

## Features

- **Real-Time Chat:** Engage in instant messaging with other users.
- **User Authentication:** Secure sign-in (and sign-up) flow.
- **Responsive Design:** Works seamlessly on desktop and mobile.
- **Modular Architecture:** Backend (service) and frontend (client) separated for clarity and scalability.

## Technologies Used

- **Backend:** Node.js, Express
- **Frontend:** React (Create React App or Vite)
- **Build Tools:** npm scripts to manage installation, building, and deployment

## Project Structure

```plaintext
chat-app/
├── client/                # Frontend application (React)
│   ├── public/            # Public assets and static files
│   ├── src/               # React source code
│   ├── package.json       # Client-specific dependencies and scripts
│   └── build/             # Build output (generated after running build)
├── service/               # Backend application (Express API, WebSocket server, etc.)
│   ├── src/               # Server source code
│   ├── package.json       # Service-specific dependencies and scripts
├── dist/                  # Consolidated build output (moved from client/build)
├── package.json           # Root package.json orchestrating builds and start scripts
└── README.md              # This file
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- npm (comes with Node.js) or your preferred package manager

### Installation & Local Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/biswajeet728/hr-408-chat-app.git
   cd chat-app
   ```

2. **Install Dependencies:**

   ```bash
   cd client && npm install
   cd service && npm install
   ```

3. **Set Env Variables:**

   ```bash
   cd service
   ```

   ```ini
   PORT=''
   JWT_SECRET=''
   MONGODB_URI=''
   MODE='development'
   ```

   ````bash
   cd client
   ```

   ```ini
   MODE='development'
   ````

4. **Run Both the Application:**

   ```bash
   cd service && npm run dev
   ```

   ```bash
   cd client && npm run dev
   ```

5. **Access Locally:**

   Open your browser and go to `http://localhost:<PORT>` (check your service configuration for the specific port, often `5173`).

## License

This project is licensed under the [MIT License](LICENSE).
