// import { json } from 'sequelize/types';
import db from '../models/index'
import CRUDService from "../services/CRUDService"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e);
    }


}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message);
    return res.send('hello')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        // console.log('_________________');
        // console.log(userData);
        // console.log('_________________');
        return res.render('editCRUD', {
            user: userData
        })

    } else {
        return res.send('User not found')

    }

}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDService.deleteUserById(id)
        return res.send('delete thành công')
    }
    else {
        return res.send('user not dound')
    }
}


module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    CRUDService: CRUDService,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}