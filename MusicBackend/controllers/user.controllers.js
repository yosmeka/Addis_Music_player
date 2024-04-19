import bcrypt from "bcrypt";
import User from '../models/user.model.js';

import { createError, createSuccess } from "../utils/messages.js";
import { generateToken, refresh } from "../utils/generateTokens.js";
import Token from "../models/tokens.model.js";
import jwt from 'jsonwebtoken';
import Music from "../models/music.model.js";


export const register = async (req, res, next) => {
  try {
    req.body.role = req.body.role || 'client';

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    if (req.body.password.length < 7) return res.status(400).send(createError('Password too short'))
    const newUser = new User({
      ...req.body,
      password: hash,
      playlists: []
    });
    
    console.log('efefe', newUser)
    const tokens = generateToken(newUser);
    Token.create({refreshtoken: tokens.refreshToken})
    
    await newUser.save();
    res.status(201).json(createSuccess('User has been created.', {...tokens, id: newUser._id}));
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email!"));

    const tokens = generateToken(user);
    Token.create({refreshtoken: tokens.refreshToken})
    
    res
      .status(200)
      .json(createSuccess("Login successful.", {...tokens, id: user._id}));
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshtoken;
    console.log(refreshToken);
    if (!refreshToken)
      return res.status(400).send(createError(400, 'Not autheniticated'));

    if (! await Token.exists({refreshtoken: refreshToken}))
      return res.status(400).send(createError(400, 'Not autheniticated'));
    
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
        
      const accessToken = refresh({user: decoded.user, role: decoded.role});

      res.status(200).json(createSuccess("Refreshed", {accessToken}));
    });
  
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    if (!Token.exists({refreshtoken: req.body.refreshtoken})) return next(createError(404, "Error occured while logingout!"));
    await Token.deleteOne({refreshtoken: req.body.refreshtoken});
    res.status(200).json(createSuccess("User logged out"));
  } catch (err) {
    next(err);
  }
}

// function to return the user details
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(['-password', '-role']);
    if (!user) return next(createError(404, "User not found!"));
    res.status(200).json(createSuccess("User found.", user));
  } catch (err) {
    next(err);
  }
};

export const createPlayList = async (req, res, next) => {
  try {
    const {title, musicid} = req.body;
    if (!title) return next(createError(404, "Title is required"));
    const user = await User.findById(req.params.id).select(['playlists']);
    
    let playlists = user.playlists;
    
    let filtered = playlists.filter(playlist => playlist.title.toLowerCase() === title.trim().toLowerCase());
    
    if (filtered.length === 0) {
      playlists.push({title})
    }

    if (musicid) {
      const music = Music.findById(musicid);
      if (!music)
        return res.status(400).send(createError('Music not found'));
      let duplicate = false
      playlists.map(playlist=>{
        if (playlist.title === title) {
          playlist.musics.push(musicid);
          const prevlength = playlist.musics.length;
          let check = new Set();
          playlist.musics.forEach(music => {
            check.add(music.toString())
          })
          playlist.musics = [...check];
          duplicate = playlist.musics.length<prevlength;
        }
        return playlist;
      });
      if (duplicate)
        return res.status(400).send(createError('Already in playlist'));
    }
    user.playlists = playlists;
    user.save();
    const playlist = playlists.filter(playlist=>playlist.title === title)[0]
    
    await user.populate({
      path: 'playlists.musics',
      populate: {
        path: 'artist'
      }
    });
    return res.status(201).json(createSuccess('Successfully added', playlist));
  } catch (error) {
    next(error)
  }
}

export const allPlaylists = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(['playlists']);
    const playlists = user.playlists;
    await user.populate({
      path: 'playlists.musics',
      populate: {
        path: 'artist'
      }
    });
    
    return res.status(200).json(createSuccess("Successfully fetched", playlists));
  } catch(err) {
    next(err);
  }
}

export const removeFromPlaylist = async (req, res, next) => {
  try {
    const { title, musicid } = req.body;
    if (!title || !musicid)
      return res.status(400).json(createError('Title and music are required'))
    
    const user = await User.findById(req.params.id).select(['playlists']);
    
    user.playlists.map(playlist => {
      if (playlist.title === title)
        playlist.musics = playlist.musics.filter(music => music.toString() !== musicid);
      
      return playlist 
    });
    user.save();
    const playlist = user.playlists.filter(playlist=>playlist.title === title);
    await user.populate({
      path: 'playlists.musics',
      populate: {
        path: 'artist'
      }
    });
    
    return res.status(200).json(createSuccess("Successfully deleted", playlist[0]));
  } catch(err) {
    next(err);
  }
}

export const singlePlayList = async (req, res, next) => {
  try {
    const title = req.params.title
    const user = await User.findById(req.user).select(['playlists']);
    
    const playlist = user.playlists.filter(playlist => playlist.title.toLowerCase() === title.trim().toLowerCase());
    if (playlist.length === 0)
      return res.status(400).json(createError('Playlist not found'));

    await user.populate({
      path: 'playlists.musics',
      populate: {
        path: 'artist'
      }
    });
    return res.status(200).json(createSuccess("Successfully fetched", playlist[0]));
  } catch (err) {
    next(err);
  }
}

export const deletePlayList = async (req, res, next) => {
  try {
    const title = req.params.title
    const user = await User.findById(req.user).select(['playlists']);
    
    let initialLength = user.playlists.length;
    const playlists = user.playlists.filter(playlist => playlist.title.toLowerCase() !== title.trim().toLowerCase());
    if (playlists.length === initialLength)
      return res.status(400).json(createError('Playlist not found'));

    user.playlists = playlists;
    user.save();
    await user.populate({
      path: 'playlists.musics',
      populate: {
        path: 'artist'
      }
    });
    return res.status(200).json(createSuccess("Successfully deleted", playlists));
  } catch(err) {
    next(err);
  }
}

export const availablePlaylists = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select(['playlists']);
    const musicid = req.query.musicid || '';
    
    const playlists = user.playlists
    .filter(playlist => !playlist.musics.includes(musicid.trim().toLowerCase()))
    .map(playlist => playlist.title);
    return res.status(200).json(createSuccess('Successfully retrieved', playlists));
  } catch (err) {
   next(err); 
  }
}
