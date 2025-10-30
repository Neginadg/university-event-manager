# University Event Management System - Setup Guide

## Prerequisites

Before setting up the development environment, ensure you have:

- **Node.js 18+** (for frontend and backend)
- **Python 3.9+** (for AI service)
- **Docker & Docker Compose** (for containerization)
- **Git** (for version control)
- **University System Access**:
  - LDAP/SSO credentials for testing
  - Database connection details
  - VPN access if required

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/your-university/event-manager.git
cd event-manager
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your university-specific settings
# Required configurations:
# - University database connection
# - LDAP/SSO settings
# - API keys and secrets
```

### 3. Docker Setup (Recommended)
```bash
# Start all services
docker-compose up -d

# Services will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# AI Service: http://localhost:8000
```

### 4. Manual Setup (Alternative)
```bash
# Install dependencies for all services
npm run install:all

# Start development servers
npm run dev
```

## Team-Specific Setup

### Frontend Team
```bash
cd frontend
npm install
npm run dev
```

**Development Focus:**
- Student dashboard (`/src/pages/student/`)
- Instructor dashboard (`/src/pages/instructor/`)
- Chatbot interface (`/src/components/chatbot/`)
- Shared components (`/src/components/ui/`)

### Backend Team
```bash
cd backend
npm install

# Set up database
npm run db:migrate
npm run db:seed

npm run dev
```

**Development Focus:**
- University authentication (`/src/auth/`)
- Event management APIs (`/src/routes/events/`)
- Database integration (`/src/database/`)
- Real-time features (`/src/websocket/`)

### AI Developer
```bash
cd ai-service
pip install -r requirements.txt

# Start the service
python main.py
```

**Development Focus:**
- Chatbot engine (`/app/chatbot/`)
- Recommendation system (`/app/recommendations/`)
- NLP processing (`/app/nlp/`)
- Model training (`/app/models/`)

## University Integration

### Database Connection
Configure connection to existing university database:

```env
# University Database
UNIVERSITY_DB_HOST=your-db-host
UNIVERSITY_DB_PORT=5432
UNIVERSITY_DB_NAME=university_db
UNIVERSITY_DB_USER=readonly_user
UNIVERSITY_DB_PASSWORD=secure_password
```

### LDAP/SSO Authentication
```env
# LDAP Configuration
LDAP_URL=ldap://your-university-ldap.edu
LDAP_BASE_DN=dc=university,dc=edu
LDAP_ADMIN_DN=cn=admin,dc=university,dc=edu
LDAP_ADMIN_PASSWORD=admin_password

# SSO Configuration (if using SAML/OAuth)
SSO_PROVIDER_URL=https://sso.university.edu
SSO_CLIENT_ID=your_client_id
SSO_CLIENT_SECRET=your_client_secret
```

## Testing

### Run All Tests
```bash
npm run test
```

### Component Testing
```bash
# Frontend tests
cd frontend && npm run test

# Backend tests  
cd backend && npm run test

# AI service tests
cd ai-service && pytest
```

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/frontend-student-dashboard

# Make changes and test
npm run dev
npm run test

# Commit and push
git add .
git commit -m "Add student dashboard"
git push origin feature/frontend-student-dashboard
```

### 2. Pull Requests
- Create PR from feature branch to `develop`
- Tag relevant team members for review
- Ensure all tests pass
- Update documentation if needed

### 3. Code Quality
```bash
# Lint and format
npm run lint
npm run format

# Type checking
npm run type-check
```

## Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill processes on specific ports
npx kill-port 3000 5000 8000
```

**Database Connection Issues:**
- Verify university VPN connection
- Check database credentials
- Ensure firewall allows connections

**LDAP Authentication Problems:**
- Test LDAP connection with university IT
- Verify user permissions
- Check LDAP configuration

**Docker Issues:**
```bash
# Reset Docker containers
docker-compose down -v
docker-compose up --build
```

## Production Deployment

### Environment Variables
Update `.env` for production:
```env
NODE_ENV=production
DATABASE_SSL=true
CORS_ORIGIN=https://events.university.edu
```

### Build for Production
```bash
# Build all services
npm run build

# Deploy to university servers
# (Follow your university's deployment procedures)
```

## Getting Help

1. **Documentation**: Check `/docs` folder
2. **GitHub Issues**: Report bugs and ask questions
3. **Team Chat**: Contact your team members
4. **University IT**: For system integration issues

## Security Notes

- Never commit sensitive credentials
- Use university-approved security practices
- Follow data privacy regulations
- Keep dependencies updated
- Use HTTPS in production
