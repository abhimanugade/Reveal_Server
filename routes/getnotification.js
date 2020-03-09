/**
 * Created by JonIC on 2016-11-26.
 */
url = require('url');
exports.getnotification = function(req, res) {
    console.log(req);
    //var url_parts = url.parse(req.url, true);
    var facebookid = req.body.facebookid;
    var notequery8 =
        "select * from (SELECT * FROM  notification" +
        " LEFT JOIN (select facebookid, name, email, gender, age, locationx, locationy, showme, showmatch," +
        " maxage, minage, distance, maxrate, minrate, not_match, not_message, not_friend, not_comment," +
        " not_like, showfullname, searchbyname, autoaccept, totalrate, lastname, suberb from users) as tbuser " +
        " ON notification.sender = tbuser.facebookid WHERE" +
        " (destination = '" +
        facebookid +
        "' AND facebookid NOT IN ('" +
        facebookid +
        "') AND notekind NOT IN ('newfeed')  and state=0  )" +
        " OR (destination = '" +
        facebookid +
        "' AND notekind = 'newfeed'  and state=0 ) ORDER BY Id DESC) as note left join" +
        " (SELECT photopath as profilephoto, facebookid as tbfacebookid FROM photo  where facebookid = '" +
        facebookid +
        "' order by photo.id DESC limit 1) as tbphoto on tbphoto.tbfacebookid = note.facebookid";

        global.mysql.query(notequery8, function (err, result) {
            var data = {};

            if (err) {
                data.retcode = 300;
                data.profile = "";
                data.error_msg = "sql error";
                return res.send(200, data);

            }
            if(result.length != 0){
                data.retcode = 200;
                data.error_msg = "";
                data.profile = result[0].profilephoto;
                data.content = result;
                return res.send(200, data);
            }else{
                var data2 = {};

                var query3 = "select * from users where facebookid = '"+facebookid+"'";
                global.mysql.query(query3, function(err, result3){
                    if(err){
                        data2.retcode = 300;
                        data2.profile = "";
                        data2.error_msg = "sql error";
                        return res.send(200, data2);

                    }else{
                        var jsonArray = [];
                        if(result3.length == 1){
                            jsonArray.push({Id:"" , sender:"", destination:"", notekind:"", sendtime:"", feedval:"", state:"", sender_name:""
                                ,facebookid:result3[0].facebookid, name:result3[0].name, email:result3[0].email, gender:result3[0].gender, age:result3[0].age,
                                locationx:result3[0].locationx, locationy:result3[0].locationy, showme:result3[0].showme,
                                showmatch:result3[0].showmatch, maxage:result3[0].maxage, minage:result3[0].minage, distance:result3[0].distance,
                                maxrate:result3[0].maxrate, minrate:result3[0].minrate, not_match:result3[0].not_match, not_message:result3[0].not_message,
                                not_friend:result3[0].not_friend, not_comment:result3[0].not_comment,not_like:result3[0].not_like,
                                showfullname:result3[0].showfullname, searchbyname:result3[0].searchbyname, autoaccept:result3[0].autoaccept,
                                totalrate:result3[0].totalrate, lastname:result3[0].lastname, suberb:result3[0].suberb, profilephoto:result3[0].profilephoto,
                                tbfacebookid:result3[0].facebookid
                            });
                        }
                        data2.retcode = 200;
                        data2.profile ="";
                        if(result3.length == 1){
                            data2.profile =result3[0].profilephoto;
                        }
                        data2.content = jsonArray;
                        data2.error_msg = "no user";
                        if(result3.length == 1){
                            data2.error_msg = "";
                        }
                        return res.send(200, data2);
                    }
                });
                data.profile = "";
            };

    });
}