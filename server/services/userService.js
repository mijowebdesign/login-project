
import User from '../models/User.js';

export const getAllUsers = async (fields = '') => {
    // fields može biti string tipa 'name email role'
    return await User.find({}, fields);
};