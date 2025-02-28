const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const OpenAI = require("openai");
const Resume = require("../models/Resume");
require("dotenv").config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

AWS.config.update({ region: "us-west-1" });
const s3 = new AWS.S3();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("resume"), async (req, res) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `resumes/${Date.now()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    };

    s3.upload(params, async (err, data) => {
        if (err) return res.status(500).json({ error: err.message });

        const aiResponse = await openai.completions.create({
            model: "gpt-4",
            prompt: `Review this resume and provide feedback:\n\n${req.file.buffer.toString()}`,
            max_tokens: 200,
        });

        const resume = new Resume({ fileUrl: data.Location, feedback: aiResponse.choices[0].text });
        await resume.save();
        res.json({ resume });
    });
});

module.exports = router; // ✅ Ensure you're exporting router

