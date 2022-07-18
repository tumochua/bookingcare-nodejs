const db = require('../models')

let PostCreateNewClinic = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 ||
                !data.descriptionHtml || !data.descriptionMarkdown
                || !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHtml: data.descriptionHtml,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}



let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll()

            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'ok',
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}



let getAllDetailSpecialtyById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {

                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['address', 'name', 'descriptionHtml', 'descriptionMarkdown']
                })
                if (data) {
                    let doctorClinic = []
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId']
                    })
                    data.doctorClinic = doctorClinic

                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data
                })

            }
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    PostCreateNewClinic: PostCreateNewClinic,
    getAllSpecialty: getAllSpecialty,
    getAllDetailSpecialtyById: getAllDetailSpecialtyById
}