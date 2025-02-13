import { Request, Response } from "express";
import { WebhookService } from "./webhook.service";

const webhookHandler = async (req: Request, res: Response) => {
  const signature = req.headers["x-signature"] as string;
  const payload = JSON.stringify(req.body);

  if (!WebhookService.verifySignature(payload, signature)) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid signature" });
  }

  const { eventType, data } = req.body;

  if (!eventType || !data) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid request data" });
  }

  await WebhookService.storeWebhookData(eventType, data);

  res.json({ success: true, message: "Received" });
};

export const webhookController = {
  webhookHandler,
};
