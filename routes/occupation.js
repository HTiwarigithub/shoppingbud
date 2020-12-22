module.exports.addOccupation = (req,res)=>{
    db.close();
    db.connect(conn, () => {
      var U_id = req.body.uid;
      var OName = req.body.occupation;
      var ODescription  =req.body.description;
      var request = new db.Request();
      request.input('ActionType',db.NVarChar,'Insert');
      request.input('U_id',db.NVarChar,U_id);
      request.input('OName',db.NVarChar,OName);
      request.input('ODescription',db.NVarChar,ODescription);
      request.execute('prcoccupation',function(error,results){
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
         if(results.rowsAffected==0)
         {
          res.send({
            "status": "0",
            "message": "error in adding occupation"
          })
         }
         else
         {
          res.send({
              "status": "1",
              "message": "Occupation added Successfully"
          })
        }
      }
      });
  });
};
module.exports.getOccupation = (req,res)=>{
    db.close();
  db.connect(conn, () => {
    var U_id = req.body.uid;
    var request = new db.Request();
    request.input('ActionType',db.NVarChar,'Select');
    request.input('U_id',db.NVarChar,U_id);
    request.execute('prcoccupation',function(error,results){
      if(error)
      {
          console.log(error)
          res.send({
              "status": "0",
              "message": "Error Ocurred",
              "result":{}
          })
      }
      else
      {
       if(results.recordset==0)
       {
        res.send({
          "status": "1",
          "message": "No occupation added",
          "result":{
            "OName":null,
            "ODescription":null
          }
        })
       }
       else
       {
           console.log(results);
        res.send({
            "status": "1",
            "message": "Occupation of User",
            "result":results.recordset[0]
        })
      }
    }
    });
  });
};
module.exports.updateOccupation = (req,res)=>{
    db.close();
    db.connect(conn, () => {
      var O_Id = req.body.oid;
      var U_id = req.body.uid;
      var OName = req.body.occupation;
      var ODescription  =req.body.description;
      var request = new db.Request();
      request.input('ActionType',db.NVarChar,'Update');
      request.input('O_Id',db.NVarChar,O_Id);
      request.input('U_id',db.NVarChar,U_id);
      request.input('OName',db.NVarChar,OName);
      request.input('ODescription',db.NVarChar,ODescription);
      request.execute('prcoccupation',function(error,results){
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
         if(results.rowsAffected==0)
         {
          res.send({
            "status": "0",
            "message": "error in updating occupation"
          })
         }
         else
         {
          res.send({
              "status": "1",
              "message": "Occupation updating Successfully"
          })
        }
      }
      });
  });
};