module.exports.consumerchat = (req,res)=>{

    db.close();
    db.connect(conn ,()=>{
        var projectid = 'shopping';
        var senderid = req.body.senderid;
        var recieverid = req.body.recieverid;
        var token = req.body.token;
        if(req.file==undefined){
            var text_message = req.body.text_message;
        }
        else{
            var text_message = req.file.originalname;
        }

        var request = new db.Request();
        console.log(token);
        request.input('action',db.NVarChar,'insert');
        request.input('projectid',db.NVarChar,projectid);
        request.input('senderid',db.NVarChar,senderid);
        request.input('text_message',db.NVarChar,text_message);
        request.input('recieverid',db.NVarChar,recieverid);
        request.input('token',db.NVarChar,token);
        request.execute('prcshoppingChat',function(err,results){

            if(err){
                console.log(err);
                res.send({
                    "status":"0",
                    "message":"oops error"
                })
            }

            else if(results==null){
                res.send({
                    "status":"0",
                    "message":"cant do such"
                })
            }

            else {
                console.log(results.recordset[0].mid)
                console.log(results.recordset[0].token);
                var message = {
                    data: {
                        title: results.recordset[0].name,
                        body: results.recordset[0].message,
                        sender:req.body.senderid,
                        reciever:req.body.recieverid,
                        score: '850',
                        time: '2:45',
                        "click_action": "FLUTTER_NOTIFICATION_CLICK",
                    },
                    notification: {
                        title: results.recordset[0].name,
                        body: results.recordset[0].message,
                    },
                    
                    token:'celuk1rlyhY:APA91bF7ijeNTRdqAfJM8xa1G0B6SIGyokplJ08UWQ6Y%XWcZFOlvbtNpbuOHFHN_4hkZx3KokqlkiCZSggpG_j2w14ZhCUqd_lXLOhywqrCBBF09ile9sFQD_Wp33Z5BkAUkFsRNxA5',
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
                    "status":"1",
                    "message":"your chat is stored",
                    "data":results.recordset[0]
                })
            }
        });
    });
};

module.exports.chatHistory = (req,res)=>{

    db.close();
    db.connect (conn , ()=>{

        var projectid = 'shopping';
        var recieverid = req.body.recieverid;
        var senderid = req.body.senderid;

        var request = new db.Request();

        request.input('action',db.NVarChar,'history');
        request.input('projectid',db.NVarChar,projectid);
        request.input('recieverid',db.NVarChar,recieverid);
        request.input('senderid',db.NVarChar,senderid);
        request.execute('prcshoppingChat',function(err,results){
            if(err){
                res.send({
                    "status":"0",
                    "message":"oops error"
                })
            }
            else if (results==null){
                res.send({
                    "status":"0",
                    "message":"cannot show what you are asking"
                })
            }
            else {
                res.send({
                    "status":"1",
                    "message":"your chat history is here",
                    "data":results.recordsets[0]
                })
            }
        });
    });
};