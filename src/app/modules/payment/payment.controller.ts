import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentService } from './payment.service';

const makePayment = catchAsync(async (req: Request, res: Response) => {
  const { amount, paymentMethodId } = req.body;

  const result = await paymentService.makePayment(amount, paymentMethodId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment successful',
    data: result,
  });
});
const WebhookStripe = catchAsync(async (req: Request, res: Response) => {
  const sigHeader = req.headers['stripe-signature']; // 4️⃣ Stripe যেই signature পাঠায়, ওটা read করলাম
  const sig = Array.isArray(sigHeader) ? sigHeader[0] : sigHeader;
  if (!sig) {
    return res.status(400).send('Missing Stripe signature');
  }
  const result = await paymentService.WebhookStripe(sig , req.body); // 5️⃣ Webhook function call করলাম
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'web hooks call successful',
    data: result,
  });
});

export const paymentController = {
  makePayment,
  WebhookStripe,
};
