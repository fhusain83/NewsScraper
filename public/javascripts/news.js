$(document).ready(function(){


$('button').on('click',function(){
	var btn=$(this).text();
	if(btn==="Add Note")
 {
 	console.log("here");
 	$.get("/note/"+$(this).attr('id'),function(data){
     
    if(data.note===undefined)
 			$("#Notes").innerHtml="No Notes to Show";
 			{$('#myModal').modal({
    });
 				$('#myModal').modal();}
        
 		//$.ajax("/articles",function(data){$('#MyModal').modal('open');});
 	});
 }
});

$('a').on('click',function(){
	

if((this).text==="Scrape New Articles!")
 {
 	
 	$.get("/Scrape",function(data)
 	{
 		location.reload();
 		$("#myModal").modal();	
 		
 	});
 }




});


})