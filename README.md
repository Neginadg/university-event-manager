# University Event Management System

A comprehensive event management platform designed for university environments, built by a collaborative team of 5 developers.

## Team Structure
- **Frontend Team (2 developers)**: React-based user interface
- **Backend Team (2 developers)**: Node.js/Express API and university database integration
- **AI Developer (1 developer)**: Chatbot and intelligent event recommendations

## Features
- � **University Integration**: Direct login using existing university credentials (no registration required)
- 👨‍🏫 **Instructor Capabilities**: Create, edit, and delete events
- �‍🎓 **Student Features**: Browse and register for events with one-click attendance
- 🤖 **AI Chatbot**: Personalized event recommendations based on student interests and department
- � **Smart Event Discovery**: Department-specific and interest-based event filtering
- 🔍 **Advanced Search**: Find events by category, department, date, and keywords
- 📊 **Analytics Dashboard**: Event attendance tracking and reporting for instructors
- � **Real-time Notifications**: Event updates and reminders

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: University Database Integration (existing student/instructor data)
- **Authentication**: University SSO/LDAP integration
- **File Storage**: University file server or cloud storage
- **Testing**: Jest + Supertest

### AI/ML & Chatbot
- **Language**: Python
- **Framework**: FastAPI
- **ML Libraries**: scikit-learn, pandas, numpy
- **Chatbot Engine**: Custom NLP with department-aware recommendations
- **NLP**: spaCy for event categorization and intent recognition
- **Database**: Redis for caching recommendations and chat sessions

### DevOps & Tools
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier, Husky
- **Documentation**: TypeDoc, Swagger/OpenAPI
- **Monitoring**: Winston (Backend), Sentry (Error tracking)

## Project Structure
```
EventManager/
├── frontend/                 # React frontend application
├── backend/                  # Node.js/Express API server with university DB integration
├── ai-service/              # Python chatbot and recommendation service
├── shared/                  # Shared types and utilities
├── docs/                    # Project documentation
├── .github/                 # GitHub workflows and templates
├── docker-compose.yml       # Multi-service development setup
└── README.md               # This file
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose
- Access to University Database
- Redis 6+
- University LDAP/SSO credentials for testing

### Quick Start with Docker
```bash
# Clone the repository
git clone https://github.com/your-university/event-manager.git
cd event-manager

# Configure university database connection
cp .env.example .env
# Edit .env file with university database credentials

# Start all services
docker-compose up -d

# Frontend will be available at http://localhost:3000
# Backend API at http://localhost:5000
# AI Chatbot Service at http://localhost:8000
```

### Development Setup
```bash
# Install dependencies for all services
npm run install:all

# Start development servers
npm run dev
```

## Development Workflow

### Branch Strategy
- `main` - Production ready code
- `develop` - Integration branch for features
- `feature/[component]-[description]` - Feature branches
  - `feature/frontend-user-dashboard`
  - `feature/backend-event-api`
  - `feature/ai-recommendation-engine`

### Team Responsibilities

#### Frontend Team
- `/frontend` directory
- Student and instructor dashboards
- Event browsing and registration interface
- Chatbot integration UI
- University-themed responsive design
- Real-time event updates

#### Backend Team
- `/backend` directory
- University database integration
- LDAP/SSO authentication
- Event CRUD operations for instructors
- Student attendance management
- Analytics and reporting APIs

#### AI Developer
- `/ai-service` directory
- Intelligent chatbot development
- Department-based event recommendations
- Student interest profiling
- Natural language processing for event queries
- Personalization algorithms

## User Roles & Permissions

### Students
- **Login**: Use existing university username/password
- **Browse Events**: View all available events with department filtering
- **Register for Events**: One-click attendance registration
- **Chat with AI**: Get personalized event recommendations via chatbot
- **Profile**: View registered events and attendance history

### Instructors
- **Login**: Use existing university credentials
- **Event Management**: Create, edit, and delete events
- **Analytics**: View attendance statistics and event performance
- **Student Management**: See registered students for their events

### System Features
- **University Database Integration**: No separate account creation required
- **Department-Aware Recommendations**: Events suggested based on student's department
- **Interest-Based Filtering**: AI chatbot learns student preferences
- **Real-time Updates**: Instant notifications for event changes

## API Documentation
- Backend API: http://localhost:5000/api/docs
- AI Chatbot Service: http://localhost:8000/docs

## Contributing
1. Fork the repository
2. Create a feature branch from `develop`
3. Make your changes
4. Test with university database integration
5. Submit a pull request

## License
MIT License - see LICENSE file for details
