import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Search,
} from "lucide-react";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import employeeService, {
  Employee,
  Department,
  Position,
  Role,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from "../../services/employeeService";
import reviewCycleService, {
  ReviewCycle,
} from "../../services/reviewCycleService";
import { useAuth } from "../../stores/AuthContext";
import "./Employees.css";
import "../../styles/table.css";
import { format } from "date-fns";

interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  department_id: number;
  position_id: number;
  role_id: number;
}

interface ReviewCycleFormData {
  start_date: string;
  end_date: string;
  status: "draft" | "active" | "completed";
}

interface ReviewCycle {
  cycle_id: number;
  status: string;
  start_date: string;
  end_date: string;
}

export const Employees: React.FC = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewCycleModalOpen, setIsReviewCycleModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<EmployeeFormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    department_id: 0,
    position_id: 0,
    role_id: 0,
  });
  const [reviewCycleFormData, setReviewCycleFormData] =
    useState<ReviewCycleFormData>({
      start_date: "",
      end_date: "",
      status: "draft",
    });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: "asc" | "desc";
  } | null>(null);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [reviewCycles, setReviewCycles] = useState<ReviewCycle[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchEmployees();
    fetchReviewCycles();
    setIsAdmin(user?.role?.role_name === "Admin");
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getAllEmployees();

      // Extract unique departments, positions, and roles
      const uniqueDepartments = Array.from(
        new Map(
          data.map((emp) => [emp.department.department_id, emp.department])
        ).values()
      );
      const uniquePositions = Array.from(
        new Map(
          data.map((emp) => [emp.position.position_id, emp.position])
        ).values()
      );
      const uniqueRoles = Array.from(
        new Map(data.map((emp) => [emp.role.role_id, emp.role])).values()
      );

      setDepartments(uniqueDepartments);
      setPositions(uniquePositions);
      setRoles(uniqueRoles);
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch employees");
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewCycles = async () => {
    try {
      const data = await reviewCycleService.getAllReviewCycles();
      setReviewCycles(data);
    } catch (err) {
      console.error("Error fetching review cycles:", err);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      `${employee.first_name} ${employee.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.role_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" ||
      employee.department.department_name === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortConfig) return 0;

    let aValue: any;
    let bValue: any;

    // Handle nested objects
    if (sortConfig.key === "department") {
      aValue = a.department.department_name;
      bValue = b.department.department_name;
    } else if (sortConfig.key === "position") {
      aValue = a.position.position_name;
      bValue = b.position.position_name;
    } else if (sortConfig.key === "role") {
      aValue = a.role.role_name;
      bValue = b.role.role_name;
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof Employee) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        department_id: employee.department.department_id,
        position_id: employee.position.position_id,
        role_id: employee.role.role_id,
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        department_id: 0,
        position_id: 0,
        role_id: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.endsWith("_id") ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        const { password, ...updateData } = formData;
        await employeeService.updateEmployee(
          editingEmployee.employee_id,
          updateData
        );
      } else {
        await employeeService.createEmployee(formData);
      }
      fetchEmployees();
      handleCloseModal();
    } catch (err) {
      setError("Failed to save employee");
      console.error(err);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeService.deleteEmployee(id);
        fetchEmployees();
      } catch (err) {
        setError("Failed to delete employee");
        console.error(err);
      }
    }
  };

  const handleCreateReviewCycle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await reviewCycleService.createReviewCycle(reviewCycleFormData);
      setIsReviewCycleModalOpen(false);
      fetchReviewCycles();
      setReviewCycleFormData({
        start_date: "",
        end_date: "",
        status: "draft",
      });
    } catch (err) {
      console.error("Error creating review cycle:", err);
    }
  };

  const handleReviewCycleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setReviewCycleFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEditCycle = (cycle: ReviewCycle) => {
    console.log("Edit cycle:", cycle);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
          {isAdmin && (
            <div className="flex gap-4">
              <Button
                onClick={() => handleOpenModal()}
                className="whitespace-nowrap"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add Employee</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsReviewCycleModalOpen(true)}
                icon={<PlusIcon className="h-5 w-5" />}
              >
                Create Review Cycle
              </Button>
            </div>
          )}
        </div>

        <div className="review-cycles-section">
          <h2 className="section-title">Review Cycles</h2>
          <div className="review-cycles-list">
            {reviewCycles.map((cycle) => (
              <div key={cycle.cycle_id} className="cycle-card">
                <div className="cycle-header">
                  <h3 className="cycle-title">
                    Review Cycle #{cycle.cycle_id}
                  </h3>
                  <span
                    className={`cycle-status ${getStatusClass(cycle.status)}`}
                  >
                    {cycle.status}
                  </span>
                </div>
                <div className="cycle-info">
                  <div className="cycle-info-item">
                    <span className="cycle-info-label">Start Date</span>
                    <span className="cycle-info-value">
                      {format(new Date(cycle.start_date), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="cycle-info-item">
                    <span className="cycle-info-label">End Date</span>
                    <span className="cycle-info-value">
                      {format(new Date(cycle.end_date), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
                <div className="cycle-actions">
                  <Button
                    variant="secondary"
                    onClick={() => handleEditCycle(cycle)}
                    icon={<PencilIcon className="h-5 w-5" />}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:w-auto">
              <div className="relative">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="appearance-none block w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option
                      key={dept.department_id}
                      value={dept.department_name}
                    >
                      {dept.department_name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>{filteredEmployees.length} employees found</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="table-container">
            <div className="table-wrapper">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th
                      scope="col"
                      className="table-header-cell cursor-pointer"
                      onClick={() => handleSort("first_name")}
                    >
                      Name
                      {sortConfig?.key === "first_name" && (
                        <span className="sort-indicator">
                          {sortConfig.direction === "asc" ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </th>
                    <th
                      scope="col"
                      className="table-header-cell cursor-pointer"
                      onClick={() => handleSort("email")}
                    >
                      Email
                      {sortConfig?.key === "email" && (
                        <span className="sort-indicator">
                          {sortConfig.direction === "asc" ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </th>
                    <th
                      scope="col"
                      className="table-header-cell cursor-pointer"
                      onClick={() => handleSort("department")}
                    >
                      Department
                      {sortConfig?.key === "department" && (
                        <span className="sort-indicator">
                          {sortConfig.direction === "asc" ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </th>
                    <th
                      scope="col"
                      className="table-header-cell cursor-pointer"
                      onClick={() => handleSort("position")}
                    >
                      Position
                      {sortConfig?.key === "position" && (
                        <span className="sort-indicator">
                          {sortConfig.direction === "asc" ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </th>
                    <th
                      scope="col"
                      className="table-header-cell cursor-pointer"
                      onClick={() => handleSort("role")}
                    >
                      Role
                      {sortConfig?.key === "role" && (
                        <span className="sort-indicator">
                          {sortConfig.direction === "asc" ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </th>
                    {isAdmin && (
                      <th scope="col" className="table-header-cell">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="table-body">
                  {paginatedEmployees.map((employee) => (
                    <tr key={employee.employee_id} className="table-row">
                      <td className="table-cell font-medium text-gray-900">
                        {`${employee.first_name} ${employee.last_name}`}
                      </td>
                      <td className="table-cell">{employee.email}</td>
                      <td className="table-cell">
                        {employee.department.department_name}
                      </td>
                      <td className="table-cell">
                        {employee.position.position_name}
                      </td>
                      <td className="table-cell">{employee.role.role_name}</td>
                      {isAdmin && (
                        <td className="table-cell">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleOpenModal(employee)}
                              className="text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteEmployee(employee.employee_id)
                              }
                              className="text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">
                  {editingEmployee ? "Edit Employee" : "Add New Employee"}
                </h3>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                {!editingEmployee && (
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="department_id" className="form-label">
                    Department
                  </label>
                  <select
                    id="department_id"
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option
                        key={dept.department_id}
                        value={dept.department_id}
                      >
                        {dept.department_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="position_id" className="form-label">
                    Position
                  </label>
                  <select
                    id="position_id"
                    name="position_id"
                    value={formData.position_id}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Position</option>
                    {positions.map((pos) => (
                      <option key={pos.position_id} value={pos.position_id}>
                        {pos.position_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="role_id" className="form-label">
                    Role
                  </label>
                  <select
                    id="role_id"
                    name="role_id"
                    value={formData.role_id}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    {editingEmployee ? "Save Changes" : "Add Employee"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Review Cycle Modal */}
        <Modal
          isOpen={isReviewCycleModalOpen}
          onClose={() => setIsReviewCycleModalOpen(false)}
          title="Create Review Cycle"
        >
          <form
            onSubmit={handleCreateReviewCycle}
            className="review-cycle-form"
          >
            <div className="form-group">
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={reviewCycleFormData.start_date}
                onChange={handleReviewCycleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={reviewCycleFormData.end_date}
                onChange={handleReviewCycleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={reviewCycleFormData.status}
                onChange={handleReviewCycleInputChange}
                required
                className="form-input"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Create Review Cycle
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};
