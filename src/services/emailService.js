require('dotenv').config()
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"TUMOCHUA 👻" <nguyenvantu14012003@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: " Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHtmlEmail(dataSend),
        // html body
    });
}

let getBodyHtmlEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
<h3>Xin chào ${dataSend.patientName}</h3>
<p>Chúng tôi nhận được lịch hẹn khám bệnh online vì bạn đã đặt lịch hẹn trên TUMOCHUA</p>
                <p>Thông tin đơn thuốc hóa đơn được gửi ở file đính kèm</p>
                <div>
                  
                    <div>Xin chào! và cả ơn</div>
                </div>
`
    }
    if (dataSend.language === 'en') {
        result =
            `
<h3>Dear ${dataSend.patientName}</h3>
<p>We received an online appointment because you booked an appointment on TUMOCHUA</p>
                <p>Information to schedule an appointment:</p>
              
`
    }
    return result
}

let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"TUMOCHUA 👻" <nguyenvantu14012003@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: " Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHtmlEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientId} - ${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64'
            }
        ]
        // html body
    });
}

let getBodyHtmlEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
<h3>Xin chào ${dataSend.patientName}</h3>
<p>Chúng tôi nhận được lịch hẹn khám bệnh online vì bạn đã đặt lịch hẹn trên TUMOCHUA</p>
                <p>Thông tin đặt lịch khám bệnh:</p>
                <div>
                    <b>Thời Gian: ${dataSend.time}</b>
                    <b>Bác sĩ: ${dataSend.doctorName}</b>
                    <p>Nếu thông này là đúng sự thật , vui lòng click (nhấn) vào đường link bên dưới để xác nhận hoàn tất thủ tục đặt lịch khám bệnh</p>
                    <a href=${dataSend.redirectLink} target='_blank'>Click here</a>
                    <div>Xin chào! và cả ơn</div>
                </div>
`
    }
    if (dataSend.language === 'en') {
        result =
            `
<h3>Dear ${dataSend.patientName}</h3>
<p>We received an online appointment because you booked an appointment on TUMOCHUA</p>
                <p>Information to schedule an appointment:</p>
                <div>
                    <b>Time: ${dataSend.time}</b>
                    <b>Doctor: ${dataSend.doctorName}</b>
                    <p>If this information is true, please click (click) on the link below to confirm completion of the medical appointment booking procedure.</p>
                    <a href=${dataSend.redirectLink} target='_blank'>Click here</a>
                    <div>goodbye</div>
                </div>
`
    }
    return result
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}