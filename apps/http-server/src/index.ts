import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/lib"
import { authMiddleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"

const app = express()

app.use(express.json())

app.post("/signup", async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body)

    if (parsedData.error) {
        res.json({
            message: "Incorrect inputs"
        })
        return
    }

    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                // hash password later
                password: parsedData.data.password,
                name: parsedData.data.name,
            }
        })
        res.send({ userId: user.id })
    } catch (error) {
        res.status(411).json({ msg: "already exist user" })
    }

})


app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (parsedData.error) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            // hash password later
            password: parsedData.data.password
        }
    })
    if (!user) {
        res.json({ message: "Not authorized" })
        return
    }
    const userId = user.id
    const token = jwt.sign({ userId }, JWT_SECRET)
    res.json({ "token": token })

})


// @ts-ignore: TODO: Fix this
app.post("/room", authMiddleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (parsedData.error) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    // @ts-ignore: TODO: Fix this
    const userId = req.userId

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        })
    } catch (error) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})


app.get("/chats/:roomId", async (req, res) => {

    const roomId = Number(req.params.roomId)

    try {
        const chats = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            take: 50,
            orderBy: {
                id: "desc"
            }
        })

        res.json({ chats })
    } catch (error) {
        console.log(error);

    }
})


app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})

app.listen(3001)