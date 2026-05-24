const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    company: {
      type: String,
      required: true
    },

    role: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "Applied"
    },

    notes: {
      type: String,
      default: ""
    },

    rounds: [
      {
        title: {
          type: String
        },

        status: {
          type: String,
          default: "Upcoming"
        },

        scheduledAt: {
          type: Date
        },

        feedback: {
          type: String,
          default: ""
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Job", jobSchema);