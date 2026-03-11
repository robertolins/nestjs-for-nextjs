import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from 'src/common/hashing/hashing.service';
import { JwtPayload } from './types/jwt-payload.type';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) throw new UnauthorizedException('Usuário ou senha inválidos');

    await this.validatePassword(loginDto.password, user.password);

    const accessToken = await this.generateAccessToken(user);

    await this.userService.save({
      ...user,
      forceLogout: false,
    });

    return {
      accessToken,
    };
  }

  // private

  private validatePassword = async (
    password: string,
    hashedPassword: string,
  ) => {
    const isPasswordValid = await this.hashingService.compare(
      password,
      hashedPassword,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Usuário ou senha inválidos');
  };

  private generateAccessToken = (user: User) => {
    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    return this.jwtService.signAsync(jwtPayload);
  };
}
