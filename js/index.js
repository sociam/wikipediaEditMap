function main() {
	
    var startingSessionTime = new Date();

    

    

    //var intervalStats = setInterval(function(){updateHTML()}, 2000);

    var countTotal = 0;
    var users = {};
    var totalUsers = 0;

    //initialize the map!
    initialize();

    var WikiActivityPerSecond = 0;
    function calculateWikiEditsPerSecond(totalEdits){

      var currentTime = new Date();

      var diffSeconds = DateDiff.inSeconds(startingSessionTime,currentTime);

      return (totalEdits / diffSeconds);

    }


    


    var langCount_map = {}
    function calculateMostCommonLang(data){

      var lang = data.wikipedia_language

      if(lang in langCount_map){
        var cnt = langCount_map[lang];
        langCount_map[lang] = cnt+1;
      }else{
            langCount_map[lang] = 1;
      }

      var longest = 0;
      for(lng in langCount_map){
        if(langCount_map[lng] > longest){
          longest = langCount_map[lng];
          mostCommonLang = lng;
        }
      }

     updateHistoData(langCount_map);

    }


    var numOfItems = 0;
    function updateWikiActivityList(data){
     
          if(numOfItems>3){
            $('#loc li:first').remove();
            --numOfItems;
          }

            //console.log(node.id, node.data.tags);
          ++numOfItems;

          try{
            if(data.wikipedia_entry_type != "new_user_added"){
                  $('<li><h5>' + data.wikipedia_entry_type + ' (' + data.wikipedia_language + ')'+ '</h5>' + 
                    data.wikipedia_page_name + '</li>').appendTo('ul#loc');
            }else{
                  $('<li><h5>' + data.wikipedia_entry_type + '</h5>' + 
                    data.wikipedia_user.username + '</li>').appendTo('ul#loc');
              }
          }catch(e){

          } 
            

    }

    //SOCKET IOCODE

    //var socket = io.connect('http://socpub.cloudapp.net:9999');
    //var socket = io.connect('http://sociamvm-app-001.ecs.soton.ac.uk:9001');

    // socket.on('wikipedia_images', function (image_data) {
    //     var data = image_data.data;
    //     var image_url = image_data.image_url;

    //     // images
    //     if (image_url && image_url != "") {
    //         var div = $("#collageContainer");
    //         var img = new Image(image_url);
    //         img.onload = function () {
    //           try{
    //           div.append($("<div id='thumbimg'><a href='#'><img src='"+image_url+"'></a></div>"));
    //           if (div.children().length > 6) {
    //             div.children()[0].remove();
    //           }
    //         }catch(err){}
    //         };
    //         img.src = image_url;
    //     }
    // });

    // socket.on('live_stream_tweets_all', function (data) {
    //     // update graph data
    //     //console.log(data);
    //     ++count;
    //     // update words
    //     //updateHTML();
    //     // calculateMostCommonLang(data);

    //     // updateWikiActivityList(data)

    //     // if(data.wikipedia_page_name != undefined){
    //     //  //console.log(data.wikipedia_page_name);
    //     //   words[data.wikipedia_page_name]= 1;
    //     //   ++countTotal;
    //     //   if(data.wikipedia_user.username in users){
    //     //     users[data.wikipedia_user.username] = users[data.wikipedia_user.username]+1;
    //     //   }else{
    //     //      users[data.wikipedia_user.username] = 1;
    //     //   }
    //     //   totalUsers = Object.keys(users).length;

    //     // }
    // });	

//random functions


    var DateDiff = {

      inSeconds: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2-t1)/(1000));
        },

      inMinutes: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2-t1)/(60*1000));
        },


      inHours: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2-t1)/(3600*1000));
        },


        inDays: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2-t1)/(24*3600*1000));
        },

        inWeeks: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2-t1)/(24*3600*1000*7));
        },

        inMonths: function(d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            return (d2M+12*d2Y)-(d1M+12*d1Y);
        },

        inYears: function(d1, d2) {
            return d2.getFullYear()-d1.getFullYear();
        }
    }


}

    function updateHTML(data){

     //$("#statsDiv span").html(createStatsString());
     console.log("updating client");

     $("#kmlHistoDiv span").html(createKMLListingsString(data));



    }

    function createStatsString(){

      rate = calculateWikiEditsPerSecond(count);
      
      var statsStr = "Revs:"+countTotal.toString()+"<br>"
                   + "Users:"+totalUsers.toString()+"</br>"
                   + "Wiki/Sec: "+rate.toFixed(1).toString()+"";
      return statsStr;

    };

    function createKMLListingsString(data){

        
      var statsStr = "";
      for(key in data){

          statsStr = statsStr +  key+" --> "+data[key]+"<br>";

      }      
      
      return statsStr;

    };
