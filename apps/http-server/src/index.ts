import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/lib"
import { authMiddleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types"

const app = express()

app.post("/signup", (req, res) => {
    // db call
    const data = CreateUserSchema.safeParse(req.body)
    if (data.error) {
        res.json({
            message: "Incorrect inputs"
        })
        return
    }
    const userId = 123
    res.send({
        userId: 123
    })
})
app.post("/singin", (req, res) => {
    // db call
    const data = SigninSchema.safeParse(req.body);
    if (data.error) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    const token = jwt.sign({ UserId: "123" }, JWT_SECRET)
    res.json({ "token": token })

})
app.post("/room", authMiddleware, (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if (data.error) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // db call

    res.json({
        roomId: 123
    })
})

app.listen(3001)