/**
 * Created by JonIC on 2016-11-10.
 */
url = require('url');
exports.chat = function(req, res) {
    console.log(req);
    var url_parts = url.parse(req.url, true);
    var facebookid = 'fb678'//url_parts.query.facebookid;
    var sendfacebookid='fb345'//url_parts.query.sendfacebookid;
    var message = 'hi'//url_parts.query.message;

    // save the message;
     var smquery = "INSERT INTO chat (sender, destination, message) VALUES ('"+ sendfacebookid +"', '"+
            facebookid+"', '" + message+"')";
    global.mysql.query(smquery, function(err, smresult){
        
        if(err){

        }
        console.log(smquery);
        console.log(smresult);
        // send message to facebookid
    }); 
    // send message history
    var historyquery = "SELECT * FROM chat WHERE (sender='"+ facebookid+"' AND destination='"+sendfacebookid+"') OR (sender="+
            sendfacebookid+"' AND destination='"+facebookid+"')";
    global.mysql.query(historyquery, function(err, hitoryresult){
        if(err){

        }
        // send historyresult to sendfacebookid:
    });


    // send message
}
