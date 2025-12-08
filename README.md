<div align="center">
Zunesha-Web
<p align="center">
      <img
        src="./src/assets/Zunisha.png"
        width="200"
        height="200"
      />
</p>

> A clean and fast anime-streaming web app built with React and Vite.

[![React](https://img.shields.io/badge/React-18-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Active-green)]()

Zunesha-Web lets users browse and watch anime through a smooth interface with quick loading and a simple layout.

</div>

## ✨ Features

### Main Functions

- 🎥 **Episode Streaming** — Watch anime through a clean built-in player
- 🗂️ **Anime Catalog** — Browse shows with quick page loads
- 📱 **Works on All Devices** — Mobile, tablet, and desktop
- ⚡ **Fast Build Setup** — Powered by React + Vite

### Dev-Focused

- 🔧 **Modular Components**
- 📦 **Simple File Layout**
- 🚀 **Ready for hosting on Vercel, Netlify, or any static server**

---

## 🚀 Quick Start

### Requirements

- Node.js 14+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/soberoiice/Zunesha-Web.git
   cd zunesha-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Supabase credentials:

   ```env
   VITE_API_URL=YOUR_API_URL_HERE
   VITE_PROXY_URL=YOUR_API_URL_HERE
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Live Demo

https://zunesha-web.vercel.app/

### Project Structure

```bash
Zunesha-Web/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── utils/
│   └── assets/
├── .env.example
├── vite.config.js
├── package.json
└── README.md

```

### 🛠️ Scripts

```bash
npm run dev       # start development server
npm run build     # build for production
npm run preview   # preview build
```

### 🤝 Contributing

1. Fork the repo
2. Make a new branch
3. Add your changes
4. Open a pull request

### 🗺️ Roadmap

1. Add search
2. Add user profiles
3. Add watch history
4. Improve player controls
5. Add more anime sources
