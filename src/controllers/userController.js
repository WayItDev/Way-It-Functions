import BusBoy from 'busboy'
import path from 'path'
import os from 'os'
import fs from 'fs'

import { admin, db } from '../util/admin'
import config from '../util/config'

export const uploadImage = (req, res) => {
    const busboy = new BusBoy({ headers: req.headers })
    let imageToBeUploaded = {}
    let imageFileName
    req.pipe(busboy)
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (
            mimetype !== 'image/jpeg'
            && mimetype !== 'image/jpg'
            && mimetype !== 'image/png'
        ) {
            return res.status(400).json({ error: 'Wrong file type submitted' })
        }
        const imageExtension = filename.split('.')[
            filename.split('.').length - 1
        ]
        imageFileName = `${Math.round(
            Math.random() * 1000000000000000
        ).toString()}.${imageExtension}`
        const filepath = path.join(os.tmpdir(), imageFileName)
        imageToBeUploaded = { filepath, mimetype }
        file.pipe(fs.createWriteStream(filepath))
    })
    busboy.on('finish', () => {
        admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToBeUploaded.mimetype,
                    },
                },
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
                return db
                    .doc(`/users/${req.user.username}`)
                    .update({ imageUrl })
            })
            .then(() => res.json({ message: 'image uploaded succesfully' }))
            .catch(() => res.status(500).json({ error: 'something went wrong' }))
    })
}
