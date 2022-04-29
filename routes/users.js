import { Router } from "express";
const router = Router();
import {
  userCreate,
  userAll,
  userDetails,
  userUpdate,
  userDelete,
  userLogin,
} from "../controllers/userController.js";
import requireLogin from "../middleware/requiredLogin.js";


router.post("/", userCreate);
router.get("/", requireLogin, userAll);
router.get("/:userId", userDetails);
router.patch("/:userId", userUpdate);
router.delete("/:userId", userDelete);
router.post("/login", userLogin);

// module.exports = router;
export default router;
