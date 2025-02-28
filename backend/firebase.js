const admin = require("firebase-admin");
const serviceAccount = require("./ai-resume-checker-e07bf-firebase-adminsdk-fbsvc-9d11d9fe1f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;