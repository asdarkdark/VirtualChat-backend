const login = function (req, res) {

    try {
        console.log(req.body.user);
        console.log(req.body.password);

        validateInput(req);

        res.json({
            status: 'success',
            message: 'Login successful'
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 'error',
            message: 'Error with login'
        })
    }
}

const validateInput = (req) => {
    const users = {
        usernames: ['juanjo', 'majo', 'laga', 'jaco'],
        passwords: ['123', '1234', '12345', '123456']
    }
    if (users.usernames.includes(req.body.user) &&
        users.passwords[users.usernames.indexOf(req.body.user)] === req.body.password) {
        return console.log('You are logged');
    } else {
        return console.log('You are not logged');
    }
}

export default login