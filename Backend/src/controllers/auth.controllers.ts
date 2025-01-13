import { Request, Response } from "express";
import UserService  from "../services/user.service";
import TokenService from "../services/token.service";


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
      res.status(400).json({message: "All fields are required."});
      return ;
    }
    const existringEmail = await UserService.findUserbyEmail(email);
    if (existringEmail) {
      res.status(409).json({message: "Email already in use."});
      return ;
    }
    const existringUsername = await UserService.findUserbyUsername(username);
    if (existringUsername) {
      res.status(409).json({message: "Username already in use."});
      return ;
    }
    const newUser = await UserService.createUser(username, email, password);
    res.status(201).json({message: "User created successfuly", username: username, email: email});
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'A server error has occured.'});
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {username, email, password} = req.body;
    if (!password || (!username && ! email)){ 
      return (res.status(400).json({message: "Username or Email required."}));
    }
    const identifer = username || email;
    const identiferType = username ? "username" : "email";
    const user = await UserService.findUserByIdentifier(identifer!, identiferType);
    if (!user)
      return res.status(409).json({message: "Invalid uesername or e-mail"});
    console.log(user);
    const isPasswordValid = await UserService.verifyPassword(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password." });
    console.log("yooooo")
    if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET)
      return res.status(500).json({message: "La clé secrète JWT (ACCESS_TOKEN) n'est pas définie."});

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
  
    return res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return (res.status(500).json({message: "A server error has occured."}));
  }
}