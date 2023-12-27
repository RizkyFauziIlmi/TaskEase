export const prismaUser = `enum Role {
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

export const prismaTodo = `model Todo {
  id          String       @id @default(uuid())
  title       String
  description String?
  category    TaskCategory // Menggunakan enum sebagai tipe data untuk kategori
  completed   Boolean      @default(false)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  userId      String
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
`;

export const prismaOtp = `model Otp {
  id        Int      @id @default(autoincrement())
  userId    String   @unique
  code      String
  verified  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  expiresAt DateTime
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}`;

export const prismaFriends = `model Friends {
  id           String   @id @default(uuid())
  userId       String
  friendUserId String
  initiator    User     @relation(name: "users", fields: [userId], references: [id], onDelete: Cascade)
  respondent   User     @relation(name: "friend_users", fields: [friendUserId], references: [id], onDelete: Cascade)
  isAccept     Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([userId])
  @@index([friendUserId])
}`;

export const prismaNotification = `model Notification {
  id          String   @id @default(uuid())
  userId      String
  senderId    String
  description String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  User        User     @relation(name: "receiver", fields: [userId], references: [id], onDelete: Cascade)
  Sender      User     @relation(name: "sender", fields: [senderId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([senderId])
}`;
