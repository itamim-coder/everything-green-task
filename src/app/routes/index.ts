import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

import { UserRoutes } from "../modules/user/user.route";
import { WebhookRoutes } from "../modules/webhook/webhook.route";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/webhook",
    route: WebhookRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
