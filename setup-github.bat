@echo off
REM GitHub Repository Setup Script for University Event Management System
REM Run this script to initialize your GitHub repository

echo 🎓 University Event Management System - GitHub Setup
echo ==================================================

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Please run this script from the EventManager root directory
    pause
    exit /b 1
)

if not exist "README.md" (
    echo ❌ Please run this script from the EventManager root directory  
    pause
    exit /b 1
)

echo.
echo 📋 Pre-setup Checklist:
echo 1. ✅ Create GitHub repository at: https://github.com/new
echo 2. ✅ Repository name: 'university-event-manager' 
echo 3. ✅ Set to Public or Private (per university policy)
echo 4. ✅ DO NOT initialize with README, .gitignore, or license
echo.

set /p confirm="Have you created the GitHub repository? (y/n): "
if /i not "%confirm%"=="y" (
    echo Please create the GitHub repository first, then run this script again.
    pause
    exit /b 1
)

echo.
set /p github_username="Enter your GitHub username: "
set /p repo_name="Enter your repository name (default: university-event-manager): "
if "%repo_name%"=="" set repo_name=university-event-manager

echo.
echo 🔧 Initializing Git repository...

REM Initialize git if not already initialized
if not exist ".git" (
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

echo.
echo 🌿 Setting up branch structure...
git checkout -b develop 2>nul || git checkout develop 2>nul
git checkout main 2>nul || git checkout -b main 2>nul

echo.
echo 📦 Adding project files...
git add .

echo.
echo 💾 Creating initial commit...
git commit -m "Initial setup: University Event Management System

- Frontend: React + TypeScript + Tailwind CSS
- Backend: Node.js + Express + University DB integration  
- AI Service: Python + FastAPI + Chatbot engine
- Team structure for 5 developers (2 Frontend, 2 Backend, 1 AI)
- University LDAP/SSO authentication
- Student event registration and instructor management
- AI-powered event recommendations and chatbot

Ready for team collaboration!"

echo.
echo 🔗 Adding remote repository...
git remote add origin "https://github.com/%github_username%/%repo_name%.git" 2>nul || (
    git remote set-url origin "https://github.com/%github_username%/%repo_name%.git"
    echo ✅ Remote origin updated
)

echo.
echo 🚀 Pushing to GitHub...
git branch -M main
git push -u origin main

REM Push develop branch
git checkout develop 2>nul || git checkout -b develop 2>nul
git push -u origin develop

echo.
echo 🎉 Repository successfully created!
echo.
echo 📋 Next Steps:
echo 1. Go to: https://github.com/%github_username%/%repo_name%
echo 2. Add team members as collaborators:
echo    Settings → Manage access → Invite a collaborator
echo.
echo 👥 Add these team members with Write access:
echo    • Frontend Developer 1: @username1
echo    • Frontend Developer 2: @username2
echo    • Backend Developer 1: @username3  
echo    • Backend Developer 2: @username4
echo    • AI Developer: @username5
echo.
echo 🔒 Set up branch protection:
echo    Settings → Branches → Add rule for 'main'
echo    ✅ Require pull request reviews before merging
echo    ✅ Require status checks to pass before merging
echo.
echo 📊 Create GitHub Project board:
echo    Projects → New project → Team backlog
echo.
echo 🎯 Repository URL: https://github.com/%github_username%/%repo_name%
echo.
echo ✨ Your team can now clone and start developing!
echo    git clone https://github.com/%github_username%/%repo_name%.git
echo.
pause
