import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt";

export class AuthMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("Middleware Passed!");
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(400).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(400).json({ error: "Invalid Bearer token" });
    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });
      req.body.token = payload;
      next();
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
