# Watembezi Safaris - Supabase Deployment Guide

## Prerequisites

1. **Supabase Account** - Sign up at [supabase.com](https://supabase.com)
2. **Node.js** - Download from [nodejs.org](https://nodejs.org)
3. **Git** - Download from [git-scm.com](https://git-scm.com)
4. **GitHub Account** - For version control (optional but recommended)

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Enter project details:
   - **Name**: `watembezi-safaris`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
4. Click **Create new project** and wait for setup (2-5 minutes)

---

## Step 2: Set Up Project Structure

Create the following folder structure in your project root:

```
watembezi-website1/
├── public/
│   ├── index.html
│   ├── about.html
│   ├── packages.html
│   ├── services.html
│   ├── contact.html
│   ├── videos.html
│   ├── styles.css
│   ├── videos.css
│   ├── script.js
│   ├── logo.png
│   └── videos.js
├── supabase/
│   ├── config.js
│   └── functions/
│       └── send-inquiry/
│           └── index.js
├── package.json
├── .env.local
├── .gitignore
└── vercel.json
```

---

## Step 3: Initialize Project

### 3.1 Create `package.json`

```bash
npm init -y
```

### 3.2 Install Dependencies

```bash
npm install @supabase/supabase-js dotenv cors express
npm install -D @supabase/functions-js vercel
```

---

## Step 4: Configure Supabase

### 4.1 Get API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy your:
   - **Project URL** (SUPABASE_URL)
   - **anon public** (SUPABASE_ANON_KEY)
   - **Service Role** (SUPABASE_SERVICE_ROLE_KEY)

### 4.2 Create `.env.local`

```bash
# Supabase Configuration
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# API Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4.3 Create `.gitignore`

```
node_modules/
.env.local
.env*.local
dist/
build/
.DS_Store
*.log
```

---

## Step 5: Database Setup

### 5.1 Create Tables in Supabase

Go to **SQL Editor** in Supabase and run:

```sql
-- Inquiries Table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  duration VARCHAR(50),
  travel_date DATE,
  guests INTEGER,
  budget VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Public insert policy (for form submissions)
CREATE POLICY "Anyone can insert inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_inquiries_email ON inquiries(email);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);
```

---

## Step 6: Create Supabase Config

Create `supabase/config.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabase
```

---

## Step 7: Create Backend Function

Create `supabase/functions/send-inquiry/index.js`:

```javascript
import { createClient } from '@supabase/supabase-js'
import { corsHeaders } from '../_shared/cors.js'

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
)

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, duration, date, guests, budget, message } = await req.json()

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: corsHeaders }
      )
    }

    // Insert into database
    const { data, error } = await supabaseClient
      .from('inquiries')
      .insert([
        {
          name,
          email,
          phone,
          duration,
          travel_date: date,
          guests,
          budget,
          message
        }
      ])

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: corsHeaders }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Inquiry submitted successfully',
        data 
      }),
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    )
  }
})
```

---

## Step 8: Update Contact Form Script

Update `script.js` to use Supabase:

```javascript
// Add to the contact form handler section
const contactForm = document.getElementById('contactForm')
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault()
    
    const name = document.getElementById('name')?.value
    const email = document.getElementById('email')?.value
    const phone = document.getElementById('phone')?.value
    const duration = document.getElementById('duration')?.value
    const date = document.getElementById('date')?.value
    const guests = document.getElementById('guests')?.value
    const budget = document.getElementById('budget')?.value
    const message = document.getElementById('message')?.value

    if (!name || !email || !message) {
      alert('Please fill in all required fields.')
      return
    }

    try {
      // Call Supabase function
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-inquiry`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            duration,
            date,
            guests: parseInt(guests),
            budget,
            message
          })
        }
      )

      const result = await response.json()

      if (response.ok) {
        alert('Thank you for your inquiry! Our team will contact you within 24 hours.')
        contactForm.reset()
        console.log('✓ Form submitted successfully:', result)
      } else {
        alert('Error submitting form. Please try again.')
        console.error('Form submission error:', result)
      }
    } catch (error) {
      alert('Network error. Please check your connection and try again.')
      console.error('Network error:', error)
    }
  })
}
```

---

## Step 9: Deploy to Vercel

### 9.1 Create `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "public",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key"
  },
  "functions": {
    "supabase/functions/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### 9.2 Deploy Steps

1. **Push to GitHub** (recommended):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Watembezi Safaris website"
   git remote add origin https://github.com/YOUR_USERNAME/watembezi-website1.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click **New Project**
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Click **Deploy**

---

## Step 10: Set Up Email Notifications (Optional)

To send emails when inquiries are submitted:

1. In Supabase, go to **Database** → **Extensions**
2. Enable **pg_net** for HTTP requests
3. Create a trigger to send emails via webhook

---

## Step 11: Security Checklist

- ✅ Never commit `.env.local` to version control
- ✅ Use Row Level Security (RLS) on all tables
- ✅ Set up CORS properly
- ✅ Validate all user inputs
- ✅ Use HTTPS for all requests
- ✅ Keep Supabase credentials secure
- ✅ Monitor database for suspicious activity

---

## Step 12: Testing

### Local Testing

```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# Test form submission
# Fill out contact form and submit
```

### Production Testing

1. Visit your deployed site
2. Fill out contact form
3. Check Supabase dashboard → **Table Editor** → `inquiries`
4. Verify data appears in real-time

---

## Step 13: Monitor & Maintain

### Regular Checks

- Monitor inquiry submissions in Supabase
- Check database performance metrics
- Review API usage and quotas
- Update dependencies monthly

### Scaling

When you need to scale:

1. **Upgrade Supabase Plan** - For higher database limits
2. **Add CDN** - Use Cloudflare for static assets
3. **Cache** - Implement caching for faster load times
4. **Analytics** - Add Vercel Analytics to monitor performance

---

## Troubleshooting

### Form Not Submitting

1. Check browser console for errors
2. Verify Supabase credentials in `.env.local`
3. Ensure RLS policies allow inserts
4. Check CORS configuration

### Database Connection Issues

1. Verify Supabase URL and key are correct
2. Check database status in Supabase dashboard
3. Ensure internet connection is active
4. Review database logs for errors

### Deployment Fails

1. Check Vercel build logs
2. Ensure `package.json` has correct scripts
3. Verify environment variables are set
4. Check for syntax errors in code

---

## Support Resources

- 📚 [Supabase Docs](https://supabase.com/docs)
- 🚀 [Vercel Docs](https://vercel.com/docs)
- 💬 [Supabase Discord](https://discord.supabase.com)
- 🔧 [GitHub Issues](https://github.com/supabase/supabase/issues)

---

## Next Steps

After deployment:

1. Set up custom domain
2. Configure email notifications
3. Add analytics tracking
4. Implement booking calendar
5. Add payment integration

Happy deploying! 🎉
