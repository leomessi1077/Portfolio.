# MERN Stack Portfolio

A modern, full-stack portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js), optimized for deployment on Vercel with serverless backend functions.

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful gradient designs with smooth animations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔥 **Serverless Backend** - API routes deployed as serverless functions on Vercel
- 💾 **MongoDB Integration** - Store visitor contacts and portfolio data
- 📧 **Contact Form** - With email and WhatsApp notifications (optional)
- ⚡ **Fast & Optimized** - Built with performance in mind
- 🚀 **Easy Deployment** - One-click deploy to Vercel

## 🛠️ Tech Stack

### Frontend
- React.js 19.x
- Mantine UI Components
- Framer Motion (Animations)
- Tabler Icons

### Backend
- Node.js
- Express.js (for local development)
- Serverless Functions (for production)
- MongoDB with Mongoose
- Twilio (optional WhatsApp notifications)

### Deployment
- Vercel (Frontend & Serverless API)
- MongoDB Atlas (Database)

## 📸 Screenshots

Beautiful gradient hero section with profile, contact form with validation, responsive project cards, and smooth animations throughout.

## 🚀 Quick Start

### Deploy to Vercel (Recommended)

Follow the [Quick Start Guide](./QUICKSTART.md) for a 5-minute deployment!

Or click here: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd mern-portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install

   # Install API dependencies (for Vercel)
   cd ../api
   npm install
   ```

3. **Set up environment variables**

   Create `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
   ```

4. **Run the development servers**

   Terminal 1 - Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Terminal 2 - Frontend:
   ```bash
   cd frontend
   npm start
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
mern-portfolio/
├── api/                      # Serverless API functions for Vercel
│   ├── contact.js           # Contact form endpoint
│   ├── portfolio.js         # Portfolio data endpoint
│   ├── health.js            # Health check endpoint
│   └── package.json         # API dependencies
│
├── backend/                 # Express backend for local development
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── server.js            # Express server
│   └── package.json
│
├── frontend/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── vercel.json             # Vercel configuration
├── package.json            # Root package.json
├── DEPLOYMENT.md           # Detailed deployment guide
└── QUICKSTART.md          # Quick deployment guide
```

## 🌐 API Endpoints

### Production (Vercel)
- `GET /api/health` - Server health check
- `GET /api/portfolio` - Get portfolio data
- `POST /api/portfolio` - Update portfolio data
- `GET /api/contact` - Get all contacts (admin)
- `POST /api/contact` - Submit contact form

### Local Development
Same endpoints, prefixed with `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

Create these in your Vercel dashboard:

**Required:**
- `MONGODB_URI` - MongoDB connection string

**Optional (for WhatsApp notifications):**
- `TWILIO_ACCOUNT_SID` - Twilio Account SID
- `TWILIO_AUTH_TOKEN` - Twilio Auth Token
- `TWILIO_WHATSAPP_FROM` - Sender WhatsApp number
- `TWILIO_WHATSAPP_TO` - Your WhatsApp number

See `.env.example` for more details.

## 📦 Deployment

### Vercel (Recommended)

See [QUICKSTART.md](./QUICKSTART.md) for quick deployment or [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms

While this project is optimized for Vercel, you can deploy to:
- **Netlify** - May require additional configuration
- **Railway** - Use the Express backend
- **Heroku** - Use the Express backend
- **AWS/GCP** - Deploy as containers

## 🎨 Customization

### Update Personal Information

1. **Home Section**: Edit `frontend/src/components/Home.js`
   - Update name, title, description
   - Change LinkedIn/GitHub links
   - Replace profile picture

2. **Projects**: Edit `frontend/src/components/Projects.js`
   - Add/remove projects
   - Update project details

3. **Skills**: Edit `frontend/src/components/Skills.js`
   - Add/remove skills
   - Update skill levels

4. **Experience**: Edit `frontend/src/components/Experience.js`
   - Add/remove work experience

### Change Colors/Theme

Edit `frontend/src/App.css` and component styles for custom colors.

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests (if implemented)
cd backend
npm test
```

## 📝 To-Do

- [ ] Add admin dashboard for managing content
- [ ] Implement blog section
- [ ] Add dark mode toggle
- [ ] Add Google Analytics
- [ ] Add contact form reCAPTCHA
- [ ] Add download resume button

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Manish Kumar Yadav**
- GitHub: [@leomessi1077](https://github.com/leomessi1077)
- LinkedIn: [Manish Kumar Yadav](https://www.linkedin.com/in/manish-kumar-yadav-6879691a0/)
- Email: yadavmanish7675@gmail.com

## 🙏 Acknowledgments

- Mantine UI for beautiful components
- Framer Motion for smooth animations
- MongoDB Atlas for free database hosting
- Vercel for amazing deployment platform

## 📞 Support

If you like this project, please give it a ⭐ on GitHub!

For issues or questions, please open an issue on GitHub or contact me directly.

---

**Built with ❤️ using MERN Stack**
