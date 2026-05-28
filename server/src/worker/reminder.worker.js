require("dotenv").config();

const { Worker } = require("bullmq");
const Redis = require("ioredis");
const transporter = require("../config/mail");

const connection = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null
});

const worker = new Worker(
  "email-reminder",

  async (job) => {
    console.log(
      "Processing reminder:",
      job.data
    );

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,

        subject: `Interview Reminder - ${job.data.company}`,

        text: `
Reminder for your interview

Company: ${job.data.company}
Role: ${job.data.role}
Round: ${job.data.roundTitle}
Time: ${new Date(
  job.data.scheduledAt
).toLocaleString()}
        `
      });

      console.log(
        "Email sent successfully"
      );

    } catch (error) {
      console.log(
        "MAIL ERROR:",
        error.message
      );
    }
  },

  {
    connection
  }
);

console.log(
  "Reminder worker started..."
);