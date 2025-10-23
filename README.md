# ERTickApp

> **One Work Platform To Manage Attendance & Tasks Effortlessly**

ERTickApp is a modern, comprehensive work management platform designed to streamline attendance tracking, task management, and leave cycles. Built with cutting-edge technologies, it offers a seamless user experience with beautiful animations and intuitive interfaces.

![ERTickApp](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)

---

## 🌟 Features

### 📊 **Dashboard & Reporting**
- **Agent Dashboard**: Comprehensive overview of agent activities and metrics
- **Performance Analytics**: Real-time insights and reporting tools
- **Customizable Views**: Tailored dashboards for different user roles

### ⏰ **Attendance Management**
- **Real-time Tracking**: Monitor employee attendance with precision
- **Automated Reporting**: Generate attendance reports effortlessly
- **Integration Ready**: Seamless integration with existing HR systems

### 📝 **Task & Ticket Management**
- **Ticket System**: Complete ticket lifecycle management
- **Status Tracking**: Monitor ticket progress in real-time
- **Live Chat**: Built-in communication for ticket discussions
- **Requirement Gathering**: Streamlined process for capturing requirements

### 🏖️ **Leave Management**
- **Leave Requests**: Simple and intuitive leave application system
- **Approval Workflow**: Streamlined approval process
- **Leave Balance Tracking**: Automatic calculation of leave balances

### ⏱️ **Timesheet Tracking**
- **Time Logging**: Easy-to-use time entry system
- **Project-based Tracking**: Associate time entries with specific projects
- **Export & Reports**: Generate comprehensive timesheet reports

### 🔐 **Security & Authentication**
- **Protected Routes**: Secure access control for authenticated users
- **Session Management**: Persistent login sessions with localStorage
- **User Context**: Global authentication state management

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ertickapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Login Credentials

For testing and development purposes, use the following credentials:

- **User ID**: `1111`
- **Password**: `1111`

---

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1.1**: Modern UI library with latest features
- **TypeScript 5.9.3**: Type-safe JavaScript for robust code
- **Vite 7.1.7**: Lightning-fast build tool and dev server

### UI & Styling
- **Tailwind CSS 4.1.14**: Utility-first CSS framework
- **Radix UI**: Accessible, unstyled UI components
- **Animate.css**: Beautiful CSS animations
- **Lucide React**: Beautiful & consistent icons

### Routing & State
- **React Router DOM 7.9.4**: Client-side routing
- **Context API**: Global state management for authentication

### Animation & Effects
- **Lenis**: Smooth scroll library for fluid interactions
- **Liquid Glass React**: Glassmorphism effects
- **Three.js**: 3D graphics and animations

### Development Tools
- **ESLint**: Code linting and quality checks
- **TypeScript ESLint**: TypeScript-specific linting rules
- **React Compiler**: Optimized React compilation

---

## 📂 Project Structure

```
ertickapp/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Authentication-related components
│   │   │   ├── LoginSection.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── PublicRoute.tsx
│   │   └── ui/            # UI component library
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── shiny-text.tsx
│   ├── contexts/          # React context providers
│   │   └── AuthContext.tsx
│   ├── pages/             # Page components
│   │   ├── LandingPage.tsx
│   │   └── DashboardPage.tsx
│   ├── assets/            # Static assets (images, videos)
│   ├── lib/               # Utility functions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── public/                # Public static files
├── dist/                  # Production build output
└── testsprite_tests/      # Automated test suite
```

---

## 📜 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement (HMR) at `http://localhost:5173`

### Build
```bash
npm run build
```
Compiles TypeScript and builds the production-ready application to the `dist/` folder

### Preview
```bash
npm run preview
```
Previews the production build locally at `http://localhost:4173`

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality and adherence to coding standards

---

## ✨ Key Features & UX Highlights

### 🎨 **Modern Landing Page**
- **Animated Hero Section**: Word-by-word text reveal animation
- **Interactive Carousel**: Dashboard preview showcase
- **Smooth Scrolling**: Powered by Lenis for fluid navigation
- **Responsive Design**: Mobile-first approach for all devices

### 🔐 **Enhanced Login Experience**
- **Keyboard Navigation**: Full keyboard support (Tab, Enter)
- **Inline Validation**: Real-time error feedback
- **Shake Animation**: Visual feedback for validation errors
- **Auto-focus**: Intelligent focus management for better UX
- **Password Toggle**: Show/hide password functionality
- **Loading States**: Clear visual feedback during authentication

### 🎯 **User-Centric Design**
- **Accessibility**: WCAG-compliant components
- **Performance**: Optimized for fast load times
- **Intuitive Navigation**: Clear and consistent user flows
- **Error Handling**: Graceful error messages and recovery

---

## 🔒 Authentication Flow

1. **Public Routes**: Landing page accessible to all users
2. **Login Validation**: 
   - Both User ID and Password fields shake on any validation error
   - Automatic focus on User ID field after failed login
   - Single Enter key press submits the form from password field
3. **Session Persistence**: Authentication state saved in localStorage
4. **Protected Routes**: Dashboard and other protected pages require authentication
5. **Logout**: Clear session and redirect to landing page

---

## 🎯 Roadmap

- [ ] Backend API integration
- [ ] Multi-user authentication with database
- [ ] Real-time notifications
- [ ] Advanced reporting and analytics
- [ ] Mobile application (React Native)
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode theme

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is currently in development. License information will be added soon.

---

## 👨‍💻 Development Notes

### React Compiler
The React Compiler is enabled for this project. This provides automatic optimization of React components but may impact Vite dev & build performance. See [React Compiler documentation](https://react.dev/learn/react-compiler) for more information.

### TypeScript Configuration
This project uses strict TypeScript configuration for better type safety. Two config files are used:
- `tsconfig.app.json` - Application code configuration
- `tsconfig.node.json` - Node/Vite configuration

### Expanding ESLint Configuration

For production applications, consider enabling type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // or tseslint.configs.strictTypeChecked for stricter rules
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

---

## 📞 Support

For questions, issues, or feature requests, please open an issue on the GitHub repository.

---

<div align="center">
  <p><strong>Built with ❤️ using React, TypeScript, and Vite</strong></p>
  <p>© 2025 ERTickApp. All rights reserved.</p>
</div>
