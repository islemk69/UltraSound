import bcrypt from "bcryptjs"


class AuthService {
  static async verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default AuthService;