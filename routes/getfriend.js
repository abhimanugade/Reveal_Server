/**
 * Created by JonIC on 2016-11-11.
 */
/**
 * Created by JonIC on 2016-11-11.
 */

 // get ones all friend from friend table.
url = require('url');
exports.getfriend = function(req, res){
    console.log(req);
// get
    //var url_parts = url.parse(req.url, true);
    var facebookid = 'fb1';
// post
    var facebookid = 'fb1';

    var query3= "select * from (SELECT *FROM friend LEFT JOIN users " +
        "ON friend.facebookid1 = users.facebookid OR friend.`facebookid2` = users.`facebookid` WHERE facebookid1 = " +
        facebookid +
        " AND facebookid NOT IN(" +
        facebookid +
        ") OR  facebookid2 = " +
        facebookid +
        " AND facebookid NOT IN (" +
        facebookid +
        ")) as tbfriend left join post_accept on (tbfriend.facebookid = post_accept.poster and post_accept.receiver = " +
        facebookid +
        " )";

    global.mysql.query(query3, function(err, result){
        if(err){
        }
        /* if(result.length > 0){
            var data = {};
            data.retcode = 200;
            data.error_msg = "";
            data.content = result;
            //res.json(data);
            return res.send(200,data);

        }else{
            var data = {};
            data.retcode = 201;
            data.content = "999";
            data.error_msg = "No Friend";
            //res.json(data);
            return res.send(200,data);
            // return sql server error

        } */
    });
}


