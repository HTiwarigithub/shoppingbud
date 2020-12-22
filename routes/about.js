module.exports.addUserAbout = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Insert');
        request.input('USER_ID', db.NVarChar, req.body.USER_ID);
        request.input('Interest', db.NVarChar, req.body.interest);
        request.input('Qualification', db.NVarChar, req.body.qualification);
        request.input('Description', db.NVarChar, req.body.description);
        request.execute('prcAbout', (error, result) => {
            if (error) {
                res.send(
                    {
                        "status": "0",
                        "message": "Error Occured"
                    }
                );
            }
            else {
                if (result.rowsAffected == 0) {
                    res.send(
                        {
                            "status": "0",
                            "message": ""
                        }
                    );
                }
                else {
                    res.send(
                        {
                            "status": "1",
                            "message": "About user added successfully"
                        }
                    );
                }
            }
        });
    });
};

module.exports.getUserAbout = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Select');
        request.input('USER_ID', db.NVarChar, req.body.uid);
        request.execute('prcAbout', (error, result) => {
            if (error) {
                res.send(
                    {
                        "status": "0",
                        "message": "Error Occured",
                        "result":{}
                    }
                );
            }
            else {
                if (result.recordset == 0) {
                    res.send(
                        {
                            "status": "0",
                            "message": "Error Occured",
                            "result":{}
                        }
                    );
                }
                else {
                    res.send(
                        {
                            "status": "1",
                            "message": "About user detail",
                            "result":result.recordset[0]
                        }
                    );
                }
            }
        });
    });
};


module.exports.updateUserAbout = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Update');
        request.input('Id', db.NVarChar, req.body.aid);
        request.input('USER_ID', db.NVarChar, req.body.USER_ID);
        request.input('Interest', db.NVarChar, req.body.interest);
        request.input('Qualification', db.NVarChar, req.body.qualification);
        request.input('Description', db.NVarChar, req.body.description);
        request.execute('prcAbout', (error, result) => {
            if (error) {
                res.send(
                    {
                        "status": "0",
                        "message": "Error Occured"
                    }
                );
            }
            else {
                if (result.rowsAffected == 0) {
                    res.send(
                        {
                            "status": "0",
                            "message": "Error Occured"
                        }
                    );
                }
                else {
                    res.send(
                        {
                            "status": "1",
                            "message": "About user updated successfully"
                        }
                    );
                }
            }
        });
    });
};