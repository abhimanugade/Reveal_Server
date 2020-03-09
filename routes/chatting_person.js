/**
 * Created by JonIC on 2017-03-14.
 */

url = require('url');
exports.chatting_person = function(req, res) {
    console.log(req);
    //var url_parts = url.parse(req.url, true);
    var facebookid = req.body.facebookid;
    var query = "select * from (select * from chat where  name='"+facebookid+"') as t1 join (select * from users ) as t2 on " +
        "t1.receiver = t2.facebookid group by t2.facebookid";

    global.mysql.query(query, function(err, result){
        if(err){
            var data = {};
            data.retcode = 300;
            data.error_msg = "sql error";
            return res.send(200,data);

        }
        var data = {};
        data.retcode = 200;
        data.error_msg = "";
        data.content = result;
        //res.json(data);
        return res.send(200,data);

    });
}