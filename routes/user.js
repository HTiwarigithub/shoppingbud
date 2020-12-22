const http = require('http');
const nodemailer = require('nodemailer');
const { readlink } = require('fs');
let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aditya.v2info@gmail.com',
    pass: 'aditya@v2infotech1234'
  }
});
module.exports.followSelect = (req, res) => {
  db.close();
  db.connect(conn, () => {
    console.log("dkhfdjhf")
    var user_id_follow = req.body.user_id_follow;
    var userIdfollowings = req.body.userIdfollowings;
    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'follow');
    request.input('user_id_follow', user_id_follow);
    request.input('userIdfollowings', userIdfollowings);
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
        if (results.rowsAffected == 0) {
          res.send({
            "status": "0",
            "message": "Error Ocurred",
            "result": {}
          })
        }
        else {
          res.send({
            "status": "1",
            "message": "Follow  Successfully"
          })
        }
      }
    });
  });
};


module.exports.unFollowSelect = (req, res) => {
  db.close();
  db.connect(conn, () => {
    console.log("dkhfdjhf")
    var idlist = req.body.idlist;
    var uid = req.body.uid;
    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'un_follow');
    request.input('user_id_follow', user_id_follow);
    request.input('userIdfollowings', userIdfollowings);
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
        if (results == null) {
          res.send({
            "status": "0",
            "message": "Error Ocurred",
            "result": {}
          })
        }
        else {
          res.send({
            "status": "1",
            "message": "Follow  Successfully"
          })
        }
      }
    });
  });
};


module.exports.getAllUser = (req, res) => {
  db.close();
  db.connect(conn, () => {
    console.log("dkhfdjhf");
    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'all_user_list');
    request.input('USER_ID', db.NVarChar, req.body.USER_ID);
    request.execute('prcRegUser', function (error, results) {
      if (error) {
        console.log(error)
        res.send({
          "status": "0",
          "message": "Error Ocurred",
          "result": []
        })
      }
      else {
        if (results.recordsets[1][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"] == 0 ||
          results.recordsets[2][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"] == 0) {
          res.send({
            "status": "0",
            "message": "No Users in List",
            "result": []
          })
        }
        else {
          var ageRangeArray = [];
          var finalArray = [];
          var index;
          var interestIdArr = new Array();
          var followUserArr = [];
          var age = Object.values(JSON.parse(results.recordsets[2][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))[0].age;
          var userInterest = Object.values(JSON.parse(results.recordsets[2][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))[0].userInterest;
          var arr = Object.values(JSON.parse(results.recordsets[2][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]));
          var otherUserList = Object.values(JSON.parse(results.recordsets[1][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]));
          var agerange = {
            'min': 18,
            'max': 25
          }
          var agerange1 = {
            'min': 26,
            'max': 40
          }
          var agerange2 = {
            'min': 41,
            'max': 50
          }
          var agerange3 = {
            'min': 51,
            'max': 100
          }
          ageRangeArray.push(agerange);
          ageRangeArray.push(agerange1);
          ageRangeArray.push(agerange2);
          ageRangeArray.push(agerange3);
          for (var j = 0; j < ageRangeArray.length; j++) {
            if (parseInt(age) >= ageRangeArray[j].min && parseInt(age) <= ageRangeArray[j].max) {
              index = j;
            }
          }
          for (var i = 0; i < userInterest.length; i++) {
            interestIdArr.push(userInterest[i].interest_id);
          }
          if(arr[0].hasOwnProperty('folllowerList'))
          {
            followerlist = arr[0].folllowerList;
            for(var b = 0;b<followerlist.length;b++)
            {
              followUserArr.push(followerlist[b].userIdfollowings)
            }
          }
          for (var k=otherUserList.length-1; k>=0; k--) {
            if (!(parseInt(otherUserList[k].age) >= ageRangeArray[index].min && parseInt(otherUserList[k].age) <= ageRangeArray[index].max)) {
              otherUserList.splice(k, 1);
            }
          }
          for (var k = 0; k <otherUserList.length ; k++) {
            if (otherUserList[k].interest == 'true') {
              for (var a = otherUserList[k].userInterest.length-1; a >=0 ; a--) {
                if (interestIdArr.includes(otherUserList[k].userInterest[a].interest_id)) {
                  finalArray.push(otherUserList[k]);
                break;
                }
              }
            }
            else {
              otherUserList.splice(k, 1);
            }
          }
          if(!(followUserArr===[]))
          {
            for(var k = finalArray.length-1;k>=0;k--)
            {
              if(followUserArr.includes(finalArray[k].USER_ID.toString()))
              {
                finalArray.splice(k,1);
              }
            }
          }
          if (finalArray == 0) {
            res.send({
              "status": "0",
              "message": "No Users in List",
              "result": []
            })
          }
          else {
            res.send({
              "status": "1",
              "message": "Users List",
              "result": finalArray
            })
          }
        }
      }
    });
  });
};

module.exports.changePassword = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'ChangePassword');
    request.input('oldpassword', db.NVarChar(50), req.body.oldPassword);
    request.input('newpassword', db.NVarChar(50), req.body.newPassword);
    request.input('USER_ID', db.NVarChar(50), req.body.USER_ID);
    request.execute('prcRegUser', function (error, results) {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Ocurred"
        })
      }
      else {
        console.log(results);
        if (results.rowsAffected[0] == 0) {
          res.send({
            "status": "0",
            "message": "Error in changing password, Please enter current password correctly"
          })
        }
        else {
          res.send({
            "status": "1",
            "message": "Password change successfully"
          })
        }
      }
    });
  })
},


  module.exports.updateProfile = (req, res) => {
    db.close();
    db.connect(conn, () => {
      console.log("dkhfdjhf");
      var request = new db.Request();
      request.input('ActionType', db.NVarChar(50), 'my_profile_api');
      request.input('fullname', db.NVarChar(50), req.body.fullname);
      request.input('gender', db.NVarChar(50), req.body.gender);
      request.input('USER_ID', db.NVarChar(50), req.body.USER_ID);
      request.execute('prcRegUser', function (error, results) {
        if (error) {
          res.send({
            "status": "0",
            "message": "Error Ocurred",
            "result": {}
          })
        }
        else {
          if (results.rowsAffected[1] == 0) {
            res.send({
              "status": "0",
              "message": "Error in updating Profile",
              "result": {}
            });
          }
          else {
            res.send({
              "status": "1",
              "message": "Profile updated successfully",
              "result": Object.values(JSON.parse(results.recordsets[1][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))[0]
            })
          }
        }
      });
    });
  };

module.exports.updateProfilePic = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'updateProfilePic');
    request.input('USER_ID', db.NVarChar(50), req.body.uid);
    request.input('picture', db.NVarChar, req.file.originalname);
    request.input('IMAGE_ID', db.NVarChar, req.body.imageId);
    request.execute('prcRegUser', function (error, results) {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Ocurred"
        })
      }
      else {
        console.log(results);
        if (results.rowsAffected[1] == 0) {
          res.send({
            "status": "0",
            "message": "Error in updating Profile pic"
          });
        }
        else {
          res.send({
            "status": "1",
            "message": "Profile pic updated successfully"
          })
        }
      }
    });
  })
}

module.exports.forgot_password_otp = (req, res) => {
  db.close();
  db.connect(conn, () => {
    console.log("dkhfdjhf");
    var otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'forgot_password_get_otp');
    request.input('email', db.NVarChar, req.body.email);
    request.input('otp', db.NVarChar(255), otp);
    request.execute('prcRegUser', function (error, results) {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured"
        });
      }
      else {
        if (results.recordsets[1] == 0) {
          res.send({
            "status": "0",
            "message": "Error in getting OTP"
          });
        }

        else {
          console.log(results)
          const info = {
            to: results.recordsets[1][0].email,
            subject: 'OTP for registration',
            text: 'Your Shopping bud app otp is : ' + results.recordsets[1][0].otp
          };
          var message = 'Your Shopping bud app otp is : ' + results.recordsets[1][0].otp;
          var number = results.recordsets[1][0].phonenumber;
          http.get('http://www.teleshoppe.com/serv/BulkPush/?user=tsb&pass=12345678&message=' + message + '&msisdn=' + number + '&sender=SVMTPL&type=text', (response) => {
            let data = '';
            response.on('data', (chunk) => {
              data += chunk;
            });
            response.on('end', () => {
              res.send({
                "status": "1",
                "message": "Otp Send Successfully",
                "result": results.recordsets[1][0].otp
              });
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


  })
}


module.exports.forgot_password_confirm = (req, res) => {
  db.close();
  db.connect(conn, () => {
    console.log("dkhfdjhf");
    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'forgot_password_set_otp');
    request.input('email', db.NVarChar, req.body.email);
    request.input('otp', db.NVarChar, req.body.otp);
    request.execute('prcRegUser', function (error, results) {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error occured"
        });
      }
      else if (results.recordsets[1] == 0) {
        res.send({
          "status": "0",
          "message": "Error in getting Id"
        });
      }

      else if (results) {
        console.log(results)
        res.send({
          "status": "1",
          "message": "OTP is correct, Reset your Password ",
          "result": results.recordsets[1][0]
        });
      }
    });
  })
}

module.exports.forgot_password_change = (req, res) => {
  db.close();
  db.connect(conn, () => {
    console.log("dkhfdjhf");
    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'forgot_password_update_pass');
    request.input('USER_ID', db.NVarChar, req.body.uid);
    request.input('password', db.NVarChar, req.body.password);
    request.execute('prcRegUser', function (error, results) {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured"
        });
      }
      else if (results.rowsAffected == 0) {
        res.send({
          "status": "0",
          "message": "Error in changing password"
        });
      }

      else if (results) {
        console.log(results)
        res.send({
          "status": "1",
          "message": "password change successfully"
        });
      }
    });
  })
}

module.exports.followUser = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'follow');
    request.input('user_id_follow', db.NVarChar, req.body.user_id_follow);
    request.input('userIdfollowings', db.NVarChar, req.body.userIdfollowings);
    request.execute('prcRegUser', (error, result) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured"
        });
      }
      else {
        if (result.rowsAffected == 0) {
          res.send({
            "status": "0",
            "message": "Error in following"
          });
        }
        else {
          res.send({
            "status": "1",
            "message": "Follow  Successfully"
          });
        }
      }
    })
  });
};


module.exports.userMatchorNot = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'userMatchorNot');
    request.input('user_id_follow', db.NVarChar, req.body.user_id_follow);
    request.input('userIdfollowings', db.NVarChar, req.body.userIdfollowings);
    request.execute('prcRegUser', (error, result) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured",
          "result": {}
        });
      }
      else {
        console.log(result.recordsets[1]);
        if (result.recordsets[1][0].userMatched == 'false') {
          res.send({
            "status": "0",
            "message": "user not matched",
            "result": {}
          });
        }
        else {
          res.send({
            "status": "1",
            "message": "User matched",
            "result": result.recordsets[1]
          });
        }
      }
    })
  });
};

module.exports.followerlist = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'followList');
    request.input('user_id_follow', db.NVarChar, req.body.user_id_follow);
    request.execute('prcRegUser', (error, results) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured",
          "result": []
        });
      }
      else {
        if (results.recordsets[1][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"] == 0) {
          res.send({
            "status": "0",
            "message": "No Person Follow",
            "result": []
          });
        }
        else {
          res.send({
            "status": "1",
            "message": "User Follow List",
            "result": Object.values(JSON.parse(results.recordsets[1][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
          });
        }
      }
    });
  });
};


module.exports.getUserProfileImages = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'userProfilePics');
    request.input('U_ID', db.NVarChar, req.body.uid);
    request.execute('prcRegUser', (error, result) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured",
          "result": []
        });
      }
      else {
        if (result.recordsets[1] == 0) {
          res.send({
            "status": "0",
            "message": "No Profile images",
            "result": []
          });
        }
        else {
          res.send({
            "status": "1",
            "message": "Profile image list",
            "result": result.recordsets[1]
          });
        }
      }
    });
  });
};

module.exports.deleteAccount = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'Delete');
    request.input('USER_ID', db.NVarChar, req.body.uid);
    request.execute('prcRegUser', function (error, results) {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured"
        });
      }
      else {
        if (results.recordsets[1] == 0) {
          res.send({
            "status": "0",
            "message": "Error in deleting account"
          });
        }
        else {
          res.send({
            "status": "1",
            "message": "Account deleted successfully"
          });
        }
      }
    });
  });
};

module.exports.checkRegistration = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'registeredUser');
    request.input('email', db.NVarChar, req.body.email);
    request.input('phonenumber', db.NVarChar, req.body.phonenumber);
    console.log('req',req.body)
    request.execute('prcRegUser', (err, results) => {
      if (err) {
        res.send({
          "status": "1",
          "message": "error occured",
          "data": {}
        })
      }
      else {
        console.log("data " ,results.recordsets[1][0].accRegistered)
        if (results.recordsets[1][0].accRegistered == 'Already Registered' ) {
          res.send({
            "status": "1",
            "message": "Already Registered",
            "data": results.recordsets[1][0].accRegistered
          });
        }
        else {
          res.send({
            "status": "0",
            "message": "Not  Registered",
            "data": results.recordsets[1][0].accRegistered
          });
        }
      }
    });
  });
};


module.exports.getUserByFilter = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'userByFilter');
    request.input('minage', db.NVarChar, req.body.minage);
    request.input('maxage', db.NVarChar, req.body.maxage);
    request.input('gender', db.NVarChar, req.body.gender);
    request.input('USER_ID', db.NVarChar, req.body.USER_ID);
    request.execute('prcRegUser', function (error, results) {
      if (error) {
        console.log(error)
        res.send({
          "status": "0",
          "message": "Error Ocurred",
          "result": []
        })
      }
      else {
        if (results.recordsets[1][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"] == 0) {
          res.send({
            "status": "0",
            "message": "No Users in List",
            "data": []
          });
        }
        else {
          res.send({
            "status": "1",
            "message": "Users List",
            "data": Object.values(JSON.parse(results.recordsets[1][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
          })

        }

      }
    });
  })
}

module.exports.profilePic = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'profilepic');
    request.input('USER_ID', db.NVarChar(50), req.body.uid);
    request.input('picture', db.NVarChar(50), req.file.originalname);
    request.execute('prcRegUser', function (error, results) {
      if (error) {
        res.send({
          "status": "0",
          "message": "error occured",
          "result": []
        })
      }
      else {
        if (results.recordsets[1] == 0) {
          res.send({
            "status": "0",
            "message": "no image in list",
            "result": []
          })
        }
        else {
          res.send({
            "status": "1",
            "message": "image list",
            "result": results.recordsets[1]
          })
        }
      }
    });
  });
};

module.exports.blockUnblockuser = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'blockUnblockUser');
    request.input('user_id_follow', db.NVarChar, req.body.user_id_follow);
    request.input('userIdfollowings', db.NVarChar, req.body.userIdfollowings);
    request.input('blockStatus', db.NVarChar, req.body.blockStatus);
    request.execute('prcRegUser', (error, result) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured"
        });
      }
      else {
        if (req.body.blockStatus == 'block') {
          if (result.rowsAffected == 0) {
            res.send({
              "status": "0",
              "message": "Error in blocking user"
            });
          }
          else {
            res.send({
              "status": "1",
              "message": "Blocked successfully"
            });
          }
        }
        else if (req.body.blockStatus == 'unBlock') {
          if (result.rowsAffected == 0) {
            res.send({
              "status": "0",
              "message": "Error in unBlocking user"
            });
          }
          else {
            res.send({
              "status": "1",
              "message": "UnBlocked successfully"
            });
          }
        }
      }
    })
  });
};


module.exports.blockUserList = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'blockUserList');
    request.input('user_id_follow', db.NVarChar, req.body.user_id_follow);
    request.execute('prcRegUser', (error, results) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured",
          "result": []
        });
      }
      else {
        if (results.recordsets[1][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"] == 0) {
          res.send({
            "status": "0",
            "message": "No blocked user",
            "result": []
          });
        }
        else {
          res.send({
            "status": "1",
            "message": "Blocked users List",
            "result": Object.values(JSON.parse(results.recordsets[1][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
          });
        }
      }
    });
  });
};