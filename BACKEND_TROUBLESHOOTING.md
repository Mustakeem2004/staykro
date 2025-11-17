# 🔍 Backend Troubleshooting Checklist

## Quick Diagnosis Steps

### 1. **Check Backend is Running**

```bash
# Test health endpoint
curl https://staykro-backend.onrender.com/api/health

# Expected response:
# {"status":"ok","server":"staykro-backend",...}
```

### 2. **Verify CORS is Working**

```bash
# From browser console:
fetch('https://staykro-backend.onrender.com/api/auth/me', {
  credentials: 'include'
}).then(r => r.json()).then(console.log)

# Expected: {"message":"Not logged in"} or user object
```

### 3. **Check Frontend is Using Correct API URL**

```bash
# From browser console:
import API_BASE_URL from './config/api'
console.log('API_BASE_URL:', API_BASE_URL)

# Expected: https://staykro-backend.onrender.com
```

### 4. **Verify Network Requests in DevTools**

- Open DevTools (F12)
- Go to Network tab
- Perform an action (login, fetch hotels, etc)
- Check:
  - Request URL should be: https://staykro-backend.onrender.com/api/...
  - Status should be 2xx or 4xx (not CORS error)
  - Response headers should have Access-Control-Allow-Origin

---

## Common Issues & Fixes

### ❌ Issue: "CORS error" or "blocked by CORS policy"

**Causes:**

- Frontend domain not in CORS allowed origins ✅ FIXED (added staykro.vercel.app)
- Credentials not being sent
- OPTIONS preflight failing

**Solution:**

- Verify Render backend redeployed (check logs)
- Check browser Network tab for preflight response
- Ensure `credentials: 'include'` in fetch calls

### ❌ Issue: "Cannot reach backend" / "Failed to fetch"

**Causes:**

- Backend is cold-starting (Render free tier)
- Backend is down
- Timeout on first request

**Solution:**

- First request can take 30-50 seconds (free tier)
- Check Render dashboard for errors
- Wait 1-2 minutes and retry

### ❌ Issue: "401 Unauthorized" on protected routes

**Normal behavior** - means backend is working!

- User needs to login first
- Then cookies will be sent automatically

### ❌ Issue: "500 Server Error"

**Causes:**

- Database connection failing
- Missing environment variables
- Code error in backend

**Solution:**

- Check Render logs: Dashboard > Service > Logs
- Verify MONGO_URI is correct
- Verify all required env vars are set

### ❌ Issue: "Hotels not loading" but no error

**Causes:**

- API endpoint issue
- Wrong data format
- Silent catch block

**Solution:**

- Check Network tab responses
- Look for console errors
- Verify `/api/user/hotelList` endpoint exists

---

## Environment Variables Checklist

**On Render Dashboard (Settings → Environment):**

- [ ] MONGO_URI ✅
- [ ] PORT=3000 ✅
- [ ] NODE_ENV=production ✅
- [ ] JWT_SECRET ✅
- [ ] RAZORPAY_KEY_ID (optional)
- [ ] RAZORPAY_KEY_SECRET (optional)
- [ ] CLOUDINARY_CLOUD_NAME ✅
- [ ] CLOUDINARY_API_KEY ✅
- [ ] CLOUDINARY_API_SECRET ✅
- [ ] FRONTEND_URL (optional, auto-detected)

**On Vercel (Settings → Environment Variables):**

- [ ] VITE_API_URL=https://staykro-backend.onrender.com

---

## Recent Fixes Applied

✅ **CORS Update**: Added staykro.vercel.app to allowed origins
✅ **Health Endpoint**: Added /api/health for quick diagnostics
✅ **Error Handling**: Razorpay now optional
✅ **API Config**: Frontend auto-detects backend URL

---

## Testing After Fixes

1. **Wait 2-3 minutes** for Render to redeploy
2. **Hard refresh** frontend (Ctrl+Shift+R or Cmd+Shift+R)
3. **Clear browser cache** (DevTools → Application → Clear Storage)
4. **Try these actions:**
   - Go to home page → Should load hotels
   - Click signup → Should work
   - Try login with test account
   - Add hotel to cart
   - View admin dashboard (if admin)

---

## Debug Mode: Check API Responses

**In browser console:**

```javascript
// Check API Base URL
import API_BASE_URL from "./config/api";
console.log("API_BASE_URL:", API_BASE_URL);

// Make test API call
fetch(API_BASE_URL + "/api/auth/me", {
  credentials: "include",
})
  .then((r) => r.json())
  .then((d) => console.log("Response:", d))
  .catch((e) => console.error("Error:", e));

// Check specific endpoint
fetch(API_BASE_URL + "/api/cities?query=london", {
  credentials: "include",
})
  .then((r) => r.json())
  .then((d) => console.log("Cities:", d))
  .catch((e) => console.error("Error:", e));
```

---

## If Still Not Working

1. **Render Logs**: https://dashboard.render.com → staykro-backend → Logs
2. **Vercel Logs**: https://vercel.com → Project → Deployments
3. **Browser Console**: F12 → Console tab → Look for errors
4. **Network Tab**: F12 → Network → Check failed requests
5. **Check MongoDB**: Is database accessible?
6. **Free Tier Issues**: Is Render instance spinning down?

---

## Quick Fix: Manual Render Redeploy

If changes aren't reflecting:

1. Go to https://dashboard.render.com
2. Select staykro-backend service
3. Click "Deployments"
4. Click "Manual Deploy" button
5. Wait 2-3 minutes for deploy to complete

---

## Contact Support

- **Render Support**: https://render.com/docs
- **Vercel Support**: https://vercel.com/help
- **MongoDB Atlas**: https://docs.mongodb.com/
