function main() {
	
    var startingSessionTime = new Date();

    //initialize the map!
    initialize();
		
		var n = 243,
		    duration = 750,
		    now = new Date(Date.now() - duration), //is set to 0.75 seconds behind now
		    count = 0,
		    data = d3.range(n).map(function() { return 0; }); // Create an empty data set e.g. 0,0,0,0, etc
		
		// var margin = {top: 6, right: 5, bottom: 20, left: 50},
		//     width = 1000 - margin.right,
		//     height = 500 - margin.top - margin.bottom;
		
    var margin = {top: 40, right: 50, bottom: 30, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

		// X axis
		var x = d3.time.scale()
		    .domain([now - (n - 2) * duration, now - duration])  // current time - .75 s  - (486) * 750, current time
		    .range([0, width]);
		
		// Y axis
		var y = d3.scale.linear()
		    .range([height, 0]);
		
		var line = d3.svg.line()
		    .interpolate("basis")
		    .x(function(d, i) { return x(now - (n - 1 - i) * duration); })
		    .y(function(d, i) { return y(d); });

		
		var svg = d3.select("div.a").append("p").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .style("margin-left", -margin.left + "px")
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append("defs").append("clipPath")
		    .attr("id", "clip")
		  .append("rect")
		    .attr("width", width)
		    .attr("height", height);
		
		// X Axis
		var axis = svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + height + ")")
		    .call(x.axis = d3.svg.axis().scale(x).orient("bottom"));
	
		// Y Axis
		var yaxsis = svg.append("g")
	      	    .attr("class", "y axis")
	            .call(d3.svg.axis().scale(y).ticks(10).orient("left"))
	      	 .append("text")
        .attr("transform", "rotate(-90)")//translate(-250,-40)")
        .attr("class", "y axis")
        .text("Wikipeda Edits Per Second");
    
		// Line
		var path = svg.append("g")
		    .attr("clip-path", "url(#clip)")
		  .append("path")
		    .data([data])
		    .attr("class", "line");
		 
			
		this.tick = (function() {

		  	// update the domains
		  	now = new Date();
		  	
		  	// your data minimum and maximum e.g. domain([0, 20]) 
		  	//  now - 0.75 seconds - (245) * 750
		  	x.domain([now - (n - 2) * duration, now - duration]);
		  
		  	y.domain([0, d3.max(data)]);
	
		  	// push the accumulated count onto the back, and reset the count
		  	data.push(Math.min(100, count));
		 
		  	count = 0;
		
		  	// redraw the line
		  	svg.select(".line")
		      	.attr("d", line)
		      	.attr("transform", null);
		
		  	// slide the x-axis left
		  	axis.transition()
		      	.duration(duration)
		      	.ease("linear")
		      	.call(x.axis);
		
		  	// slide the line left
		  	path.transition()
		  		.duration(duration)
		      	.ease("linear")
		      	.attr("transform", "translate(" + x(now - (n - 1) * duration) + ")")
		      	.each("end", tick);
		
			// Y Axis
			yaxsis.transition()
		 		.attr("class", "y axis")
	      		.ease("linear")
	      		.call(d3.svg.axis().scale(y).ticks(10).orient("left"));
		
		  	// pop the old data point off the front
		  	data.shift();
		
		});
	
		this.tick();


    // words code

    var words = {};
    var fill = d3.scale.category20();
    //what range of font sizes do we want, we will scale the word counts
    var fontSize = d3.scale.log().range([200, 300]);

    //create my cloud object
    var mycloud = d3.layout.cloud().size([1000, 1000])
          .words([])
          .padding(2)
          .rotate(function() { return ~~(Math.random() * 2) * 0; })
          // .rotate(function() { return 0; })
          .font("Impact")
          .fontSize(function(d) { return fontSize(d.size); })
	 .on("end", draw);
          
    //render the cloud with animations
     function draw(words) {
        //fade existing tag cloud out
        d3.select("div.b").selectAll("svg").selectAll("g")
            .transition()
                .duration(1000)
                .style("opacity", 1e-6)
                .remove();

        //render new tag cloud
        d3.select("div.b").selectAll("svg")
            .append("g")
                 .attr("transform", "translate(500,500)")
                .selectAll("text")
                .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return ((d.size)* 1) + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .style("opacity", 1e-6)
            .attr("text-anchor", "middle")
            .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .text(function(d) { return d.text; });
	     	     
      }

    function get_words() {

        var words_array = [];
        for (key in words){
            words_array.push({text: key, size: words[key]})
        }
        if(Object.keys(words).length >15){
            words = {};
        }

        //render cloud
        mycloud.stop().words(words_array).start();
    };

    //create SVG container
    d3.select("div.b").append("svg")
        .attr("width", 1000)
        .attr("height", 1000);

    //render first cloud
    get_words();

    //start streaming
    var interval = setInterval(function(){get_words()}, 2000);

    //stats code


    function createStatsString(){

      rate = calculateWikiEditsPerSecond(count);
      
      var statsStr = "Revs:"+countTotal.toString()+"<br>"
                   + "Users:"+totalUsers.toString()+"</br>"
                   + "Wiki/Sec: "+rate.toFixed(1).toString()+"";
      return statsStr;

    };


    function updateHTML(){

     $("#statsDiv span").html(createStatsString());



    }

    //var intervalStats = setInterval(function(){updateHTML()}, 2000);

    var countTotal = 0;
    var users = {};
    var totalUsers = 0;



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

    var socket = io.connect('http://sociamvm-app-001.ecs.soton.ac.uk:9001');
    //var socket = io.connect('http://sociamvm-app-001.ecs.soton.ac.uk:9001');

    socket.on('wikipedia_images', function (image_data) {
        var data = image_data.data;
        var image_url = image_data.image_url;

        // images
        if (image_url && image_url != "") {
            var div = $("#collageContainer");
            var img = new Image(image_url);
            img.onload = function () {
              try{
              div.append($("<div id='thumbimg'><a href='#'><img src='"+image_url+"'></a></div>"));
              if (div.children().length > 6) {
                div.children()[0].remove();
              }
            }catch(err){}
            };
            img.src = image_url;
        }
    });

    socket.on('wikipedia_revisions', function (data) {
        // update graph data
        console.log(data);
        ++count;
        // update words
        updateHTML();
        calculateMostCommonLang(data);

        updateWikiActivityList(data)

        if(data.wikipedia_page_name != undefined){
         //console.log(data.wikipedia_page_name);
          words[data.wikipedia_page_name]= 1;
          ++countTotal;
          if(data.wikipedia_user.username in users){
            users[data.wikipedia_user.username] = users[data.wikipedia_user.username]+1;
          }else{
             users[data.wikipedia_user.username] = 1;
          }
          totalUsers = Object.keys(users).length;

        }
    });	









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