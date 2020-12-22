module.exports.addEvent = (req, res) => {
    db.close();
    db.connect(conn, () => {
        console.log("dkhfdjhf")
        var event_name = req.body.event_name;
        var event_Landmark = req.body.event_Landmark;
        var event_date = req.body.event_date;
        var event_start_time = req.body.event_start_time;
        var user_id = req.body.user_id;
        var eventState = req.body.eventState;
        var eventCity = req.body.eventCity;
        var event_end_time = req.body.event_end_time;


        var request = new db.Request();
        request.input('ActionType', db.NVarChar(200), 'create_event');
        request.input('event_name', db.NVarChar(200), event_name);
        request.input('event_Landmark', db.NVarChar(200), event_Landmark);
        request.input('event_date', db.NVarChar(200), event_date);
        request.input('event_start_time', db.NVarChar(200), event_start_time);
        request.input('user_id', db.NVarChar(200), user_id);
        request.input('eventState', db.NVarChar(200), eventState);
        request.input('eventCity', db.NVarChar(200), eventCity);
        request.input('event_end_time', db.NVarChar(200), event_end_time);

        if (req.file != null && req.file != undefined && req.hasOwnProperty('file')) {
            var event_image = req.file.originalname;
            request.input('event_image', db.NVarChar(200), event_image);   
        }

        request.execute('prcEvent', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred"
                })
            }
            else {
                if (results.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error Ocurred"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Event Created Successfully"
                    })
                }
            }
        });
    });
};


module.exports.getMyEvent = (req, res) => {
    db.close();
    db.connect(conn, () => {
        console.log("dkhfdjhf");
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(200), 'get_my_event');
        request.input('user_id', db.NVarChar(200), req.body.user_id);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": []
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "No events",
                        "result": []
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Events List",
                        "result": results.recordset
                    })
                }
            }
        });
    });
};

module.exports.interestStatus = (req, res) => {
    db.close();
    db.connect(conn, () => {
        console.log("dkhfdjhf");
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(200), 'InterestorNot');
        request.input('event_id', db.NVarChar(200), req.body.event_id);
        request.input('interest', db.NVarChar(200), req.body.interest);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred"
                })
            }
            else {
                if (results.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Something went's wrong"
                    })
                }
                else {
                    if (req.body.interest == 'Interested') {
                        res.send({
                            "status": "1",
                            "message": "You are interested in the event"
                        })
                    }
                    else {
                        res.send({
                            "status": "1",
                            "message": "You are not interested in the event"
                        })
                    }
                }
            }
        });
    });
};

module.exports.getAllEvent = (req, res) => {
    db.close();
    db.connect(conn, () => {
        console.log("dkhfdjhf");
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(200), 'all_event');
        request.input('user_id', db.NVarChar(200), req.body.user_id);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": []
                })
            } else {
                if (results.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"] == 0) {
                    res.send({
                        "status": "0",
                        "message": "No events",
                        "result": []
                    });
                }
                else {
                    var array = Object.values(JSON.parse(results.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
                    var followUser = results.recordsets[1];
                    var followiguserid = new Array();
                    for(var i = 0;i<followUser.length;i++)
                    {
                        followiguserid.push(followUser[i].userIdfollowings);
                    }
                    console.log(followiguserid);
                    console.log(array);
                    for(var j = array.length-1;j>=0;j--)
                    {
                        if(!(followiguserid.includes(array[j].user_id)))
                        {
                            array.splice(j,1);
                        }
                    }
                    if (array == 0) {
                        res.send({
                            "status": "0",
                            "message": "No events",
                            "result": []
                        });
                    }
                    else {
                    res.send({
                        "status": "1",
                        "message": "Events list",
                        "result": array
                    });
                }
                }
            }
        });
    });
};

module.exports.followListForEvent = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(200), 'followListForEvent');
        request.input('user_id', db.NVarChar(200), req.body.user_id);
        request.input('event_id', db.NVarChar(255), req.body.event_id);
        request.execute('prcEvent', function (error, results) {
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured",
                    "data":[]
                })
            }
            else
            {
                if (results.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"] == 0) {
                    res.send({
                        "status": "0",
                        "message": "No follow user",
                        "result": []
                    });
                }
                else
                {
                    var array = Object.values(JSON.parse(results.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]))
                    var eventRecipent = results.recordsets[1];
                    var recipentIds = new Array();
                    for(var i =0 ;i<eventRecipent.length;i++)
                    {
                        recipentIds.push(eventRecipent[i].recipient);
                    }
                    console.log(array);
                    console.log(recipentIds);
                    for(var j = array.length-1;j>=0;j--)
                    {
                        if(recipentIds.includes(array[j].USER_ID.toString()))
                        {
                            array.splice(j,1);
                        }
                    }
                    console.log(array);
                    if(array==0)
                    {
                        res.send({
                            "status": "0",
                            "message": "No follow user",
                            "result": []
                        });
                    }
                    else
                    {
                        res.send({
                            "status": "1",
                            "message": "Follow user list",
                            "result": array
                        });
                    }
                }
            }
        })
    })
}


module.exports.eventRequest = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var event_id = req.body.event_id;
        var event_user_id = req.body.event_user_id;
        var requester_id = req.body.requester_id;
        var recipient = req.body.recipient_ids;


        console.log("dkhfdjhf")

        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'sendInvitation');
        request.input('event_id', db.NVarChar(255), event_id);
        request.input('event_user_id', db.NVarChar(255), event_user_id);
        request.input('requester_id', db.NVarChar(255), requester_id);
        request.input('recipient', db.NVarChar(255), recipient);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred"
                })
            }
            else {
                if (results.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in requesting event"
                    })
                }
                else {
                    console.log(results.recordsets[1])
                    var tokens = [];
                    for (let i = 0; i < results.recordsets[0].length; i++) {
                        tokens.push(results.recordsets[0][i].deviceToken);
                    }
                    var message = {
                        data: {
                            title: 'Invitation',
                            body: 'Invitation for the ' + results.recordsets[1][0].event_name,
                            score: '850',
                            time: '2:45',
                            "click_action": "FLUTTER_NOTIFICATION_CLICK",
                        },
                        notification: {
                            title: 'Invitation',
                            body: 'Invitation for the ' + results.recordsets[1][0].event_name,
                        },

                        // token:tokens,
                        // token:'exx675QtJnc:APA91bEdK5UFe23EbCCQ5EbN5tFW4KZGyUONR9QscUrOt9Of9vOKtk5w6n6VSEyiqIHXAJuR_lqTZ6aiSHXUYi-vt69-oaDiee3WLrgutnGqk_w-IwiqpHyBAIMBiT81FDFnV5E3IuyT'
                    };
                    Fcm.sendToMultipleToken(message, tokens, function (err, response) {
                        if (err) {
                            console.log('error found', err);
                        } else {
                            console.log('response here', response);
                        }
                    });
                    res.send({
                        "status": "1",
                        "message": "Event requested successfull"
                    })
                }
            }
        });
    });
};


module.exports.askForEvent = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var event_id = req.body.event_id;
        var event_user_id = req.body.event_user_id;
        var requester_id = req.body.requester_id;
        var recipient = req.body.recipient_id;


        console.log("dkhfdjhf")

        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'ask_for_event');
        request.input('event_id', db.NVarChar(255), event_id);
        request.input('event_user_id', db.NVarChar(255), event_user_id);
        request.input('requester_id', db.NVarChar(255), requester_id);
        request.input('recipient', db.NVarChar(255), recipient);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred"
                })
            }
            else {
                if (results.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in asking for event"
                    })
                }
                else {
                    console.log(results.recordset[0])
                    var message = {
                        data: {
                            title: 'Ask for the Event',
                            body: 'Asking for the ' + results.recordsets[1][0].event_name + ' event',
                            score: '850',
                            time: '2:45',
                            "click_action": "FLUTTER_NOTIFICATION_CLICK",
                        },
                        notification: {
                            title: 'Ask for the Event',
                            body: 'Asking for the ' + results.recordsets[1][0].event_name + ' event',
                        },

                        token: results.recordset[0].deviceToken,
                        // token:'exx675QtJnc:APA91bEdK5UFe23EbCCQ5EbN5tFW4KZGyUONR9QscUrOt9Of9vOKtk5w6n6VSEyiqIHXAJuR_lqTZ6aiSHXUYi-vt69-oaDiee3WLrgutnGqk_w-IwiqpHyBAIMBiT81FDFnV5E3IuyT'
                    };
                    Fcm.send(message, function (err, response) {
                        if (err) {
                            console.log('error found', err);
                        } else {
                            console.log('response here', response);
                        }
                    });
                    res.send({
                        "status": "1",
                        "message": "Asking for the Event"
                    })
                }
            }
        });
    });
};


module.exports.getSendInvitationsList = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'getSendInvitationsList');
        request.input('user_id', db.NVarChar(200), req.body.user_id);
        request.input('event_id', db.NVarChar(255), req.body.event_id);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": []
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "No invitation send.",
                        "result": []
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "List of invitation sended to other member.",
                        "result": results.recordset
                    })
                }
            }
        });
    });
};


module.exports.getAskEventList = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'getAskEventList');
        request.input('user_id', db.NVarChar(200), req.body.user_id);
        request.input('event_id', db.NVarChar(255), req.body.event_id);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": []
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "No user ask for event",
                        "result": []
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "List of user ask for event",
                        "result": results.recordset
                    })
                }
            }
        });
    });
};

module.exports.getInvitations = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'getInvitations');
        request.input('user_id', db.NVarChar(200), req.body.user_id);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": []
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "No invitations",
                        "result": []
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Invitations List",
                        "result": results.recordset
                    })
                }
            }
        });
    });
};

module.exports.acceptInvitation = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'update_ask_status');
        request.input('user_id', db.NVarChar(200), req.body.user_id);
        request.input('status', db.NVarChar(200), req.body.status);
        request.input('event_id', db.NVarChar(200), req.body.event_id);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Ocurred"
                })
            }
            else {
                if (req.body.status == 'Accepted') {
                    if (results.rowsAffected == 0) {
                        res.send({
                            "status": "0",
                            "message": "Error in accepting invitation"
                        })
                    }
                    else {
                        res.send({
                            "status": "1",
                            "message": "Invitation accepted"
                        })
                    }
                }
                else if (req.body.status == 'Denied') {
                    if (results.rowsAffected == 0) {
                        res.send({
                            "status": "0",
                            "message": "Error in dening invitation"
                        })
                    }
                    else {
                        res.send({
                            "status": "1",
                            "message": "Invitation denied"
                        })
                    }
                }

            }
        });
    });
};


module.exports.acceptInvitation2 = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'update_invite_status');
        request.input('user_id', db.NVarChar(200), req.body.user_id);
        request.input('status', db.NVarChar(200), req.body.status);
        request.input('event_id', db.NVarChar(200), req.body.event_id);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Ocurred"
                })
            }
            else {
                if (req.body.status == 'Accepted') {
                    if (results.rowsAffected == 0) {
                        res.send({
                            "status": "0",
                            "message": "Error in accepting invitation"
                        })
                    }
                    else {
                        res.send({
                            "status": "1",
                            "message": "Invitation accepted"
                        })
                    }
                }
                else if (req.body.status == 'Denied') {
                    if (results.rowsAffected == 0) {
                        res.send({
                            "status": "0",
                            "message": "Error in dening invitation"
                        })
                    }
                    else {
                        res.send({
                            "status": "1",
                            "message": "Invitation denied"
                        })
                    }
                }

            }
        });
    });
};

module.exports.getAcceptedInvitations = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'acceptedInvitations');
        request.input('user_id', db.NVarChar(200), req.body.user_id);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": []
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "No accepted invitations",
                        "result": []
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Accepted Invitations List",
                        "result": results.recordset
                    })
                }
            }
        });
    });
};

module.exports.getRejectedInvitations = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'rejectedInvitations');
        request.input('user_id', db.NVarChar(200), req.body.user_id);
        request.execute('prcEvent', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": []
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "No rejected invitations",
                        "result": []
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Rejected Invitations List",
                        "result": results.recordset
                    })
                }
            }
        });
    });
};