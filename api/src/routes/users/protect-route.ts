import { Router } from "express";
import { authenticateRequest } from "../../infra/middlewares/authenticateRequest";

const router = Router();

// Rota protegida
router.get("/protected", authenticateRequest, (req, res) => {
    res.json({ message: "Você tem acesso a essa rota protegida!", user: req.user });
});

export default router;
