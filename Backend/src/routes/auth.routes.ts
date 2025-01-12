const express = require("express");

import { register, login } from "../controllers/auth.controllers"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;