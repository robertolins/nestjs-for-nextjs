import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vázio' })
  @IsString({ message: 'A senha precisa ser uma string' })
  password: string;
}
