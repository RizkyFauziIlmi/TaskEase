type updateUserRequest = {
  username?: string;
  email?: string | null;
  password?: string | null;
  imgUrl?: string | null;
  bannerId?: string | null;
  todoBackground?: string | null;
  theme?: string | null;
  profileId?: string | null;
};

type Activity = {
  id: string;
  description?: string;
  table: string;
  method: string;
  time: string;
  userId: string;
};

type GetActivities = {
  message: string;
  data?: Activity[];
};

type CreateUserResponse = {
  message: string;
  data?: {
    id: string;
    username: string;
    email: string;
    password: string;
  };
};

type LoginUserResponse = {
  message: string;
  data?: {
    token: string;
  };
};

type _countType = {
  todos: number;
  activities: number;
};

type GetAddFriend = {
  message: string;
  data?: GetUserResponse[];
};

type FriendRealtion = {
  id: string;
  userId: string;
  friendUserId: string;
  isAccept: boolean;
  createdAt: string;
  updatedAt: string;
  initiator: GetUserResponse;
  respondent: GetUserResponse;
};

type GetFriends = {
  message: string;
  data?: FriendRealtion[];
};

type GetUserResponse = {
  email: string;
  id: string;
  imgUrl: string;
  role: string;
  method: string;
  password: string;
  username: string;
  profileId: string;
  bannerId: string;
  isOnline: boolean;
  createdAt: string;
  updatedAt: string;
  todoBackground: string;
  theme: string;
  todos?: TodoData[];
  activities?: Activity[];
  _count?: _countType;
};

type Notification = {
  id: string;
  userId: string;
  senderId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  Sender: GetUserResponse;
};

type NotificationsResponse = {
  message: string;
  data?: Notification[]
}

type FilteredFriends = {
  id: string;
  username: string;
  email: string;
  password: string;
  imgUrl: string;
  bannerId: string;
  profileId: string;
  role: string;
  isOnline: boolean;
  todoBackground: string;
  theme: string;
  relationId: string;
  method: string;
  createdAt: string;
  updatedAt: string;
}[] | undefined

interface TodoData {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface GetAllTodosResponse {
  message: string;
  data?: TodoData[];
}

interface CreateTodoRequest {
  title: string;
  description: string;
  category: string;
}

interface LoginWithFirebaseRequest {
  id: string;
  email: string;
  username: string;
  imgUrl: string;
  method: string;
}

interface CreateTodoResponse {
  message: string;
  data?: TodoData;
}

interface OtpResponse {
  message: string;
  data?: { verified: boolean };
}

export type {
  CreateTodoRequest,
  OtpResponse,
  CreateTodoResponse,
  GetActivities,
  NotificationsResponse,
  GetAllTodosResponse,
  CreateUserResponse,
  LoginUserResponse,
  GetUserResponse,
  LoginWithFirebaseRequest,
  updateUserRequest,
  GetAddFriend,
  FriendRealtion,
  GetFriends,
  TodoData,
  Activity,
  FilteredFriends
};
