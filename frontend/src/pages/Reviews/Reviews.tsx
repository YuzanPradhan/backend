import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Search, User, Users, UserPlus } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import './Reviews.css';
import '../../styles/table.css';

interface ReviewEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  reviewStatus: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
}

const mockReviewEmployees: ReviewEmployee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Engineering',
    role: 'Software Engineer',
    reviewStatus: 'pending',
    dueDate: '2024-02-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    department: 'Design',
    role: 'UI/UX Designer',
    reviewStatus: 'in_progress',
    dueDate: '2024-02-20',
  },
];

const mockCurrentUser = {
  id: '3',
  name: 'Alex Johnson',
  email: 'alex@fusemachines.com',
  department: 'Engineering',
  role: 'Senior Software Engineer',
  joinDate: '2022-06-15',
  reviewStatus: 'pending' as const,
  dueDate: '2024-02-25',
};

const mockManager = {
  id: '4',
  name: 'Sarah Williams',
  email: 'sarah@fusemachines.com',
  department: 'Engineering',
  role: 'Engineering Manager',
  reviewStatus: 'pending' as const,
  dueDate: '2024-02-28',
};

type TabType = 'self' | 'peer' | 'manager';

export const Reviews: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('self');
  const [employees] = useState<ReviewEmployee[]>(mockReviewEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const departments = Array.from(new Set(employees.map((emp) => emp.department)));

  const getStatusBadgeClass = (status: ReviewEmployee['reviewStatus']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus =
      statusFilter === 'all' || employee.reviewStatus === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getDaysRemaining = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const difference = date.getTime() - today.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };

  const renderSelfReview = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{mockCurrentUser.name}</h3>
          <p className="text-gray-600">{mockCurrentUser.email}</p>
          <div className="mt-2">
            <p className="text-gray-700">
              <span className="font-medium">Department:</span> {mockCurrentUser.department}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Role:</span> {mockCurrentUser.role}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Join Date:</span> {formatDate(mockCurrentUser.joinDate)}
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/reviews/self/${mockCurrentUser.id}`)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <ClipboardList className="h-4 w-4 mr-2" />
          Start Self Review
        </Button>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className={`status-badge ${getStatusBadgeClass(mockCurrentUser.reviewStatus)}`}>
            {mockCurrentUser.reviewStatus.replace('_', ' ')}
          </span>
          <span>Due: {formatDate(mockCurrentUser.dueDate)}</span>
          <span className={getDaysRemaining(mockCurrentUser.dueDate) <= 3 ? 'text-red-600' : 'text-gray-600'}>
            ({getDaysRemaining(mockCurrentUser.dueDate)} days remaining)
          </span>
        </div>
      </div>
    </div>
  );

  const renderPeerReview = () => (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search peers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input flex-1"
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="table-container">
          <div className="table-wrapper">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th scope="col" className="table-header-cell">Employee</th>
                  <th scope="col" className="table-header-cell">Department</th>
                  <th scope="col" className="table-header-cell">Role</th>
                  <th scope="col" className="table-header-cell">Status</th>
                  <th scope="col" className="table-header-cell">Due Date</th>
                  <th scope="col" className="table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {paginatedEmployees.map((employee) => (
                  <tr key={employee.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{employee.name}</span>
                        <span className="text-sm text-gray-500">{employee.email}</span>
                      </div>
                    </td>
                    <td className="table-cell">{employee.department}</td>
                    <td className="table-cell">{employee.role}</td>
                    <td className="table-cell">
                      <span className={`status-badge ${getStatusBadgeClass(employee.reviewStatus)}`}>
                        {employee.reviewStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col">
                        <span>{formatDate(employee.dueDate)}</span>
                        <span className={`text-sm ${
                          getDaysRemaining(employee.dueDate) <= 3 ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {getDaysRemaining(employee.dueDate)} days remaining
                        </span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <Button
                        onClick={() => navigate(`/reviews/peer/${employee.id}`)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                      >
                        <ClipboardList className="h-4 w-4 mr-1.5" />
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex justify-between w-full">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  const renderManagerReview = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{mockManager.name}</h3>
          <p className="text-gray-600">{mockManager.email}</p>
          <div className="mt-2">
            <p className="text-gray-700">
              <span className="font-medium">Department:</span> {mockManager.department}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Role:</span> {mockManager.role}
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/reviews/manager/${mockManager.id}`)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <ClipboardList className="h-4 w-4 mr-2" />
          Start Manager Review
        </Button>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className={`status-badge ${getStatusBadgeClass(mockManager.reviewStatus)}`}>
            {mockManager.reviewStatus.replace('_', ' ')}
          </span>
          <span>Due: {formatDate(mockManager.dueDate)}</span>
          <span className={getDaysRemaining(mockManager.dueDate) <= 3 ? 'text-red-600' : 'text-gray-600'}>
            ({getDaysRemaining(mockManager.dueDate)} days remaining)
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Fusemachines Review 2024</h1>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8" aria-label="Review Types">
          <button
            onClick={() => setActiveTab('self')}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm ${
              activeTab === 'self'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <User className="h-5 w-5" />
            Self Review
          </button>
          <button
            onClick={() => setActiveTab('peer')}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm ${
              activeTab === 'peer'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-5 w-5" />
            Peer Review
          </button>
          <button
            onClick={() => setActiveTab('manager')}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm ${
              activeTab === 'manager'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <UserPlus className="h-5 w-5" />
            Manager Review
          </button>
        </nav>
      </div>

      {activeTab === 'self' && renderSelfReview()}
      {activeTab === 'peer' && renderPeerReview()}
      {activeTab === 'manager' && renderManagerReview()}
    </div>
  );
};
