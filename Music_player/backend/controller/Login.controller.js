import jwt from 'jsonwebtoken';

export const loginController = (req, res) => {
  const { username, password } = req.body;

  // Validate against .env credentials
  if (
    username === process.env.APP_USERNAME &&
    password === process.env.APP_PASSWORD
  ) {
    // Generate JWT
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '7h',
    });

    // ✅ Set cookie first
    res.cookie('authToken', token, {
      httpOnly: true, // safer: prevents JS access
      secure: process.env.NODE_ENV === 'production', // only HTTPS in production
      sameSite: 'lax',
      maxAge: 7 * 60 * 60 * 1000, // 7 hours
    });

    // ✅ Then send JSON response
    res.status(200).json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
