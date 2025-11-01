# Admin Panel - React Version

A responsive admin dashboard built with React, originally converted from a vanilla HTML/CSS/JavaScript project.

## Features

- 🎨 Modern and responsive design
- 📱 Mobile-friendly layout
- 🎯 Interactive navigation sidebar
- 📊 Dashboard with statistics cards
- 📋 Recent orders table
- 👥 Recent customers list
- ⚡ Built with Vite for fast development

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
js/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Sidebar navigation
│   │   ├── Dashboard.jsx       # Main dashboard container
│   │   ├── Topbar.jsx          # Top navigation bar
│   │   ├── CardBox.jsx         # Statistics cards
│   │   ├── RecentOrders.jsx    # Orders table
│   │   └── RecentCustomers.jsx # Customers list
│   ├── App.jsx                 # Main App component
│   ├── main.jsx                # React entry point
│   └── style.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Ionicons** - Icon library (via CDN)

## Notes

- The project references image assets at `assets/imgs/` that may need to be added separately
- All styling is preserved from the original project
- All interactive features have been converted to React hooks and state management






