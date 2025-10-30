# Dashboard Application

A modern, responsive dashboard application built with React, TypeScript, and Tailwind CSS. Features a clean interface with a fixed sidebar navigation, sticky header, and smooth scrolling content area.

## Features

- **Responsive Design**: Fully responsive layout that adapts seamlessly from mobile to desktop screens
- **Fixed Sidebar Navigation**: Full-height sidebar that remains fixed while content scrolls
- **Sticky Header**: Top navigation bar stays visible during scrolling
- **Mobile-First**: Collapsible sidebar with smooth slide-in animation on mobile devices
- **Modern UI**: Clean, professional design with emerald accent colors
- **Multiple Pages**: Dashboard, Edit Profile, and Orders pages with easy navigation

## Tech Stack

- **React 18.3.1**: Modern React with hooks for state management
- **TypeScript**: Type-safe development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful, consistent icon library
- **Supabase**: Backend services and database (pre-configured)

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Sticky top navigation with search and notifications
│   └── Sidebar.jsx         # Fixed sidebar navigation with mobile support
├── pages/
│   ├── Dashboard.jsx       # Main dashboard view
│   ├── EditProfile.jsx     # User profile editing
│   └── Orders.jsx          # Orders management
├── App.tsx                 # Main application layout and routing
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` if needed
   - Supabase credentials are pre-configured

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Responsive Breakpoints

- **Mobile**: < 768px - Hamburger menu, simplified header
- **Tablet**: 768px - 1024px - Partial header icons, collapsible sidebar
- **Desktop**: ≥ 1024px - Full sidebar visible, all features shown

## Layout Behavior

### Desktop (≥ 1024px)
- Sidebar: Fixed, always visible on the left
- Header: Sticky at the top with full feature set
- Content: Scrollable main area

### Mobile (< 1024px)
- Sidebar: Slide-in menu with overlay backdrop
- Header: Sticky with hamburger menu button
- Content: Full-width scrollable area

## Customization

### Colors

The application uses an emerald color scheme. To customize:
- Primary color: `emerald-500` (#10b981)
- Hover states: `emerald-600`
- Light backgrounds: `emerald-50`

Update these classes in the component files to change the color scheme.

### Navigation Items

Edit `src/components/Sidebar.jsx` to add or modify navigation items:
```javascript
const menuItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  // Add more items here
];
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the repository.
