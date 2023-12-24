export const SqlUser = `CREATE TABLE User (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    imgUrl VARCHAR(255),
    bannerId VARCHAR(255) DEFAULT '',
    profileId VARCHAR(255) DEFAULT '',
    role ENUM('ADMIN', 'MEMBER') DEFAULT 'MEMBER',
    todoBackground ENUM('NONE', 'LIGHT', 'DARK', 'SPACE', 'SAKURA', 'YELLOW', 'STORK', 'COLORFULL', 'SHEET', 'ROLLPAPER', 'SKETCH') DEFAULT 'NONE',
    theme ENUM('LIGHT', 'DARK', 'SYNTHWAVE', 'RETRO', 'CYBERPUNK', 'GARDEN', 'FOREST', 'AQUA', 'FANTASY', 'BLACK', 'DRACULA', 'NIGHT', 'COFFEE', 'DIM', 'SUNSET') DEFAULT 'DARK',
    method ENUM('EMAIL', 'GOOGLE', 'GITHUB', 'FACEBOOK') DEFAULT 'EMAIL',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  );`;

export const SqlNotification = `CREATE TABLE Notification (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    senderId VARCHAR(255),
    description VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE,
    INDEX idx_notification_user (userId),
    INDEX idx_notification_sender (senderId)
  );`;

export const SqlFrinds = `CREATE TABLE Friends (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    friendUserId VARCHAR(255),
    isAccept BOOLEAN DEFAULT false,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (friendUserId) REFERENCES User(id) ON DELETE CASCADE,
    INDEX idx_friends_user (userId),
    INDEX idx_friends_friend_user (friendUserId)
  );`;

export const SqlActivity = `CREATE TABLE Activity (
    id VARCHAR(255) PRIMARY KEY,
    description VARCHAR(255),
    table ENUM('TODO', 'USER'),
    method ENUM('READ', 'CREATE', 'DELETE', 'UPDATE'),
    userId VARCHAR(255),
    time DATETIME DEFAULT CURRENT_TIMESTAMP(),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    INDEX idx_activity_user (userId)
  );`;

export const SqlTodo = `CREATE TABLE Todo (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    category ENUM('WORK', 'PERSONAL', 'SHOPPING', 'OTHER'),
    completed BOOLEAN DEFAULT false,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    userId VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    INDEX idx_todo_user (userId)
  );`;

export const SqlOtp = `CREATE TABLE Otp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255) UNIQUE,
    code VARCHAR(255),
    verified BOOLEAN DEFAULT false,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    expiresAt DATETIME,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  );`;
