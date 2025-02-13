/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios from "axios";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import crypto from "crypto";


const SECRET = "secretWebhook";

const createUser = async (user: TUser): Promise<TUser | null> => {
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new AppError(400, "Failed to create user!");
  }

  const { password, ...userWithoutPassword } = createdUser.toObject();

  try {
    const payload = JSON.stringify({
      eventType: "user.created",
      data: userWithoutPassword,
    });

    const signature = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");

    await axios.post("http://localhost:5000/api/webhook", payload, {
      headers: {
        "x-signature": signature,
        "Content-Type": "application/json",
      },
    });

    console.log("Webhook notification sent successfully.");
  } catch (error) {
    console.error("Error sending webhook notification:", error);
  }

  return userWithoutPassword as unknown as TUser;
};


const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (_id: string): Promise<TUser | null> => {
  const result = await User.findById({ _id });

  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
};
