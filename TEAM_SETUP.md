# Team Collaboration Guide

## GitHub Repository Setup for 5-Member Team

### Initial Repository Setup

1. **Create Repository Owner** (Project Lead):
   - Go to GitHub.com and create a new repository
   - Repository name: `university-event-manager`
   - Description: `University Event Management System for seamless event creation and student participation`
   - Set to **Public** or **Private** (depending on university policy)
   - Initialize with README: **No** (we have our own)

2. **Upload Initial Code**:
   ```bash
   cd EventManager
   git init
   git add .
   git commit -m "Initial project setup with team structure"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/university-event-manager.git
   git push -u origin main
   ```

### Team Member Access Setup

#### Add Collaborators
1. Go to repository **Settings** → **Manage access**
2. Click **Invite a collaborator**
3. Add each team member with appropriate permissions:

**Frontend Team (2 members):**
- GitHub usernames: `@frontend-dev-1` `@frontend-dev-2`
- Permission: **Write** access
- Primary focus: `/frontend` directory

**Backend Team (2 members):**
- GitHub usernames: `@backend-dev-1` `@backend-dev-2`  
- Permission: **Write** access
- Primary focus: `/backend` directory

**AI Developer (1 member):**
- GitHub username: `@ai-developer`
- Permission: **Write** access
- Primary focus: `/ai-service` directory

#### Repository Settings

1. **Branch Protection Rules**:
   - Go to **Settings** → **Branches**
   - Add rule for `main` branch:
     - ✅ Require pull request reviews before merging
     - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - ✅ Include administrators

2. **Required Status Checks**:
   - Frontend CI
   - Backend CI  
   - AI Service CI
   - Security Scan

### Team Workflow

#### Branch Strategy
```
main (protected)
  ├── develop (integration branch)
      ├── feature/frontend-student-dashboard
      ├── feature/frontend-instructor-panel
      ├── feature/backend-university-auth
      ├── feature/backend-event-api
      ├── feature/ai-chatbot-engine
      └── feature/ai-recommendations
```

#### Daily Workflow for Team Members

**1. Start Working on a Feature**
```bash
# Clone repository (first time only)
git clone https://github.com/YOUR_USERNAME/university-event-manager.git
cd university-event-manager

# Create and switch to feature branch
git checkout develop
git pull origin develop
git checkout -b feature/frontend-student-dashboard

# Start development
npm run dev
```

**2. Make Changes and Commit**
```bash
# Make your changes...
# Test your changes
npm run test
npm run lint

# Commit changes
git add .
git commit -m "Add student event browsing interface"
git push origin feature/frontend-student-dashboard
```

**3. Create Pull Request**
- Go to GitHub repository
- Click **New Pull Request**
- Base: `develop` ← Compare: `feature/frontend-student-dashboard`
- Add description using the PR template
- Tag relevant team members for review
- Wait for CI checks to pass
- Address review feedback
- Merge when approved

#### Team Communication

**GitHub Issues for Task Management**
```
Frontend Team Issues:
- [ ] Create student dashboard layout
- [ ] Implement event browsing interface  
- [ ] Add chatbot UI component
- [ ] Design instructor event management panel

Backend Team Issues:
- [ ] Set up university database connection
- [ ] Implement LDAP/SSO authentication
- [ ] Create event CRUD APIs
- [ ] Add student attendance tracking

AI Team Issues:
- [ ] Develop chatbot conversation engine
- [ ] Build recommendation algorithm
- [ ] Implement department-based filtering
- [ ] Create NLP for event categorization
```

**Pull Request Reviews**
- Each PR needs **2 approvals** minimum
- Cross-team reviews encouraged
- Focus areas:
  - Code quality and standards
  - Testing coverage
  - Documentation updates
  - University integration compatibility

### Repository Structure Ownership

```
📁 .github/                    # Shared (All teams)
📁 frontend/                   # Frontend Team ownership
   ├── src/components/         # Shared components
   ├── src/pages/student/      # Frontend Team
   ├── src/pages/instructor/   # Frontend Team
   └── src/components/chatbot/ # Frontend + AI collaboration
📁 backend/                    # Backend Team ownership  
   ├── src/auth/              # University integration
   ├── src/routes/events/     # Event management
   └── src/database/          # University DB connection
📁 ai-service/                 # AI Developer ownership
   ├── app/chatbot/           # Chatbot engine
   ├── app/recommendations/   # Recommendation system
   └── app/nlp/              # Natural language processing
📁 shared/                     # All teams (shared types)
📁 docs/                       # All teams (documentation)
```

### Development Environment Setup

**Each team member should:**

1. **Clone and Setup**
   ```bash
   git clone https://github.com/YOUR_USERNAME/university-event-manager.git
   cd university-event-manager
   cp .env.example .env
   # Edit .env with university credentials
   ```

2. **Install Dependencies**
   ```bash
   npm run install:all
   ```

3. **Start Development**
   ```bash
   npm run dev
   # Frontend: http://localhost:3000
   # Backend: http://localhost:5000  
   # AI Service: http://localhost:8000
   ```

### Project Management

**GitHub Projects Board**
Create a project board with columns:
- **Backlog** - Features to be implemented
- **In Progress** - Currently being worked on
- **Review** - Pull requests under review
- **Testing** - Ready for integration testing
- **Done** - Completed features

**Milestones**
- **Phase 1**: Basic authentication and event display
- **Phase 2**: Event creation and student registration
- **Phase 3**: AI chatbot integration
- **Phase 4**: Analytics and advanced features

This setup ensures all five team members can collaborate effectively while maintaining code quality and university integration requirements!
