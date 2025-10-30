# Contributing to University Event Management System

Thank you for your interest in contributing to our university event management platform! This guide will help you get started.

## Team Structure & Responsibilities

### Frontend Team (2 developers)
**Focus**: Student and instructor user interfaces
- Student dashboard for event browsing and registration
- Instructor dashboard for event management
- Chatbot integration UI
- University-themed responsive design
- Real-time notifications

**Technology Stack**:
- React 18 with TypeScript
- Tailwind CSS + shadcn/ui
- Redux Toolkit for state management
- Vite for build tooling

### Backend Team (2 developers) 
**Focus**: University system integration and APIs
- University database integration (student/instructor data)
- LDAP/SSO authentication
- Event CRUD operations
- Attendance management
- Analytics and reporting APIs

**Technology Stack**:
- Node.js with Express.js
- TypeScript
- University database integration
- JWT authentication
- WebSocket for real-time features

### AI Developer (1 developer)
**Focus**: Intelligent chatbot and recommendations
- Department-aware event recommendations
- Natural language processing for student queries
- Student interest profiling
- Personalized event suggestions
- Chat session management

**Technology Stack**:
- Python with FastAPI
- scikit-learn, pandas, numpy
- spaCy for NLP
- Redis for caching
- Custom recommendation algorithms

## Development Workflow

### Branch Strategy
- `main` - Production ready code
- `develop` - Integration branch for features
- `feature/[team]-[description]` - Feature branches

Examples:
- `feature/frontend-student-dashboard`
- `feature/backend-university-auth`
- `feature/ai-chatbot-engine`

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-university/event-manager.git
   cd event-manager
   ```

2. **Set up your development environment**
   ```bash
   # Install all dependencies
   npm run install:all
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with university database credentials
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

### Code Standards

- **TypeScript**: Use strict typing for frontend/backend
- **Python**: Follow PEP 8 for AI service
- **Testing**: Write tests for all new features
- **Documentation**: Update docs for API changes
- **Linting**: Use ESLint/Prettier for JS/TS, Black for Python

### Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes with appropriate tests
3. Update documentation if needed
4. Submit PR with detailed description
5. Tag relevant team members for review
6. Address review feedback
7. Squash commits before merging

### University Integration Guidelines

- **Authentication**: Always use university LDAP/SSO
- **Data Privacy**: Follow university data protection policies  
- **Database**: Use existing university student/instructor tables
- **Branding**: Maintain university visual identity
- **Accessibility**: Ensure WCAG compliance

### Testing

- **Frontend**: Component tests with React Testing Library
- **Backend**: API tests with Jest/Supertest
- **AI Service**: Unit tests with pytest
- **Integration**: End-to-end tests with university systems

### Communication

- Use GitHub Issues for bug reports and feature requests
- Tag appropriate team members in PRs
- Join team meetings for coordination
- Document architectural decisions

## Questions?

If you have questions about contributing, please:
1. Check existing documentation
2. Search GitHub issues
3. Ask in team discussions
4. Contact project maintainers
