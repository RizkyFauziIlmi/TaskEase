import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const route = Router();
const prisma = new PrismaClient();

route.get("/", async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        Sender: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (notifications.length === 0) {
      return res.status(404).json({ message: "There is no Notification" });
    }

    res.status(200).json({
      message: "Get data successfully",
      data: notifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default route;
