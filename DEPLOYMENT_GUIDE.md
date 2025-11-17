# 🚀 Complete Deployment Guide - StayKro

## Overview

- **Backend**: Node.js/Express deployed on Render
- **Frontend**: React/Vite deployed on Vercel
- **Database**: MongoDB Atlas (Cloud)
- **Storage**: Cloudinary (Images)
- **Payments**: Razorpay

---

## 📋 Prerequisites

1. **GitHub Account** - Already connected
2. **Render Account** - https://render.com (free tier available)
3. **Vercel Account** - https://vercel.com (free tier available)
4. **MongoDB Atlas Account** - https://mongodb.com/cloud/atlas (free tier)
5. **Cloudinary Account** - https://cloudinary.com (free tier)
6. **Razorpay Account** - https://razorpay.com (for payments)

---

## ⚙️ Step 1: Fix Render Backend Deployment

### Issue

Backend failing due to missing Razorpay environment variables.

### Fix Applied ✅

- Made Razorpay initialization optional (app now starts without payment keys)
- Updated CORS to handle production URLs
- Changed payment route to gracefully handle missing credentials

### Steps to Deploy on Render

1. **Go to Render Dashboard**

   - Navigate to: https://dashboard.render.com
   - Find your service: `staykro-backend`

2. **Add Environment Variables**
   - Click on **Settings** → **Environment**
   - Add these variables:

```
MONGO_URI=mongodb+srv://00786malikmustakeem_db_user:CgLm5PHVdUFjkKrM@staykrocluster.5m3t3on.mongodb.net/?appName=stayKroCluster
PORT=3000
NODE_ENV=production
JWT_SECRET=your_super_secret_key
RAZORPAY_KEY_ID=rzp_live_xxxxx (get from Razorpay)
RAZORPAY_KEY_SECRET=xxxxxxx (get from Razorpay)
FRONTEND_URL=https://yourdomain.vercel.app (your Vercel frontend URL)
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
```

3. **Trigger Manual Deploy**
   - Click **Deployments** tab
   - Click **Manual Deploy** button
   - Wait 2-3 minutes for deployment
   - Check logs for any errors

---

## 🎨 Step 2: Deploy Frontend on Vercel

### Vercel Already Has Access

Vercel is already monitoring your GitHub repo. Follow these steps:

1. **Go to Vercel Dashboard**

   - Navigate to: https://vercel.com/dashboard
   - Click on your project or connect repo if not there

2. **Add Environment Variables**
   - Go to **Settings** → **Environment Variables**
   - Add:

```
VITE_API_URL=https://staykro-backend.onrender.com
```

3. **Deploy**

   - Push code to `main` branch
   - Vercel auto-deploys on every push
   - OR manually trigger deploy from dashboard

4. **Check Deployment**
   - Once deployed, visit your production URL
   - Check browser console for any errors

---

## 🔑 Step 3: Get Razorpay Credentials

1. Go to https://razorpay.com/dashboard
2. Login to your account
3. Go to **Settings** → **API Keys**
4. Copy:
   - **Key ID** (starts with `rzp_live_` or `rzp_test_`)
   - **Key Secret** (long string)
5. Add to Render environment variables

---

## 📦 Step 4: Get Cloudinary Credentials

1. Go to https://cloudinary.com/console
2. Dashboard shows your:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Add to Render environment variables (should already be there)

---

## 🔍 Troubleshooting

### ❌ Render Deployment Still Failing

Check logs at: https://dashboard.render.com → Your Service → Logs

Common issues:

- **Missing `RAZORPAY_KEY_ID`**: Now optional, should work without it
- **Database connection error**: Check `MONGO_URI` is correct
- **CORS error**: Frontend URL must be added to server.js CORS config ✅

### ❌ Frontend Shows "Cannot reach backend"

1. Verify Render backend is running: `https://staykro-backend.onrender.com/api/auth/me`
2. Check `VITE_API_URL` environment variable in Vercel
3. Check browser console for exact error
4. Ensure Render backend IP is in MongoDB Atlas whitelist (should be \*)

### ❌ Vercel Build Failing

Check Vercel logs:

- Go to **Deployments** → Click on failed deploy
- Scroll to bottom to see build errors
- Common fix: `npm install --legacy-peer-deps`

---

## 📝 Updated Configuration Files

### Frontend (client/.env)

```
VITE_API_URL=https://staykro-backend.onrender.com
```

### Backend (server/.env)

Already has production MongoDB URI.
Add these for production:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `FRONTEND_URL=https://your-vercel-domain.vercel.app`

---

## 🧪 Testing Production Deployment

1. **Backend Health Check**

   ```bash
   curl https://staykro-backend.onrender.com/api/auth/me
   ```

   Should return: `{"message":"User not authenticated"}` or similar

2. **Frontend Health Check**

   - Visit your Vercel domain
   - Open browser DevTools (F12)
   - Check Console for errors
   - Try logging in

3. **Database Connection**

   - Check MongoDB Atlas connection activity
   - Go to https://cloud.mongodb.com → Your Cluster → Monitoring

4. **Payment Gateway** (Optional testing)
   - Use Razorpay test credentials
   - Create test payment through app
   - Check Razorpay dashboard for transaction

---

## 🚀 Quick Deployment Checklist

- [ ] Backend environment variables added to Render
- [ ] Frontend environment variables added to Vercel
- [ ] Changes pushed to GitHub main branch
- [ ] Render backend redeployed
- [ ] Vercel frontend redeployed
- [ ] Backend URL accessible
- [ ] Frontend connects to backend (check network requests)
- [ ] Login/signup working
- [ ] Hotels displaying
- [ ] Booking flow working
- [ ] Admin panel accessible

---

## 📲 Production URLs

After deployment:

- **Frontend**: https://travelwindow.vercel.app (or your custom domain)
- **Backend**: https://staykro-backend.onrender.com
- **API Base**: `https://staykro-backend.onrender.com/api`

---

## 💡 Important Notes

1. **Free Tier Limitations**

   - Render: Instance spins down after 15 min inactivity (50s delay on next request)
   - Vercel: Standard free tier limits apply
   - MongoDB Atlas: Free tier has 500MB storage limit

2. **To Upgrade (Recommended for Production)**

   - Render: Upgrade to paid plan ($7+/month)
   - Vercel: Already good for traffic with free tier

3. **Scaling**
   - As user base grows, upgrade database
   - Monitor Render metrics in dashboard
   - Set up monitoring/alerts in Render

---

## 🆘 Need Help?

### Render Support

- Docs: https://render.com/docs
- Status: https://status.render.com

### Vercel Support

- Docs: https://vercel.com/docs
- Status: https://www.vercel-status.com

### Common Discord/Community Resources

- Render Discord: https://render.com/community
- Vercel Community: https://vercel.com/community
