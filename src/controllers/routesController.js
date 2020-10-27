import { db } from '../util/admin'

export const getAllRoutes = (req, res) => {
    db.collection('routes')
        .get()
        .then((querySnapshot) => {
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() })
            })
            res.json({ docs })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}

export const addRoute = (req, res) => {
    const newRoute = {
        username: req.body.username,
        name: req.body.name,
        description: req.body.description,
        beginDate: req.body.beginDate,
        endDate: req.body.endDate,
        distance: req.body.distance,
        duration: req.body.duration,
        calorie: req.body.calorie,
        images: req.body.images,
        coordinates: req.body.coordinates,
        camera: req.body.camera,
    }

    newRoute.createdAt = new Date().toISOString()

    db.collection('routes')
        .add(newRoute)
        .then((doc) => {
            const resRoute = newRoute
            resRoute.id = doc.id
            res.json(resRoute)
        })
        .catch((err) => {
            res.status(500).json({
                error: 'something went wrong',
                message: err,
            })
        })
}

export const getRoute = (req, res) => {
    let routeData = {}
    db.doc(`/routes/${req.params.id}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Route not found' })
            }
            routeData = doc.data()
            routeData.id = doc.id
            return res.json(routeData)
        })
        .catch((err) => {
            res.status(500).json({ error: err.code })
        })
}

export const deleteRoute = (req, res) => {
    db.doc(`/routes/${req.params.id}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Route not found' })
            }
            if (doc.data().username !== req.user.username) {
                return res.status(403).json({ error: 'Unauthorized' })
            }
            return document.delete()
        })
        .then(() => {
            res.json({ message: 'Route deleted succesfully' })
        })
        .catch((err) => res.status(500).json({ error: err.code }))
}
