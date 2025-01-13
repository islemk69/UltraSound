import jwt from 'jsonwebtoken'

class TokenService {
  static generateTokens(payload: { id: number; username: string, email: string }) {
    if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
      throw new Error("Les clés secrètes JWT ne sont pas définies.");
    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: payload.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
  static refreshToken(req: Request) {
    if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
      throw new Error("Access token not defined.");
    }
    try {
      
    }
    catch (error) {
      throw new Error("");
    }

  }
}

export default TokenService;