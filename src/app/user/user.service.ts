import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryService } from './entities/user.repository.service';
import { JwtAuthService } from '@helpers/jwt.helpers.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const createUser = await this.userRepositoryService.create(createUserDto);
      const { accessToken, refreshToken } =
        await this.jwtAuthService.generateToken(createUser.userId);
      return {
        message: `User successfully created`,
        data: { ...createUser, accessToken, refreshToken },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
