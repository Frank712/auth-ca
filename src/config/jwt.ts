import jwt from "jsonwebtoken";

export class JwtAdapter {
  static async generateToken(payload: Object, duration = "2h") {
    return new Promise((resolve) => {
      jwt.sign(payload, "SEED", { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        return resolve(token!);
      });
    });
  }

  static validateToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, "SEED", (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded);
      });
    });
  }
}
