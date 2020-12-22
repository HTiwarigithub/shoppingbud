module.exports.insertPic = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Insert');
        request.input('picPath', db.NVarChar, req.file.originalname);
        request.input('reference_id', db.NVarChar, req.body.uid);
        request.execute('prcUserGallery', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Occure",
                    "result":[]
                })
            }
            else {
                if (results.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in adding Pics",
                        "result":[]
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Gallery pic added successfully",
                        "result":results.recordset
                    })
                }
            }
        });
    });
};
module.exports.getpics = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Select');
        request.input('reference_id', db.NVarChar, req.body.uid);
        request.execute('prcUserGallery', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Occured",
                    "result":[]
                })
            }
            else {
                if (results.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in getting pics",
                        "result":[]
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Gallery pic",
                        "result":results.recordset
                    })
                }
            }
        });
    });
};
module.exports.updatePics = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Update');
        request.input('picPath', db.NVarChar, req.file.originalname);
        request.input('reference_id', db.NVarChar, req.body.uid);
        request.input('deleteImage', db.NVarChar(50), req.body.deleteImage);
        request.execute('prcUserGallery', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Occured",
                    "result":[]
                })
            }
            else {
                if (results.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in updating Pics",
                        "result":[]
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Gallery pic updated successfully",
                        "result":results.recordset
                    })
                }
            }
        });
    })
};
module.exports.deletePics = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Delete');
        request.input('picId', db.NVarChar, req.body.pId);
        request.execute('prcUserGallery', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Occured"
                })
            }
            else {
                if (results.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in deleting Pics"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Gallery pic deleted successfully"
                    })
                }
            }
        });
    })
}