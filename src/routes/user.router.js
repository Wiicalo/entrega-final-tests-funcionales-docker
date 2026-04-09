import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { autheticatedToken } from "../middleware/user.middleware.js";

const router = new Router();


router.get('/', UserController.getAllUsers);
router.post('/', UserController.validateCreate, UserController.create);
router.post('/login', UserController.login);
router.get('/profile', autheticatedToken, UserController.profileUser)

export default router;