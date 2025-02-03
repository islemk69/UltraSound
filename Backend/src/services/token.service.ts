import jwt from 'jsonwebtoken'
import UserService from './user.service';
import { Decipher } from 'crypto';
import { userInfo } from 'os';

interface JwtPayload {
  id: number;
  username: string;
  email: string;
}

class TokenService {
  static generateTokens(payload: { id: number; username: string, email: string }) {
    if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
      throw new Error("Les clés secrètes JWT ne sont pas définies.");
    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: payload.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
  static async refreshToken(token: string) {
    if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
      throw new Error("Access token not defined.");
    }
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_SECRET) as JwtPayload;
      if (!decoded || !decoded.id) {
        throw new Error("Invalid refresh token.");
      }
      const user = await UserService.findUserById(decoded.id);
      if (!user)
        throw new Error("Refresh token user not found.");
      console.log(user.id, user.username, user.email)
      const newAccessToken = jwt.sign({id: user.id, username: user.username, email: user.email}, process.env.ACCESS_SECRET, { expiresIn: "1h" });
      return newAccessToken;
    }
    catch (error) {
      console.error("Error while refreshing token:", error);
      throw new Error("Error while refreshing token.");
    }
  }
}

export default TokenService;