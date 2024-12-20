export interface User {
  id: string;
  email: string;
  name: string;
  role: {
    role_name: string;
  };
  department: string;
  avatar?: string;
}

export interface Review {
  id: string;
  employeeId: string;
  reviewerId: string;
  cycleId: string;
  status: "pending" | "submitted" | "approved";
  ratings: {
    [key: string]: number;
  };
  comments: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewCycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed";
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  logo?: string;
}

export interface AuthContextType {
  user: User | null;
  logout: () => void;
  isAuthenticated: boolean;
}
