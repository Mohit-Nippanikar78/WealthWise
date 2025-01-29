# Wealth Wise

"Wealth Wise" is a comprehensive AI-powered personal finance advisor that combines various intelligent features including chatbot capabilities, financial analysis, and others. The project uses a modern tech stack with a React frontend and Python Flask backend.

## 🚀 Features

- AI-powered reAct agent with LLM integration
- Financial analysis and path planning
- Speech processing capabilities
- News aggregation and display
- Secure Google and Metamask login
- Clean visual dashboard to sumarise all your financial data
- MyData tab to update your financial data
- Recommendations tab to get the best investment options
- Money Matters - Learn about the finance world
- Financial Path - Plan your financial journey visually
- Money Calculator - Figure out how much money you'd have in the future
- AI Agent - A agent to help you with your financial queries with realtime data using browser, financial webites and APIs
- Money Plus - A place which gets realtime news and updates about the financial world
- Stock Analyzer - Notifies you the best time to invest

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Vite as build tool
- ESLint for code quality

### Backend
- Python Flask
- Google's Gemini AI
- Various AI/ML libraries
- Cloud services integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn
- Required API keys (Gemini, Cloudinary, etc.)

## 🔧 Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add necessary API keys and configurations

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the frontend directory
   - Add necessary configuration variables

## 🚀 Running the Application

### Backend
1. From the backend directory:
   ```bash
   python app.py
   ```
   The backend server will start on http://localhost:5000

### Frontend
1. From the frontend directory:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend development server will start on http://localhost:5173

## 🔑 Environment Variables

### Backend (.env)
Required environment variables for the backend:
- GEMINI_API_KEY
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- Other service-specific API keys

### Frontend (.env)
Required environment variables for the frontend:
- VITE_API_URL
- Other frontend-specific configurations

## 📁 Project Structure

```
TensionFlow-Xavier/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── agent.py            # AI agent implementation
│   ├── gemini_fin_path.py  # Financial analysis module
│   ├── scheduler.py        # Task scheduling
│   └── tools/              # Utility functions and tools
├── frontend/
│   ├── src/               # React source files
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
```

## 👥 Authors

- [Meet Patel](https://www.linkedin.com/in/meet244/)
- [Mohit Nippanikar](https://www.linkedin.com/in/mohitnippanikar/)
- [Rachit Chheda](https://www.linkedin.com/in/rachit-chheda-a1224124a/)

## 🙏 Acknowledgments

- Google Gemini AI
- OpenAI
- Other libraries and services used in the project 