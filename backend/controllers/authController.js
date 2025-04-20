const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user.model');

const validateInput = (email, password, full_name, role, avatar_url) => {
  if (!email || !password || !full_name || !role) {
    return 'All fields (email, password, full_name, role) are required';
  }
  if (!validator.isEmail(email)) {
    return 'Please provide a valid email address';
  }
  if (!validator.isLength(password, { min: 8 })) {
    return 'Password must be at least 8 characters long';
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain at least one uppercase, lowercase, and number';
  }
  if (!validator.isLength(full_name.trim(), { min: 2, max: 100 })) {
    return 'Full name must be between 2 and 100 characters';
  }
  if (!['attendee', 'organizer'].includes(role)) {
    return 'Role must be either "attendee" or "organizer"';
  }
  if (avatar_url && !validator.isURL(avatar_url)) {
    return 'Avatar URL must be a valid URL';
  }
  return null;
};

const registerUser = async (req, res) => {
  try {
    const { full_name, email, password, role, avatar_url } = req.body;
    const validationError = validateInput(email, password, full_name, role, avatar_url);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const normalizedEmail = validator.normalizeEmail(email.trim());
    const userExists = await User.findOne({ where: { email: normalizedEmail } });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      full_name: full_name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      avatar_url: avatar_url || null
    });
    console.log('User created:', user.toJSON());

    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        avatar_url: user.avatar_url,
        is_verified: user.is_verified
      }
    });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof password !== 'string') {
      console.log('Validation failed:', { email, password });
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const normalizedEmail = validator.normalizeEmail(email.trim());
    if (!normalizedEmail) {
      console.log('Email normalization failed:', email);
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    console.log('Searching for user with email:', normalizedEmail);
    const user = await User.findOne({ where: { email: normalizedEmail } });
    if (!user) {
      console.log('User not found:', normalizedEmail);
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('Comparing password for user:', user.email);
    const isMatch = await user.comparePassword(password.trim());
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Password mismatch for user:', user.email);
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userData = {
      id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      avatar_url: user.avatar_url,
      is_verified: user.is_verified
    };
    console.log('Login successful for:', user.email);
    return res.status(200).json({ success: true, token, user: userData });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
};

module.exports = { registerUser, loginUser };