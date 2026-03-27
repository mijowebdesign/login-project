
import User from '../models/User.js';

export const getAllUsers = async (fields = '') => {
    // fields može biti string tipa 'name email role'
    return await User.find({}, fields);
};

export const deleteUserById = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

export const updateUserById = async (userId, data) => {
    return await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true }).select('name email role');
};