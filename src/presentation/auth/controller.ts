import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
    }
    return this.authRepository
      .register(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error));
  };

  loginUser = (req: Request, res: Response) => {
    res.json("Login user controller");
  };
}