/**
 * Created by JonIC on 2017-03-31.
 */
url = require('url');
exports.post_on_off = function(req, res) {
    console.log(req);
    var facebookid = 'fb12345';//req.body.facebookid;
    var friendid = '1234'//req.body.friendid;
    var flag = 'off';//req.body.flag;
    var query = "";
    if(flag == "on"){
        query = "INSERT ignore INTO post_accept (receiver, poster) VALUES ('" + facebookid + "', '" + friendid +"')";
    }else if(flag == "off"){
        query = "DELETE FROM post_accept WHERE receiver='"+facebookid+"' AND poster='" + friendid + "'";
    }else{
        query = "INSERT ignore INTO post_accept (receiver, poster) VALUES ('" + facebookid + "', '" + friendid +"')";
    }

    global.mysql.query(query, function(err, result){
        if(err){
            var data = {};
            data.retcode = 300;
            data.error_msg = "sql error";
            return res.send(200,data);  // end point

        }else{
            var data = {};
            data.retcode = 200;
            data.error_msg = "sql server error";
            return res.send(200, data);  // end point
        }

    });
}