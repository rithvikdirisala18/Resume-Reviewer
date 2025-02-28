import { useState } from "react";
import axios from "axios";

export default function ResumeUpload() {
    const [file, setFile] = useState(null);
    const [feedback, setFeedback] = useState("");

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("resume", file);

        const res = await axios.post("http://localhost:5000/api/resume/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setFeedback(res.data.resume.feedback);
    };

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            {feedback && <p>Feedback: {feedback}</p>}
        </div>
    );
}
