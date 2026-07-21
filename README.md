# Laundry Wash

<p align="center">
  <strong>A modern MERN Stack laundry management platform built with React, TypeScript, Node.js, Express, and MongoDB.</strong>
</p>

<p align="center">
  Streamline laundry bookings, pickup scheduling, order tracking, payments, and business management through a scalable, production-ready web application.
</p>

---

## Preview

> Screenshots and live demo will be added as development progresses.

| Customer | Admin |
|----------|-------|
| Coming Soon | Coming Soon |

---

## Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Architecture
- Design System
- Getting Started
- Environment Variables
- Available Scripts
- Coding Standards
- Git Workflow
- Deployment
- Roadmap
- Contributing
- License

---

# Overview

Laundry Wash is a full-stack laundry service management platform designed to simplify the entire laundry workflow for both customers and administrators.

The application enables customers to schedule pickups, place laundry orders, track order progress, manage payments, and view their service history, while providing administrators with a centralized dashboard for managing operations, customers, orders, and analytics.

The project follows modern software engineering principles with a focus on scalability, maintainability, accessibility, and clean architecture.

---

# Features

## Customer

- User Authentication
- Secure Login & Registration
- Laundry Booking
- Pickup Scheduling
- Delivery Scheduling
- Real-time Order Tracking
- Order History
- Payment Integration
- Profile Management

## Administrator

- Dashboard
- Customer Management
- Order Management
- Pickup Management
- Delivery Management
- Payment Management
- Analytics & Reporting
- Role-based Authorization

---

# Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- TanStack Query
- React Hook Form
- Yup
- Axios

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## Development

- ESLint
- Prettier
- Git
- GitHub
- VS Code

---

# Project Structure

```text
laundry-wash/
│
├── client/                 # Frontend Application
│
├── server/                 # Backend API
│
├── docs/                   # Project documentation
│
├── README.md
├── LICENSE
├── .gitignore
└── package.json
```

---

# Frontend Structure

```text
client/
│
├── public/
│
├── src/
│   │
│   ├── assets/             # Fonts, images, icons
│   ├── components/         # Shared reusable UI
│   ├── constants/          # Application constants
│   ├── features/           # Feature-based modules
│   ├── hooks/              # Custom hooks
│   ├── layouts/            # Application layouts
│   ├── pages/              # Route pages
│   ├── providers/          # React providers
│   ├── routes/             # Router configuration
│   ├── services/           # API communication
│   ├── store/              # Global state
│   ├── styles/             # Global styles & theme
│   ├── types/              # Shared types
│   ├── utils/              # Helper functions
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
└── vite.config.ts
```

---

# Backend Structure

```text
server/
│
├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   │
│   ├── app.ts
│   └── server.ts
```

---

# Architecture

The project follows a feature-based architecture on the frontend and a layered architecture on the backend.

```text
                React Application
                       │
                React Router
                       │
                   Pages
                       │
                  Features
                       │
        Components • Hooks • Services
                       │
                   Axios Client
                       │
                Express REST API
                       │
                  Controllers
                       │
                    Services
                       │
                   MongoDB
```

---

# Design System

The UI is built around a centralized design system.

## Typography

- Instrument Sans
- Red Hat Display
- Lato

## Color Groups

- Brand
- Text
- Surface
- Neutral
- Semantic
- Border

## Design Principles

- Consistent spacing
- Reusable components
- Accessibility
- Responsive design
- Design tokens
- Mobile-first approach

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/laundry-wash.git
```

```bash
cd laundry-wash
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Start Frontend

```bash
npm run dev
```

---

## Install Backend

```bash
cd ../server
npm install
```

---

## Start Backend

```bash
npm run dev
```

---

# Environment Variables

## Client

```env
VITE_API_BASE_URL=
```

## Server

```env
PORT=

MONGODB_URI=

JWT_SECRET=

CLIENT_URL=
```

---

# Available Scripts

## Frontend

```bash
npm run dev
```

Start development server.

```bash
npm run build
```

Generate production build.

```bash
npm run preview
```

Preview production build locally.

```bash
npm run lint
```

Run ESLint.

---

# Coding Standards

## Components

- Functional Components
- Arrow Functions
- TypeScript
- Single Responsibility Principle

## Naming Convention

### Components

```text
PascalCase
```

Example

```text
LoginForm.tsx
DashboardLayout.tsx
```

---

### Hooks

```text
camelCase
```

Example

```text
useAuth.ts
useDebounce.ts
```

---

### Variables

```text
camelCase
```

---

### Constants

```text
UPPER_SNAKE_CASE
```

---

### Interfaces

```text
<ComponentName>Props
```

Example

```ts
ButtonProps

LoginFormProps
```

---

### Files

Components

```text
PascalCase.tsx
```

Utilities

```text
camelCase.ts
```

---

# Git Workflow

## Branches

```text
main
develop
feature/*
bugfix/*
hotfix/*
```

## Commit Convention

```text
feat:
fix:
refactor:
style:
docs:
test:
chore:
```

Examples

```text
feat(auth): implement login page

fix(order): validate booking form

refactor(ui): simplify sidebar component
```

---

# Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# Roadmap

- Customer Authentication
- Order Booking
- Payment Integration
- Notifications
- Admin Dashboard
- Order Tracking
- Analytics
- AI-powered Customer Support
- Progressive Web App (PWA)
- Mobile Application


---

# Author

**Eguono Imonieroh**

Frontend & Full Stack Engineer

Head of Product @ Tech Studio Academy

---

<p align="center">
Built with ❤️ using the MERN Stack.
</p>