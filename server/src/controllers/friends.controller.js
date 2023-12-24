import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const friendsController = {
  getSearch: async (req, res) => {
    const query = req.query.q;

    const users = await prisma.user.findMany({
      where: {
        username: {
          search: query.trim() === "" ? "" : `${query}*`,
        },
        email: {
          search: query.trim() === "" ? "" : `${query}*`,
        },
        NOT: {
          id: { equals: req.user.id },
        },
      },
    });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "That username does not belong to any user." });
    }

    res.status(200).json({ message: "Users founded", data: users });
  },
  addFriend: async (req, res) => {
    const { friendUserId } = req.params;
    const userId = req.user.id;

    try {
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // Check if the users are already friends
      const existingFriendship = await prisma.friends.findFirst({
        where: {
          OR: [
            { userId, friendUserId, isAccept: true },
            { userId: friendUserId, friendUserId: userId, isAccept: true },
          ],
        },
      });

      if (existingFriendship) {
        return res.status(400).json({ message: "Users are already friends." });
      }

      const alreadyRequest = await prisma.friends.findFirst({
        where: { userId, friendUserId, isAccept: false },
      });

      if (alreadyRequest) {
        return res.status(400).json({
          message: "Already requested friendship, wait to be accepted.",
        });
      }

      // Check if there is an existing friend request in either direction
      const existingRequest = await prisma.friends.findFirst({
        where: { userId: friendUserId, friendUserId: userId, isAccept: false },
        include: {
          initiator: true,
          respondent: true,
        },
      });

      if (existingRequest) {
        // If the friend request already exists, automatically accept it
        await prisma.friends.update({
          where: { id: existingRequest.id },
          data: { isAccept: true },
        });

        await prisma.notification.create({
          data: {
            userId: friendUserId,
            senderId: userId,
            description: `${currentUser.username} has accepted your friend request.`,
          },
        });

        return res
          .status(200)
          .json({ message: "Friend request accepted successfully." });
      }

      // Create a new friend request
      await prisma.friends.create({
        data: {
          userId,
          friendUserId,
        },
      });

      await prisma.notification.create({
        data: {
          userId: friendUserId,
          senderId: userId,
          description: `${currentUser.username} send you a friend request.`,
        },
      });

      res.status(200).json({ message: "Friend request sent successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  acceptFriend: async (req, res) => {
    const { friendsId } = req.params;
    const userId = req.user.id;
  
    try {
  
      const isExistRelation = await prisma.friends.findFirst({
        where: {
          id: friendsId,
          OR: [{ userId }, { friendUserId: userId }],
        },
      });
  
      if (!isExistRelation) {
        return res
          .status(404)
          .json({ message: "Relation not Found or You not in the relation" });
      }
  
      await prisma.friends.update({
        where: { id: isExistRelation.id },
        data: { isAccept: true },
      });
  
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })
  
      const friendUserId = userId === isExistRelation.userId ? isExistRelation.friendUserId : isExistRelation.userId;
  
      await prisma.notification.create({
        data: {
          userId: friendUserId,
          senderId: userId,
          description: `${currentUser.username} has accepted your friend request.`
        }
      })
  
      res.status(200).json({ message: "Friend request accepted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  rejectFriend: async (req, res) => {
    const { friendsId } = req.params;
    const userId = req.user.id;
  
    try {
      const isExistRelation = await prisma.friends.findFirst({
        where: {
          id: friendsId,
          OR: [{ userId }, { friendUserId: userId }],
          isAccept: false,
        },
      });
  
      if (!isExistRelation) {
        return res
          .status(404)
          .json({
            message: "Friend request not found or you cannot reject this request",
          });
      }
  
      await prisma.friends.delete({
        where: {
          id: isExistRelation.id,
        },
      });
  
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })
  
      const friendUserId = userId === isExistRelation.userId ? isExistRelation.friendUserId : isExistRelation.userId;
  
      await prisma.notification.create({
        data: {
          userId: friendUserId,
          senderId: userId,
          description: `${currentUser.username} has rejected your friend request`
        }
      })
  
      res.status(200).json({ message: "Friend request rejected successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deleteFriend: async (req, res) => {
    const { friendsId } = req.params;
    const userId = req.user.id;
  
    try {
      const isExistRelation = await prisma.friends.findFirst({
        where: {
          id: friendsId,
          OR: [{ userId }, { friendUserId: userId }],
          isAccept: true,
        },
      });
  
      if (!isExistRelation) {
        return res
          .status(404)
          .json({ message: "Relation not Found or You not in the relation" });
      }
  
      await prisma.friends.delete({
        where: {
          id: isExistRelation.id,
        },
      });
  
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })
  
      const friendUserId = userId === isExistRelation.userId ? isExistRelation.friendUserId : isExistRelation.userId;
  
      await prisma.notification.create({
        data: {
          userId: friendUserId,
          senderId: userId,
          description: `${currentUser.username} has deleted your friendship`
        }
      })
  
      res.status(200).json({ message: "Friend relation successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  allFriend: async (req, res) => {
    const userId = req.user.id;
  
    try {
      const friends = await prisma.friends.findMany({
        where: {
          OR: [{ userId }, { friendUserId: userId }],
        },
        include: {
          initiator: true,
          respondent: true,
        },
      });
  
      res
        .status(200)
        .json({ message: "Friends retrieved successfully.", data: friends });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default friendsController;
