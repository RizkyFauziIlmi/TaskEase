export const UserRoutes = `// Get all users
route.get("/all", authenticateToken, userController.getAllUser);

// Get current user
route.get("/", authenticateToken, userController.getCurrentUser);

// Update current user
route.put("/", authenticateToken, userController.updateCurrentUser);

// Toggle admin role
route.put("/toggle-role", authenticateToken, userController.toggleAdminRole);

// Delete specific user
route.delete(
  "/delete-specific-user/:id",
  authenticateToken,
  userController.deleteSpecificUser
);

// User sign up
route.post("/signup", userController.signUp);

// User login
route.post("/login", userController.login);

// User login with Firebase
route.post("/login/firebase", userController.loginWithFirebase);

// User logout
route.put("/logout", authenticateToken, userController.logout);`;

export const TodoRoutes = `// Create a new todo
route.post("/todo", todoController.createTodo);

// Get the current todo list
route.get("/", todoController.getCurrentTodo);

// Get a single todo by ID
route.get("/todo/:id", todoController.getSingleTodo);

// Update a todo by ID
route.put("/todo/:id", todoController.updateTodo);

// Delete a todo by ID
route.delete("/todo/:id", todoController.deleteTodo);

// Toggle the completed status of a todo by ID
route.patch("/todo/:id/toggleCompleted", todoController.toggleCompleted);`;

export const OtpRoutes = `// requesting recovery
route.post("/request-recovery", otpController.requestRecovery);

// verifying OTP
route.post("/verify-otp", otpController.verfiyOtp);

// resetting password
route.post("/reset-password", otpController.resetPassword);`;

export const FriendsRoutes = `// Search user by email or username
route.get("/search", friendsController.getSearch);

// Add Friend
route.post("/add-friend/:friendUserId", friendsController.addFriend);

// Accept Friends
route.put("/accept/:friendsId", friendsController.acceptFriend);

// Reject Friends
route.delete("/reject/:friendsId", friendsController.rejectFriend);

// Delete Friends
route.delete("/delete/:friendsId", friendsController.deleteFriend);

// View All Friends
route.get("/", friendsController.allFriend);`;

export const NotificationRoute = `// Get all notifications
route.get("/", notificationController.getAllNotifications);`;

export const getAllUserCode = `getAllUser: async (req, res) => {
    try {
      // Check if the user is an admin
      const isAdmin = req.user.role === "ADMIN";

      if (!isAdmin) {
        // Return 401 Unauthorized status if the user is not an admin
        return res.status(401).json({ message: "Unauthorized!" });
      }

      // Retrieve all users from the database
      const users = await prisma.user.findMany({
        where: {
          NOT: {
            id: { equals: req.user.id },
          },
        },
        include: {
          activities: true,
          todos: true,
          _count: true,
        },
      });

      // * Disable due to database resource
      // await prisma.activity.create({
      //   data: {
      //     table: "USER",
      //     method: "READ",
      //     description: 'Get All User Data in Database',
      //     userId: req.user.id,
      //   },
      // });

      // Return 200 OK status and the retrieved users
      res.status(200).json({ message: "Get data successfully", data: users });
    } catch (error) {
      // Log any errors to the console
      console.log(error);
      // Return 500 Internal Server Error status if an error occurs
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const getCurrentUserCode = `getCurrentUser: async (req, res) => {
    // Retrieve the values of includeTodo and includeActivity from the request query
    const { includeTodo, includeActivity } = req.query;
    
    // Convert the values to boolean
    const isIncludeTodo = includeTodo === "true" ? true : false;
    const isIncludeActivity = includeActivity === "true" ? true : false;
    
    try {
      // Retrieve user data from the database
      const userData = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        include: {
          // Include todos if isIncludeTodo is true
          todos: isIncludeTodo,
          // Include activities if isIncludeActivity is true
          activities: isIncludeActivity,
        },
      });
    
      // * Disable due to database resource
      // Create an activity record in the database
      // await prisma.activity.create({
      //   data: {
      //     table: "USER",
      //     method: "READ",
      //     description: 'Get current user Data',
      //     userId: req.user.id,
      //   },
      // });
    
      // Return the retrieved user data as a response
      res
        .status(200)
        .json({ message: "Get data successfully", data: userData });
    } catch (error) {
      console.log(error);
      // Return an error response if an error occurs
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const updateCurrentUserCode = `updateCurrentUser: async (req, res) => {
    try {
      // Update the user's information
      const updatedUser = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: { ...req.body },
      });
    
      // Create an activity record for the user update
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "UPDATE",
          description: 'Update current user',
          userId: req.user.id,
        },
      });
    
      // Send a success response with the updated user information
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      // Handle any errors that occur during the update process
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const toggleAdminRoleCode = `toggleAdminRole: async (req, res) => {
  const { userId } = req.body;
  
  try {
    // Check if user is an admin
    const isAdmin = req.user.role === "ADMIN";
  
    if (!isAdmin) {
      // If user is not an admin, return unauthorized status
      return res.status(401).json({ message: "Unauthorized!" });
    }
  
    // Find the user with the specified ID
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  
    if (!user) {
      // If user is not found, return not found status
      return res.status(404).json({ message: "User not found" });
    }
  
    // Update the user's role
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: user.role === "ADMIN" ? "MEMBER" : "ADMIN",
      },
    });
  
    // Create an activity record for the user update
    await prisma.activity.create({
      data: {
        table: "USER",
        method: "UPDATE",
        description: \`Change \${updatedUser.username} role to \${updatedUser.role}\`,
        userId: req.user.id,
      },
    });
  
    // Return success status and updated user information
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}`;

export const deleteSpecificUserCode = `deleteSpecificUser: async (req, res) => {
    const userId = req.params.id;
    
    try {
      // Check if the user is an admin
      const isAdmin = req.user.role === "ADMIN";
    
      if (!isAdmin) {
        // Return unauthorized response if the user is not an admin
        return res.status(401).json({ message: "Unauthorized!" });
      }
    
      // Find the user by ID
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    
      if (!user) {
        // Return not found response if the user doesn't exist
        return res.status(404).json({ message: "User not found" });
      }
    
      // Delete the user
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
    
      // Create an activity log entry for the user deletion
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "DELETE",
          description: \`Delete \${user.username} from database\`,
          userId: req.user.id,
        },
      });
    
      // Return success response
      res
        .status(200)
        .json({ message: \`User with id \${user.id} deleted successfully\` });
    } catch (error) {
      // Log and return internal server error if an error occurs
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const signUpCode = `signUp: async (req, res) => {
    const { username, email, password } = req.body;
    
    // Check if user with the given email already exists
    const userExist = await prisma.user.findFirst({
      where: {
        AND: [{ email }, { method: "EMAIL" }],
      },
    });
    
    if (userExist) {
      return res.status(403).json({ message: "Email already exists" });
    }
    
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      // Create a new user in the database
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
    
      // Log the activity of creating a new user
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: 'Create a new Account',
          userId: user.id,
        },
      });
    
      // Send a welcome email to the user
      sendWelcome(username, email);
    
      // Return success response with the created user data
      res
        .status(201)
        .json({ message: "User created successfully", data: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const loginCode = `login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email and method
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
      });

      // If no user is found, return a 404 error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If the password does not match, return a 401 error
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Credential" });
      }

      // Generate a JWT token with user id and role
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      // Create an activity record for the user login
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: 'Login',
          userId: user.id,
        },
      });

      // Set user's online status to true
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isOnline: true,
        },
      });

      // Return a success message with the generated token
      res.status(200).json({ message: "Login successful", data: { token } });
    } catch (error) {
      console.log(error);
      // If an error occurs, return a 500 error
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const loginWithFirebaseCode = `loginWithFirebase: async (req, res) => {
    const { email, username, imgUrl, method, id } = req.body;
    
    try {
      // Find the user by id
      let user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
    
      if (!user) {
        // Create a new user if user is not found
        user = await prisma.user.create({
          data: {
            id,
            email,
            username,
            imgUrl,
            method,
          },
        });
    
        // Log activity for user creation
        await prisma.activity.create({
          data: {
            table: "USER",
            method: "CREATE",
            description: 'Create a new Account',
            userId: user.id,
          },
        });
      }
    
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
    
      // Log activity for user login
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: 'Login',
          userId: user.id,
        },
      });
    
      // Update user's online status
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isOnline: true,
        },
      });
    
      // Return success response with token
      res.status(200).json({ message: "Login successful", data: { token } });
    } catch (error) {
      console.log(error);
      // Return error response
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const logoutCode = `logout: async (req, res) => {
    try {
      // Update the isOnline status of the user to false
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          isOnline: false,
        },
      });

      // Create a new activity record for the user
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: 'Logout',
          userId: req.user.id,
        },
      });
    } catch (error) {
      // Log any errors that occur during the update or create operations
      console.log(error);
      // Return a 500 Internal Server Error response to the client
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const createTodoCode = `createTodo: async (req, res) => {
    try {
      // Create a new todo in the database
      const newTodo = await prisma.todo.create({
        data: {
          ...req.body,
          userId: req.user.id,
        },
      });

      // Create an activity log for the todo creation
      await prisma.activity.create({
        data: {
          method: "CREATE",
          table: "TODO",
          description: \`Create new todo with id \${newTodo.id}\`,
          userId: req.user.id,
        },
      });

      // Send a response indicating success and the created todo
      res.status(201).json({
        message: "Todo created successfully",
        data: newTodo,
      });
    } catch (error) {
      // Handle any errors that occur during the creation process
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const getCurrentTodoCode = `getCurrentTodo: async (req, res) => {
    try {
      // Fetch todos from the database for the current user
      const todos = await prisma.todo.findMany({
        where: { userId: req.user.id },
        orderBy: [
          {
            completed: "asc",
          },
          { createdAt: "desc" },
        ],
      });
    
      // Check if any todos were found
      if (todos.length === 0) {
        // Return a 404 response if no todos were found
        return res.status(404).json({ message: "Todos not found" });
      }
    
      // Return the todos in the response
      res.status(200).json({ message: "Get data successfully", data: todos });
    } catch (error) {
      // Handle any errors that occur during the execution of the code
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const getSingleTodoCode = `getSingleTodo: async (req, res) => {
    const todoId = req.params.id;
    
    try {
      // Retrieve the todo corresponding to the provided id and user id
      const todo = await prisma.todo.findUnique({
        where: { id: todoId, userId: req.user.id },
      });
    
      // * Disable due to database resource
      // Create an activity log entry for reading the todo
      // await prisma.activity.create({
      //   data: {
      //     table: "TODO",
      //     method: "READ",
      //     description: \`Get todo with id \${todoId}\`,
      //     userId: req.user.id,
      //   },
      // });
    
      // If the todo is not found, return a 404 error
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
    
      // Return a success response with the todo data
      res.status(200).json({ message: "Get data successfully", data: todo });
    } catch (error) {
      console.log(error);
      // Return a generic error message for any exceptions
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const updateTodoCode = `updateTodo: async (req, res) => {
    const todoId = req.params.id;
    const { title, description, category, completed } = req.body;

    try {
      // Update the todo in the database
      const updatedTodo = await prisma.todo.update({
        where: { id: todoId, userId: req.user.id },
        data: {
          title,
          description,
          category,
          completed,
        },
      });

      // Create an activity record for the todo update
      await prisma.activity.create({
        data: {
          table: "TODO",
          method: "UPDATE",
          description: \`Update todo with id \${todoId}\`,
          userId: req.user.id,
        },
      });

      // Return successful response
      res
        .status(200)
        .json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
      console.error(error);
      // Return error response
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const deleteTodoCode = `deleteTodo: async (req, res) => {
    const todoId = req.params.id;
    
    try {
      // Check if the todo exists
      const isExistTodo = await prisma.todo.findUnique({
        where: {
          id: todoId,
        },
      });
    
      if (!isExistTodo) {
        // If the todo doesn't exist, return a 204 No Content response
        return res.status(204).json({ message: "No Content" });
      }
    
      // Delete the todo
      await prisma.todo.delete({
        where: { id: todoId, userId: req.user.id },
      });
    
      // Create an activity record for the deletion
      await prisma.activity.create({
        data: {
          table: "TODO",
          method: "DELETE",
          description: \`Delete todo with id \${todoId}\`,
          userId: req.user.id,
        },
      });
    
      // Return a 200 OK response with a success message
      res
        .status(200)
        .json({ message: \`Todo with id \${todoId} deleted successfully\` });
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const toggleCompletedTodoCode = `toggleCompleted: async (req, res) => {
    const todoId = req.params.id;

    try {
      // Check if the todo exists and belongs to the user
      const existingTodo = await prisma.todo.findUnique({
        where: { id: todoId, userId: req.user.id },
      });

      // If the todo does not exist, return a 404 error
      if (!existingTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      // Update the completed field of the todo
      const updatedTodo = await prisma.todo.update({
        where: { id: todoId, userId: req.user.id },
        data: {
          completed: !existingTodo.completed,
        },
      });

      // Create an activity log for the todo update
      await prisma.activity.create({
        data: {
          table: "TODO",
          method: "UPDATE",
          description: \`Toggle completed todo with id \${todoId}\`,
          userId: req.user.id,
        },
      });

      // Return a success message and the updated todo
      res.status(200).json({
        message: "Completed field toggled successfully",
        todo: updatedTodo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const requestRecoveryCode = `requestRecovery: async (req, res) => {
    const { email } = req.body;
    
    try {
      // Find User by Email
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
        include: {
          otp: true,
        },
      });
    
      if (!user) {
        // User not found
        return res.status(404).json({ message: "User not found" });
      }
    
      // Generate OTP
      const otp = otpGenerator.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
    
      // Set OTP expiration time to 5 minutes from now
      const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000); // OTP valid in 5 minutes
    
      if (!user.otp) {
        // Create new OTP record if user doesn't have one
        await prisma.otp.create({
          data: {
            code: otp,
            expiresAt: otpExpirationTime,
            userId: user.id,
          },
        });
    
        // Send OTP to user via email
        sendOtpByEmail(email, otp);
    
        // Return response with success message and data
        return res.status(201).json({
          message: "OTP has been sent for password recovery",
          data: { verified: false },
        });
      } else if (new Date() > new Date(user.otp.expiresAt)) {
        // Update existing OTP record if it has expired
        const updatedUser = await prisma.otp.update({
          where: {
            userId: user.id,
          },
          data: {
            code: otp,
            expiresAt: otpExpirationTime,
            verified: false,
          },
        });
    
        // Send updated OTP to user via email
        sendOtpByEmail(email, updatedUser.code);
    
        // Return response with success message and data
        return res.status(201).json({
          message: "OTP has been sent for password recovery",
          data: { verified: false },
        });
      }
    
      // Return response with success message and data
      res.status(201).json({
        message: "OTP has been sent, check the latest email",
        data: { verified: user.otp.verified },
      });
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const verifyOtpCode = `verfiyOtp: async (req, res) => {
    const { otp, email } = req.body;
    
    try {
      // Find the user with the given email and method as "EMAIL" and include the otp
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
        include: {
          otp: true,
        },
      });
    
      if (!user) {
        // Return a 404 response if the user is not found
        return res.status(404).json({ message: "User not found" });
      }
    
      if (
        !user.otp ||
        user.otp.code !== otp ||
        new Date() > new Date(user.otp.expiresAt)
      ) {
        // Return a 400 response if the OTP is invalid or has expired
        return res
          .status(400)
          .json({ message: "The OTP is invalid or has expired" });
      }
    
      await prisma.otp.update({
        where: {
          userId: user.id,
        },
        data: {
          verified: true,
        },
      });
    
      // Return a 201 response if the OTP is verified successfully
      res.status(201).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error(error);
      // Return a 500 response if there's an internal server error
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const resetPasswordCode = `resetPassword: async (req, res) => {
    const { email, newPassword } = req.body;
    
    try {
      // Find user by email and method
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
        include: {
          otp: true,
        },
      });
    
      // If user doesn't exist, return 404 error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    
      // Check if OTP exists, is verified, and has not expired
      if (
        !user.otp ||
        !user.otp.verified ||
        new Date() > new Date(user.otp.expiresAt)
      ) {
        return res
          .status(400)
          .json({ message: "The OTP is invalid or has expired" });
      }
    
      // Check if new password matches the existing password
      const passwordMatch = await bcrypt.compare(newPassword, user.password);
    
      // If passwords match, return 409 error
      if (passwordMatch) {
        return res.status(409).json({ message: "Try different password" });
      }
    
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
    
      // Update user's password
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });
    
      // Delete OTP for the user
      await prisma.otp.delete({
        where: {
          userId: user.id,
        },
      });
    
      // Return success message
      res.status(201).json({ message: "Password reset successfully" });
    } catch (error) {
      console.error(error);
      // Return error message
      res.status(500).json({ message: "Internal server error" });
    }
}`;

export const getSearchCode = `getSearch: async (req, res) => {
    const query = req.query.q;
    
    // Perform a search for users based on the provided query
    // The search is performed on both the username and email fields
    // If the query is empty, an empty string is used for the search
    const users = await prisma.user.findMany({
      where: {
        username: {
          search: query.trim() === "" ? "" : \`\${query}*\`,
        },
        email: {
          search: query.trim() === "" ? "" : \`\${query}*\`,
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
}`;

export const addFriendCode = `addFriend: async (req, res) => {
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
            description: \`\${currentUser.username} has accepted your friend request.\`,
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
          description: \`\${currentUser.username} send you a friend request.\`,
        },
      });
    
      res.status(200).json({ message: "Friend request sent successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}`;

export const acceptFriendCode = `acceptFriend: async (req, res) => {
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
          id: userId
        }
      })
    
      // Determine the friend's user id
      const friendUserId = userId === isExistRelation.userId ? isExistRelation.friendUserId : isExistRelation.userId;
    
      // Create a notification for the friend request acceptance
      await prisma.notification.create({
        data: {
          userId: friendUserId,
          senderId: userId,
          description: \`\${currentUser.username} has accepted your friend request.\`
        }
      })
    
      // Return success message
      res.status(200).json({ message: "Friend request accepted successfully." });
    } catch (error) {
      console.error(error);
      // Return error message for internal server error
      res.status(500).json({ message: "Internal Server Error" });
    }
}`;

export const rejectFriendCode = `rejectFriend: async (req, res) => {
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
        return res
          .status(404)
          .json({
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
          id: userId
        }
      })
    
      // Determine the friend user ID based on the current user and the friend relation
      const friendUserId = userId === isExistRelation.userId ? isExistRelation.friendUserId : isExistRelation.userId;
    
      // Create a notification for the friend user
      await prisma.notification.create({
        data: {
          userId: friendUserId,
          senderId: userId,
          description: \`\${currentUser.username} has rejected your friend request\`
        }
      })
    
      // Return success message
      res.status(200).json({ message: "Friend request rejected successfully" });
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}`;

export const deleteFriendCode = `deleteFriend: async (req, res) => {
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
          id: userId
        }
      })
    
      // Determine the ID of the friend user
      const friendUserId = userId === isExistRelation.userId ? isExistRelation.friendUserId : isExistRelation.userId;
    
      // Create a notification for the friend user
      await prisma.notification.create({
        data: {
          userId: friendUserId,
          senderId: userId,
          description: \`\${currentUser.username} has deleted your friendship\`
        }
      })
    
      // Return a success response
      res.status(200).json({ message: "Friend relation successfully deleted" });
    } catch (error) {
      console.error(error);
      // Return an error response if an error occurs
      res.status(500).json({ message: "Internal Server Error" });
    }
}`;

export const getAllFriendCode = `allFriend: async (req, res) => {
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
}`;

export const getAllNotificationsCode = `getAllNotifications: async (req, res) => {
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
}`;

export const backendAuthMiddlewareCode = `export const authenticateToken = (req, res, next) => {
    // Get the authorization header
    const authHeader = req.header("Authorization");
  
    // Split the header to get the token
    const token = authHeader && authHeader.split(" ")[1]; // Ambil token dari header
  
    // If token is not present, return access denied
    if (!token) return res.status(401).json({ message: "Access denied" });
  
    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      // If token is invalid, return invalid token
      if (err) return res.status(403).json({ message: "Invalid token" });
  
      // Set the user property in the request object
      req.user = user;
  
      // Call the next middleware function
      next();
    });
};`;

export const rateLimitCode = `export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // Limit each IP to 1000 requests per 'window' (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: 'RateLimit-*' headers; draft-7: combined 'RateLimit' header
    legacyHeaders: false, // Disable the 'X-RateLimit-*' headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
});`;
