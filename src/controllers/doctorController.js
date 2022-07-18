import doctorService from '../services/doctorService'

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit
    if (!limit) {
        limit = 10
    }

    try {
        let response = await doctorService.getTopDoctorHome(+limit)
        // console.log(response);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'error from server'
        })
    }
}


let getAllDoctors = async (req, res) => {
    try {
        let doctor = await doctorService.getAllDoctors()
        return res.status(200).json(doctor)

    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })

    }

}

let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body)
        return res.status(200).json(response)

    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        // if (!req.query.id) {
        //     return res.status(200).json({
        //         errCode: -1,
        //         errMessage: 'Missing required parameter!'
        //     })
        // }
        let infor = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(infor)


    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let getScheduleDoctorByDate = async (req, res) => {
    try {
        let infor = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getExtraInforDoctorById(req.query.doctorId)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getProfileDoctorById(req.query.doctorId)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
let getListPatientForDoctor = async (req, res) => {
    try {
        let infor = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
let postSendRemedy = async (req, res) => {
    try {
        let infor = await doctorService.postSendRemedy(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}


module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    postSendRemedy: postSendRemedy
}