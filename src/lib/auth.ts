import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from "./prisma";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: process.env.BETTER_AUTH_URL,
    socialProviders: {
      google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
    },
    trustedOrigins: [process.env.APP_URL!],
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: true
    },
    user:{
      additionalFields:{
        role:{
          type: "string",
          defaultValue: "USER",
          required: false
        },
        phone:{
          type: "string",
          required: false
        },
        status: {
          type: "string",
          defaultValue: "ACTIVE",
          required: false
        }
      }
    },
    emailVerification:{
      sendVerificationEmail: async({user, url, token})=>{
        const info = await transporter.sendMail({
          from: process.env.APP_EMAIL,
          to: user.email,
          subject: "Verify your email",
          html: "<b>Hello world?</b>", // HTML version of the message
        });
      },
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: 3600
    }
});