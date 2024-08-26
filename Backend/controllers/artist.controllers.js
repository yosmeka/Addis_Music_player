import Artist from "../models/artist.model.js";
import { createError, createSuccess } from "../utils/messages.js";

export const createArtist = async (req, res, next) => {
    try {
        if (req.role !== 'admin')
            return res.status(403).json(createError('Unauthorized!'));
        
        const {name, biography} = req.body;
        const image = req.file;

        if (!name)
            return res.status(400).json(createError('Artist name required!'));
        let photo = {}
        if (image) {
            photo['photo.path'] = image.path
            photo['photo.url'] = 'images/'+image.filename
        }
        
        const artist = await Artist.create(
            {
                name,
                biography,
                ...photo
            }
        );

        const response = {
            ...artist._doc,
            photo: {
                url: artist.photo.url
            }
        }
        return res.status(200).json(createSuccess('Successfully created', response));
    } catch (error) {
        next(error)
    }
}

export const allArtists = async (req, res, next) => {
    try {
        const artists = await Artist.find({}).select('-photo.path');
        return res.status(200).json(createSuccess('Successfully created', artists));
    } catch (error) {
        next(error)
    }
}

export const getArtist = async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id).select('-photo.path');
        if (!artist)
            return res.status(404).json(createError('Artist not found!'));
        return res.status(200).json(createSuccess('Successfully fetched', artist));
    } catch (error) {
        next(error)
    }
}

export const deleteArtist = async (req, res, next) => {
    try {
        if (req.role !== 'admin')
            return res.status(403).json(createError('Unauthorized!'));

        const artist = await Artist.findById(req.params.id).select('-photo.path');
        if (!artist)
            return res.status(404).json(createError('Artist not found!'));
        await Artist.findByIdAndDelete(req.params.id);
        return res.status(200).json(createSuccess('Successfully deleted'));
    } catch (error) {
        next(error)
    }
}

export const updateArtist = async (req, res, next) => {
    try {
        if (req.role !== 'admin')
        return res.status(403).json(createError('Unauthorized!'));

        const {name, biography} = req.body;
        const image = req.file;

        const artist = await Artist.findById(req.params.id);
        if (!artist)
            return res.status(404).json(createError('Artist not found!'));
        artist.name = name || artist.name
        artist.biography = biography || artist.biography
        
        if (image) {
            if (artist.photo.path && existsSync(artist.photo.path))
                await unlink(artist.photo.path);
            artist.photo.url = 'images/'+image.filename;
            artist.photo.path = image.path;
        }
        await artist.save();

        const response = {
            ...artist._doc,
            photo: {
                url: artist.photo.url
            }
        }
        return res.status(200).json(createSuccess('Successfully deleted', response));
    } catch (error) {
        next(error)
    }
}