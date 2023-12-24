export const prismaUser = `
enum Role {
    ADMIN
    MEMBER
}
  
enum MethodProvider {
    EMAIL
    GOOGLE
    GITHUB
    FACEBOOK
}
  
// Enum untuk kategori todo
enum TaskCategory {
  WORK
  PERSONAL
  SHOPPING
  OTHER
}

enum Theme {
  LIGHT
  DARK
  SYNTHWAVE
  RETRO
  CYBERPUNK
  GARDEN
  FOREST
  AQUA
  FANTASY
  BLACK
  DRACULA
  NIGHT
  COFFEE
  DIM
  SUNSET
}

// Tabel User
model User {
  id                  String         @id @default(uuid())
  username            String
  email               String?
  password            String?
  imgUrl              String?
  bannerId            String?        @default("")
  profileId           String?        @default("")
  role                Role           @default(MEMBER)
  todos               Todo[]
  activities          Activity[]
  notifications       Notification[] @relation(name: "receiver")
  sendedNotifications Notification[] @relation(name: "sender")
  userFriends         Friends[]      @relation(name: "users")
  friendUserFriends   Friends[]      @relation(name: "friend_users")
  otp                 Otp?
  isOnline            Boolean        @default(false)
  todoBackground      TodoBackground @default(NONE)
  theme               Theme          @default(DARK)
  method              MethodProvider @default(EMAIL)
  createdAt           DateTime       @default(now())
  updatedAt           DateTime       @updatedAt

  @@fulltext([username, email])
}`;
