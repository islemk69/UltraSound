import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  username: string;
  email: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.accessToken;
    console.log(token)
    if (!token) {
      res.status(401).json({ message: "Access token is missing." });
      return ;
    }

    if (!process.env.ACCESS_SECRET) {
      res.status(500).json({ message: "JWT secret is not defined." });
      return ;
    }

    // Décoder et valider le token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET) as JwtPayload;

    // Ajouter uniquement l'ID utilisateur à req
    req.user= {id: decoded.id, username: decoded.username, email: decoded.email};

    // Continuer au middleware ou contrôleur suivant
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid or expired access token." });
    return ;
  }
};

export default verifyToken;
