import bcrypt from 'bcryptjs'
import User from '../models/user.model'

class UserService {
  static async createUser(username: string, email: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return User.create({username, email, password: hashedPassword});
  }

  static async findUserbyEmail(email: string) {
    return User.findOne({where: {email}, raw: true});
  }

  static async findUserbyUsername(username: string) {
    return User.findOne({where: {username}, raw: true});
  }

  static async findUserById(id: number) {
    return User.findByPk(id);
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
}

export default UserService;