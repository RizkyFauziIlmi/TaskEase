import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const friendsController = {
  getSearch: async (req, res) => {
    const query = req.query.q;

    // Perform a search for users based on the provided query
    // The search is performed on both the username and email fields
    // If the query is empty, an empty string is used for the search
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

    // If no users are found, return a 404 status code with an error message
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "That username does not belong to any user." });
    }

    // Return a 200 status code with the found users
    res.status(200).json({ message: "Users founded", data: users });
  },
  addFriend: async (req, res) => {
    const { friendUserId } = req.params;
    const userId = req.user.id;

    try {
      // Get the current user
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

      // Check if there is a pending friend request
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

        // Create a notification for the accepted friend request
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

      // Create a notification for the sent friend request
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
      // Check if the friend relation exists
      const isExistRelation = await prisma.friends.findFirst({
        where: {
          id: friendsId,
          OR: [{ userId }, { friendUserId: userId }],
        },
      });

      if (!isExistRelation) {
        // Return error if the relation does not exist
        return res
          .status(404)
          .json({ message: "Relation not Found or You not in the relation" });
      }

      // Update the friend relation to accepted
      await prisma.friends.update({
        where: { id: isExistRelation.id },
        data: { isAccept: true },
      });

      // Get the current user
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // Determine the friend's user id
      const friendUserId =
        userId === isExistRelation.userId
          ? isExistRelation.friendUserId
          : isExistRelation.userId;

      // Create a notification for the friend request acceptance
      await prisma.notification.create({
        data: {
          userId: friendUserId,
          senderId: userId,
          description: `${currentUser.username} has accepted your friend request.`,
        },
      });

      // Return success message
      res
        .status(200)
        .json({ message: "Friend request accepted successfully." });
    } catch (error) {
      console.error(error);
      // Return error message for internal server error
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  rejectFriend: async (req, res) => {
    const { friendsId } = req.params;
    const userId = req.user.id;

    try {
      // Check if the friend relation exists and is not accepted
      const isExistRelation = await prisma.friends.findFirst({
        where: {
          id: friendsId,
          OR: [{ userId }, { friendUserId: userId }],
          isAccept: false,
        },
      });

      if (!isExistRelation) {
        // Return error if the friend request is not found or cannot be rejected
        return res.status(404).json({
          message: "Friend request not found or you cannot reject this request",
        });
      }

      // Delete the friend relation
      await prisma.friends.delete({
        where: {
          id: isExistRelation.id,
        },
      });

      // Get the current user's information
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // Determine the friend user ID based on the current user and the friend relation
      const friendUserId =
        userId === isExistRelation.userId
          ? isExistRelation.friendUserId
          : isExistRelation.userId;

      // Create a notification for the friend user
      await prisma.notification.create({
        data: {
          userId: friendUserId,
          senderId: userId,
          description: `${currentUser.username} has rejected your friend request`,
        },
      });

      // Return success message
      res.status(200).json({ message: "Friend request rejected successfully" });
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deleteFriend: async (req, res) => {
    const { friendsId } = req.params;
    const userId = req.user.id;

    try {
      // Check if the relation exists in the database
      const isExistRelation = await prisma.friends.findFirst({
        where: {
          id: friendsId,
          OR: [{ userId }, { friendUserId: userId }],
          isAccept: true,
        },
      });

      if (!isExistRelation) {
        // If the relation does not exist, return an error response
        return res
          .status(404)
          .json({ message: "Relation not Found or You not in the relation" });
      }

      // Delete the friend relation from the database
      await prisma.friends.delete({
        where: {
          id: isExistRelation.id,
        },
      });

      // Get the current user's information
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // Determine the ID of the friend user
      const friendUserId =
        userId === isExistRelation.userId
          ? isExistRelation.friendUserId
          : isExistRelation.userId;

      // Create a notification for the friend user
      await prisma.notification.create({
        data: {
          userId: friendUserId,
          senderId: userId,
          description: `${currentUser.username} has deleted your friendship`,
        },
      });

      // Return a success response
      res.status(200).json({ message: "Friend relation successfully deleted" });
    } catch (error) {
      console.error(error);
      // Return an error response if an error occurs
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  allFriend: async (req, res) => {
    // Get the user ID from the request
    const userId = req.user.id;

    try {
      // Find all friends associated with the user
      const friends = await prisma.friends.findMany({
        where: {
          OR: [{ userId }, { friendUserId: userId }],
        },
        include: {
          initiator: true,
          respondent: true,
        },
      });

      // Return the friends as a JSON response
      res
        .status(200)
        .json({ message: "Friends retrieved successfully.", data: friends });
    } catch (error) {
      // Log and handle any errors that occur
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default friendsController;
