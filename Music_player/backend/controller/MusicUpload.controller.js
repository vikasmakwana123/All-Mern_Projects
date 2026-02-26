import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Configure multer to store files in /uploads/music
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/music');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Path to JSON library file
const libraryPath = path.join('uploads', 'musics_Name.json');

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

// Ensure uploads/music directory exists
if (!fs.existsSync('uploads/music')) {
  fs.mkdirSync('uploads/music', { recursive: true });
}

// Ensure JSON file exists
if (!fs.existsSync(libraryPath)) {
  fs.writeFileSync(libraryPath, JSON.stringify([]));
}
export const MusicUpload = (req, res) => {
  try {
    // ✅ Check token first
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check file existence
    if (!req.file) {
      return res.status(400).json({ message: "No music file uploaded" });
    }

    // Read existing library
    const library = JSON.parse(fs.readFileSync(libraryPath, "utf-8"));

    library.push({
      filename: req.file.filename,
      originalName: req.file.originalname,
      uploadedBy: decoded.username,
      uploadedAt: new Date()
    });

    fs.writeFileSync(libraryPath, JSON.stringify(library, null, 2));

    res.status(200).json({
      message: "Upload successful",
      song: req.file.originalname
    });

  } catch (err) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: err.message
    });
  }
};

export { upload };