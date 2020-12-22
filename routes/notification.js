module.exports.getAllNotification = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'getAllNotification');
    request.input('user_id', db.NVarChar, req.body.user_id);
    request.execute('prcNotification', (error, result) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured",
          "result":[]
        });
      }
      else {
        if (result.recordset == 0) {
            res.send({
              "status": "0",
              "message": "No notification",
              "result":[]
            });
          }
          else {
            res.send({
              "status": "1",
              "message": "Notification List",
              "result":result.recordset
            });
          }
      }
    })
    });
};

module.exports.getReadNotification = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'getReadNotification');
    request.input('user_id', db.NVarChar, req.body.user_id);
    request.execute('prcNotification', (error, result) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured",
          "result":[]
        });
      }
      else {
        if (result.recordset == 0) {
            res.send({
              "status": "0",
              "message": "No readed notification",
              "result":[]
            });
          }
          else {
            res.send({
              "status": "1",
              "message": "Readed Notification List",
              "result":result.recordset
            });
          }
      }
    })
    });
};

module.exports.getUnreadNotification = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'getUnreadNotification');
    request.input('user_id', db.NVarChar, req.body.user_id);
    request.execute('prcNotification', (error, result) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured",
          "result":[]
        });
      }
      else {
        if (result.recordset == 0) {
            res.send({
              "status": "0",
              "message": "No unreaded notification",
              "result":[]
            });
          }
          else {
            res.send({
              "status": "1",
              "message": "Unreaded Notification List",
              "result":result.recordset
            });
          }
      }
    })
    });
};

module.exports.unReadNotificationCount = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'unReadNotificationCount');
    request.input('user_id', db.NVarChar, req.body.user_id);
    request.execute('prcNotification', (error, result) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured",
          "result":{}
        });
      }
      else {
        if (result.recordset == 0) {
            res.send({
              "status": "0",
              "message": "No unreaded notification",
              "result":{}
            });
          }
          else {
            res.send({
              "status": "1",
              "message": "Unreaded Notification ",
              "result":result.recordset[0]
            });
          }
      }
    })
    });
};

module.exports.updateNotificationStatus = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'UpdateStatus');
    request.input('user_id', db.NVarChar, req.body.user_id);
    request.input('notification_status', db.NVarChar, req.body.notification_status);
    request.input('notification_id', db.NVarChar, req.body.notification_id);
    request.execute('prcNotification', (error, result) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured"
        });
      }
      else {
        if (result.rowsAffected == 0) {
            res.send({
              "status": "0",
              "message": "Error in updating status"
            })
          }
          else {
            res.send({
              "status": "1",
              "message": "status updated successfully"
            });
          }
      }
    })
    });
};

module.exports.deleteNotification = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'DeleteNotification');
    request.input('user_id', db.NVarChar, req.body.user_id);
    request.input('notification_id', db.NVarChar, req.body.notification_id);
    request.execute('prcNotification', (error, result) => {
      if (error) {
        res.send({
          "status": "0",
          "message": "Error Occured"
        });
      }
      else {
        if (result.rowsAffected == 0) {
            res.send({
              "status": "0",
              "message": "error in deleteing notification"
            });
          }
          else {
            res.send({
              "status": "1",
              "message": "Notification deleted successfully"
            });
          }
      }
    })
    });
};
