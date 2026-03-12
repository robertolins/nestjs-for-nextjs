import { InternalServerErrorException, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';
import { StringValue } from 'ms';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    CommonModule,
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRATION as StringValue;

        if (!secret) {
          throw new InternalServerErrorException('JWT_SECRET ausente');
        }

        return {
          secret,
          signOptions: {
            expiresIn: expiresIn || '1d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
