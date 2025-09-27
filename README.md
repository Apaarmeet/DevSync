# DevSync - Real-time Collaborative Code Editor

<div align="center">

![DevSync Logo](frontend/public/code.svg)

A modern, real-time collaborative code editor that lets developers code together seamlessly.

</div>

## ✨ Features

- **Real-time Collaboration**: Code together with multiple developers in the same room
- **Language Support**: Syntax highlighting for multiple programming languages
- **Room-based Collaboration**: Create or join coding rooms with unique IDs
- **Persistent Sessions**: Your code is saved and synced across all participants
- **Modern UI**: Clean, intuitive interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **React** with TypeScript for robust UI development
- **Redux Toolkit** for state management
- **Monaco Editor** for powerful code editing capabilities
- **Socket.IO Client** for real-time communication
- **Tailwind CSS** for modern, responsive styling

### Backend

- **Node.js** with Express for the server
- **Socket.IO** for WebSocket communication
- **MongoDB** for data persistence
- **TypeScript** for type-safe development

## 🌐 Live Demo

Visit DevSync at [https://dev-sync-brown.vercel.app/](https://dev-sync-brown.vercel.app/)

Try out the collaborative code editor:

1. Open the website
2. Create a new room or join an existing one
3. Start coding together in real-time!

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Apaarmeet/DevSync.git
   cd DevSync
   ```

2. **Set up the backend**

   ```bash
   cd backend
   npm install
   # Create .env file with:
   # PORT=3001
   npm run dev
   ```

3. **Set up the frontend**

   ```bash
   cd frontend
   npm install
   # Create .env file with:
   # VITE_BACKEND_SOCKET=http://localhost:3001
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

## 🌟 Usage

1. **Create or Join a Room**

   - Visit the home page
   - Enter a room ID to join an existing session
   - Or create a new room to start coding

2. **Start Coding**
   - Choose your preferred programming language
   - Start typing - changes are synced in real-time
   - Share the room ID with collaborators

## 🔄 Real-time Collaboration

DevSync uses Socket.IO for real-time communication and synchronization:

- Instant code updates across all connected users
- Room-based isolation for multiple concurrent sessions
- Efficient data transfer with minimal latency

## 🎨 UI/UX Features

- Dark theme for comfortable coding
- Language-specific syntax highlighting
- Responsive design for various screen sizes
- Intuitive room management interface

## 🛡️ Security

- Room-based access control
- Secure WebSocket connections
- Environment variable configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Apaarmeet**

- GitHub: [@Apaarmeet](https://github.com/Apaarmeet)

---

<div align="center">

Made with ❤️ by Apaarmeet

</div>
