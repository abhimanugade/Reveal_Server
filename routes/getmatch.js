/**
 * Created by JonIC on 2016-11-11.
 */
 // get one's all matches from match table.
url = require('url');
exports.getmatch = function(req, res){
    console.log(req);
    //var url_parts = url.parse(req.url, true);
    //var facebookid = url_parts.query.facebookid;

    var facebookid = 'fb12345';

    var query_1 = "SELECT * FROM matching WHERE facebookid1='"+facebookid+"' OR facebookid2='"+facebookid+"'";
    var query_2 = "SELECT * FROM matching " +
        "LEFT JOIN users " +
        " ON matching.facebookid1 = users.facebookid" +
        " OR matching.`facebookid2` = users.`facebookid` " +
        "WHERE facebookid1 = '"+facebookid+"'" +
        " AND facebookid NOT IN('"+facebookid+"')" +
        " OR  facebookid2 = '"+facebookid+"'" +
        "AND facebookid NOT IN ('"+facebookid+"')";
    global.mysql.query(query_2, function(err, result){
        if(err){
            var data = {};
            data.retcode = 300;
            data.error_msg = "sql server error";
            //res.json(data);
            return res.send(200,data);
        }
        if(result.length >0){
            var data = {};
            data.retcode = 200;
            data.error_msg = "";
            data.content = result;
            //res.json(data);
            return res.send(200,data);
        }else {
            var data = {};
            data.retcode = 222;
            data.error_msg = "No Match";
            //res.json(data);
            return res.send(200,data);
        }

    });
    //var facebookid=req.body.facebookid;
}

