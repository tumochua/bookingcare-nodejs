import express from "express";
import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController'
import patientController from '../controllers/patientController'
import spcialtyController from '../controllers/spcialtyController'
import clinicController from '../controllers/clinicController'



let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayGetCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/allcode', userController.getAllCode)


    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctor', doctorController.getAllDoctors)
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.post('/api-bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)

    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)
    router.post('/api/send-remedy', doctorController.postSendRemedy)

    router.post('/api/patient-book-appointment', patientController.postPatientBookAppointment)
    router.post('/api/verify-book-appointment', patientController.postVirifyBookAppointment)

    router.post('/api/create-new-spcialty', spcialtyController.PostCreateNewSpecialty)
    router.get('/api/get-spcialty', spcialtyController.getAllSpecialty)
    router.get('/api/get-detail-spcialty-by-id', spcialtyController.getAllDetailSpecialtyById)

    router.post('/api/create-new-clinic', clinicController.PostCreateNewClinic)
    router.get('/api/get-clinic', clinicController.getAllSpecialty)
    router.get('/api/get-detail-clinic-by-id', clinicController.getAllDetailSpecialtyById)



    return app.use("/", router)
}

module.exports = initWebRouter;

