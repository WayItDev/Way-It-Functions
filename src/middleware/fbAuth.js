import { admin, db } from '../util/admin'

/* eslint consistent-return: "off" */
export const FBAuth = (req, res, next) => {
    let idToken
    if (
        req.headers.authorization
        && req.headers.authorization.startsWith('Bearer ')
    ) {
        /* eslint prefer-destructuring: "off" */
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
            return next()
        })
        .catch((err) => res.status(403).json(err))
}
