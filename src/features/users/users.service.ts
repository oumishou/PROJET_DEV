import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
    private dataSource: DataSource,
  ) {}

  persist(user: User) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phone } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async findOneByResetToken(token: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { token: token } });
  }

  async remove(id: number, user: UserDto) {
    if (id !== user.id) {
      throw new ForbiddenException('You cannot delete another user account');
    }
    const userToDelete = await this.userRepository.findOne({ where: { id } });
    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const deletionSuffix = '-deleted-' + Math.floor(Math.random() * 1000);
    await this.userRepository.update(id, {
      email: userToDelete.email + deletionSuffix,
      phone: userToDelete.phone + deletionSuffix,
    });
    return this.userRepository.softDelete(id);
  }
}
