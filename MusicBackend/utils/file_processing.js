export const destination_name = (dest_name) => function(req, file, cb) {
    if (file.fieldname == 'music')
        cb(null, dest_name+'/uploads/musics')
    else    
        cb(null, dest_name+'/uploads/images')

}

export const file_name = function (req, file, cb) {
    const uniqueSuffix = Date.now()
    if (file.fieldname == 'music')
        cb(null, uniqueSuffix + '.mp3')
    else
        cb(null, uniqueSuffix + '.jpg')
}

export const filtering = function (req, file, cb) {
    const allowed_image_mime = ['image/jpeg', 'image/png', 'image/gif'];
    const allowed_music_mime = ['audio/mpeg', 'audio/wav'];
    const allowed_image_extensions = ['png', 'jpeg', 'jpg']
    const allowed_music_extensions = ['mp3', 'mp4']

    const extensions = file.originalname.split('.')
    
    if (file.fieldname === 'music') {
        if (!allowed_music_extensions.includes(extensions[extensions.length - 1].trim()))
            return cb(new Error('This extensions is not allowed for music'))
        if (!allowed_music_mime.includes(file.mimetype))
           return cb(new Error('This file format is not allowed for music'))
        if (file.size > 1024*3)
            return cb(new Error('The size is too big'))
        cb(null, true)
    } else {
        if (!allowed_image_extensions.includes(extensions[extensions.length - 1].trim()))
            return cb(new Error('This extensions is not allowed for images'))
        if (!allowed_image_mime.includes(file.mimetype))
           return cb(new Error('This file format is not allowed for images'))
        if (file.size > 1024*3)
            return cb(new Error('The size is too big'))
        cb(null, true)
    }
}
  