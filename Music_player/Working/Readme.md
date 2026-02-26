## 🔧 Backend API Routes – Music Streaming Application

This backend provides a secure and optimized set of APIs for user authentication, audio upload, music listing, and chunk-based audio streaming.

---

## 🔐 1. Login API

This route is used to authenticate users.  
Login is **mandatory** before uploading any audio files.

- **Purpose:** Authenticate user credentials
- **Required Credentials:**
  - Username: `MusicUploadUser`
  - Password: `StrongPassword123`
- **Method:** `POST`
- **API Path:**/api/auth/login

**Usage:**  
Allows authorized users to access protected routes such as audio upload.

---

## 🎵 2. Upload Audio API

This route is responsible for uploading music files to the server.  
Only logged-in users can upload audio.

- **Purpose:** Upload and store audio files
- **Authentication:** Required
- **Storage Folder:** `Uploads/Music`
- **Method:** `POST`
- **API Path:**/api/audio/upload-music

**Usage:**  
Uploads a new music file that becomes available for streaming.

---

## 📃 3. Music List API

This route fetches the list of available music files without streaming them.  
It helps improve performance by avoiding large file downloads.

- **Purpose:** Fetch available music list
- **Data Returned:** Filenames and metadata
- **Method:** `GET`
- **API Path:**/api/audio/music-list

**Usage:**  
Used by the frontend to display the music library dynamically.

---

## ▶️ 4. Stream Music API

This route streams the selected music file in **chunks**, ensuring faster playback and efficient bandwidth usage.

- **Purpose:** Stream selected audio file
- **Streaming Type:** Chunk-based (Partial Content)
- **Parameter:** `filename`
- **Method:** `GET`
- **API Path:**/api/audio/music/:filename


**Usage:**  
When a user clicks a song, only that song is streamed on demand.

---

## 🔄 API Flow
Login → Upload Audio →  Update Music-list 

Fetch Music List → Stream Music


---

## ✅ Key Features

- Secure login-based access
- Protected audio upload
- Optimized music listing
- Fast chunk-based audio streaming
- Scalable backend architecture
