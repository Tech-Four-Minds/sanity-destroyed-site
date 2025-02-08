import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: JwtPayload | string;
}

const verifyToken = (token: string): JwtPayload | string => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        throw new Error("Token inválido ou expirado.");
    }
};

export const authenticateRequest = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "Token não fornecido." });
        return 
    }

    const token = authHeader; 

    try {
        req.user = verifyToken(token);
        next(); 
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro na autenticação:", error.message); 
            res.status(401).json({ error: error.message });
        } else {
            console.error("Erro desconhecido:", error);
            res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
};
