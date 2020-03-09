/**
 * Created by JonIC on 2016-11-09.
 */
url = require('url');
exports.newfeed = function(req, res){
    console.log(req);

    var facebookid       = 'fb12345';
    var photopath        = 'localhostd';
    var group            = 'sdsdsd';
    var aboutphoto       = 'dddfd';
    var rate             = 'fsdf';
    var sender_name      = 'qwq';

    // first update the photo database
    var upphotoquery = "UPDATE photo SET mycomment='"+ aboutphoto
        +"' WHERE facebookid='"+facebookid +"' AND photopath='"+ photopath +"'";
    global.mysql.query(upphotoquery, function(err, uppresult){
        if(err){

        }
        //console.log(upphotoquery);
    });
    var time = new Date().toString();
    var newfeedquery1 = "INSERT INTO notification (sender, destination, notekind, sendtime, feedval, sender_name, state) VALUES ('" +
        facebookid + "', '"+ facebookid +"', 'newfeed', '"+time+"', '" + photopath +"', '" + sender_name + "', '0')";
    global.mysql.query(newfeedquery1, function(err){
        if(err){

        }
        //console.log(newfeedquery1);
    });

    // find the users who take part in the specified group
    if(group == "facebook"){
        //var query_friend_1 = "SELECT facebookid2 FROM friend WHERE facebookid1='"+facebookid+"' AND sendfeed1='yes'";
        var query_friend_1 = "select * from (SELECT facebookid2 FROM friend WHERE facebookid1='" +
            facebookid +
            "' AND sendfeed1='yes') as tbfriend left join" +
            " (select * from post_accept where poster = '" +
            facebookid +
            "') as tbpost on tbfriend.facebookid2 = tbpost.receiver";

        //var query_friend_2 = "SELECT facebookid1 FROM friend WHERE facebookid2='"+facebookid+"' AND sendfeed2='yes'";

        var query_friend_2 = "select * from (SELECT facebookid1 FROM friend WHERE facebookid2='" +
            facebookid +
            "' AND sendfeed2='yes') as tbfriend left join" +
            " (select * from post_accept where poster = '" +
            facebookid +
            "') as tbpost on tbfriend.facebookid1 = tbpost.receiver";

        var query_friend_3 = "select * from (SELECT facebookid2 FROM friend WHERE facebookid1='" +
            facebookid +
            "' AND sendfeed1='yes') as tbfriend left join" +
            " (select * from post_accept where poster != '" +
            facebookid +
            "') as tbpost on tbfriend.facebookid2 = tbpost.receiver";

        var query_friend_4 = "select * from (SELECT facebookid1 FROM friend WHERE facebookid2='" +
            facebookid +
            "' AND sendfeed2='yes') as tbfriend left join" +
            " (select * from post_accept where poster != '" +
            facebookid +
            "') as tbpost on tbfriend.facebookid1 = tbpost.receiver";

        var friend1="";
        var friend2="";
        var friend3="";
        var friend4="";
        var queryComplete = 0;
        global.mysql.query(query_friend_1, function(err, rows2){
            if(err){
                console.error(err);
                queryComplete = queryComplete + 1;
                if(queryComplete == 4){
                    // here finish adding the newfeed notification message and return;
                    return res.send(200,"success");  // end point
                }
            }

            if(rows2.length>0){
                for(var i=0; i<rows2.length; i++){
                    friend1 = rows2[i].facebookid2;
                    flag = rows2[i].receiver;
                    if(flag == null){
                        continue;
                    }
                    var sendtime = new Date().toString();
                    var newfeedquery = "INSERT INTO notification (sender, destination, notekind, sendtime, feedval, sender_name, state) VALUES ('" +
                        facebookid + "', '"+ friend1 +"', 'newfeed', '" + sendtime +"', '" + photopath +"', '" + sender_name + "', '0')";
                    global.mysql.query(newfeedquery, function(err, newresult){
                        if(err){

                        }
                    });
                }
            }
            queryComplete = queryComplete + 1;
            if(queryComplete == 4){
                // here finish adding the newfeed notification message and return;
                var data = {};
                data.retcode = 200;
                return res.send(200,data);  // end point
            }

        });
        global.mysql.query(query_friend_2, function(err, rows3){
            if(err){
                console.error(err);
                queryComplete = queryComplete+1;
                if(queryComplete == 4){
                    // here finish adding the newfeed notification message and return;
                    return res.send(200,"success");  // end point
                }
            }

            if(rows3.length>0){
                for(var x=0; x<rows3.length; x++){
                    // here add the newfeed notification message.
                    var sendtime = 11;
                    friend2 = rows3[x].facebookid1;
                    var flag2 = rows3[x].receiver;
                    if(flag2 == null){
                        continue;
                    }
                    sendtime = new Date().toString();
                    var newfeedquery = "INSERT INTO notification (sender, destination, notekind, sendtime, feedval, sender_name, state) VALUES ('" +
                        facebookid + "', '"+ friend2 +"', 'newfeed', '" + sendtime +"', '" + photopath +"', '" + sender_name + "', '0')";
                    global.mysql.query(newfeedquery, function(err, newresult){
                        if(err){

                        }
                    });
                }
            }
            queryComplete = queryComplete+1;

            if(queryComplete == 4){
                // here finish adding the newfeed notification message and return;
                var data = {};
                data.retcode = 200;
                data.error_msg = "error";
                data.content="sucess";
                return res.send(200,data);

            }

        });
        global.mysql.query(query_friend_3, function(err, rows4){
            if(err){
                console.error(err);
                queryComplete = queryComplete+1;
                if(queryComplete == 4){
                    // here finish adding the newfeed notification message and return;
                    return res.send(200,"success");  // end point
                }
            }

            if(rows4.length>0){
                for(var x=0; x<rows4.length; x++){
                    // here add the newfeed notification message.
                    var sendtime = 11;
                    friend3 = rows4[x].facebookid2;
                    var flag2 = rows4[x].receiver;
                    if(flag2 == null){
                        continue;
                    }
                    sendtime = new Date().toString();
                    var newfeedquery = "INSERT INTO notification (sender, destination, notekind, sendtime, feedval, sender_name, state) VALUES ('" +
                        facebookid + "', '"+ friend3 +"', 'newfeed', '" + sendtime +"', '" + photopath +"', '" + sender_name + "', '1')";
                    global.mysql.query(newfeedquery, function(err, newresult){
                        if(err){

                        }
                    });
                }
            }
            queryComplete = queryComplete+1;

            if(queryComplete == 4){
                // here finish adding the newfeed notification message and return;
                var data = {};
                data.retcode = 200;
                data.error_msg = "error";
                data.content="sucess";
                return res.send(200,data);

            }

        });
        global.mysql.query(query_friend_4, function(err, rows5){
            if(err){
                console.error(err);
                queryComplete = queryComplete+1;
                if(queryComplete == 4){
                    // here finish adding the newfeed notification message and return;
                    return res.send(200,"success");  // end point
                }
            }

            if(rows5.length>0){
                for(var x=0; x<rows5.length; x++){
                    // here add the newfeed notification message.
                    var sendtime = 11;
                    friend4 = rows5[x].facebookid1;
                    var flag2 = rows5[x].receiver;
                    if(flag2 == null){
                        continue;
                    }
                    sendtime = new Date().toString();
                    var newfeedquery = "INSERT INTO notification (sender, destination, notekind, sendtime, feedval, sender_name, state) VALUES ('" +
                        facebookid + "', '"+ friend4 +"', 'newfeed', '" + sendtime +"', '" + photopath +"', '" + sender_name + "', '1')";
                    global.mysql.query(newfeedquery, function(err, newresult){
                        if(err){

                        }
                    });
                }
            }
            queryComplete = queryComplete+1;

            if(queryComplete == 4){
                // here finish adding the newfeed notification message and return;
                var data = {};
                data.retcode = 200;
                data.error_msg = "error";
                data.content="sucess";
                return res.send(200,data);

            }

        });

    }else if(group != ""){
        // here the photo send only one friends and the notification added.
        query_friend_1 = "SELECT facebookid2 FROM friend WHERE facebookid1='"+group+"'";
        query_friend_2 = "SELECT facebookid1 FROM friend WHERE facebookid2='"+group+"'";
        global.mysql.query(query_friend_1, function(err, result1){
            if(err){

            }
            if(result1.length > 0){
                var sendtime = new Date().toString();
                var newfeedquery = "INSERT INTO notification (sender, destination, notekind, sendtime, feedval, sender_name, state) VALUES ('" +
                    facebookid + "', '"+ group +"', 'newfeed', '" + sendtime +"', '" + photopath +"', '" + sender_name + "', '0')";
                global.mysql.query(newfeedquery, function(err, newresult){
                   if(err){

                   }
                    console.log(newfeedquery);
                    return res.send(200, "success");

                });
            }
        });
        global.mysql.query(query_friend_2, function(err, result1){
            if(err){

            }
            if(result1.length > 0) {
                var sendtime = new Date().toString();
                var newfeedquery = "INSERT INTO notification (sender, destination, notekind, sendtime, feedval,sender_name, state) VALUES ('" +
                    facebookid + "', '" + group + "', 'newfeed', '" + sendtime + "', '" + photopath + "', '" + sender_name + "', '0')";
                global.mysql.query(newfeedquery, function (err, newresult) {
                    if (err) {

                    }
                    console.log(newfeedquery);
                    return res.send(200, "success");
                });
            }
        });
    }
}