# 🚀 Vercel Deployment Guide - Portfolio with Backend

## Overview
This guide will help you deploy your MERN portfolio to Vercel with full backend functionality (MongoDB + Twilio WhatsApp notifications).

## Prerequisites
- ✅ GitHub account with your code pushed
- ✅ Vercel account (free tier works)
- ✅ MongoDB Atlas account (free tier)
- ✅ Twilio account (optional, for WhatsApp notifications)

---

## 📋 Step-by-Step Deployment

### 1. Set Up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or log in
3. Create a new cluster (free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy your connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Important:** Replace `<password>` with your actual database password
7. Under "Network Access", add `0.0.0.0/0` to allow connections from anywhere
8. Under "Database Access", create a database user with read/write permissions

### 2. Set Up Twilio (Optional - for WhatsApp Notifications)

1. Go to [Twilio](https://www.twilio.com/)
2. Create a free account
3. Get your Account SID and Auth Token from the dashboard
4. For WhatsApp:
   - Go to Messaging → Try it out → Send a WhatsApp message
   - Follow steps to connect your WhatsApp number
   - Note: Free tier has "Twilio Sandbox" - your number: `whatsapp:+14155238886`
   - Your WhatsApp number format: `whatsapp:+917571875252` (replace with your number)

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended for First Time)

1. Go to [Vercel](https://vercel.com/) and log in with GitHub
2. Click "New Project"
3. Import your GitHub repository: `leomessi1077/Portfolio`
4. Configure project:
   - **Framework Preset:** Create React App
   - **Root Directory:** `mern-portfolio`
   - **Build Command:** Leave default or use `npm run vercel-build`
   - **Output Directory:** `frontend/build`

5. **Add Environment Variables** (click "Environment Variables" tab):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   
   # Twilio (optional - remove if not using WhatsApp)
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   TWILIO_WHATSAPP_TO=whatsapp:+917571875252
   ```

6. Click "Deploy"

7. Wait for deployment (2-5 minutes)

8. Your site will be live at: `https://your-project.vercel.app`

#### Option B: Using Vercel CLI

1. Open terminal in your project directory
2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `portfolio` (or your choice)
   - Directory? `./mern-portfolio`
   
5. Add environment variables:
   ```bash
   vercel env add MONGODB_URI
   ```
   Paste your MongoDB connection string
   
   Repeat for all environment variables:
   ```bash
   vercel env add TWILIO_ACCOUNT_SID
   vercel env add TWILIO_AUTH_TOKEN
   vercel env add TWILIO_WHATSAPP_FROM
   vercel env add TWILIO_WHATSAPP_TO
   ```

6. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 🔧 Environment Variables Reference

### Required:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Optional (for WhatsApp notifications):
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+917571875252
```

**Note:** If you don't add Twilio variables, the contact form will still work - it just won't send WhatsApp notifications.

---

## ✅ Testing Your Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Navigate to the Contact section
3. Fill out the contact form and submit
4. Check:
   - Form submission works (no errors)
   - MongoDB Atlas → Collections → Should see new visitor entry
   - WhatsApp (if configured) → Should receive notification

---

## 🐛 Troubleshooting

### Contact Form Not Working?
1. Check Vercel logs: Dashboard → Your Project → Deployments → Click latest → Functions
2. Verify MongoDB connection string is correct
3. Ensure MongoDB Network Access allows `0.0.0.0/0`
4. Check browser console for errors

### WhatsApp Not Sending?
1. Verify Twilio credentials are correct
2. Check Twilio dashboard for error logs
3. Ensure WhatsApp numbers are in correct format: `whatsapp:+1234567890`
4. Free tier requires joining Twilio Sandbox first

### API Routes 404?
1. Ensure `vercel.json` is in root of `mern-portfolio` directory
2. Check API files are in `mern-portfolio/api/` folder
3. Redeploy after fixing

---

## 🎉 Success Checklist

- ✅ Website loads at Vercel URL
- ✅ All sections display correctly
- ✅ Contact form submits successfully
- ✅ Data saves to MongoDB
- ✅ WhatsApp notifications work (if configured)
- ✅ No console errors
- ✅ Mobile responsive

---

## 📝 Useful Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List environment variables
vercel env ls

# Add environment variable
vercel env add VARIABLE_NAME

# Remove deployment
vercel remove project-name
```

---

## 🔄 Updating Your Site

Every time you push to GitHub main branch, Vercel will automatically redeploy! 🎉

Manual deployment:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Vercel will detect the push and deploy automatically.

---

## 🌐 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Wait for DNS propagation (can take up to 48 hours)

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Twilio Docs:** https://www.twilio.com/docs

---

## 🎊 Your Portfolio is Live!

Share your portfolio URL:
- LinkedIn
- GitHub README
- Resume
- Social media

**Good luck with your job search!** 🚀

