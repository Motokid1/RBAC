import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Get all users with 'user' role (Admin/Super Admin only)
export const getUsers = async (req, res) => {
  try {
    // Fetch users excluding password field
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user by ID (Super Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deletion of super admin accounts
    if (user.role === 'super_admin') {
      return res.status(403).json({ message: 'Cannot delete super admin' });
    }

    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile (username and/or password)
export const updateProfile = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update username if provided
    if (username) {
      user.username = username;
    }

    // Update password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    // Return updated user data without password
    const updatedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};