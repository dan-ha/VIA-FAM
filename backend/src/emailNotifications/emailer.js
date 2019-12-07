
var nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    //host: 'smtp.gmail.com',
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'viafacilitymanager@gmail.com',
        pass: 'passmepls'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// let HelperOptions = {
//     from: '"VIA Facility Manager Authomatic system " <viafacilitymanager@gmail.com',
//     to: 'martinivoviv@gmail.com',
//     subject: 'test',
//     text: 'test !'
// };

// transporter.sendMail(HelperOptions, (error, info) => {
//     if(error){
//         console.log('mistakes were made')
//        return console.log(error);
//     }
//     console.log("the message was sent !");
//     console.log(info)
// });

function sendMailTo(email, action){
    
    let HelperOptions = {
        from: '"VIA Facility Manager Authomatic system " <viafacilitymanager@gmail.com',
        to: email,
        subject: "Appointment has been cancelled",
        text: "Dear student, you're appointment has been cancelled. \n Best regards, \n Your appointment management system"
    }
    if(action === "FacilityEdited"){
        HelperOptions = {
        from: '"VIA Facility Manager Authomatic system " <viafacilitymanager@gmail.com',
        to: email,
        subject: "A facility has been edited",
        text: "Dear employee, A facility registered on this email address has been edited. \n Best regards, \n Your appointment management system"
    }}


    transporter.sendMail(HelperOptions, (error, info) => {
        if(error){
            console.log('mistakes were made')
           return console.log(error);
        }
        console.log("the message was sent !");
        console.log(info)
    });
}

module.exports = sendMailTo;