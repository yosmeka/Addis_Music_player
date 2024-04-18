import express from 'express';
import { 
    register,
    login,
    getUser,
    logout,
    refreshToken,
    createPlayList,
    allPlaylists,
    removeFromPlaylist,
    singlePlayList,
    deletePlayList,
    availablePlaylists, 
} from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// Create Music
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.get('/:id', verifyToken, getUser);
router.post('/:id/logout', verifyToken, logout);
router.post('/:id/playlist', verifyToken, createPlayList);
router.get('/:id/playlist', verifyToken, allPlaylists);
router.delete('/:id/playlist/', verifyToken, removeFromPlaylist);
router.get('/:id/playlist/:title', verifyToken, singlePlayList);
router.delete('/:id/playlist/:title', verifyToken, deletePlayList);
router.get('/:id/aplaylists', verifyToken, availablePlaylists);

export default router;
