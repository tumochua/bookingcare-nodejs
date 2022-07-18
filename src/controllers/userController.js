import userService from '../services/userService'


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'missing inputs parmeter'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    console.log(userData);



    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    }

    )
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    // console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    // console.log(req);
    // console.log(res);
    let message = await userService.createNewUse(req.body)
    console.log(message);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'missing required parameters'
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message)

}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data)
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type)
        return res.status(200).json(data)

    } catch (e) {
        console.log('get all code error', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }

}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode

}