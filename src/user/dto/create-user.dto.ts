import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vázio' })
  @IsString({ message: 'O nome precisa ser uma string' })
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vázio' })
  @IsString({ message: 'A senha precisa ser uma string' })
  password: string;
}
