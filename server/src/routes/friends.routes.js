import { Router } from "express";
import friendsController from "../controllers/friends.controller.js";

const route = Router();

// Search user by email or username
route.get("/search", friendsController.getSearch);

// Add Friend
route.post("/add-friend/:friendUserId", friendsController.addFriend);

// Accept Friends
route.put("/accept/:friendsId", friendsController.acceptFriend);

// Reject Friends
route.delete("/reject/:friendsId", friendsController.rejectFriend);

route.delete("/delete/:friendsId", friendsController.deleteFriend);

// View All Friends
route.get("/", friendsController.allFriend);

export default route;
