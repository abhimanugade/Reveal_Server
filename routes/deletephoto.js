/**
 * Created by JonIC on 2016-12-03.
 */

url = require('url');
exports.deletephoto = function(req, res){
    console.log(req);
    var facebookid       = 'fb12345';
    var photopath        = 'localhostd';
    var query = "DELETE FROM photo WHERE facebookid='"+facebookid+"' AND photopath='"+photopath+"'";
    var query2 = "SELECT * FROM photo  where facebookid = '" + facebookid + "' order by id DESC limit 1";
    global.mysql.query(query, function(err, result){
        if(err){
            var data = {};
            data.retcode = 300;
            data.error_msg = "sql_server_error";
            res.send(200,data);  // end point
        }

        global.mysql.query(query2, function(err, result){
            if(err){
                var data = {};
                data.retcode = 300;
                data.error_msg = "sql_server_error";
                res.send(200,data);  // end point
           }
            var profile = result;
            if(result.length != 0){
                var query3 = "UPDATE users SET  profilephoto= '" +
                    result[0].photopath +
                    "' WHERE facebookid='"+facebookid+"'";
                global.mysql.query(query3, function(err, result){
                    if(err){
                        var data = {};
                        data.retcode = 300;
                        data.error_msg = "sql_server_error";
                        res.send(200,data);  // end point
                    }
                    var data = {};
                    data.retcode = 200;
                    data.content = profile;
                    data.error_msg="";
                    res.send(200,data);

                });
            }else{
                var data = {};
                data.retcode = 300;
                data.error_msg = "your facebookid is not correct";
                res.send(200,data);  // end point

            }

        });

    });
}
