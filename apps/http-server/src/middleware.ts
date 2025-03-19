import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/lib";
import { NextFunction, Request, Response } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const token = req.headers["authentication"]

    // @ts-ignore
    const decode = jwt.verify(token, JWT_SECRET)

    if (decode) {
        // @ts-ignore
        req.userId = decode.userId
        next()
    }
    return res.status(404).send({ msg: "failed to singin" })

}