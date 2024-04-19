import express from 'express';
import { 
    allMusics,
    createMusic,
    deleteMusic,
    singleMusic,
    updateMusic, 
} from '../controllers/music.controllers.js';

const router = express.Router();

// Create Music
router.post('/', createMusic);
router.get('/', allMusics);
router.get('/:id', singleMusic);
router.patch('/:id', updateMusic);
router.delete('/:id', deleteMusic);

export default router;