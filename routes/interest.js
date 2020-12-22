module.exports.addInterest = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
    console.log(req.file)
    var interest = req.body.interest ;
    var interest_description = req.body.interest_description;
    var picture =  req.file.originalname;
    var request = new db.Request(); 
        request.input('ActionType', db.NVarChar(50), 'addinterest'); 
        request.input('interest', db.NVarChar(255), interest);
        request.input('interest_description', db.NVarChar(255), interest_description);
        request.input('profilepic', db.NVarChar(255), picture);
       
        
      

        request.execute('prcinterestshopbud', function (error,results) {
            if(error)
            {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": {}
                })
            }
            else
            {
             if(results.rowsAffected==0)
             {
              res.send({
                "status": "0",
                "message": "Error Ocurred",
                "result": {}
              })
             }
             else
             {
              res.send({
                  "status": "1",
                  "message": "Added successfull",
                 
              })
            }
          }
      }); 
    });
};



module.exports.selectInterest = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
    console.log("dkhfdjhf")

    var request = new db.Request(); 
        request.input('ActionType', db.NVarChar(50), 'interestlist'); 
        request.execute('prcinterestshopbud', function (error,results) {
            if(error)
            {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": {}
                })
            }
            else
            {
             if(results.recordset==0)
             {
              res.send({
                "status": "0",
                "message": "No Interest in List",
                "result": {}
              })
             }
             else
             {
              res.send({
                  "status": "1",
                  "message": "Interest LIst",
                  "result" : results.recordset
              })
            }
          }
      }); 
    });
};


module.exports.selectInterestUser = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
    console.log("dkhfdjhf")
    var idslist = req.body.idlist;
    var uid = req.body.uid;
    var request = new db.Request(); 
        request.input('ActionType', db.NVarChar(50), 'insertinterest');
        request.input('U_ID',db.NVarChar,uid);
        request.input('interest_id',db.NVarChar,idslist);
        request.execute('prcRegUser', function (error,results) {
            if(error)
            {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred"
                })
            }
            else
            {
             if(results.rowsAffected[1] == 0)
             {
              res.send({
                "status": "0",
                "message": "Error in adding interest"
              })
             }
             else
             {
              res.send({
                  "status": "1",
                  "message": "Interested Successfully"
              })
            }
          }
      }); 
    });
};


module.exports.usersInterest = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request(); 
        request.input('ActionType', db.NVarChar, 'UsersInterest');
        request.input('U_ID',db.NVarChar,req.body.uid);
        request.execute('prcRegUser', function (error,results) {
            if(error)
            {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error Ocurred",
                    "result": []
                })
            }
            else
            {
             if(results.recordset==0)
             {
              res.send({
                "status": "0",
                "message": "No interest for the user",
                "result": []
              })
             }
             else
             {
              res.send({
                  "status": "1",
                  "message": "Interest List",
                  "result": results.recordset
              })
            }
          }
      }); 
    });
};

