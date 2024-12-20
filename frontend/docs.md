# Performance Review System Frontend Documentation

## Overview

The Performance Review System frontend is built using React with TypeScript, providing a modern and type-safe user interface for managing employee performance reviews.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **State Management**: React Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Type Checking**: TypeScript
- **Build Tool**: Vite

## Project Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
├── config/          # Configuration files
├── hooks/           # Custom React hooks
├── layouts/         # Page layout components
├── pages/           # Page components
├── services/        # API service functions
├── stores/          # Global state management
├── styles/          # Global styles and theme
└── types/           # TypeScript type definitions
```

## Core Components

### Authentication

#### AuthContext (`stores/AuthContext.tsx`)

Manages global authentication state and provides auth-related functions.

```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

**Usage Example:**

```typescript
import { useAuth } from "@/stores/AuthContext";

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
}
```

### Layouts

#### DashboardLayout (`layouts/DashboardLayout.tsx`)

Main layout component for authenticated pages.

**Features:**

- Responsive sidebar navigation
- Header with user profile
- Content area with proper padding
- Loading states

**Props Interface:**

```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  loading?: boolean;
}
```

### Common Components

#### Button (`components/Button.tsx`)

Reusable button component with different variants.

**Props:**

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

**Usage:**

```typescript
<Button
  variant="primary"
  size="md"
  loading={isSubmitting}
  onClick={handleSubmit}
>
  Submit
</Button>
```


## Pages

### Dashboard (`pages/Dashboard/Dashboard.tsx`)

Main dashboard page showing overview of reviews and activities.

**Features:**

- Review cycle progress
- Recent activities
- Pending reviews
- Performance metrics

### Employees (`pages/Employees/Employees.tsx`)

Employee management page.

**Features:**

- List all employees
- Add new employee
- Edit employee details
- View employee performance history

**State Interface:**

```typescript
interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}
```

### Reviews (`pages/Reviews/Reviews.tsx`)

Review management page.

**Features:**

- View all reviews
- Create new review
- Submit review feedback
- Track review status

## API Integration

### Axios Configuration (`config/axios.ts`)

Configures Axios instance with interceptors for authentication and error handling.

```typescript
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Services

#### AuthService (`services/auth.service.ts`)

Handles authentication-related API calls.

```typescript
interface AuthService {
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User>;
}
```

#### EmployeeService (`services/employee.service.ts`)

Manages employee-related API calls.

```typescript
interface EmployeeService {
  getEmployees: (
    params: GetEmployeesParams
  ) => Promise<PaginatedResponse<Employee>>;
  createEmployee: (data: CreateEmployeeDto) => Promise<Employee>;
  updateEmployee: (id: number, data: UpdateEmployeeDto) => Promise<Employee>;
  deleteEmployee: (id: number) => Promise<void>;
}
```

## Custom Hooks

### useDebounce

```typescript
function useDebounce<T>(value: T, delay: number): T;
```

Debounces a value with specified delay.

### usePagination

```typescript
function usePagination<T>(
  items: T[],
  itemsPerPage: number
): {
  currentPage: number;
  totalPages: number;
  currentItems: T[];
  setPage: (page: number) => void;
};
```

Handles pagination logic for lists.

## Type Definitions

### User

```typescript
interface User {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: {
    role_name: string;
  };
  department: {
    department_id: number;
    department_name: string;
  };
  position: {
    position_id: number;
    position_name: string;
  };
}
```

### Review

```typescript
interface Review {
  review_id: number;
  reviewer: User;
  reviewee: User;
  review_cycle: ReviewCycle;
  status: "pending" | "submitted";
  ratings: Rating[];
  overall_comment: string;
  submitted_at: string;
}
```

## State Management

The application uses React Context API for global state management. Key contexts include:

- `AuthContext`: Authentication state
- `ThemeContext`: Theme preferences
- `NotificationContext`: Global notifications

## Routing

Routes are defined in `App.tsx` using React Router v6.

```typescript
const routes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/employees", element: <Employees /> },
      { path: "/reviews", element: <Reviews /> },
      { path: "/review-cycles", element: <ReviewCycles /> },
    ],
  },
];
```

## Error Handling

### Global Error Boundary

```typescript
class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### API Error Handling

```typescript
try {
  const response = await api.get("/endpoint");
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      // Handle unauthorized
    } else if (error.response?.status === 404) {
      // Handle not found
    } else {
      // Handle other errors
    }
  }
}
```

## Environment Variables

Required environment variables in `.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Performance Review System
```

## Build and Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Best Practices

### Performance Optimization

1. Use React.memo for expensive components
2. Implement virtualization for long lists
3. Lazy load routes and components
4. Use proper key props in lists

### Code Organization

1. Follow feature-based folder structure
2. Keep components small and focused
3. Use TypeScript for better type safety
4. Follow ESLint and Prettier configurations

### State Management

1. Use local state for UI-only state
2. Use context for shared state
3. Implement proper loading and error states
4. Handle side effects in useEffect

### Security

1. Sanitize user input
2. Implement proper CORS settings
3. Use HTTPS in production
4. Never store sensitive data in localStorage

## Testing

### Unit Testing

Use Jest and React Testing Library for unit tests.

```typescript
describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

### Integration Testing

Use Cypress for integration tests.

```typescript
describe("Login Flow", () => {
  it("successfully logs in", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });
});
```

## Accessibility

1. Use semantic HTML elements
2. Implement proper ARIA attributes
3. Ensure keyboard navigation
4. Maintain proper color contrast
5. Provide alt text for images

## Browser Support

The application supports:

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Follow the established code style
2. Write meaningful commit messages
3. Include tests for new features
4. Update documentation as needed
5. Create detailed pull requests
