var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
    },
    
    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    //initializes angular app from within the bind events function    
    var docsHandControllers = angular.module('docsHandControllers', []);
        
        docsHandControllers.controller('FilmListCtrl', [
	    
          function() {
            $('.flicker-slider').flicker({
                'arrows' : true,
                'auto_flick' : false,
                'block_text' : true,
                //'dot_alignment' : 'center',
                //'dot_navigation' : true,
                'flick_animation' : 'transition-slide',
                'theme' : 'dark'
                });
            
            $( "#slider" ).attr( "data-flick-position", '7' );
	    
	    $(function () {
		JQTWEET.loadTweets();
	    });
            
	   
            $.ajax({
                crossDomain: true,
                type:"GET",
                contentType: "application/json; charset=utf-8",
                async:false,
                url: "http://www.docsinhand.com/?json=get_category_posts&category_slug=overburden",
                success: data,
                dataType: "jsonp",                
                //jsonpCallback: 'fnsuccesscallback'
            });
            
            function data(jsonp) {
                //console.log(jsonp);
                $.each( jsonp.posts.reverse(), function( i, post ) {
                    title = post.title;
                    content = post.content;
                    //id = i;
                    $('.slides').append('<li class="scroll" id='+ i +'><div class="flick-title">'+ title +'</div><hr><div class="flick-sub">'+ content +'</div></li>');
                    $('.button-bar-b').append('<a class="button" id='+ i +'>'+ i +'</a>');
                });
            };
            $(document).on('click', "a.button", function(){
                console.log('clicked');
                currentID = this.id;
                console.log(currentID);
                $( "#filmSlider" ).attr( "style", "left:"+ (currentID*-100) +"%;" );
            });
          
                }]  );
        
    },
    
    // deviceready Event Handler
    
    onDeviceReady: function() {
        console.log('deviceready');
        $("#message").html("Device Ready and listening...");
        var callback = app.receivedFrequency;
        window.pitchDetection.registerFrequency( "18000", callback );
        //window.pitchDetection.registerFrequency( "18100", callback );
        window.pitchDetection.registerFrequency( "18200", callback );
        //window.pitchDetection.registerFrequency( "18300", callback );
        window.pitchDetection.registerFrequency( "18400", callback );
        //window.pitchDetection.registerFrequency( "18500", callback );
        window.pitchDetection.registerFrequency( "18600", callback );
        //window.pitchDetection.registerFrequency( "18700", callback );
        window.pitchDetection.registerFrequency( "18800", callback );
        //window.pitchDetection.registerFrequency( "18900", callback );
        window.pitchDetection.registerFrequency( "19000", callback );
        //window.pitchDetection.registerFrequency( "19100", callback );
        window.pitchDetection.registerFrequency( "19200", callback );
        //window.pitchDetection.registerFrequency( "19300", callback );
        window.pitchDetection.registerFrequency( "19400", callback );
        //window.pitchDetection.registerFrequency( "19500", callback );
        window.pitchDetection.registerFrequency( "19600", callback );
        //window.pitchDetection.registerFrequency( "19700", callback );
        window.pitchDetection.registerFrequency( "19800", callback );
        window.pitchDetection.registerFrequency( "20000", callback );
        //window.pitchDetection.registerFrequency( "20100", callback );
        window.pitchDetection.registerFrequency( "20200", callback );
        //window.pitchDetection.registerFrequency( "20300", callback );
        window.pitchDetection.registerFrequency( "20400", callback );
        //window.pitchDetection.registerFrequency( "20500", callback );
        window.pitchDetection.registerFrequency( "20600", callback );
        //window.pitchDetection.registerFrequency( "20700", callback );
        window.pitchDetection.registerFrequency( "20800", callback );
        window.pitchDetection.registerFrequency( "30000", callback );
        window.pitchDetection.startListener();
        
    },

    receivedFrequency: function(frequency) {
        $("#message").html("Freq Detected");
        var chapter;
        
        
        if (frequency == 18000) {
            chapter = 0;
        }
        if (frequency == 18200) {
            chapter = 1;
        }
        if (frequency == 18400) {
            chapter = 2;
        }
        if (frequency == 18600) {
            chapter = 3;
        }
        if (frequency == 18800) {
            chapter = 4;
        }
        if (frequency == 19000) {
            chapter = 5;
        }
        if (frequency == 19200) {
            chapter = 6;
        }
        if (frequency == 19400) {
            chapter = 7;
        }
        if (frequency == 19600) {
            chapter = 8;
        }
        if (frequency == 19800) {
            chapter = 9;
        }
        if (frequency == 20000) {
            chapter = 10;
        }
        if (frequency == 20200) {
            chapter = 11;
        }
        if (frequency == 20400) {
            chapter = 12;
        }
        if (frequency == 20600) {
            chapter = 13;
        }
        $("#message").html("Freq Detected. Load Ch: " + chapter);
        $( "#filmSlider" ).attr( "style", "left:"+ (chapter*-100) +"%;" );
        
	//$( "#filmSlider" ).attr( "style", "left:"+ (chapter*-100) +"%;" );
        $("a.button").simulateClick(function(){
                console.log('clicked');
                $("#message").html("simulateClick(): " + chapter);
                $( "#filmSlider" ).attr( "style", "left:"+ (chapter*-100) +"%;" );
            });
    }
    
    
};



