
import { getAllUsers } from '../services/userService.js';

export const getUsersNameEmailRole = async (req, res) => {
    try {
        const users = await getAllUsers('name email role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};
