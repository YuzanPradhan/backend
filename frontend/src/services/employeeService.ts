import axios from "../config/axios";

export interface Department {
  id: number;
  name: string;
  department_id: number;
  department_name: string;
}

export interface Position {
  id: number;
  title: string;
  position_id: number;
  position_name: string;
}

export interface Role {
  id: number;
  name: string;
  role_id: number;
  role_name: string;
}

export interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  department_id: number;
  position_id: number;
  role_id: number;
  department: Department;
  position: Position;
  role: Role;
  created_at?: string;
  updated_at?: string;
}

export interface CreateEmployeeDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  department_id: number;
  position_id: number;
  role_id: number;
}

export type UpdateEmployeeDto = Partial<Omit<CreateEmployeeDto, "password">>

class EmployeeService {
  private baseUrl = '/employees';

  async getAllEmployees(): Promise<Employee[]> {
    const response = await axios.get<Employee[]>(this.baseUrl);
    console.log('Employee Service Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  }

  async getEmployee(id: number): Promise<Employee> {
    const response = await axios.get<Employee>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createEmployee(data: CreateEmployeeDto): Promise<Employee> {
    const response = await axios.post<Employee>(this.baseUrl, data);
    return response.data;
  }

  async updateEmployee(id: number, data: UpdateEmployeeDto): Promise<Employee> {
    const response = await axios.patch<Employee>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async deleteEmployee(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }
}

export default new EmployeeService();
