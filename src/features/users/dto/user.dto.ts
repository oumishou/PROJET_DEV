import { Role } from '../../../core/enums/role.enum';
import { User } from '../entities/user.entity';

export class UserDto {
  id?: number;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  picture: string;
  isActive: boolean;
  /** User account verification status (ID, KYC, ...) */
  roles: Role[];

  get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  static fromUser(user: User): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.phone = user.phone;
    dto.firstname = user.firstname;
    dto.lastname = user.lastname;
    dto.isActive = user.isActive;
    dto.roles = user.roles;
    return dto;
  }
}
