import Music from '../models/music.model.js'
import {unlink} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import { createError } from '../utils/messages.js';
import Artist from '../models/artist.model.js';

export const createMusic = async (req, res, next) => {
    try {
        if (req.role !== 'admin') 
            return res.status(403).json(createError('Unauthorized!'));

        let { title, artist, album, categories } = req.body;
        const {image, music} = req.files;
        
        categories = JSON.parse(categories);
        categories.map(
            category => category.trim().toLowerCase()
        );
        
        if (!music)
            res.status(400).json(createError('Music is required'));

        if (!await Artist.exists({_id: artist}))
            return res.status(400).json(createError('Artist Doesn\'t exist'))
        
        let files = {
            'audio.url': 'musics/'+music[0].filename,
            'audio.path': music[0].path,
        };
        if (image) {
            files['coverImg.url'] = 'images/'+image[0].filename;
            files['coverImg.path'] = image[0].path;
        }
        
        const newMusic = await Music.create({
            title,
            artist,
            album,
            categories: categories,
            ...files
        });
        
        return res.status(201).json({message: 'Music created successfully', data: newMusic});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, message: 'Internal server error during music creation.'});
    }
};

export const allMusics = async (req, res, next) => {
    try {
        const musics = await Music.find({}).select('-coverImg.path -audio.path').populate('artist');

        res.status(200).json({message: 'Successfully retrieved', data: musics});
    } catch(error) {
        next(error);
    }
}

export const singleMusic = async (req, res, next) => {
    try {
        const music = await Music.findById(req.params.id).select('-coverImg.path -audio.path').populate('artist');
        if (!music)
            return res.status(404).json(createError(404, 'Music not found.'));
        res.status(200).json({message: 'Successfully retrieved', music});
        
    } catch(error) {
        next(error);
    }
}

export const updateMusic = async (req, res, next) => {
    try {
        if (req.role !== 'admin')
            return res.status(403).json(createError('Unauthorized!'));

        let { title, artist, album, categories } = req.body;
        const {image, music} = req.files;
        categories = JSON.parse(categories);
        categories.map(category => category.trim().toLowerCase());

        const musicdata = await Music.findById(req.params.id);
        if (artist && !await Artist.exists({id: artist}))
            artist = musicdata.artist
    
        if (!musicdata) 
            return res.status(404).json(createError(404, 'Music not found.'));
        musicdata.title = title || musicdata.title;
        musicdata.artist = artist || musicdata.artist;
        musicdata.album = album || musicdata.album;
        musicdata.categories = categories || musicdata.categories;
        
        if (image) {
            if (musicdata.coverImg.path && existsSync(musicdata.coverImg.path))
                await unlink(musicdata.coverImg.path);
            musicdata.coverImg.url = 'images/'+image[0].filename
            musicdata.coverImg.path = image[0].path
        }
        if (music) {
            if (existsSync(musicdata.audio.path))
                await unlink(musicdata.audio.path);
            musicdata.audio.url = 'musics/'+music[0].filename
            musicdata.audio.path = music[0].path
        }
        
        await musicdata.save();
        const response = {
            ...musicdata._doc,
            audio: {
                url: musicdata.audio.url
            },
            coverImg: {
                url: musicdata.coverImg.url || ''
            }
        };
        
        res.status(200).json({message: 'Successfully retrieved', response});
    } catch(error) {
        next(error);
    }
}

export const deleteMusic = async (req, res, next) => {
    try {
        if (req.role !== 'admin')
            return res.status(403).json(createError('Unauthorized!'));
        
        const music = await Music.findById(req.params.id);
        
        if (!music) 
            return res.status(404).json(createError(404, 'Music not found.'));
        
        if (existsSync(music.audio.path))
            await unlink(music.audio.path);
        if (music.coverImg.path && existsSync(music.coverImg.path)) await unlink(music.coverImg.path);
        await Music.deleteOne({_id: music._id});
        return res.status(200).json({message: 'Successfully deleted!'});
    } catch (error) {
      next(error)  
    }
}