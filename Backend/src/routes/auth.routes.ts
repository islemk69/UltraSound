const express = require("express");

import { register, login , refreshToken, logout} from "../controllers/auth.controllers"
import verifyToken from "../middlewares/auth.middleware";
import { getMe } from "../controllers/user.controllers";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.get('/me', verifyToken, getMe);
router.post('/logout', logout);
export default router;