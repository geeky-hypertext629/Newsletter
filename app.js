const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const request = require("request");
const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static(__dirname + '/public'));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{
    const fname=req.body.fName;
    const lname=req.body.lName;
    const email1=req.body.email;
    const data={
        members : [
            {

        email_address : email1,
        status : "subscribed",
        merge_fields : { FNAME : fname,
            LNAME : lname
        }
    }
]
    }
    const jsondata=JSON.stringify(data);
    //https.request("")
    const url="https://us13.api.mailchimp.com/3.0/lists/f164acc4e3";
    const options={
        method :"POST",
        auth : "subham:2937790de35dc7cb8b38d90d075faec7-us18"
    };
    const request =https.request(url,options,function(response)
    {
        if(response.statusCode===200)
        res.sendFile(__dirname + "/success.html");
        else
        res.sendFile(__dirname+ "/failure.html");
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(req,res)
{
    console.log("Server running on port 3000");
});

//abb17ca966392289f521cc00fa88ec5f-us13 2937790de35dc7cb8b38d90d075faec7-us18
//650cf783c1
