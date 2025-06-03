import  express  from "express";
import { login, signup, home } from "../controllers/authController";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/signup", signup );
router.post("/login", login);
router.get("/home",verifyToken,home)

export default router;