exports.addquestionnaire = (req, res) => {
    db.close();
    db.connect(conn, () => {
        console.log(req.body.uid);
        console.log(req.body.dob);
        console.log(req.body.interest_ids);
        var data = JSON.parse(req.body.ans);
        console.log(data);
        var request1 = new db.Request();
        request1.input('ActionType', db.NVarChar, 'Insertinterest');
        request1.input('uid', db.NVarChar, req.body.uid+"");
        request1.input('dob',db.NVarChar,req.body.dob+"");
        request1.input('interestid', db.NVarChar, req.body.interest_ids+"");
        request1.execute('prcquestionnaire', (error, result) => {
            if (error) {
                console.log(error);
                res.send({
                    "status": "0",
                    "message": "Error Occured"
                })
            }
            else {
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in adding questionnaire"
                    })
                }
                else {
                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i].ques);
                        console.log(data[i].ans);
                        console.log(data[i].sequence);
                        var request = new db.Request();
                        request.input('ActionType', db.NVarChar, 'Insert');
                        request.input('uid', db.NVarChar, req.body.uid);
                        request.input('ques', db.NVarChar, data[i].ques);
                        request.input('ans', db.NVarChar,data[i].ans);
                        request.input('sequence', db.NVarChar,data[i].sequence);
                        request.execute('prcquestionnaire', (error, result) => {
                            if (error) {
                                console.log(error)
                            }
                            else {
                                if (result.rowsAffected == 0) {
                                    console.log(result);
                                }
                                else {
                                    console.log(result);
                                }
                            }
                        });
                    }
                    res.send({
                        "status": "1",
                        "message": "Questionnaire added successfully"
                    })
                }
            }
        });
    });
}

exports.getquestionnaireList = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Select');
        request.input('uid', db.NVarChar, req.body.uid);
        request.execute('prcquestionnaire', (eror, result) => {
            if (eror) {
                res.send({
                    "status": "0",
                    "message": "Error Occured",
                    "data": {}
                })
            }
            else {
                console.log(result);
                if (result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'] == 0) {
                    res.send({
                        "status": "0",
                        "message": "No questionnaireList",
                        "data": {}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Questionnaire List",
                        "data": {
                            "interest":Object.values(JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'])),
                            "Questionnaire":result.recordsets[1]
                        }
                    })
                }
            }
        });
    });
};