# Environment Configuration

## Backend Environment Variables

Create a `.env` file in the `riderschoice_backend` directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/riderschoice

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Email Configuration (if needed)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

## Frontend Environment Variables

Create a `.env` file in the `riderschoice_frontend` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/v1

# App Configuration
VITE_APP_NAME=Rider's Choice
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

## Production Environment

For production, use different values and ensure all sensitive data is properly secured.
