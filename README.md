
# TaskEase

Web App for Todo


## Environment Variables

To run this project, you will need to add the following environment variables to your 

### .env on server
`DATABASE_URL`\
`SHADOW_DATABASE_URL` (optional)\
`SECRET_KEY` (jwt)\
`CLIENT_URL` (default vite: http://localhost:5173) \
`NODEMAILER_USER`\
`NODEMAILER_PASS` 

### .env on client
`VITE_GIPHY_API_KEY`\
`VITE_GIPHY_API_KEY_DEV`  
`VITE_FIREBASE_APIKEY`\
`VITE_FIREBASE_AUTHDOMAIN`\
`VITE_FIREBASE_PROJECT_ID`\
`VITE_FIREBASE_STORAGE_BUCKET`\
`VITE_FIREBASE_MESSAGING_SENDER_ID`\
`VITE_FIREBASE_APP_ID`\
`VITE_FIREBASE_MEASUREMENT_ID`
## Run Locally

Clone the project

```bash
  git clone https://github.com/RizkyFauziIlmi/TaskEase.git
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm run dev
```
