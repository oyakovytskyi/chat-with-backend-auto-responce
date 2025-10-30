# 💬 Chat with Backend Auto-Response

![Project Preview](./chat-auto-response/client/public/preview-chat.jpg)  
*Preview of the chat application with automatic responses*

This project is a web-based chat application where users can create new chats, delete them, and send messages. Every message sent receives an automatic response fetched from a third-party API (`api-ninjas.com` quotes API).

---

## 🛠️ Technologies

### Backend

| Technology | Purpose |
|-----------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) | JavaScript runtime environment |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | Server-side framework |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) | HTTP client for API requests |

### Frontend

| Technology | Purpose |
|-----------|---------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) | UI library |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Frontend build tool |
| ![Material UI](https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) | UI components library |

---

## ⚡ Features

- Create new chat conversations.  
- Delete existing chats.  
- Send messages and receive automatic responses (quotes) from a third-party API.  
- Responsive and modern UI using Material UI.  

---

## 🔧 Available Scripts

### Frontend (`client` folder)

```bash
npm install
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm start           # Install dependencies and start both frontend and backend concurrently
```

```bash
npm install
npm start           # Start backend server
```

📂 Project Structure

```bash
chat-auto-response/
├─ client/             # React frontend
│  ├─ public/          # Static assets (including preview-chat.jpg)
│  └─ src/             # React components, pages, styles
├─ server/             # Node.js backend
│  └─ server.js        # Main backend file
```
