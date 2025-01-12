import bcrypt from 'bcryptjs'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'

class UserService {
  static async createUser(username: String, email: String, password: String) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(password), salt);
    return User.create({username, email, password: hashedPassword});
  }

  static async findUserbyEmail(email: String) {
    return User.findOne({where: {email}, raw: true});
  }

  static async findUserbyUsername(username: String) {
    return User.findOne({where: {username}, raw: true});
  }
  
  static async findUserByIdentifier(identifier: string, type: 'email' | 'username') {
    if (type === 'email') {
      return this.findUserbyEmail(identifier);
    }
    return this.findUserbyUsername(identifier);
  }

  static async verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateTokens(payload: { id: number; username: string; email: string }) {
    if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
      throw new Error("Les clés secrètes JWT ne sont pas définies.");
    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: payload.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}

export default UserService;