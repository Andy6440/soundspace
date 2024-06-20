import jwt from 'jsonwebtoken';

class JWTClass {
  private static instance: JWTClass;
  private static pass: string;

  private constructor() {}

  static getInstance(): JWTClass {
    if (!JWTClass.instance) {
      JWTClass.instance = new JWTClass();
      this.pass = process.env.JWT_PASS || '';
    }
    return JWTClass.instance;
  }

  generateToken(payload: any, options?: jwt.SignOptions): string {
    return jwt.sign(payload, JWTClass.pass, options); // Accede a la variable estática usando JWTClass.pass
  }

  verifyToken(token: string): any {
    return jwt.verify(token, JWTClass.pass);
  }
}

export const jwtInstance = JWTClass.getInstance();
