# 🍅 Pomodoro Timer

A beautiful, modern Pomodoro timer built with React 18, Vite, and Framer Motion. Features a stunning glassmorphism dark UI with smooth animations and full customization.

![Pomodoro Timer](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-teal?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- **🎨 Beautiful Dark UI** - Glassmorphism design with animated gradients and glowing effects
- **⏱️ Pomodoro Technique** - 25-minute focus sessions with short and long breaks
- **🔄 Circular Progress** - Animated progress ring visualization
- **🔔 Notifications** - Sound and browser notifications when sessions complete
- **⚙️ Customizable** - Adjust timer durations and preferences
- **📱 Responsive** - Works beautifully on desktop and mobile
- **⚡ Fast** - Built with Vite for instant HMR and optimized builds
- **🎭 Smooth Animations** - Powered by Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/do88/pomodoro-timer.git

# Navigate to the project
cd pomodoro-timer

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **useReducer** - State management with reducers

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── Header.jsx      # App header with logo
│   ├── Timer.jsx       # Main timer with progress ring
│   ├── ModeSelector.jsx # Pomodoro/Break mode buttons
│   ├── RoundIndicator.jsx # Tomato round counter
│   ├── Settings.jsx    # Settings modal
│   └── Footer.jsx      # Footer with social links
├── context/
│   └── TimerContext.jsx # Global state with useReducer
├── hooks/
│   └── useFormattedTime.js # Time formatting hooks
├── constants/
│   └── timer.js        # Timer constants and config
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎯 How to Use

1. **Start a Pomodoro** - Click the play button to begin a 25-minute focus session
2. **Take Breaks** - After each Pomodoro, enjoy a 5-minute short break
3. **Long Break** - After 4 Pomodoros, take a well-deserved 15-minute break
4. **Customize** - Click the settings icon to adjust durations and preferences

## ⚙️ Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Pomodoro Duration | 25 min | Length of focus sessions |
| Short Break | 5 min | Quick rest between Pomodoros |
| Long Break | 15 min | Extended rest after 4 Pomodoros |
| Sound Notifications | On | Play sound when timer completes |
| Browser Notifications | On | Show desktop notifications |
| Auto-start Breaks | Off | Automatically start break timers |
| Auto-start Pomodoros | Off | Automatically start next Pomodoro |

## 🚀 Deployment

### Netlify

This project includes a `netlify.toml` configuration for easy deployment:

1. Connect your repository to Netlify
2. Deploy automatically on push

Or deploy manually:

```bash
npm run build
# Upload the dist folder to Netlify
```

### Other Platforms

Build the project and deploy the `dist` folder to any static hosting:

- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this project however you'd like!

## 👨‍💻 Author

**Dmitry Osipchuk**

- GitHub: [@do88](https://github.com/do88)
- LinkedIn: [osipchuk](https://www.linkedin.com/in/osipchuk/)

---

Made with ❤️ and lots of 🍅
