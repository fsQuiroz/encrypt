# Encrypt-RJS

A secure text encryption and sharing web application built with React, TypeScript, and Vite. Encrypt sensitive text with a password and share it safely through generated links.

## Features

- **Client-side Encryption**: AES encryption with SHA256 key derivation using crypto-js
- **Secure Sharing**: Generate shareable links with encrypted content
- **Password Protection**: Decrypt content only with the correct password
- **Modern UI**: Material-UI dark theme with responsive design
- **Type Safety**: Full TypeScript implementation with strict type checking

## Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Development

### Prerequisites
- Node.js 18+
- Yarn package manager

### Scripts
- `yarn dev` - Start development server with hot reload
- `yarn build` - TypeScript compilation + production build
- `yarn lint` - Run ESLint with strict rules
- `yarn preview` - Preview production build

### Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **UI**: Material-UI (MUI) with Emotion styling
- **Forms**: Formik with Yup validation
- **Encryption**: crypto-js (AES-256)
- **Routing**: React Router DOM

## Security

- All encryption/decryption happens client-side
- Passwords never leave the browser
- Uses industry-standard AES encryption with random initialization vectors
- No server-side storage of sensitive data

## Deployment

The project includes an automated deployment script (`deploy.sh`) that:
- Validates clean git state on main branch
- Runs linting and builds
- Creates deployment package
- Deploys to production server
- Tags releases in git
