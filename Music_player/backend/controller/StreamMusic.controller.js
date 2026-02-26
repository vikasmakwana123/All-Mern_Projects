import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Path to JSON library file
const libraryPath = path.join('uploads', 'musics_Name.json');

export const StreamMusic = {
  list: (req, res) => {
    const library = JSON.parse(fs.readFileSync(libraryPath));
    res.json(library.map(song => ({
      originalName: song.originalName,
      filename: song.filename
    })));
  },
  stream: (req, res) => {
    console.log('\n=== AUDIO STREAM REQUEST ===');
    console.log('Raw filename from URL:', req.params.filename);
    
    const decodedFilename = decodeURIComponent(req.params.filename);
    console.log('Decoded filename:', decodedFilename);
    
    const filePath = path.resolve('uploads/music', decodedFilename);
    console.log('Full file path:', filePath);

    // Check if file exists
    const fileExists = fs.existsSync(filePath);
    console.log('File exists?:', fileExists);

    // Get file stats
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('❌ File stat error:', err.code, err.message);
        console.log('Listing files in uploads/music:');
        try {
          const files = fs.readdirSync('uploads/music');
          console.log('Available files:', files);
        } catch (e) {
          console.error('Error reading directory:', e.message);
        }
        return res.status(404).json({ message: 'File not found', path: filePath });
      }

      console.log('✅ File found! Size:', stats.size, 'bytes');

      // Parse Range header (e.g., "bytes=0-")
      const range = req.headers.range;
      if (!range) {
        // If no range, send entire file
        res.writeHead(200, {
          'Content-Type': 'audio/mpeg',
          'Content-Length': stats.size,
        });
        fs.createReadStream(filePath).pipe(res);
        return;
      }

      // Extract start and end from range
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

      // Chunk size
      const chunkSize = end - start + 1;

      // Set headers for partial content
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'audio/mpeg',
      });

      // Stream the chunk
      const stream = fs.createReadStream(filePath, { start, end });
      stream.pipe(res);
    });
  }
};