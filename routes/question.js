module.exports.addQuestions = (req, res) => {
  db.close();
  db.connect(conn, () => {
    console.log("dkhfdjhf")
    var Question = req.body.Question;
    var Answer1 = req.body.Answer1;
    var Answer2 = req.body.Answer2;
    var Answer3 = req.body.Answer3;
    var Answer4 = req.body.Answer4;
    var IsDescriptive = req.body.IsDescriptive;
    var Description = req.body.Description;

    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'addQuestion');
    request.input('Question', Question);
    request.input('Answer1', Answer1);
    request.input('Answer2', Answer2);
    request.input('Answer3', Answer3);
    request.input('Answer4', Answer4);
    request.input('IsDescriptive', IsDescriptive);
    request.input('Description', Description);
    request.execute('prcquestion', function (error, results) {
      if (error) {
        console.log(error)
        res.send({
          "status": "0",
          "message": "Error Ocurred"
        })
      }
      else {
        if (results.rowsAffected[1] == 0) {
          res.send({
            "status": "0",
            "message": "Error Ocurred"
          })
        }
        else {
          res.send({
            "status": "1",
            "message": "Interested Successfully"
          })
        }
      }
    });
  });
};


module.exports.getQuestion = (req, res) => {
  db.close();
  db.connect(conn, () => {
    console.log("dkhfdjhf")


    var request = new db.Request();
    request.input('ActionType', db.NVarChar(50), 'getQuestion');
    request.execute('prcquestion', function (error, results) {
      if (error) {
        console.log(error)
        res.send({
          "status": "0",
          "message": "Error Ocurred",
          "result": []
        })
      }
      else {
        if (results.recordset == 0) {
          res.send({
            "status": "0",
            "message": "Error Ocurred",
            "result": []
          })
        }
        else {
          res.send({
            "status": "1",
            "message": "Interested Successfully",
            "result": results.recordset
          })
        }
      }
    });
  });
};



module.exports.addUserAnswer = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'addAnswer');
    request.input('User_Id', db.NVarChar, req.body.user_id);
    request.execute('prcquestion', function (error, results) {
      if (error) {
        console.log(error);
        res.send({
          "status": "0",
          "message": "Error Ocurred"
        })
      } else {
        console.log(results);
        if (results.rowsAffected == 0) {
          res.send({
            "status": "0",
            "message": "Error Ocurred"
          })
        }
        else {
          res.send({
            "status": "1",
            "message": "Question and Answer added Successfully"
          })
        }
      }
    });
    // for (let i = 0; i < req.body.answer.length; i++) {
    //   console.log(req.body.answer[i]);
    //   var request = new db.Request();
    //   request.input('ActionType', db.NVarChar, 'addAnswer');
    //   request.input('QuestionUser', db.NVarChar, req.body.answer[i].question);
    //   request.input('Answer', db.NVarChar, req.body.answer[i].answer);
    //   request.input('User_Id', db.NVarChar, req.body.answer[i].user_id);
    //   request.execute('prcquestion', function (error, results) {
    //     if (error) {
    //       console.log(error);
    //       res.send({
    //         "status": "0",
    //         "message": "Error Ocurred"
    //       })
    //     } else {
    //       console.log(results);
    //       if (results.rowsAffected == 0) {
    //         res.send({
    //           "status": "0",
    //           "message": "Error Ocurred"
    //         })
    //       }
    //       else {
    //         res.send({
    //           "status": "1",
    //           "message": "Question and Answer added Successfully"
    //         })
    //       }
    //     }
    //   });
    // }
  });
};
module.exports.userQueAns = (req, res) => {
  db.close();
  db.connect(conn, () => {
    var request = new db.Request();
    request.input('ActionType', db.NVarChar, 'usersQueAns');
    request.input('User_Id', db.NVarChar, req.body.user_id);
    request.execute('prcquestion', function (error, results) {
      if (error) {
        console.log(error);
        res.send({
          "status": "0",
          "message": "Error Ocurred",
          "data":[]
        })
      } else {
        console.log(results);
        if (results.recordset == 0) {
          res.send({
            "status": "0",
            "message": "No Que And Ans for the user.",
            "data":[]
          })
        }
        else {
          res.send({
            "status": "1",
            "message": "Question and Answer List",
            "data":results.recordset
          })
        }
      }
    });
  });
};

