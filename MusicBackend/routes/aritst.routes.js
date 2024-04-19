import express from 'express';
import { allArtists, createArtist, deleteArtist, getArtist, updateArtist } from '../controllers/artist.controllers.js';
import {verifyToken} from '../utils/verifyToken.js';

const router = express.Router();

// Create Music
router.post('/',verifyToken, createArtist);
router.get('/', allArtists);
router.get('/:id', getArtist);
router.patch('/:id',verifyToken, updateArtist);
router.delete('/:id',verifyToken, deleteArtist);

export default router;