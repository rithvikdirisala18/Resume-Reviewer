const express = require("express");
const admin = require("../firebase");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { idToken } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email } = decodedToken;

        res.json({ message: "User authenticated", uid, email });
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
});

module.exports = router;

