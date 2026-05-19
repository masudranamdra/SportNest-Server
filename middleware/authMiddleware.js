const User = require('../models/User');
const mongoose = require('mongoose');
const crypto = require('crypto');

const getSessionCookie = (cookies = {}) =>
  cookies['better-auth.session_token'] ||
  cookies['__Secure-better-auth.session_token'] ||
  cookies['better-auth-session_token'] ||
  cookies['__Secure-better-auth-session_token'];

const verifySignedCookie = (cookieValue) => {
  if (!cookieValue || !process.env.BETTER_AUTH_SECRET) return null;

  const signatureStart = cookieValue.lastIndexOf('.');
  if (signatureStart < 1) return null;

  const token = cookieValue.slice(0, signatureStart);
  const signature = cookieValue.slice(signatureStart + 1);
  const expected = crypto
    .createHmac('sha256', process.env.BETTER_AUTH_SECRET)
    .update(token)
    .digest('base64url');

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) return null;

  return crypto.timingSafeEqual(signatureBuffer, expectedBuffer) ? token : null;
};

const protect = async (req, res, next) => {
  try {
    const signedSessionCookie = getSessionCookie(req.cookies);
    const sessionToken = verifySignedCookie(signedSessionCookie);
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, login required',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database connection not ready',
      });
    }

    const Session = mongoose.connection.db.collection('session');
    const session = await Session.findOne({ token: sessionToken });
    
    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Session not found or invalid',
      });
    }

    if (new Date(session.expiresAt) < new Date()) {
      return res.status(401).json({
        success: false,
        message: 'Session has expired',
      });
    }

    const user = await User.findById(session.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, authentication error',
    });
  }
};

module.exports = { protect };
