import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const notificationController = {
  getAllNotifications: async (req, res) => {
    try {
      // Retrieve notifications for the user
      const notifications = await prisma.notification.findMany({
        where: {
          userId: req.user.id,
        },
        include: {
          Sender: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    
      // If there are no notifications, return a 404 error
      if (notifications.length === 0) {
        return res.status(404).json({ message: "There is no Notification" });
      }
    
      // Return the notifications with a success message
      res.status(200).json({
        message: "Get data successfully",
        data: notifications,
      });
    } catch (error) {
      console.error(error);
      // Return a 500 error if there is an internal server error
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default notificationController;
