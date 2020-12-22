exports.addState = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('SName',db.NVarChar,req.body.SName);
        request.execute('prcstatemaster',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured"
                });
            }
            else{
                if(result.rowsAffected == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"Error in adding state"
                    });
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"State is added successfully"
                    });
                }
            }
        });
    });
};


exports.stateList = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'SelectState');
        request.execute('prcstateCityMaster',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured",
                    "data":[]
                });
            }
            else{
                if(result.recordset == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"no state",
                        "data":[]
                    });
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"State List",
                        "data":result.recordset
                    });
                }
            }
        });
    });
};

exports.editState = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Update');
        request.input('SName',db.NVarChar,req.body.SName);
        request.input('sid',db.NVarChar,req.body.sid);
        request.execute('prcstatemaster',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured"
                });
            }
            else{
                if(result.rowsAffected == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"Error in updating state"
                    });
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"State is updated successfully"
                    });
                }
            }
        });
    });
};

exports.deleteState = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Delete');
        request.input('sid',db.NVarChar,req.body.sid);
        request.execute('prcstatemaster',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured"
                });
            }
            else{
                if(result.rowsAffected == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"Error in deleting state"
                    });
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"State is deleted successfully"
                    });
                }
            }
        });
    });
};