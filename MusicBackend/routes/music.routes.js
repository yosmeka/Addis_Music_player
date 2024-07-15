import express from 'express';
import { 
    allMusics,
    createMusic,
    deleteMusic,
    singleMusic,
    updateMusic, 
} from '../controllers/music.controllers.js';
import {verifyToken} from '../utils/verifyToken.js';

const router = express.Router();


router.post('/',verifyToken, createMusic);
router.get('/', allMusics);
router.get('/:id', singleMusic);
router.patch('/:id',verifyToken, updateMusic);
router.delete('/:id',verifyToken, deleteMusic);

export default router;