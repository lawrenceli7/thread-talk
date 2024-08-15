# ThreadTalk

ThreadTalk is a dynamic full-stack social media platform that enables users to create and share threads. Users can engage with others' posts through likes, dislikes, and comments, while also maintaining full control over their content by deleting their threads and comments whenever they wish.

## Installation Guide

### Root Directory
Run `npm install` to install all dependencies.

Create a `.env.local` file and add the following lines:

```
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

Then, run `npm run dev` to start the application.

## Features

1. **User Threads:** Create and share threads on the platform, allowing for open discussions and content sharing.
   
2. **Engagement:** Like, dislike, and comment on other users' threads, fostering interaction and community engagement.
   
3. **Content Control:** Full control over personal content with the ability to delete user-created threads and comments at any time.
   
4. **Responsive Design:** Fully optimized for both desktop and mobile devices, ensuring a seamless experience across all platforms.

## Technologies & Frameworks Used
- **Frontend:** Next.js, React.js, Typescript, TailwindCSS, Chakra UI
- **Backend, Authentication, and Database:** Firebase
- **Testing:** Vitest
- **Hosting:** Frontend and Backend deployed on Vercel

## Directory Structure

- `root directory`: Holds all client-side and server-side code

## Deployed on Vercel
- https://thread-talk-tau.vercel.app/
