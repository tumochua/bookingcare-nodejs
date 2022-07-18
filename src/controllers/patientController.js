import patientService from '../services/patientService'

let postPatientBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postPatientBookAppointment(req.body)
        return res.status(200).json(infor)

    } catch (e) {
        console.log('get all code error', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }

}

let postVirifyBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postVirifyBookAppointment(req.body)
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
    postPatientBookAppointment: postPatientBookAppointment,
    postVirifyBookAppointment: postVirifyBookAppointment
}