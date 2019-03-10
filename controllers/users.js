const userService = require('../services/User');

exports.getUser = async (req, res, next) => {
    const query = req.query;
    if (!Object.keys(query).length) return res.status(404).json({message: 'Invalid request'});
    try {
        const user = await userService.getUser(query);
        return res.status(200).json({data: user});
    } catch(e) {
        return res.status(404).json({message: e.message});
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const createdUser = await userService.createUser({...req.body});
        return res.status(200).json({data: createdUser});
    } catch(e) {
        return res.status(400).json({message: e.message});
    }
}

exports.loginUser = async (req, res, next) => {
    const {username, password, new_session} = req.body;
    const loggingUser = await userService.getUser({username});

    if (!loggingUser || !new_session) return res.status(400).json({message: !new_session ? 'No session ID was provided' : 'Invalid user'});

    try {
        if (await loggingUser.passwordIsValid(password)) {
            await userService.updateUser(loggingUser, {logged_in: true, sessions: [...loggingUser.sessions, new_session]});
            return res.status(200).json({message: `${username} logged succesfully`});
        } else {
            return res.status(404).json({message: `Invalid password for ${username}`});
        }
    } catch (e) {
        return res.status(400).json({message: e.message});
    }
}

exports.logoutUser = async (req, res, next) => {
    const {username, old_session} = req.body;
    const loggingUser = await userService.getUser({username});

    try {
        await userService.updateUser(
            loggingUser,
            {
                logged_in: false,
                sessions: [...loggingUser.sessions].filter(s => s !== old_session)
            });

        return res.status(200).json({message: 'Log out succesful'});
    } catch(e) {
        return res.status(400).json({message: e.message});
    }
}

exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    if (!id) return res.status(400);
    
    try {
        userService.deleteUser(id);
        return res.status(200).json({message: 'User deleted succesfully'});
    } catch(e) {
        return res.status(400).json({message: e.message});
    }
}