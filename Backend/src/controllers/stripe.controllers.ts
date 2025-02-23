import { Request, Response } from "express";

import { stripe } from "../config/stripe"

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"], // Accepte carte bancaire
            mode: "payment", // Un paiement unique
            line_items: [
                {
                    price: process.env.PRICE_ID, // Le produit (défini dans Stripe)
                    quantity: 1,
                },
            ],
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/error`,
        });

        res.json({ url: session.url }); // Renvoie l'URL Stripe au frontend
    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ Erreur Webhook Stripe :", error);
            res.status(500).json({ error: error.message });
        }
 
    }
};
