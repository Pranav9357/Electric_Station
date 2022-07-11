import Provider from 'database/model/provider';
import jwt from 'jsonwebtoken';
import authentication from 'server/utils/authentication';
import bcrypt from 'bcryptjs';

export const ProviderRestApi = ({ router }) => {
    router.get('/allProvider', authentication, (req, res) => {
        Provider.find()
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

    router.get('/:id', authentication, (req, res) => {
        let providerId = req.params.id;
        Provider.findById(providerId)
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
    router.post('/addProvider', (req, res) => {
        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if (err) {
                res.json({
                    err
                });
            }

            let provider = new Provider({
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                password: hashedPass,
                phoneNumber: req.body.phoneNumber,
                noOfStation: req.body.noOfStation,
                location: {
                    type: req.body.type,
                    coordinates: {
                        type: [
                            parseFloat(req.body.longitude),
                            parseFloat(req.body.latitude)
                        ]
                    }
                }
            });
            provider
                .save()
                .then(() => {
                    res.json({
                        message: 'Provider Added Successfully!',
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

    router.put('/:id', authentication, (req, res) => {
        let providerId = req.params.id;

        let updateData = {
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            noOfStation: req.body.noOfStation,
            location: {
                type: req.body.type,
                coordinates: {
                    type: [
                        parseFloat(req.body.longitude),
                        parseFloat(req.body.latitude)
                    ]
                }
            }
        };

        Provider.findByIdAndUpdate(providerId, { $set: updateData })
            .then(() => {
                res.json({
                    message: 'Provider updated successfully!',
                    status: 200
                });
            })
            .catch(() => {
                res.json({
                    message: 'Error Occured!'
                });
            });
    });

    router.delete('/:id', authentication, (req, res) => {
        let providerId = req.params.id;
        Provider.findByIdAndRemove(providerId)
            .then(() => {
                res.json({
                    message: 'Provider deleted successfully!',
                    status: 200
                });
            })
            .catch(() => {
                res.json({
                    message: 'Error Occured!'
                });
            });
    });

    router.post('/loginProvider', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        Provider.findOne({ email: email }).then(provider => {
            if (provider) {
                bcrypt.compare(password, provider.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        });
                    }
                    if (result) {
                        let token = jwt.sign(
                            { name: provider.name },
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
