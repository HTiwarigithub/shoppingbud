module.exports.likeUser = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
    var liked_user = req.body.liked_user_id ;
    var liked_by = req.body.liked_by_id ;
    var liked_user_name = req.body.liked_user_name ;
    var request = new db.Request(); 
        request.input('ActionType', db.NVarChar(50), 'Insert'); 
        request.input('liked_user', db.NVarChar(255), liked_user);
        request.input('liked_by', db.NVarChar(255), liked_by);
        request.execute('prcLikes', function (error,results) {
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
             if(results.rowsAffected==0)
             {
              res.send({
                "status": "0",
                "message": "Error in liked the user",
                "result":{}
              })
             }
             else
             {
              res.send({
                  "status": "1",
                  "message": liked_user_name+"'s profile is liked by you",
                  "result":results.recordset[0]
                 
              })
            }
          }
      }); 
    });
};
module.exports.getLikeDetail = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
    var liked_user = req.body.liked_user_id ;
    var liked_by = req.body.liked_by_id ;
    var request = new db.Request(); 
        request.input('ActionType', db.NVarChar(50), 'Select'); 
        request.input('liked_user', db.NVarChar(255), liked_user);
        request.input('liked_by', db.NVarChar(255), liked_by);
        request.execute('prcLikes', function (error,results) {
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
                "message": "user is not liked by you",
                "result": {}
              })
             }
             else
             {
              res.send({
                  "status": "1",
                  "message": "user is liked by you",
                  "result":results.recordset[0]
                 
              })
            }
          }
      }); 
    });
};


module.exports.updateLikeStatus = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
    var liked_user = req.body.liked_user_id ;
    var like_id = req.body.like_id ;
    var liked_status = req.body.liked_status ;
    var request = new db.Request(); 
        request.input('ActionType', db.NVarChar(50), 'UpdateStatus'); 
        request.input('liked_user', db.NVarChar(255), liked_user);
        request.input('like_id', db.NVarChar(255), like_id);
        request.input('liked_status', db.NVarChar(255), liked_status);
        request.execute('prcLikes', function (error,results) {
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
                "message": "Error in updating liked status",
                "result": {}
              })
             }
             else
             {
              res.send({
                  "status": "1",
                  "message": "liked status updated successfully",
                  "result":results.recordset[0]
                 
              })
            }
          }
      }); 
    });
};