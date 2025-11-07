# MoodMate - Your AI Mood Companion

MoodMate is a web application that provides empathetic conversation and mood tracking through an AI-powered chat interface. Built with FastAPI and OpenAI's GPT, it offers a warm, supportive space for users to express themselves and receive thoughtful responses.

## Features

- 💬 AI-powered empathetic chat
- 🌅 Daily wellness nudges and reminders
- 🎨 Clean, responsive web interface
- 🔒 Secure environment configuration
- 🚀 Ready for deployment on Railway

## Prerequisites

- Python 3.8 or higher
- OpenAI API key
- Railway account (for deployment)

## Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/Sheetal-Bisa/mood-tracker.git
cd mood-tracker
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Set up environment variables
Create a `.env` file in the project root:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server
```bash
uvicorn app.main:app --reload
```

The application will be available at `http://localhost:8000`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| OPENAI_API_KEY | Your OpenAI API key for chat functionality | Yes |

## Railway Deployment

1. Fork this repository
2. Create a new project in Railway
3. Connect your forked repository
4. Add environment variables:
   - In Railway dashboard, go to Variables
   - Add `OPENAI_API_KEY` with your OpenAI API key
5. Deploy the application

Railway will automatically build and deploy your application.

## Project Structure

```
mood-tracker/
├── app/
│   ├── routers/
│   │   ├── chat.py         # Chat endpoint handlers
│   │   └── pages.py        # Web page routes
│   ├── services/
│   │   ├── notifications.py    # Notification service
│   │   ├── openai_client.py   # OpenAI integration
│   │   └── scheduler.py       # Background task scheduler
│   ├── static/              # Static assets
│   └── templates/           # HTML templates
├── requirements.txt         # Python dependencies
└── Procfile               # Railway deployment config
```

## API Endpoints

- `GET /` - Home page
- `GET /chat` - Chat interface
- `POST /api/chat/` - Chat API endpoint
- `GET /wellness_nudges` - Wellness notifications page
- `GET /healthz` - Health check endpoint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Local Development Tips

- Use `python-dotenv` for local environment variables
- The development server auto-reloads on file changes
- Check the console for startup messages and errors
- Test the chat API with curl or Postman before using the UI

## Troubleshooting

1. OpenAI API Issues:
   - Verify your API key is correctly set in environment variables
   - Check for any rate limiting or quota issues
   - Ensure the key has proper permissions

2. Deployment Issues:
   - Confirm all environment variables are set in Railway
   - Check deployment logs for errors
   - Verify the Python version in Railway matches requirements

3. Local Development:
   - Make sure all dependencies are installed
   - Check the `.env` file is in the correct location
   - Verify the development server is running on the expected port

## License

[MIT License](LICENSE)