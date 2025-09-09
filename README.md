🚀 LaunchPad AI
An AI-powered tool that takes your startup idea and instantly generates a complete business plan, pitch deck, and a functional, multi-page website prototype. Go from concept to clickable demo in seconds.

(Note: You will need to add a screenshot of your app to your repository for the image to display. A good path would be /public/screenshot.png)

✨ Live Demo
Check out the live application here: https://launchpadai.vercel.app/

(Replace the URL above with your actual Vercel deployment URL)

📋 Features
AI-Powered Content: Leverages a powerful language model to generate relevant and coherent business assets.

Website Prototyping: Instantly generates a complete, responsive HTML landing page with multiple simulated pages.

Live Preview: See a live, interactive preview of your generated website directly in the app.

Code Inspector: View and copy the full HTML source code of your new website.

Modern Interface: A clean, intuitive, and easy-to-use interface built with React and Tailwind CSS.

🛠️ Tech Stack
Framework: Next.js

UI Library: React

Styling: Tailwind CSS

AI Model: Google Gemini

Deployment: Vercel

⚙️ How It Works
LaunchPad AI provides a simple user interface where you can input a description of your startup idea.

The user enters their idea and clicks "Generate".

The Next.js frontend sends a POST request to a dedicated API route (/api/generate-website).

This API route securely communicates with the Gemini API, sending a detailed and structured prompt.

The AI model processes the prompt and returns a complete, single-file HTML document.

The API route sends the generated HTML back to the frontend.

The frontend displays the HTML in an iframe for a live preview and in a code block for inspection.

🚀 Getting Started
To run this project locally on your own machine, follow these steps.

Prerequisites
Node.js (v18 or later recommended)

npm, pnpm, or yarn

A Google Gemini API Key

1. Clone the Repository
git clone [https://github.com/jparuchu-818/LaunchPadAI.git](https://github.com/jparuchu-818/LaunchPadAI.git)
cd LaunchPadAI

2. Install Dependencies
npm install
# or
yarn install
# or
pnpm install

3. Set Up Environment Variables
Create a new file named .env.local in the root of your project

4. Run the Development Server
npm run dev

Open http://localhost:3000 with your browser to see the result.

🌐 Deployment
This application is designed for easy deployment on Vercel.

Push your code to a GitHub repository.

Import the repository into Vercel.

Deploy! Vercel will automatically build and deploy your application.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
