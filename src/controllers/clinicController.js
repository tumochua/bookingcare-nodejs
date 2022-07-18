
import clinicService from '../services/clinicService'

let PostCreateNewClinic = async (req, res) => {
    try {
        let infor = await clinicService.PostCreateNewClinic(req.body)
        return res.status(200).json(infor)

    } catch (e) {
        console.log('get all code error', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}


let getAllSpecialty = async (req, res) => {
    try {
        let infor = await clinicService.getAllSpecialty()
        return res.status(200).json(infor)

    } catch (e) {
        console.log('get all code error', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}


let getAllDetailSpecialtyById = async (req, res) => {
    try {
        let infor = await clinicService.getAllDetailSpecialtyById(req.query.id)
        return res.status(200).json(infor)

    } catch (e) {
        console.log('get all code error', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}


module.exports = {
    PostCreateNewClinic: PostCreateNewClinic,
    getAllSpecialty: getAllSpecialty,
    getAllDetailSpecialtyById: getAllDetailSpecialtyById


}