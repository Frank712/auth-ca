import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { SignToken, UserToken } from "./register-user.use-case";

interface LoginUserUseCase {
  execute(loginUseDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUseDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUseDto);
    const token = await this.signToken({ id: user.id });

    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
