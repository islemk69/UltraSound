const express = require("express");
import { createCheckoutSession } from "../controllers/stripe.controllers";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);

export default router;