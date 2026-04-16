<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Framer_Motion-Latest-EF4444?style=for-the-badge&logo=framer&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />

<br /><br />

# 📚 Libronexa

### Smart Library Management Platform

*A modern, full-featured library management system built for institutions and avid readers alike.*

</div>

---

## ✨ Overview

**Libronexa** is a sleek, dark-mode-first library management platform designed to modernize how libraries operate and how readers discover books. Whether you're an admin managing a growing catalog or a member browsing for your next read, Libronexa delivers a seamless, responsive experience powered by modern web technologies.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 📖 **Book Browsing** | Explore a rich catalog with cover images, genres, and author info |
| 🔍 **Smart Search** | Real-time search and filter by title, author, genre, or availability |
| 📦 **Borrow System** | Request, track, and return books with status updates |
| 👨‍💼 **Admin Dashboard** | Full CRUD controls for books, users, and borrow records |
| 🌙 **Dark Mode UI** | Polished dark-first design, easy on the eyes |
| 🎨 **Smooth Animations** | Page transitions and micro-interactions via Framer Motion |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile |

---

## 🛠️ Tech Stack

### Frontend
- **[React 18](https://react.dev/)** — Component-based UI with hooks
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** — Declarative animations
- **[React Router v6](https://reactrouter.com/)** — Client-side routing

### Backend
- **[Node.js](https://nodejs.org/)** — Server runtime
- **[Prisma](https://www.prisma.io/)** — Type-safe ORM with database migrations

### Tooling
- **[Vite](https://vitejs.dev/)** — Lightning-fast dev server and bundler
- **[ESLint](https://eslint.org/)** — Code linting
- **[PostCSS](https://postcss.org/)** — CSS transformations

---

## 📁 Project Structure

```
libronexa/
├── backend/
│   ├── prisma/          # Database schema & migrations
│   ├── src/             # API routes, controllers, middleware
│   ├── .env             # Environment variables
│   └── package.json
│
├── frontend/
│   ├── public/          # Static assets
│   ├── src/             # React app source
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level pages
│   │   ├── hooks/       # Custom React hooks
│   │   ├── types/       # TypeScript interfaces
│   │   └── utils/       # Helper functions
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.ts
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A supported database (PostgreSQL recommended with Prisma)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/kartikgarg146/Libronexa-Smart-Library-Management-Platform.git
cd Libronexa-Smart-Library-Management-Platform
```

**2. Set up the backend**

```bash
cd backend
npm install
```

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://user:password@localhost:5432/libronexa"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

Run Prisma migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the backend server:

```bash
npm run dev
```

**3. Set up the frontend**

```bash
cd ../frontend
npm install
npm run dev
```

The app will be live at **http://localhost:5173**

---

## 🔐 User Roles

**Member**
- Browse and search the book catalog
- Submit borrow requests
- View personal borrowing history and due dates

**Admin**
- All member capabilities
- Add, edit, and remove books
- Manage user accounts and permissions
- Approve or reject borrow requests
- View system-wide borrow activity

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add: your feature description'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing style and passes lint checks before submitting.

---

## 📄 License

This project is licensed under the terms found in the [LICENSE](./LICENSE) file.

---

<div align="center">

⭐ If you find Libronexa useful, please consider giving it a star on GitHub!

</div>
