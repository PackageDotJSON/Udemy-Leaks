const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const mysqlConnection = require('./connection');
const bcrypt = require('bcrypt');
const saltRounds = 2;
var viewCourse;

router.get('/api/playVideo', (req, res) => {

    console.log(req.ip);
    const viewCourse = req.query.id;
    const viewSubCourse = req.query.id2;
    const videoLink = req.query.id3;

    if(videoLink.includes('.zip'))
    {
        res.send('Your file is starting to download');
    }
    else
    {
      const path = `Videos/${viewCourse}/${viewSubCourse}/${videoLink}`;

      const stat = fs.statSync(path);
      const fileSize = stat.size;

      const head = {
        'Content-Length': fileSize,
        'Accept-Ranges' : 'bytes',
        'Content-Type': 'video/mp4'
      }

      res.setHeader('Access-Control-Expose-Headers', '*');
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
});

router.get('/api/downloadFile', (req, res) => {

  const fileDirectory = req.query.id;
  const fileSubDirectory = req.query.id2;
  const fileName = req.query.id3;

  var options = {
      root: path.join(__dirname, `./Videos/${fileDirectory}/${fileSubDirectory}`),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }

    res.sendFile(fileName, options, function (err) {
      if (!err)
      {
        console.log('File sent successfully');
      }
      else
      {
        console.log('Error occurred while sending file: ' + err.message)
      }
    })

});

router.get('/api/showSubCourse', (req, res) => {

    const viewCourse = req.query.id;
    const viewSubCourse = req.query.id2;
    const path = `Videos/${viewCourse}/${viewSubCourse}`;

    var fileList = [];

    fs.readdirSync(path).forEach(file => {
      if(file.includes(".mp4") || file.includes(".zip"))
      {
        fileList.push(file);
      }
    })
    res.send(fileList);

});

router.get('/api/getCourseList', (req, res) => {

    const viewCourse = req.query.id;
    const path = `Videos/${viewCourse}`;
    var fileList = [];

    fs.readdirSync(path).forEach(file => {
      fileList.push(file);
    })
    res.send(fileList);

});

router.get('/api/getSubCourseList', (req, res) => {

    const viewSubCourse = req.query.id;
    const path = `Videos/${viewCourse}/${viewSubCourse}`;
    var fileList = [];

    fs.readdirSync(path).forEach(file => {
      fileList.push(file);
    })
    res.send(fileList);
});

router.get('/api/coursesList', (req, res) => {

    const userSearch = req.query.id;
    const searchCourseList = `SELECT coursename, courseauthors FROM udemycourseslist WHERE coursename LIKE '%${userSearch}%'`;

    mysqlConnection.query(searchCourseList, userSearch, (err, results) => {
      if(!err)
      {
        res.send(results);
      }
      else
      {
        res.send("No courses found");
      }
    })


});

router.post('/api/login', (req, res) => {

  const userMail = req.body.usermail;
  const userPassword = req.body.passcode;

  const searchfromDB = "SELECT email, password FROM udemyleaks WHERE email = ?";

  mysqlConnection.query(searchfromDB, userMail, (err, results) => {
    if(!err)
    {
      if(results.length > 0)
      {
        if(bcrypt.compareSync(userPassword, results[0].password))
        {
          res.send("Successfully logged in");
        }
        else
        {
          res.send("User login failed");
        }
      }
      else
      {
        res.send("User login failed");
      }

    }
    else
    {
      res.send("Error occurred while trying to log in " + err.message);
    }
  })

});


router.post('/api/registration', (req, res) => {

    const newUserName = req.body.fullname;
    const newUserMail = req.body.usermail;
    const newUserPassword = req.body.passcode;

    // addintoDB = "INSERT INTO udemyleaks (name, email, password) VALUES (?, ?, ?)";
    const checkfromDB = "SELECT * FROM udemyleaks WHERE email = ?";

    mysqlConnection.query(checkfromDB, newUserMail, (err, results) => {
      if(!err)
      {
        if(results == "")
        {
          addNewUser(newUserName, newUserMail, newUserPassword);
          res.send("User added successfully");
        }
        else
        {
          res.send("User already exists");
        }
      }
      else
      {
        console.log("Error occurred while adding new user: " + err.message);
      }
    })
});

function addNewUser(name, mail, passcode)
{
  const newUserName = name;
  const newUserMail = mail;
  const newUserPassword = passcode;

  const addintoDB = "INSERT INTO udemyleaks (name, email, password) VALUES (?, ?, ?)";

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(newUserPassword, salt);

  mysqlConnection.query(addintoDB, [newUserName, newUserMail, hash], (err, results) => {
    if(!err)
    {
      return("Added successfully");
    }
    else
    {
      console.log("Error occurred while inserting data for new user: " + err.message);
    }
  })
};

router.post('/api/feedback', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment;

    addintoDBComment = "INSERT INTO udemyfeedback (name, email, feedback) VALUES (?, ?, ?)";

    mysqlConnection.query(addintoDBComment, [name, email, comment], (err, results) => {
      if(!err)
      {
        res.send("Feedback Noted");
      }
      else
      {
        console.log("Error occurred while inserting feedback: " + err.message);
      }
    })
});

router.get('/api/userdata', (req, res) => {

    const key = req.query.id;

    searchUserData = `SELECT * from udemyleaks WHERE email = ?`;

    mysqlConnection.query(searchUserData, key, (err, results) => {
      if(!err)
      {
        res.send(results);
      }
      else
      {
        console.log("Error occurred while fetcing user data: " + err.message);
      }
    })
});

router.put('/api/updateuserdata', (req, res) => {

    const password = req.query.id;
    const email = req.query.id2;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    updateUserData = `UPDATE udemyleaks SET password = ? WHERE email = ?`;

    mysqlConnection.query(updateUserData, [hash, email], (err, results) => {

      if(!err)
      {
        res.json("Password updated successfully");
      }
      else
      {
        console.log("Error occurred while updating the user data: " + err.message);
      }
    })

});


module.exports = router;
