
import spcialtyService from '../services/spcialtyService'
let PostCreateNewSpecialty = async (req, res) => {
    try {
        let infor = await spcialtyService.PostCreateNewSpecialty(req.body)
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
        let infor = await spcialtyService.getAllSpecialty()
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
        let infor = await spcialtyService.getAllDetailSpecialtyById(req.query.id, req.query.location)
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
    PostCreateNewSpecialty: PostCreateNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getAllDetailSpecialtyById: getAllDetailSpecialtyById

}