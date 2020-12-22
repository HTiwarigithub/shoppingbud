exports.addCity = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('CName',db.NVarChar,req.body.CName);
        request.input('sid',db.NVarChar,req.body.sid);
        request.execute('prccitymaster',(error,result)=>{
            if(error)
            {
                console.log(error)
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
                        "message":"Error in adding city"
                    });
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"City is added successfully"
                    });
                }
            }
        });
    });
};
exports.cityList = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'SelectCity');
        request.input('sName',db.NVarChar,req.body.sName);
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
                        "message":"no city in state",
                        "data":[]
                    });
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"City List",
                        "data":result.recordset
                    });
                }
            }
        });
    });
};
exports.editCity = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Update');
        request.input('CName',db.NVarChar,req.body.CName);
        request.input('sid',db.NVarChar,req.body.sid);
        request.input('cid',db.NVarChar,req.body.cid);
        request.execute('prccitymaster',(error,result)=>{
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
                        "message":"Error in updating city"
                    });
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"City is updated successfully"
                    });
                }
            }
        });
    });
};
exports.deleteCity = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Delete');
        request.input('cid',db.NVarChar,req.body.cid);
        request.execute('prccitymaster',(error,result)=>{
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
                        "message":"Error in deleting city"
                    });
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"City is deleted successfully"
                    });
                }
            }
        });
    });
};