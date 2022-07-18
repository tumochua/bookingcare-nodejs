import db from '../models/index';
require('dotenv').config()
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid';
import { reject } from 'lodash';

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}


let postPatientBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // !data.fullName
            if (!data.email || !data.doctorId || !data.timeType || !data.date ||
                !data.fullName || !data.selectedGenders || !data.address

            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {

                let token = uuidv4()

                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeSing,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })


                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGenders,
                        address: data.address,
                        firstName: data.fullName
                    }
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor succeed!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


let postVirifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment succed!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "appointment has been activated or does not exist"
                    })
                }
            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    postPatientBookAppointment: postPatientBookAppointment,
    postVirifyBookAppointment: postVirifyBookAppointment
}
