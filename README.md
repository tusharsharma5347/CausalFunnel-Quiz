# 🧠 CausalFunnel Quiz Application

A modern, competitive programming-style quiz application built with the MERN stack.

## 🚀 Live Demo

- **Frontend**: [https://causal-funnel-quiz-orpin.vercel.app/](https://causal-funnel-quiz-orpin.vercel.app/)
- **Backend API**: [https://causalfunnel-backend.onrender.com](https://causalfunnel-backend.onrender.com)

## ✨ Features

### 🎯 Core Functionality
- **📧 Email-based Authentication** - Start quiz sessions with email verification
- **⏰ 30-minute Timer** - Countdown timer with auto-submit functionality
- **🎯 15 Dynamic Questions** - Fetched from OpenTDB API with multiple choice answers
- **🧭 Smart Navigation** - Jump to any question with real-time status tracking
- **📊 Comprehensive Results** - Detailed answer comparison and performance analytics
- **🔄 Auto-submit** - Quiz automatically submits when timer expires

### 🎨 User Experience
- **🌓 Dual Theme Support** - Light and dark modes with smooth transitions
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **⚡ Real-time Updates** - Live question status and progress tracking
- **🎭 Smooth Animations** - Enhanced user interactions and micro-animations
- **📈 Progress Analytics** - Track solved, viewed, and remaining problems
- **🎮 Competitive Feel** - HackerEarth/HackerRank-inspired interface

### 🛠️ Technical Features
- **🔒 Data Persistence** - MongoDB stores quiz sessions and results
- **🌐 RESTful API** - Clean, well-documented API architecture
- **🎪 State Management** - React Context for global state management
- **🛡️ Error Handling** - Comprehensive error management and user feedback
- **📋 Input Validation** - Frontend and backend validation
- **🎨 Modern CSS** - CSS custom properties, glassmorphism effects, and animations

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **React Context API** - Global state management
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling with modern design patterns

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - Object Document Mapper for MongoDB
- **CORS** - Cross-Origin Resource Sharing

### External APIs
- **OpenTDB** - Trivia questions database
- **MongoDB Atlas** - Cloud database hosting

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for version control)
- **npm** or **yarn** (package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tusharsharma5347/CausalFunnel-Quiz
   cd causalfunnel-quiz
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration

#### Backend Environment Variables
Create `backend/.env`:
```env
PORT=5000
MONGODB_URI= YOUR_MONGODB URI
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend Environment Variables
Create `frontend/.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Access the Application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000


## 🎮 How to Use

1. **Start Quiz**: Enter your email address on the welcome page
2. **Answer Questions**: Navigate through 15 trivia questions
3. **Track Progress**: Monitor your progress in the sidebar
4. **Submit Quiz**: Complete within 30 minutes or auto-submit
5. **View Results**: See detailed results with correct answers



## 📈 Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Optimized API Calls**: Efficient data fetching
- **Responsive Design**: Optimized for different screen sizes
- **Caching**: Browser caching for static assets
- **Minification**: Production builds are minified
- **Touch Optimization**: Mobile-friendly touch targets


### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
FRONTEND_URL=https://causalfunnel-quiz.vercel.app
```

#### Frontend (.env.production)
```env
REACT_APP_API_URL=https://causalfunnel-backend.onrender.com/api
```

## 📁 Project Structure

```
causalfunnel-quiz/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── Quiz.js
│   ├── routes/
│   │   └── quizRoutes.js
│   ├── server.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── StartPage.js
│   │   │   ├── QuizPage.js
│   │   │   ├── ReportPage.js
│   │   │   ├── Timer.js
│   │   │   ├── QuestionNav.js
│   │   │   └── ThemeToggle.js
│   │   ├── context/
│   │   │   ├── QuizContext.js
│   │   │   └── ThemeContext.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── README.md
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


**Made by Tushar**
