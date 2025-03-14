![image](https://github.com/user-attachments/assets/075ba3ae-545c-4698-9737-48db71b31987)

A comprehensive online testing platform with secure exams, auto-grading, and instant certification.

## 📝 About

Quizify is a modern online testing platform that enables secure exam administration, automatic grading, and instant certification. Our platform simplifies the entire testing process from creation to certification.

## ✨ Features

- **🔒 Secure Exam Environment** - Anti-cheating measures including tab-switching detection
- **⏱️ Timed Exams** - Set time limits with automatic submission when time expires
- **🔀 Randomized Questions** - Prevent cheating with randomized question order
- **📊 Performance Analytics** - Detailed insights and reports on exam performance
- **📜 Certificate Generation** - Automatic PDF certificate generation upon passing
- **🧮 Auto-Grading** - Instant evaluation of objective questions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS, Aceternity UI
- **Media Storage**: Cloudinary

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database
- GitHub OAuth credentials (for authentication)
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quizify.git
   cd quizify
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a .env.local file in the root directory with the following variables:
   ```bash
   NEXTAUTH_URL=http://localhost:3000
   AUTH_SECRET="your-secret-key"
   GITHUB_ID="your-github-oauth-id"
   GITHUB_SECRET="your-github-oauth-secret"
   MONGODB_URI=your-mongodb-connection-string
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open http://localhost:3000 in your browser

# ⚠️ Important Authentication Note

GitHub Authentication only works properly on localhost.

When deploying to Vercel or other hosting platforms, you'll need to:

Update the GitHub OAuth callback URL in your GitHub Developer settings
Set the appropriate NEXTAUTH_URL in your environment variables
For local testing, make sure your GitHub OAuth app has the callback URL set to:
http://localhost:3000/api/auth/callback/github
# 💻 Usage
Admin Dashboard
Create and manage exams
Review student performances
Generate reports
Student Experience
Sign in to your account
Browse available exams
Take timed assessments
Get instant feedback and certificates
# 🌐 Deployment
This app can be easily deployed on Vercel:

<img alt="Deploy with Vercel" src="https://vercel.com/button">
Remember to configure the required environment variables on your deployment platform.

# 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
