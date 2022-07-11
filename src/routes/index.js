import { Router } from "express";
import login from "./users/login";

const router = Router();

router.post('/', login)


export default router;