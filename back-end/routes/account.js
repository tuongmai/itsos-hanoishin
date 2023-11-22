import { Router } from "express";
import AccountController from "../controllers/account";

export default function account(app) {
  const router = Router();
  app.use("/api/account", router);

  // POST {baseURL}/api/account
  router.post("/", AccountController.register);

  // GET {baseURL}/api/account/:id
  router.get( "/:id", AccountController.login);
  router.post('/register', AccountController.register);
  router.post('/login', AccountController.login);
}
