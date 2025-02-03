import { Request, Response } from "express";

import UserService from "../services/user.service";

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user; 

    if (!user) {
      res.status(401).json({success: false, message: 'Not authenticated.' });
      return;
    }
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
    return ;
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({success: false, message: 'A server error occurred.' });
    return ;
  }
};
