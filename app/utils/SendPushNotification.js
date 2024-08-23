var https = require("follow-redirects").https;
var fs = require("fs");

var options = {
  method: "POST",
  hostname: "fcm.googleapis.com",
  path: "/fcm/send",
  headers: {
    Authorization:
      "Bearer AAAAItHJNsU:APA91bEsZq5aPaPIdTNaRVBDH4ThQsGlxwdN4lOrhEsvtfoJH9KuckcvqhJpZx0E2NaJPLid1Dm02QxXE3oVw1HX4xPh29fdBg8u6IUAj7RhZWE2LPoCf741RGAgHZxdRQkmATcMgHou",
    "Content-Type": "application/json",
  },
  maxRedirects: 20,
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  to: "ddtQF8moQTymK4YhaqMtNo:APA91bEvuKDb9RWtPMvb_lsPWRzpeGWYqFMLIk-nucq7OSpR5w3m7IAktg5R9Bw23RzTZC2yrjzJlSu-ss8y6XlOywMuE6pKT92jzyinwWN-ZTDbvMQ1SgZ2f2DUzqH2f_7q_sFoVbnq",
  priority: "high",
  content_available: false,
  notification: {
    title: "Your Notification Title",
    body: "Your Notification Body",
    sound: "scanner_beep_sound.mp3",
  },
  data: {
    custom_key1: "custom_value1",
    custom_key2: "custom_value2",
  },
});

req.write(postData);

req.end();
