import User from 'database/model/user';
import bcrypt from 'bcryptjs';

export const UserRestApi = ({ router }) => {
    router.get('/allUser', (req, res) => {
        User.find()
            .then(response => {
                res.json({
                    response,
                    status: 200
                });
            })
            .catch(() => {
                res.json({
                    message: 'Error Occured!'
                });
            });
    });

    router.get('/:id', (req, res) => {
        let userId = req.params.userId;
        User.findById(userId)
            .then(response => {
                res.json({
                    response,
                    status: 200
                });
            })
            .catch(() => {
                res.json({
                    message: 'Error Occured!'
                });
            });
    });
    router.post('/addUser', (req, res) => {
        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if (err) {
                res.json({
                    err
                });
            }

            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: hashedPass
            });
            user.save()
                .then(() => {
                    res.json({
                        message: 'User Added Successfully!',
                        status: 200
                    });
                })
                .catch(() => {
                    res.json({
                        message: 'Error Occured!'
                    });
                });
        });
    });

    router.put('/:id', (req, res) => {
        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if (err) {
                res.json({
                    err
                });
            }

            let userId = req.params.id;
            let updateData = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber
            };

            User.findByIdAndUpdate(userId, { $set: updateData })
                .then(() => {
                    res.json({
                        message: 'User updated successfully!',
                        status: 200
                    });
                })
                .catch(() => {
                    res.json({
                        message: 'Error Occured!'
                    });
                });
        });
    });

    router.delete('/:id', (req, res) => {
        let userId = req.body.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.json({
                    message: 'User deleted successfully!',
                    status: 200
                });
            })
            .catch(() => {
                res.json({
                    message: 'Error Occured!'
                });
            });
    });

    router.post('/loginUser', (req, res) => {
        let name = req.body.name;
        let password = req.body.password;

        User.findOne({ name: name }).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        });
                    }
                    if (result) {
                        let token = jwt.sign(
                            { name: user.name },
                            'secretkeyvalue',
                            { expiresIn: '2h' }
                        );
                        res.json({
                            message: 'Login Successfully!',
                            token,
                            status: 200
                        });
                    } else {
                        res.json({
                            message: 'Password does not matched!'
                        });
                    }
                });
            } else {
                res.json({
                    message: 'No user found!'
                });
            }
        });
    });
};
