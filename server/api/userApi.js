import User from '../database/model/user'

export const UserApi = ({router}) => {
    router.get('/allUser', (req, res) => {
        User.find()
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
        let userId = req.params.userId
        User.findById(userId)
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
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber
        })
        user.save()
        .then(() => {
            res.json({
                message: 'User Added Successfully!'
            })
        })
        .catch(() => {
            res.json({
                message: 'Error Occured!'
            })
        })
    })
    
    router.put('/update', (req, res) => {
        let userId = req.params.userId
    
        let updateData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber
        }
    
        User.findByIdAndUpdate(userId, {$set: updateData})
        .then(() => {
            res.json({
                message: 'User updated successfully!'
            })
        })
        .catch(() => {
            res.json({
                message: 'Error Occured!'
            })
        })
    })
    
    router.delete('/delete', (req, res) => {
        let userId = req.body.userId
        User.findByIdAndRemove(userId)
        .then(() => {
            res.json({
                message: 'User deleted successfully!'
            })
        })
        .catch(() => {
            res.json({
                message: 'Error Occured!'
            })
        })
    }) 
}