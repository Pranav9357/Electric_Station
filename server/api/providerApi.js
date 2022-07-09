import Provider from '../database/model/provider'

export const ProviderApi = ({router}) => {
    router.get('/allProvider', (req, res) => {
        Provider.find()
        .then(() => {
            res.json({
                status: 200
            })
        })
        .catch(() => {
            res.json({
                message: 'Error Occured!'
            })
        })
    })
    
    router.get('/:id', (req, res) => {
        let providerId = req.params.providerId
        Provider.findById(providerId)
        .then(() => {
            res.json({
                status: 200
            })
        })
        .catch(() => {
            res.json({
                message: 'Error Occured!'
            })
        })
    })
    router.post('/add', (req, res) => {
        let provider = new Provider({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            noOfStation: req.body.noOfStation
        })
        provider.save()
        .then(() => {
            res.json({
                message: 'Provider Added Successfully!'
            })
        })
        .catch(() => {
            res.json({
                message: 'Error Occured!'
            })
        })
    })
    
    router.put('/update', (req, res) => {
        let providerId = req.params.providerId
    
        let updateData = {
            name: req.body.name,
            address: req.body,address,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            noOfStation: req.body.noOfStation
        }
    
        Provider.findByIdAndUpdate(providerId, {$set: updateData})
        .then(() => {
            res.json({
                message: 'Provider updated successfully!'
            })
        })
        .catch(() => {
            res.json({
                message: 'Error Occured!'
            })
        })
    })
    
    router.delete('/delete', (req, res) => {
        let providerId = req.params.providerId
        Provider.findByIdAndRemove(providerId)
        .then(() => {
            res.json({
                message: 'Provider deleted successfully!'
            })
        })
        .catch(() => {
            res.json({
                message: 'Error Occured!'
            })
        })
    }) 
}