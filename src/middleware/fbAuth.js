import { admin, db } from '../util/admin'

export const FBAuth = (req, res, next) => {
    let idToken
    if (
        req.headers.authorization
        && req.headers.authorization.startsWith('Bearer ')
    ) {
        // eslint-disable-next-line prefer-destructuring
        idToken = req.headers.authorization.split('Bearer ')[1]
    } else {
        return res.status(403).json({ error: 'Unauthorized' })
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            req.user = decodedToken
            return db
                .collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get()
        })
        .then((data) => {
            req.user.username = data.docs[0].data().username
            req.user.imageUrl = data.docs[0].data().imageUrl
            return next()
        })
        .catch((err) => res.status(403).json(err))
}
