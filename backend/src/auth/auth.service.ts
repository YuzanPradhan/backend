import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async validateEmployee(email: string, password: string) {
    const employee = await this.employeesService.findByEmail(email);
    if (employee && employee.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...result } = employee;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const employee = await this.validateEmployee(
      loginDto.email,
      loginDto.password,
    );
    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: employee.email,
      sub: employee.employee_id,
      role: employee.role.role_name,
      id: employee.employee_id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
