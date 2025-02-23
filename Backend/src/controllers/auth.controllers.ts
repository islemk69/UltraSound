import { Request, Response } from "express";
import UserService  from "../services/user.service";
import TokenService from "../services/token.service";
import AuthService from "../services/auth.service";


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
      res.status(400).json({success: false, message: "All fields are required."});
      return ;
    }
    const existringEmail = await UserService.findUserbyEmail(email);
    if (existringEmail) {
      res.status(409).json({success: false, message: "Email already in use."});
      return ;
    }
    const existringUsername = await UserService.findUserbyUsername(username);
    if (existringUsername) {
      res.status(409).json({success: false, message: "Username already in use."});
      return ;
    }
    const newUser = await UserService.createUser(username, email, password);
    res.status(201).json({success: true, message: "User created successfuly", username: username, email: email});
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({success: false, message: 'A server error has occured.'});
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {username, email, password} = req.body;
    if (!password || (!username && ! email)){ 
      return (res.status(400).json({success: false, message: "Username or Email required."}));
    }
    const identifer = username || email;
    const identiferType = username ? "username" : "email";
    const user = await UserService.findUserByIdentifier(identifer!, identiferType);
    if (!user)
      return res.status(409).json({success: false, message: "Invalid uesername or e-mail"});
    const isPasswordValid = await AuthService.verifyPassword(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({success: false, message: "Invalid password." });
    if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET)
      return res.status(500).json({success: false, message: "La clé secrète JWT (ACCESS_TOKEN) n'est pas définie."});

    const { accessToken, refreshToken } = TokenService.generateTokens({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    const isProd = process.env.NODE_ENV === "production";
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd, 
      sameSite: "strict", 
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  
    return res.status(200).json({
        success: true, 
        message: "Login successful.",   
        user: {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return (res.status(500).json({success: false, message: "A server error has occured."}));
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken; // Récupérer le token depuis les cookies

    if (!refreshToken) {
      return res.status(401).json({success: false,  message: "Refresh token is required." });
    }
    // Rafraîchir le  token
    const newAccessToken = await TokenService.refreshToken(refreshToken);
    // Mettre à jour le cookie accessToken
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 heure
    });

    return res.status(200).json({ success: true, message: "Token refreshed successfully." });
  } catch (error) {
    console.error("Error during token refresh:", error);
    return res.status(403).json({success: false, message: "Invalid or expired refresh token." });
  }
};

export const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Supprime les cookies contenant les tokens
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({
      success: true,
      message: 'Logout successful.',
    });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during logout.',
    });
  }
};