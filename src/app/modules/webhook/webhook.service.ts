/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import crypto from "crypto";
import path from "path";

const SECRET = "secretWebhook"; 

const verifySignature = (payload: string, signature: string): boolean => {
  const hash = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return hash === signature;
};

const storeWebhookData = async (eventType: string, data: any) => {
  const filePath = path.join(__dirname, "../../db.json");

  let existingData: any[] = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    existingData = JSON.parse(fileContent);
  }

  const newEvent = {
    eventType,
    data,
    timestamp: new Date().toISOString(),
  };

  existingData.push(newEvent);

  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
};

export const WebhookService = {
  verifySignature,
  storeWebhookData,
};
