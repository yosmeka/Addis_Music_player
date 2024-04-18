import express from 'express';
import { 
    allMusics,
    createMusic, 
} from '../controllers/music.controllers.js';

const router = express.Router();

// Create Music
router.post('/', createMusic);
router.get('/', allMusics);

export default router;