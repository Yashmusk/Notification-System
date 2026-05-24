const Job = require('../models/job.model');


exports.createJob = async (req, res) => {
  try {
    const {
      company,
      role,
      notes,
      rounds
    } = req.body;

    const job = await Job.create({
      user: req.user.id,
      company,
      role,
      notes,

      rounds: rounds.map((round) => ({
        title: round.title,
        status: round.status,
        scheduledAt: round.scheduledAt,
        feedback: round.feedback
      }))
    });

    res.status(201).json(job);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create job"
    });
  }
};

exports.getJobs = async (req, res) => {
  try {

    const jobs = await Job.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateJob = async (req, res) => {
  try {

    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedJob);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};