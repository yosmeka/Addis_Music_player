import express from 'express';
import { 
    allMusics,
    createMusic, 
} from '../controllers/music.controllers.js';

// import { verifyClient } from "../utils/verifyToken.js";

const router = express.Router();

// // Get Music for a specific User
// router.get('/user/:userId', getClientMusic);

// // Get All Client Music with stats (new route)
// router.get('/clientwithstat/:userId', verifyClient, getAllClientMusicWithStats);

// Create Music
router.post('/', createMusic);
router.get('/', allMusics);
// // Update Music
// router.put('/:userId/:musicId', verifyClient, updateMusic);

// // Delete Music
// router.delete('/:userId/:musicId', verifyClient, deleteMusic);

// // Get Music by ID
// router.get('/single/:musicId', getMusic);

// // Get All Music
// router.get('/all', getAllMusic);

// // Get All Music with stats
// router.get('/allwithstat', getAllMusicWithStats);


export default router;