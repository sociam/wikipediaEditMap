function getUrlParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}  

function printObject(o) {
  var out = '';
  for (var p in o) {
    out += p + ': ' + o[p] + '\n';
  }
  alert(out);
}


function getNeighbourhoods() {

    //var results = ['ALDERSHOT-NORTH.kml','ALDERSHOT-SOUTH.kml','ALTON-RURAL.kml','ALTON.kml','ANDOVER-EAST.kml','ANDOVER-NORTH.kml','ANDOVER-SOUTH.kml','ANDOVER-TOWN.kml','BARGATE.kml','BARNCROFT-AND-BEDHAMPTON.kml','BASINGSTOKE-CENTRE.kml','BASINGSTOKE-EAST.kml','BASINGSTOKE-NORTH.kml','BASINGSTOKE-RURAL-EAST.kml','BASINGSTOKE-RURAL-SOUTH.kml','BASINGSTOKE-RURAL-WEST.kml','BASINGSTOKE-SOUTH.kml','BASINGSTOKE-WEST.kml','BATTINS-AND-WEST-LEIGH.kml','BEVOIS.kml','BISHOPS-WALTHAM-AND-SOBERTON.kml','BITTERNE-NORTH.kml','BORDON.kml','BUTSER-AND-CLANFIELD-AND-ROWLANDS-CASTLE.kml','BUTSER_CLANFIELD_ROWLANDS-CASTLE.kml','CENTRAL-SOUTHSEA-AND-ST-JUDES.kml','CHARLES-DICKENS-AND-NELSON.kml','COSHAM.kml','COWES.kml','COXFORD-AND-REDBRIDGE-AND-MILLBROOK.kml','COXFORD_REDBRIDGE_MILLBROOK.kml','CROFTON-AND-TITCHFIELD.kml','DENMEAD-AND-SOUTHWICK.kml','EAST-COWES-AND-WOOTTON.kml','EASTLEIGH-CENTRAL.kml','EASTLEIGH-EAST.kml','EASTLEIGH-WEST.kml','EASTNEY-AND-MILTON.kml','FAREHAM.kml','FARNBOROUGH-CENTRAL.kml','FARNBOROUGH-NORTH.kml','FARNBOROUGH-SOUTH.kml','FARNBOROUGH-WEST.kml','FLEET.kml','FOUR-MARKS-AND-ROPLEY.kml','FRATTON-AND-BAFFINS.kml','GOSPORT-CENTRAL.kml','GOSPORT-EAST.kml','GOSPORT-WEST.kml','HART-RURAL-NORTH.kml','HART-RURAL-SOUTH.kml','HAVANT-AND-EMSWORTH.kml','HAYLING-ISLAND.kml','HEDGE-END-NORTH.kml','HEDGE-END-SOUTH.kml','HILSEA-AND-COPNOR.kml','HORNDEAN.kml','HYTHE.kml','LEE.kml','LISS.kml','LONGMOOR-RURAL.kml','LYMINGTON.kml','NEW-FOREST-HEART.kml','NEW-MILTON.kml','NEWPORT.kml','OWSLEBURY-AND-CURDRIDGE.kml','PAULSGROVE.kml','PEARTREE-AND-WOOLSTON.kml','PETERSFIELD.kml','PORTCHESTER.kml','PORTSWOOD.kml','RINGWOOD.kml','ROMSEY-EAST.kml','ROMSEY-NORTH.kml','ROMSEY-TOWN.kml','RYDE.kml','SANDOWN-AND-LAKE.kml','SHANKLIN-AND-VENTNOR.kml','SHIRLEY-AND-FREEMANTLE.kml','SHOLING-AND-BITTERNE.kml','ST-THOMAS.kml','TOTTON.kml','WATERLOOVILLE-NORTH.kml','WATERLOOVILLE-SOUTH.kml','WEST-MEON-AND-HAMBLEDON.kml','WESTERN-WARDS.kml','WICKHAM-AND-WHITELEY.kml','WIGHT-RURAL-EAST.kml','WIGHT-RURAL-SOUTH.kml','WIGHT-RURAL-WEST.kml','WINCHESTER-CENTRAL.kml','WINCHESTER-NORTH.kml','WINCHESTER-RURAL-EAST.kml','WINCHESTER-RURAL-NORTH.kml','WINCHESTER-RURAL-WEST.kml','WINCHESTER-SOUTH.kml','YATELEY-AND-BLACKWATER-AND-HAWLEY.kml','YATELEY_BLACKWATER-AND-HAWLEY.kml']
    var results = ['WINCHESTER-CENTRAL.kml','WINCHESTER-NORTH.kml','WINCHESTER-RURAL-EAST.kml','WINCHESTER-RURAL-NORTH.kml','WINCHESTER-RURAL-WEST.kml','WINCHESTER-SOUTH.kml','YATELEY-AND-BLACKWATER-AND-HAWLEY.kml','YATELEY_BLACKWATER-AND-HAWLEY.kml'];
    //var results = ['PEARTREE-AND-WOOLSTON.kml','PETERSFIELD.kml','PORTCHESTER.kml','PORTSWOOD.kml','RINGWOOD.kml','ROMSEY-EAST.kml','ROMSEY-NORTH.kml','ROMSEY-TOWN.kml','RYDE.kml','SANDOWN-AND-LAKE.kml','SHANKLIN-AND-VENTNOR.kml','SHIRLEY-AND-FREEMANTLE.kml','SHOLING-AND-BITTERNE.kml','ST-THOMAS.kml','TOTTON.kml','WATERLOOVILLE-NORTH.kml','WATERLOOVILLE-SOUTH.kml','WEST-MEON-AND-HAMBLEDON.kml','WESTERN-WARDS.kml','WICKHAM-AND-WHITELEY.kml','WIGHT-RURAL-EAST.kml','WIGHT-RURAL-SOUTH.kml','WIGHT-RURAL-WEST.kml','WINCHESTER-CENTRAL.kml','WINCHESTER-NORTH.kml','WINCHESTER-RURAL-EAST.kml','WINCHESTER-RURAL-NORTH.kml','WINCHESTER-RURAL-WEST.kml','WINCHESTER-SOUTH.kml','YATELEY-AND-BLACKWATER-AND-HAWLEY.kml','YATELEY_BLACKWATER-AND-HAWLEY.kml'];
    return results;

};


function getDistricts(){
   var results = ['EAST-HANTS.kml','BASINGSTOKE.kml','EASTLEIGH.kml','FAREHAM.kml','GOSPORT.kml','HART.kml','HAVANT.kml','ISLE-OF-WIGHT.kml','NEW-FOREST.kml','PORTSMOUTH.kml','RUSHMOOR.kml','SOUTHAMPTON.kml','TEST-VALLEY.kml','WINCHESTER.kml']
   return results;
}


function initialize() {

  //init the histogram.
  //drawHisto()

  //Setup Google Map
  var geoXmlDoc = null;

  var myLatlng = new google.maps.LatLng(51.0895203,-1.216844); //hampshire
  
  var light_grey_style = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]}];
  
  var midnight = [ { "featureType": "water", "stylers": [ { "color": "#021019" } ] }, { "featureType": "landscape", "stylers": [ { "color": "#08304b" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#0c4152" }, { "lightness": 5 } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "color": "#000000" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#0b434f" }, { "lightness": 25 } ] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [ { "color": "#000000" } ] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [ { "color": "#0b3d51" }, { "lightness": 16 } ] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [ { "color": "#000000" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#000000" }, { "lightness": 13 } ] }, { "featureType": "transit", "stylers": [ { "color": "#146474" } ] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [ { "color": "#000000" } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#144b53" }, { "lightness": 14 }, { "weight": 1.4 } ] } ];

  var myOptions = {
    zoom: 11,
    scrollwheel: true, 
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    panControl: false,
    zoomControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
    styles: light_grey_style
  };

  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  var kmlFiles = getDistricts();

  infowindow = new google.maps.InfoWindow({});
  
  var myParser = new geoXML3.parser({
      map: map,
      infoWindow: infowindow,
       singleInfoWindow: true,
       zoom: true,
       markerOptions: {optimized: false},
       afterParse: useTheData

  });

  var heatmapPos;

  var liveTweetsPos = new google.maps.MVCArray();
    heatmapPos = new google.maps.visualization.HeatmapLayer({
    data: liveTweetsPos,
    radius: 15
  });
    
  var gradient = [
    'rgba(30,244,248,0)',
    'rgba(30,244,248,0.5)',
    'rgba(30,244,248,0.5)',
    'rgba(32,248,158,0.5)',
    'rgba(33,249,152,0.5)',
    'rgba(51,255,75,0.5)',
    'rgba(51,255,75,0.5)'
  ]
  heatmapPos.set('gradient', heatmapPos.get('gradient') ? null : gradient);
  heatmapPos.setMap(map);




  //myParser.parse('http://socpub.cloudapp.net/hwo/kml/uk/hampshire/neighbourhood/TOTTON.kml');

  //var kmlFiles = getNeighbourhoods();

  

  var kmlLayers = {};
  var kmlLayerTweetCount = {}

  for(i=0; i<kmlFiles.length; i++){

      var url = "http://socpub.cloudapp.net/hwo/kml/uk/hampshire/districts/"+kmlFiles[i];
      myParser.parse(url);
      var ctaLayer = new google.maps.KmlLayer({
         url: url,
         map: map,
         preserveViewport: true
      });

      //ctaLayer.setMap(map);
      kmlLayers[kmlFiles[i].replace(".kml","")] = ctaLayer;

      //Also initilize the layer counter off.
      kmlLayerTweetCount[kmlFiles[i].replace(".kml","")]  = 0;
//      // console.log("Default ViewPoint "+ctaLayer.Bounds());
   }

// for (var key in myParser) {

//     console.log("KML LAYERS ADDED ITEM: "+myParser[key]);
// }

  //console.log("KML LAYERS ADDED "+myParser);


var highlightOptions = {fillColor: "#FFFF00", strokeColor: "#000000", fillOpacity: 0.30, strokeWidth: 10};
// var highlightLineOptions = {strokeColor: "#FFFF00", strokeWidth: 10};
// function kmlHighlightPoly(pm) {
//    for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
//      var placemark = geoXmlDoc.placemarks[i];
//      if (i == pm) {
//        if (placemark.polygon) placemark.polygon.setOptions(highlightOptions);
//        if (placemark.polyline) placemark.polyline.setOptions(highlightLineOptions);
//      } else {
//        if (placemark.polygon) placemark.polygon.setOptions(placemark.polygon.normalStyle);
//        if (placemark.polyline) placemark.polyline.setOptions(placemark.polyline.normalStyle);
//      }
//    }
// }
// function kmlUnHighlightPoly(pm) {
//    for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
//      if (i == pm) {
//        var placemark = geoXmlDoc.placemarks[i];
//        if (placemark.polygon) placemark.polygon.setOptions(placemark.polygon.normalStyle);
//        if (placemark.polyline) placemark.polyline.setOptions(placemark.polyline.normalStyle);
//      }
//    }
// }


// function highlightPoly(poly, polynum) {
//   //    poly.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF", fillOpacity: 0.3}) ;
//   google.maps.event.addListener(poly,"mouseover",function() {
//     var rowElem = document.getElementById('row'+polynum);
//     if (rowElem) rowElem.style.backgroundColor = "#FFFA5E";
//     if (geoXmlDoc.placemarks[polynum].polygon) {
//       poly.setOptions(highlightOptions);
//     } else if (geoXmlDoc.placemarks[polynum].polyline) {
//       poly.setOptions(highlightLineOptions);
//     }
//   });
//   google.maps.event.addListener(poly,"mouseout",function() {
//     var rowElem = document.getElementById('row'+polynum);
//     if (rowElem) rowElem.style.backgroundColor = "#FFFFFF";
//     poly.setOptions(poly.normalStyle);
//   });
// }  

var normalStyle = null;
function useTheData(doc) {

  var currentBounds = map.getBounds();
  var distance = 0.3; // km
  var myLatlng = new google.maps.LatLng(51.0895203,-1.216844); //hampshire
  var geoXmlDoc = doc[0];

         if (geoXmlDoc.gpolygons.length>0){ 
          for (var i=0; i<geoXmlDoc.gpolygons.length; i++) {
            //update title
            // docs[0].gpolygons[i].title = kmlFiles[i].replace(".kml","");
            var polygon = geoXmlDoc.gpolygons[i];
            polygon.fillOpacity = .1;
            normalStyle = {
              strokeColor: polygon.get('strokeColor'),
              strokeWeight: polygon.get('strokeWeight'),
              strokeOpacity: polygon.get('strokeOpacity'),
              fillColor: polygon.get('fillColor'),
              fillOpacity: polygon.get('fillOpacity')
            };
            google.maps.event.addListener(polygon,"mouseover",function() {
              console.log("mouseover");
              polygon.setOptions(highlightOptions);
            });
            google.maps.event.addListener(polygon,"mouseout",function() {
              console.log("mouseout");
              polygon.setOptions(normalStyle);
            });
            // if(geoXmlDoc.gpolygons[i].Contains(myLatlng)){
            //   geoXmlDoc.gpolygons[i].fillOpacity = .3;
            //   //alert(printObject(geoXmlDoc.gpolygons[i].gm_bindings_.title));

            //   //console.log("MATCH with:"+(geoXmlDoc.gpolygons[i]));
            // }
          }
        }else{

        }
       

//   if (!geoXmlDoc || !geoXmlDoc.placemarks) return;
//   for (var i = 0; i < geoXmlDoc.placemarks.length; i++) {
//     // console.log(doc[0].markers[i].title);
//     var placemark = geoXmlDoc.placemarks[i];
//     if (placemark.polygon) {
//       if (currentBounds.intersects(placemark.polygon.bounds)) {
//         //makeSidebarPolygonEntry(i);
//       }
//       var normalStyle = {
//           strokeColor: placemark.polygon.get('strokeColor'),
//           strokeWeight: placemark.polygon.get('strokeWeight'),
//           strokeOpacity: placemark.polygon.get('strokeOpacity'),
//           fillColor: placemark.polygon.get('fillColor'),
//           fillOpacity: placemark.polygon.get('fillOpacity')
//           };
//       placemark.polygon.normalStyle = normalStyle;

//       highlightPoly(placemark.polygon, i);
//     }
//     if (placemark.polyline) {
//       if (currentBounds.intersects(placemark.polyline.bounds)) {
//          //makeSidebarPolylineEntry(i);
//       }
//       var normalStyle = {
//           strokeColor: placemark.polyline.get('strokeColor'),
//           strokeWeight: placemark.polyline.get('strokeWeight'),
//           strokeOpacity: placemark.polyline.get('strokeOpacity')
//           };
//       placemark.polyline.normalStyle = normalStyle;

//       highlightPoly(placemark.polyline, i);
//     }
//     if (placemark.marker) {
//       if (currentBounds.contains(placemark.marker.getPosition())) {
//          //makeSidebarEntry(i);
//       }
//     }

// /*    doc[0].markers[i].setVisible(false); */
//   }


        
      //var interval_clear = setInterval(function(){clear_kml_opacity(doc)}, 5000);

}





    ///SOCKET WORK


    // Storage for WebSocket connections

    var socket = io.connect('http://socpub.cloudapp.net:9999');

    socket.on('live_stream_tweets_geo', function (data) {
        if(data.coordinates != undefined){
         // resetAllKML();
          
          var tweetLocation = new google.maps.LatLng(data.coordinates.coordinates[1],data.coordinates.coordinates[0]);
          console.log("geo data: "+tweetLocation);
          //is the data within one of the kml files?
          for(var key in kmlLayers){
            //console.log("key: "+kmlLayers[key]); //+" Size: "+kmlLayers[key].Area())
            //alert(printObject(kmlLayers[key].defaultViewport.Contains(tweetLocation)));
            var layer = kmlLayers[key];
            try{
            if(layer.defaultViewport.contains(tweetLocation)){
              console.log("Tweet located in Area: "+key)
              liveTweetsPos.push({location: tweetLocation, weight: 20});

              //also add to tweet tally for area
              cnt = kmlLayerTweetCount[key]
              kmlLayerTweetCount[key] = cnt+1;

              //updatekmlview
               for (var i=0; i<geoXmlDoc.gpolygons.length; i++) {
                try{
                if(geoXmlDoc.gpolygons[i].contains(tweetLocation)){
                    polygon.setOptions(highlightOptions);
                }
              }catch(e){}
               }


            }else{
              //console.log("Tweet Outside Area: "+key)

            }
          }catch(e){}

          }
        } 
        updateHTML(kmlLayerTweetCount);
        //finally update the histo
        //updateHistoData(kmlLayerTweetCount);
    });
 //  //set the timer off to clear the KML's after data
 // var interval = setInterval(function(){clear_kml_opacity()}, 2000);


    function resetAllKML(){
      try{
          for (var i=0; i<geoXmlDoc.gpolygons.length; i++) {
            if(geoXmlDoc.gpolygons[i].contains(tweetLocation)){
                polygon.setOptions(normalStyle);
            }
          }
      }catch(e){

    }

  }

}





function clear_kml_opacity(docs){
  console.log("Clearing");
  var geoXmlDoc = docs[0];
  for (var i=0; i<geoXmlDoc.gpolygons.length; i++) {

    if(geoXmlDoc.gpolygons[i].fillOpacity == 1){
      geoXmlDoc.gpolygons[i].fillOpacity = 0;
    }else{
      geoXmlDoc.gpolygons[i].fillOpacity = 1;

    }

  }
}





function pop_arrays(){
  try{
    for (i = 0; i < (liveTweetsPos.getLength()-1); i++) { 
      liveTweetsPos.pop();
      //console.log("popping");
    }
    
  }catch(err){}
  

}   




  var interval = setInterval(function(){pop_arrays()}, 20000);


  
