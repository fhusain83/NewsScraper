

module.exports=function(express,Note,Article,request,cheerio)
{


var app=express.Router();


var hbsobject=null;
var articles=[];

app.get('/',function(req,res){
  console.log("in here");

var art= new Article({_id:null,title:"Uh Oh.Looks like we don't have any new articles.",link:"",note:null});

if(hbsobject===null)
{
  articles.push(art);
}
  hbsobject={articles};

res.render("index",hbsobject);
// res.redirect('/articles');
});




app.get("/Scrape", function(req, res) {

  // First, we grab the body of the html with request
  request("http://www.echojs.com/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    
    $("article h2").each(function(i, element) {

      // Save an empty result object
      var result = {};
 
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
        //  console.log(doc);
        }
      });

    });
  });
  // Tell the browser that we finished scraping the text
  res.redirect("/articles");
});


app.get("/articles",function(req,res){
Article.find({},function(error,data){

if(error)
	console.log("An error occured");
else
{	
 articles=data;
    
res.redirect("/");
}
});
});


app.get("/articles/:id",function(req,res){
Article.findOne({_id:req.params.id})
.populate("Article")
.exec(function(error,doc){
if(error) console.log("An error occured");
else
res.send(doc.Article);
});
});


app.post("/articles/:id",function(req,res)
        {
           var newArticle=new Article(request.body);
           newArticle.save(function(error,doc){
           Article.findOneAndUpdate({_id:req.params.id},
	                                {$push:{Article:doc._id}},
	                                {new:true},
                                    function(err,anotherDoc)
                                    {
                                    if(err) console.log("An error occured");
                                    else
                                    res.send(anotherDoc);
                                    });
                                    });
         });

//SAVE AND RERIEVE NOTES

app.get("/note/:id",function(request,response){
  console.log(request.params.id);
Note.findOne({_id:request.params.id})
.populate("note")
.exec(function(error,doc)
  {
   if(error)
  { 
console.log(error);
}
else
  if(doc)
    response.send(doc.note);
  else
      response.send(new Note({id:null,title :"",body:""}));
  });

});


app.post("/note/:id",function(req,res)
        {
           var Note=new Note(req.params.note);
           Note.save(function(error,doc){
           Article.findOneAndUpdate(
                                  {_id:req.params.id},
                                  {$push:{note:doc._id}},
                                  {new:false},
                                    function(err,anotherDoc)
                                    {
                                    if(err) console.log("An error occured");
                                    else
                                    res.send(anotherDoc);
                                    });
                                    });
         });

return app;
}