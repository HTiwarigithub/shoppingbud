module.exports.viewUser = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
    var viewd_user = req.body.viewd_user_id ;
    var viewd_by = req.body.viewd_by_id ;
    var liked_user_name = req.body.viewd_user_name ;
    var request = new db.Request(); 
        request.input('ActionType', db.NVarChar(50), 'Insert'); 
        request.input('viewd_user', db.NVarChar(255), viewd_user);
        request.input('viewd_by', db.NVarChar(255), viewd_by);
        request.execute('prcViews', function (error,results) {
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
                "message": "Error in view the user"
              })
             }
             else
             {
              res.send({
                  "status": "1",
                  "message": liked_user_name+"'s profile is viewed by you"
              })
            }
          }
      }); 
    });
};
