import express from 'express';
import {MusicUpload, upload} from '../../controller/MusicUpload.controller.js';
import {StreamMusic} from '../../controller/StreamMusic.controller.js';

const router = express.Router();
router.post('/upload-music', upload.single('music'), MusicUpload);
router.get('/music-list', StreamMusic.list);
router.get('/music/:filename', StreamMusic.stream);
export default router;