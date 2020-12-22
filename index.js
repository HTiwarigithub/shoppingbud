var express = require('express')
var fcm = require('fcm-notification');
var FCM = new fcm('./fcmkey/fcmActivationKey.json');
var http = require('http')
var path = require('path')
var app = express();
var bodyParser=require("body-parser");

var login = require('./routes/login')
var interest = require('./routes/interest')
var question = require('./routes/question')
var event = require('./routes/event')
var user = require('./routes/user');
var about = require('./routes/about');
var chat = require('./routes/chat');
var occupation = require('./routes/occupation');
var view = require('./routes/view');
var like = require('./routes/like');
var faq = require('./routes/faq');
var tc = require('./routes/tc');
var gallery = require('./routes/gallery');
var notification = require('./routes/notification');
var state = require('./routes/state');
var city = require('./routes/city');
var ques = require('./routes/ques')
var multer = require('multer')
const DIR = './uploads';
// const DIR2 = './videos';
// const DIR3 = './images';
// const DIR4 = './files';


let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // var string = file.mimetype.split("/"); 
    // if(string[0]=='video')
    // {
    //   callback(null, DIR2);
    // }
    // else if(string[0]=='image')
    // {
    //   callback(null, DIR3);
    // }
    // else if(string[0]=='application')
    // {
    //   callback(null, DIR3);
    // }
    // else
    // {
    //   callback(null, DIR4);
    // }
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname );
  }
});

let upload = multer({storage: storage});

var mssql = require('mssql');
var connection = {
    server: 'sql5059.site4now.net',
    user: 'DB_A3CE37_talentapp_admin',
    password: 'Talent@123',
    database : 'DB_A3CE37_talentapp',
    options: {
        enableArithAbort: false
      }
};


mssql.connect(connection,function(err,result) {
if(err)
console.log(err);
else
console.log("result");
});

global.Fcm = FCM;
global.db = mssql;
global.conn = connection;


app.set('hostname', process.env.Host );
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use('/resources',express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port '+ app.get('port'));
});

var router = express.Router();
app.get('/', function (req, res) {
    res.send('this is the main Page');
});

app.use('/api', router);
router.get('/', function(req, res) {
  res.send("This is testing api url");
})

router.post('/User/signUp', login.signup);
router.post('/User/login', login.login);
router.post('/User/fbLogin', login.loginfacebook);
router.post('/User/googleLogin', login.loginGoogle);
router.post('/User/SubmitOTP',login.otpsubmit);
router.post('/User/resendOtp',login.resendOtp);
router.post('/User/userDetail',login.userDetail);
router.post('/User/checkRegistration',user.checkRegistration);
router.post('/Interest/addInterest',upload.single('file'), interest.addInterest);
router.get('/Interest/selectInterest',interest.selectInterest);
router.post('/Interest/selectUserInterest',interest.selectInterestUser);
router.post('/Interest/usersInterest',interest.usersInterest);
router.post('/Interest/AddQuestionAdmin',question.addQuestions);
router.get('/Interest/getQuestion',question.getQuestion);
router.post('/Interest/addUserAnswer',question.addUserAnswer);
router.post('/Interest/userQueAns',question.userQueAns);
router.post('/Event/AddEvent',upload.single('file'),event.addEvent);
router.post('/Event/getMyEvent',event.getMyEvent);
router.post('/Event/interestStatus',event.interestStatus);
router.post('/Event/getAllEvent',event.getAllEvent);
router.post('/User/getAllUser',user.getAllUser);
router.post('/User/getUserByFilter',user.getUserByFilter);
router.post('/User/addProfile',event.getMyEvent);
// router.post('/User/UpdateProfile',upload.array('image[]',4),user.updateProfile);
router.post('/User/UpdateProfile',user.updateProfile);
router.post('/User/changePassword',user.changePassword);
router.post('/User/updateProfilePic',upload.single('file'),user.updateProfilePic);
router.post('/User/deleteAccount',user.deleteAccount);
router.post('/User/getUserProfileImages',user.getUserProfileImages);
router.post('/Event/SendInvitation',event.eventRequest);
router.post('/Event/askForEvent',event.askForEvent);
router.post('/User/ForgotPassOTP',user.forgot_password_otp);
router.post('/User/ForgotPassOTPConfirm',user.forgot_password_confirm);
router.post('/User/ForgotPassChangePass',user.forgot_password_change);
router.post('/About/addUserAbout',about.addUserAbout);
router.post('/About/getUserAbout',about.getUserAbout);
router.post('/About/updateUserAbout',about.updateUserAbout);
router.post('/Follow/followUser',user.followUser);
router.post('/Follow/followerlist',user.followerlist);
router.post('/Follow/followListForEvent',event.followListForEvent);
router.post('/Follow/userMatchorNot',user.userMatchorNot);
router.post('/chat/consumerchat',upload.single('text_message'),chat.consumerchat);
router.post('/chat/chatHistory',chat.chatHistory);
router.post('/Occupation/addOccupation',occupation.addOccupation);
router.post('/Occupation/getOccupation',occupation.getOccupation);
router.post('/Occupation/updateOccupation',occupation.updateOccupation);
router.post('/View/viewUser',view.viewUser);
router.post('/Like/likeUser',like.likeUser);
router.post('/Like/getLikeDetail',like.getLikeDetail);
router.post('/Like/updateLikeStatus',like.updateLikeStatus);
router.post('/Faq/addFaqQuesAns',faq.addFaqQuesAns);
router.get('/Faq/getFaqQuesAns',faq.getFaqQuesAns);
router.post('/Faq/updateFaqQuesAns',faq.updateFaqQuesAns);
router.post('/Faq/deleteFaqQuesAns',faq.deleteFaqQuesAns);
router.post('/TC/addTC',tc.addTC);
router.get('/TC/getTC',tc.getTC);
router.post('/TC/updateTC',tc.updateTC);
router.post('/TC/deleteTC',tc.deleteTC);
router.post('/Gallery/insertPic',upload.single('file'),gallery.insertPic);
router.post('/Gallery/getPics',gallery.getpics);
router.post('/Gallery/updatePics',upload.single('file'),gallery.updatePics);
router.post('/Gallery/deletePics',gallery.deletePics);

router.post('/Event/getInvitation',event.getInvitations);
router.post('/Event/getAskEventList',event.getAskEventList);
router.post('/Event/getSendInvitationsList',event.getSendInvitationsList);
router.post('/Event/acceptInvitation',event.acceptInvitation);
router.post('/Event/acceptInvitation2',event.acceptInvitation2);
router.post('/Event/getAcceptedInvitations',event.getAcceptedInvitations);
router.post('/Event/getRejectedInvitations',event.getRejectedInvitations);
router.post('/Follow/blockUnblockuser',user.blockUnblockuser);
router.post('/Follow/blockUserList',user.blockUserList);

router.post('/Notification/getAllNotification',notification.getAllNotification);
router.post('/Notification/getReadNotification',notification.getReadNotification);
router.post('/Notification/getUnreadNotification',notification.getUnreadNotification);
router.post('/Notification/unReadNotificationCount',notification.unReadNotificationCount);
router.post('/Notification/updateNotificationStatus',notification.updateNotificationStatus);
router.post('/Notification/deleteNotification',notification.deleteNotification);


router.post('/State/addState',state.addState);
router.get('/State/stateList',state.stateList);
router.post('/State/editState',state.editState);
router.post('/State/deleteState',state.deleteState);


router.post('/City/addCity',city.addCity);
router.post('/City/cityList',city.cityList);
router.post('/City/editCity',city.editCity);
router.post('/City/deleteCity',city.deleteCity);

router.post('/Questionnaire/addquestionnaire',ques.addquestionnaire);
router.post('/Questionnaire/getquestionnaireList',ques.getquestionnaireList)

router.post('/User/profilePic',upload.single('file'),user.profilePic);

/*function intervalFunc() {
}

setInterval(intervalFunc, 10000);*/
   