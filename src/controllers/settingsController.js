import { db } from '../util/admin'

export const addSettings = (req, res) => {
    const newSettings = {
        username: req.params.username,
        theme: req.body.theme,
        metrics: req.body.metrics
    }

    newSettings.createdAt = new Date().toISOString()

    db.doc(`/settings/${req.params.username}`)
        .set(newSettings)
        .then(() => {
            res.status(200).json({ message: 'settings added'})
        })
        .catch((err) => {
            res.status(500).json({
                error: 'something went wrong',
                message: err,
            })
        })
}

export const updateSettings = (req, res) => {
    const settings = {
        theme: req.body.theme,
        metrics: req.body.metrics,
    }
    const settingsDetails = {}

    if (settings.theme !== '') settingsDetails.theme = settings.theme
    if (settings.metrics !== '') settingsDetails.metrics = settings.metrics

    db.doc(`/settings/${req.params.username}`)
        .update(settingsDetails)
        .then(() => {
            res.status(200).json({ message: 'Details added succesfully' })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}

export const getSettings = (req, res) => {
    let SettingsData = {}
    db.doc(`/settings/${req.params.username}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Settings not found' })
            }
            SettingsData = doc.data()
            SettingsData.id = doc.id
            return res.json(SettingsData)
        })
        .catch((err) => {
            res.status(500).json({ error: err.code })
        })
}
