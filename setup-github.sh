#!/bin/bash

# GitHub Repository Setup Script for University Event Management System
# Run this script to initialize your GitHub repository

echo "🎓 University Event Management System - GitHub Setup"
echo "=================================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "README.md" ]; then
    echo "❌ Please run this script from the EventManager root directory"
    exit 1
fi

echo ""
echo "📋 Pre-setup Checklist:"
echo "1. ✅ Create GitHub repository at: https://github.com/new"
echo "2. ✅ Repository name: 'university-event-manager'"
echo "3. ✅ Set to Public or Private (per university policy)"
echo "4. ✅ DO NOT initialize with README, .gitignore, or license"
echo ""

read -p "Have you created the GitHub repository? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please create the GitHub repository first, then run this script again."
    exit 1
fi

echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter your repository name (default: university-event-manager): " REPO_NAME
REPO_NAME=${REPO_NAME:-university-event-manager}

echo ""
echo "🔧 Initializing Git repository..."

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Create develop branch
echo ""
echo "🌿 Setting up branch structure..."
git checkout -b develop 2>/dev/null || git checkout develop
git checkout main 2>/dev/null || git checkout -b main

# Add all files
echo ""
echo "📦 Adding project files..."
git add .

# Create initial commit
echo ""
echo "💾 Creating initial commit..."
git commit -m "Initial setup: University Event Management System

- Frontend: React + TypeScript + Tailwind CSS
- Backend: Node.js + Express + University DB integration  
- AI Service: Python + FastAPI + Chatbot engine
- Team structure for 5 developers (2 Frontend, 2 Backend, 1 AI)
- University LDAP/SSO authentication
- Student event registration and instructor management
- AI-powered event recommendations and chatbot

Ready for team collaboration!"

# Add remote origin
echo ""
echo "🔗 Adding remote repository..."
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git" 2>/dev/null || {
    git remote set-url origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    echo "✅ Remote origin updated"
}

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

# Push develop branch
git checkout develop 2>/dev/null || git checkout -b develop
git push -u origin develop

echo ""
echo "🎉 Repository successfully created!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "2. Add team members as collaborators:"
echo "   Settings → Manage access → Invite a collaborator"
echo ""
echo "👥 Add these team members with Write access:"
echo "   • Frontend Developer 1: @username1"
echo "   • Frontend Developer 2: @username2" 
echo "   • Backend Developer 1: @username3"
echo "   • Backend Developer 2: @username4"
echo "   • AI Developer: @username5"
echo ""
echo "🔒 Set up branch protection:"
echo "   Settings → Branches → Add rule for 'main'"
echo "   ✅ Require pull request reviews before merging"
echo "   ✅ Require status checks to pass before merging"
echo ""
echo "📊 Create GitHub Project board:"
echo "   Projects → New project → Team backlog"
echo ""
echo "🎯 Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
echo "✨ Your team can now clone and start developing!"
echo "   git clone https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
