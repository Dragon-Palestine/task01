# Employee Management System

A modern, high-performance React application for managing employee information with advanced features including search, filtering, pagination, dark mode, and CRUD operations.

## 🚀 Features

### Core Functionality

- **Employee Display**: View all employees in a clean, organized grid layout
- **Generated Data**: 1000+ automatically generated employees with realistic Arabic names
- **Employee Count**: Display total number of employees on the main page
- **Dark Mode**: Toggle between light and dark themes with persistent preference

### CRUD Operations

- **Add Employees**: Add new employees with name, email, department, and role
- **Edit Employees**: Modal-based editing for existing employee information
- **Delete Employees**: Remove employees with confirmation dialog
- **Bulk Operations**: Delete all employees at once

### Advanced Features

- **Smart Search**: Debounced search (1 second delay) by name or email with visual feedback
- **Department Filtering**: Filter employees by department
- **Pagination**: Navigate through large employee lists efficiently (5 per page)
- **Form Validation**: Real-time validation with debouncing and visual feedback
- **Modal System**: Modern modal with animations and accessibility

### Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders of components
- **useCallback**: Memoized event handlers to prevent child re-renders
- **useMemo**: Optimized calculations for filtered data and pagination
- **Lazy Loading**: Code splitting for faster initial load
- **Debounced Search**: Reduces API calls and improves performance

### User Experience

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Skeleton loaders and spinners for better UX
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Error Handling**: Comprehensive validation and error messages

## 🛠️ Technologies Used

- **React 19**: Latest React with hooks, concurrent features, and performance optimizations
- **Vite**: Fast build tool and development server with HMR
- **CSS3**: Modern styling with CSS variables for theming and animations
- **Redux Toolkit**: Advanced state management for employees and UI state
- **Custom Hooks**: Reusable logic for filtering, pagination, and form handling
- **Local Storage**: Persistent theme and filter preferences
- **TypeScript Types**: Type definitions for better code maintainability

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── EmployeeCard.jsx
│   ├── EmployeeForm.jsx
│   ├── FilterBar.jsx
│   ├── Modal.jsx
│   ├── Pagination.jsx
│   └── SkeletonLoader.jsx
├── features/           # Redux Slices
│   ├── employees/
│   └── ui/
├── hooks/              # Custom React hooks
│   ├── useUrlSync.js
│   ├── useEmployeeFilters.js
│   └── usePagination.js
├── pages/              # Page components
│   └── HomePage.jsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── constants/          # Application constants
│   └── index.js
├── utils/              # Utility functions
│   ├── api.js
│   ├── employeeData.js
│   └── helpers.js
└── App.jsx            # Main application component
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd task01
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5174](http://localhost:5174) in your browser.

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Data Generation

The application includes a comprehensive data generation utility that creates 1000 employees with:

- **Arabic Names**: Realistic first and last names from Arabic-speaking regions
- **Email Addresses**: Auto-generated emails based on names with various domains
- **Departments**: 10 different departments (IT, HR, Sales, Design, Marketing, Finance, Operations, Legal, Research, Quality)
- **Roles**: Department-specific job titles and positions

## Features Overview

### Employee Count Display

- Shows total number of employees in the system
- Updates dynamically when employees are added or deleted

### Dark Mode

- Toggle button with moon/sun icons
- Smooth transitions between themes
- Preference saved in localStorage
- Affects all UI elements including cards, forms, and backgrounds

### Search & Filter

- Real-time search by employee name or email
- Department-based filtering dropdown
- Combined search and filter functionality

### CRUD Operations

- **Create**: Add new employees with form validation
- **Read**: View employee details in organized cards
- **Update**: Inline editing with save/cancel options
- **Delete**: Confirmation dialog before deletion

## Project Structure

```
src/
├── components/
│   ├── EmployeeCard.jsx      # Individual employee display with edit/delete
│   ├── FilterBar.jsx         # Search and filter controls
│   ├── Pagination.jsx        # Page navigation component
│   └── SkeletonLoader.jsx    # Loading state component
├── context/
│   ├── actions.js            # Action type constants
│   ├── EmployeeContext.jsx   # Context provider for state management
│   ├── employeeReducer.js    # State reducer for employee operations
│   └── ThemeContext.jsx      # Context provider for theme management
├── hooks/
│   ├── useEmployeeFilters.js # Custom hook for search and filtering
│   └── usePagination.js      # Custom hook for pagination logic
├── pages/
│   └── HomePage.jsx          # Main page component
├── utils/
│   ├── api.js                # API utilities (placeholder)
│   └── employeeData.js       # Employee data generation utility
├── App.jsx                   # Root component
├── index.css                 # Global styles with theme variables
└── index.js                  # Application entry point
```

## Usage

1. **View Employees**: The main page displays all employees in cards with total count
2. **Toggle Theme**: Click the moon/sun button to switch between light and dark modes
3. **Add Employee**: Click "Add Employee" button to open the form
4. **Search/Filter**: Use the search bar and department filter at the top
5. **Edit/Delete**: Each employee card has edit and delete buttons
6. **Navigate**: Use pagination controls at the bottom

## Performance Optimizations

- **Memoization**: Uses `useMemo` for expensive computations
- **Efficient Filtering**: Filters are applied only when necessary
- **Pagination**: Limits rendered items for better performance
- **Skeleton Loading**: Provides immediate feedback during operations
- **Minimal Re-renders**: Optimized component structure
- **CSS Variables**: Efficient theme switching without re-renders

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
