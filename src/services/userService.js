import db from '../models/index';
import bcrypt from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);

let hashUserPassword = (passwword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(passwword, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            // console.log(userData);

            let isExist = await checkUserEmail(email)
            if (isExist) {


                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true,
                    where: { email: email },
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        console.log(user);
                        delete user.password;
                        userData.user = user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password'
                    }


                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `your's email isn't exist in your system.ply try other email`
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}




let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId == 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password',]
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUse = (data) => {
    // console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'email của bạn đã sử dụng. Vui lòng sử dụng email khác'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phonenumber: data.phonenumber,
                    positionId: data.positionId,
                    image: data.avatar
                })
            }

            resolve({
                errCode: 0,
                errMessage: 'ok'
            })

        } catch (e) {
            reject(e)
        }

    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId }
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: `the user ins't exist`
            })
        }

        await db.User.destroy({
            where: { id: userId }
        })

        resolve({
            errCode: 0,
            errMessage: `the user in deleted`
        })
    })

}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || data.roleId || data.gender || data.positionId) {
                resolve({
                    errCode: 2,
                    errMessage: 'missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar
                }

                await user.save()

                resolve({
                    errCode: 2,
                    message: 'update the user succeeds'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `user's not found`
                })
            }

        } catch (e) {
            reject(e)
        }
    })

}


let getAllCodeService = (typeInput) => {
    console.log(typeInput);
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing required parameters'
                })
            } else {

                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                })
                res.errCode = 0
                res.data = allcode
                resolve(res)
            }
        } catch (e) {
            reject(e)
        }
    })

}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUse: createNewUse,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService
}