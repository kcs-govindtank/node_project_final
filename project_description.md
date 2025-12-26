# Node.js Authentication Project - Complete Implementation Guide

## Project Overview
This is a production-ready Node.js authentication system using Express.js and JWT (JSON Web Tokens). The system implements mobile-based authentication with OTP verification.

## Technology Stack (Exact Versions)
- **Node.js**: v18.16.0 (LTS recommended)
- **TypeScript**: v5.1.6
- **Express.js**: v4.18.2
- **jsonwebtoken**: v9.0.0
- **Database**: MongoDB v6.0+ (with Mongoose ODM)
- **Additional Dependencies**:
  - `mongoose`: v7.4.3
  - `dotenv`: v16.3.1
  - `bcrypt`: v5.1.0
  - `nodemailer`: v6.9.3 (for OTP delivery)
  - `twilio`: v4.19.0 (alternative for SMS OTP)

## Complete Project Structure
```
node_project_final/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── src/
│   ├── controllers/
│   │   └── authController.ts
│   ├── services/
│   │   └── authServices.ts
│   ├── models/
│   │   └── userModel.ts
│   ├── routes/
│   │   └── authRoutes.ts
│   ├── utils/
│   │   ├── otpGenerator.ts
│   │   └── errorHandler.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   └── app.ts
└── project_description.md
```

## Detailed Implementation Guide

### 1. Environment Configuration (.env)
```env
# JWT Configuration
JWT_SECRET=your_256bit_secret_key_here
JWT_EXPIRES_IN=1h
JWT_ISSUER=your_company_name

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/auth_db
DB_NAME=auth_db

# OTP Configuration
OTP_LENGTH=6
OTP_EXPIRY_MINUTES=5
OTP_MAX_ATTEMPTS=3

# SMS/Email Configuration (choose one)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# OR for email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 2. Package Dependencies (package.json)
```json
{
  "name": "node-auth-system",
  "version": "1.0.0",
  "description": "Complete authentication system with OTP",
  "main": "dist/app.js",
  "scripts": {
    "start": "node dist/app.js",
    "dev": "ts-node src/app.ts",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.4.3",
    "dotenv": "^16.3.1",
    "bcrypt": "^5.1.0",
    "nodemailer": "^6.9.3",
    "twilio": "^4.19.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0"
  },
  "devDependencies": {
    "typescript": "^5.1.6",
    "ts-node": "^10.9.1",
    "@types/express": "^4.17.17",
    "@types/jsonwebtoken": "^9.0.2",
    "@types/node": "^20.4.1",
    "@types/bcrypt": "^5.0.0",
    "@types/nodemailer": "^6.4.8",
    "@types/cors": "^2.8.13"
  }
}
```

### 3. TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

### 4. Database Model (userModel.ts)
```typescript
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNo: string;
  countryCode: string;
  gender: string;
  age: number;
  otp?: string;
  otpExpires?: Date;
  otpAttempts?: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true, unique: true },
  countryCode: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  age: { type: Number, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
  otpAttempts: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
```

### 5. Service Layer Implementation (authServices.ts)
```typescript
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { generateOTP } from '../utils/otpGenerator';
import { sendOTP } from '../utils/otpSender';

class AuthServices {
  static findMobileNumber = async (mobileNo: string) => {
    return await User.findOne({ mobileNo });
  };

  static register = async (
    firstName: string,
    lastName: string,
    emailId: string,
    mobileNo: string,
    countryCode: string,
    gender: string,
    age: number
  ) => {
    const user = new User({
      firstName,
      lastName,
      emailId,
      mobileNo,
      countryCode,
      gender,
      age,
      isVerified: false
    });
    return await user.save();
  };

  static loginUser = async (mobileNo: string, countryCode: string) => {
    const user = await User.findOne({ mobileNo, countryCode });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
        errorCode: 'USER_NOT_FOUND',
        data: null
      };
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    user.otpAttempts = 0;
    await user.save();

    await sendOTP(mobileNo, countryCode, otp);

    return {
      success: true,
      message: 'OTP sent successfully',
      data: {
        mobileNo: user.mobileNo,
        countryCode: user.countryCode
      }
    };
  };

  static verifyOTP = async (mobileNo: string, countryCode: string, otp: string) => {
    const user = await User.findOne({ mobileNo, countryCode });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
        errorCode: 'USER_NOT_FOUND',
        data: null
      };
    }

    if (user.otpAttempts >= 3) {
      return {
        success: false,
        message: 'Maximum OTP attempts reached',
        errorCode: 'MAX_ATTEMPTS',
        data: null
      };
    }

    if (user.otp !== otp) {
      user.otpAttempts += 1;
      await user.save();
      return {
        success: false,
        message: 'Invalid OTP',
        errorCode: 'INVALID_OTP',
        data: null
      };
    }

    if (user.otpExpires && user.otpExpires < new Date()) {
      return {
        success: false,
        message: 'OTP expired',
        errorCode: 'OTP_EXPIRED',
        data: null
      };
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;
    await user.save();

    return {
      success: true,
      message: 'OTP verified successfully',
      data: {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          mobileNo: user.mobileNo,
          countryCode: user.countryCode,
          isVerified: user.isVerified
        }
      }
    };
  };
}

export default AuthServices;
```

### 6. Utility Functions

#### OTP Generator (otpGenerator.ts)
```typescript
export const generateOTP = (length: number = 6): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};
```

#### OTP Sender (otpSender.ts)
```typescript
import nodemailer from 'nodemailer';
import twilio from 'twilio';

const sendSMS = async (mobileNo: string, countryCode: string, otp: string) => {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    body: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `${countryCode}${mobileNo}`
  });
};

const sendEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `"Auth System" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    html: `<b>Your OTP is: ${otp}</b>. It will expire in 5 minutes.`
  });
};

export const sendOTP = async (mobileNo: string, countryCode: string, otp: string) => {
  try {
    // Try SMS first, fallback to email
    await sendSMS(mobileNo, countryCode, otp);
  } catch (smsError) {
    console.error('SMS failed, falling back to email:', smsError);
    // Find user email to send OTP
    const user = await User.findOne({ mobileNo, countryCode });
    if (user?.emailId) {
      await sendEmail(user.emailId, otp);
    }
  }
};
```

### 7. Middleware (authMiddleware.ts)
```typescript
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'No token provided',
      errorCode: 'NO_TOKEN'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.userId = (decoded as any).userId;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: 'Invalid token',
      errorCode: 'INVALID_TOKEN'
    });
  }
};
```

### 8. Route Configuration (authRoutes.ts)
```typescript
import { Router } from 'express';
import AuthController from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify-otp', AuthController.verifyOtp);

// Protected routes (example)
router.get('/profile', authenticate, AuthController.getProfile);

export default router;
```

### 9. Main Application (app.ts)
```typescript
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: false,
    message: 'Something went wrong!',
    errorCode: 'SERVER_ERROR'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 10. API Documentation

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john@example.com",
  "mobileNo": "1234567890",
  "countryCode": "+1",
  "gender": "male",
  "age": 30
}
```

#### Login (Send OTP)
```
POST /api/auth/login
Content-Type: application/json

{
  "mobileNo": "1234567890",
  "countryCode": "+1"
}
```

#### Verify OTP
```
POST /api/auth/verify-otp
Content-Type: application/json

{
  "mobileNo": "1234567890",
  "countryCode": "+1",
  "otp": "123456"
}
```

### 11. Deployment Instructions

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Run in production**:
   ```bash
   npm start
   ```

3. **Docker Setup (optional)**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   CMD ["npm", "start"]
   ```

### 12. Testing Strategy

1. **Unit Tests** (using Jest):
   - Test each controller method
   - Test service layer functions
   - Test utility functions

2. **Integration Tests**:
   - Test API endpoints
   - Test database interactions
   - Test OTP flow

3. **E2E Tests**:
   - Test complete registration flow
   - Test login and OTP verification
   - Test protected routes

### 13. Security Best Practices Implemented

1. **Input Validation**:
   - All inputs validated in controller
   - MongoDB schema validation

2. **Authentication**:
   - JWT with short expiration
   - Secure token storage

3. **Data Protection**:
   - Environment variables for secrets
   - Helmet for security headers
   - CORS configuration

4. **Rate Limiting** (to be added):
   ```typescript
   import rateLimit from 'express-rate-limit';

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });

   app.use(limiter);
   ```

### 14. Monitoring and Logging

1. **Winston Logger**:
   ```typescript
   import winston from 'winston';

   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' })
     ]
   });
   ```

2. **Request Logging Middleware**:
   ```typescript
   app.use((req, res, next) => {
     logger.info(`${req.method} ${req.url}`);
     next();
   });
   ```

## Implementation Checklist

1. [ ] Set up Node.js v18.16.0
2. [ ] Install all dependencies
3. [ ] Configure TypeScript
4. [ ] Set up MongoDB
5. [ ] Configure environment variables
6. [ ] Implement all models
7. [ ] Implement all services
8. [ ] Implement all controllers
9. [ ] Set up routes
10. [ ] Configure middleware
11. [ ] Set up error handling
12. [ ] Implement OTP delivery
13. [ ] Test all endpoints
14. [ ] Deploy to production

## Troubleshooting Guide

1. **MongoDB Connection Issues**:
   - Verify URI in .env
   - Check MongoDB service is running
   - Verify network connectivity

2. **OTP Not Received**:
   - Check Twilio/email credentials
   - Verify OTP generation
   - Check spam folder for emails

3. **JWT Errors**:
   - Verify JWT_SECRET matches
   - Check token expiration
   - Validate token format

4. **CORS Issues**:
   - Configure allowed origins
   - Check preflight requests
   - Verify headers

This comprehensive guide provides everything needed to recreate the exact authentication system with all its features and configurations.
