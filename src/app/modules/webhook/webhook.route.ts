import express from "express";
import { webhookController } from "./webhook.controller";

const router = express.Router();

router.post("/", webhookController.webhookHandler);

export default router;

export const WebhookRoutes = router;
