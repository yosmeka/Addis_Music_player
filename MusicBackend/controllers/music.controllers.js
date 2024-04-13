import Music from '../models/music.model.js'

export const createMusic = async (req, res, next) => {
    try {
        console.log(req.body)
        const { title, artist, album, categories } = req.body;
        const {image, music} = req.files;
        categories = JSON.parse()

        const newMusic = await Music.create({
            title,
            artist,
            album,
            categories,
            'coverImg.url': image[0].filename,
            'audio.url': music[0].filename,
        });

        res.status(201).json({message: 'Music created successfully', data: newMusic});

    } catch (error) {
        console.error('Error during music creation:', error);
        res.status(500).json({status: 500, message: 'Internal server error during music creation.'});
    }
};

export const allMusics = async (req, res, next) => {
    try {
        const musics = await Music.find({});
        res.status(200).json({message: 'Successfully retrieved', data: musics});
    } catch(error) {
        console.error('Error during fetch', error);
        next(error)
    }
}
