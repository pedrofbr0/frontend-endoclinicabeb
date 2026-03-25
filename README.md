
# EndoClinicaBeB Frontend

A modern frontend application for EndoClinicaBeB, built with web technologies for managing clinic operations and patient care.

## Overview

This repository contains the frontend client for the EndoClinicaBeB system, providing a user interface for clinic management and patient interactions.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Git

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend-endoclinicabeb
```

1. Install dependencies:

```bash
npm install
```

## Setup

1. Create a `.env` file in the root directory with required environment variables:

```env
VITE_API_URL=http://localhost:3000
```

1. Configure any additional settings in the project configuration files.

## Running the Application

### Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```bash
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── services/       # API services
├── styles/         # Global styles
└── main.js         # Application entry point
```

## Contributing

Follow the project's coding standards and submit pull requests for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
