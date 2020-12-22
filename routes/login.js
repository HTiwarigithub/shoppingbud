const http = require('http');
const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aditya.v2info@gmail.com',
        pass: 'aditya@v2infotech1234'
    }
});
module.exports.signup = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp);

        var fullname = req.body.fullname;
        var password = req.body.password;
        var email = req.body.email;
        var country = req.body.country;
        var phone_number = req.body.phonenumber;
        var gendre = req.body.gender;

        console.log("dkhfdjhf")

        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'Insert');
        request.input('fullname', db.NVarChar(255), fullname);
        request.input('password', db.NVarChar(255), password);
        request.input('email', db.NVarChar(255), email);
        request.input('country', db.NVarChar(255), country);
        request.input('phonenumber', db.NVarChar(255), phone_number);
        request.input('gender', db.NVarChar(255), gendre);
        request.input('otp', db.NVarChar(255), otp);
        request.execute('prcRegUser', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": {}
                })
            }
            else if(results.recordset[0].hasOwnProperty('data')){
                res.send({
                    "status": "0",
                    "message": "Already Registered",
                    "result": {}
                })
            }

            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "Already Registered",
                        "result": {}
                    })
                }
                else {

                    const info = {
                        to: results.recordset[0].email,
                        subject: 'OTP for registration',
                        text: 'Your Shopping bud app otp is : ' + results.recordset[0].otp
                    };

                    var message = 'Your Shopping bud app otp is : ' + results.recordset[0].otp;
                    var number = results.recordset[0].phonenumber;
                    http.get('http://www.teleshoppe.com/serv/BulkPush/?user=tsb&pass=12345678&message=' + message + '&msisdn=' + number + '&sender=SVMTPL&type=text', (response) => {
                        let data = '';
                        response.on('data', (chunk) => {
                            data += chunk;
                        });
                        response.on('end', () => {
                            res.send({
                                "status": "1",
                                "message": "Otp Send to your mobile",
                                "result": results.recordset
                            })
                        });

                    }).on("error", (err) => {
                        console.log("Error: " + err.message);
                    });
                    transport.sendMail(info, function (err, info) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(info);
                        }
                    });
                }
            }
        });
    });
};



module.exports.login = (req, res) => {
    db.close();
    db.connect(conn, () => {
        console.log(req.body.password)
        var password = req.body.password;
        var email = req.body.email;
        var deviceToken = req.body.deviceToken;
        console.log("dkhfdjhf")
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'select');
        request.input('password', db.NVarChar(255), password);
        request.input('email', db.NVarChar(255), email);
        request.input('deviceToken', db.NVarChar, deviceToken);
        request.execute('prcRegUser', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": {}
                })
            }
            else {
                console.log(results);
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "Invalid Username or Password",
                        "result": {}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Login successfull",
                        "result": results.recordset[0]
                    })
                }
            }
        });
    });
};


module.exports.loginfacebook = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var social_id = req.body.social_id;
        var fullname = req.body.fullname;
        var password = req.body.password;
        var email = req.body.email;
        var country = req.body.country;
        var phone_number = req.body.phonenumber;
        var gendre = req.body.gender;
        var issocial = req.body.issocial;
        console.log("dkhfdjhf")

        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'socialfblogin');
        request.input('social_id', db.NVarChar(255), social_id);
        request.input('fullname', db.NVarChar(255), fullname);
        request.input('password', db.NVarChar(255), password);
        request.input('email', db.NVarChar(255), email);
        request.input('country', db.NVarChar(255), country);
        request.input('phonenumber', db.NVarChar(255), phone_number);
        request.input('gender', db.NVarChar(255), gendre);
        request.input('issocial', db.NVarChar(255), issocial);
        request.input('deviceToken', db.NVarChar, req.body.deviceToken);
        request.execute('prcRegUser', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": {}
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error Ocurred",
                        "result": {}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Login successfull",
                        "result": results.recordset[0]
                    })
                }
            }
        });
    });
};

module.exports.otpsubmit = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var otp = req.body.otp;
        var uid = req.body.uid;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'otp_submit');
        request.input('USER_ID', db.NVarChar(255), uid);
        request.input('otp', db.NVarChar(255), otp);
        request.execute('prcRegUser', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred"
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "OTP is incorrect"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Login successfull"
                    })
                }
            }
        });
    });
};


module.exports.resendOtp = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp);
        var uid = req.body.uid;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'resend_otp');
        request.input('USER_ID', db.NVarChar(255), uid);
        request.input('otp', db.NVarChar(255), otp);
        request.execute('prcRegUser', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": {}
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in getting otp",
                        "result": {}
                    })
                }
                else {
                    const info = {
                        to: results.recordset[0].email,
                        subject: 'OTP for registration',
                        text: 'Your Shopping bud app otp is : ' + results.recordset[0].otp
                    };
                    var message = 'Your Shopping bud app otp is : ' + results.recordset[0].otp;
                    var number = results.recordset[0].phonenumber;
                    http.get('http://www.teleshoppe.com/serv/BulkPush/?user=tsb&pass=12345678&message=' + message + '&msisdn=' + number + '&sender=SVMTPL&type=text', (response) => {
                        let data = '';
                        response.on('data', (chunk) => {
                            data += chunk;
                        });
                        response.on('end', () => {
                            res.send({
                                "status": "1",
                                "message": "Otp Send to your mobile",
                                "result": results.recordset[0]
                            })
                        });

                    }).on("error", (err) => {
                        console.log("Error: " + err.message);
                    });
                    transport.sendMail(info, function (err, info) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(info);
                        }
                    });
                }
            }
        });
    });
};



module.exports.loginGoogle = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var social_id = req.body.social_id;
        var fullname = req.body.fullname;
        var password = req.body.password;
        var email = req.body.email;
        var country = req.body.country;
        var phone_number = req.body.phonenumber;
        var gendre = req.body.gender;
        var issocial = req.body.issocial;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'socialfblogin');
        request.input('social_id', db.NVarChar(200), social_id);
        request.input('fullname', db.NVarChar(255), fullname);
        request.input('password', db.NVarChar(255), password);
        request.input('email', db.NVarChar(255), email);
        request.input('country', db.NVarChar(255), country);
        request.input('phonenumber', db.NVarChar(255), phone_number);
        request.input('gender', db.NVarChar(255), gendre);
        request.input('issocial', db.NVarChar(255), issocial);
        request.input('deviceToken', db.NVarChar, req.body.deviceToken);
        request.execute('prcRegUser', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": {}
                })
            }
            else if(results.recordset[0].hasOwnProperty('data')){
                    res.send({
                        "status": "0",
                        "message": "Already Registered",
                        "result": {}
                    })
                }


                else if (results.recordset == 0) {
                    console.log(error)
                    res.send({
                        "status": "0",
                        "message": "Error Ocurred",
                        "result": {}
                    })
                }
                else {
                    console.log(error)
                    res.send({
                        "status": "1",
                        "message": "Login successfull",
                        "result": results.recordset[0]
                    })
                }
            
        });
    });
};

module.exports.signupGoogle = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var fullname = req.body.fullname;
        var social_id = req.body.social_id;
        var email = req.body.email;
        var country = req.body.country;
        var phone_number = req.body.phonenumber;
        var gendre = req.body.gender;



        console.log("dkhfdjhf")

        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'socialfbsignup');
        request.input('fullname', db.NVarChar(255), fullname);
        request.input('social_id', db.NVarChar(255), social_id);
        request.input('email', db.NVarChar(255), email);
        request.input('country', db.NVarChar(255), country);
        request.input('phonenumber', db.NVarChar(255), phone_number);
        request.input('gender', db.NVarChar(255), gendre);


        request.execute('prcRegUser', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": {}
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error Ocurred",
                        "result": {}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Login successfull",
                        "result": results.recordset[0]
                    })
                }
            }
        });
    });
};


module.exports.sendEmail = (req, res) => {
    const info = {
        to: 'adityagupta1jan@gmail.com',
        subject: 'OTP for registration',
        text: 'Your Shopping bud app otp is : 3465'
    };

    transport.sendMail(info, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
            res.send({
                "info": info
            })
        }
    });

}

module.exports.userDetail = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var uid = req.body.uid;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'userDetail');
        request.input('USER_ID', db.NVarChar(255), uid); 
        request.execute('prcRegUser', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": {}
                })
            }
            else {
                if (results.recordsets[1] == 0) {
                    res.send({
                        "status": "0",
                        "message": "no user",
                        "result": {}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "User detail",
                        "result": results.recordsets[1]
                    })
                }
            }
        });
    })
}


