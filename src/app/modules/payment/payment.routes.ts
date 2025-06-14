import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();
router.get('/make-payment', paymentController.makePayment);
router.post('/webhook/stripe', paymentController.WebhookStripe);

export const paymentRoutes = router;
