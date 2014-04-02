$(function() {		
				
	JQTWEET = {
	     
	    // Set twitter hash/user, number of tweets & id/class to append tweets
	    // You need to clear tweet-date.txt before toggle between hash and user
	    // for multiple hashtags, you can separate the hashtag with OR, eg:
	    // hash: '%23jquery OR %23css'			    
	    search: '%23documentary', //leave this blank if you want to show user's tweet
	    user: '', //username
	    numTweets: 100, //number of tweets
	    appendTo: '#jstwitter',
	    useGridalicious: true,
	    template: '<div class="item">{IMG}<div class="tweet-wrapper"><span class="text">{TEXT}</span>\
	               <span class="time"><a href="{URL}" target="_blank">{AGO}</a></span>\
	               by <span class="user"><a href="{USERURL}" target="_blank">{USER}</a></span></div></div>',
	     
	    // core function of jqtweet
	    // https://dev.twitter.com/docs/using-search
	    loadTweets: function() {

	        var request;
	         
	        // different JSON request {hash|user}
	        if (JQTWEET.search) {
            request = {
                q: JQTWEET.search,
                count: JQTWEET.numTweets,
                api: 'search_tweets'
            }
	        } else {
            request = {
                q: JQTWEET.user,
                count: JQTWEET.numTweets,
                api: 'statuses_userTimeline'
            }
	        }

	        $.ajax({
	            url: 'http://caseymmiller.com/tests/docsTwitter/grabtweets.php',
	            type: 'POST',
	            dataType: 'json',
	            data: request,
	            success: function(data, textStatus, xhr) {
		            console.log("data");
		            if (data.httpstatus == 200) {
		            	if (JQTWEET.search) data = data.statuses;
					console.log(data);	
	                var text, name, img;	         
	                	                
	                try {
	                  // append tweets into page
	                  for (var i = 0; i < JQTWEET.numTweets; i++) {		
			
	                    img = '';
			    textContent = data[i].text;
			    userName = data[i].user.name;
			    screenName = data[i].user.screen_name;
			    profileImg = data[i].user.profile_image_url;
			    timePosted = data[i].created_at;
			    favorites = data[i].favorite_count;
			    retweets = data[i].retweet_count;
			    
			    
	                    url = 'http://twitter.com/' + data[i].user.screen_name + '/status/' + data[i].id_str;
			    //linkToTweet = '<div class="col><a href="'+ url +'">'+ textTweet +'</a></div>';
			    userUrl = 'http://twitter.com/' + data[i].user.screen_name;
			    linkToScreenName = '<a href="'+ userUrl +'">@'+ screenName +'</a>';
			    //pic = data[i].user.update_profile_image;
	                    try {
	                      if (data[i].entities['media']) {
	                        //img = '<div class="col"><a href="' + url + '" target="_blank"><img src="' + data[i].entities['media'][0].media_url + '" /></a></div>';
				img = data[i].entities['media'][0].media_url;
	                      //console.log(img);
			      }
	                    } catch (e) {  
	                      //no media
	                    }
	                  
	                    //$('#jstwitter').append('<div>'+ linkToScreenName + linkToTweet + img +'</div>');
			    $('#jstwitter').append('<div class="list card"><a class="twitterUser" href="'+ userUrl +'"><div class="item item-avatar"><img src="' + profileImg + '"><h2>' + userName + '</h2><p>@' + screenName + '</p></div></a><div class="item item-body"><p>' + textContent + '</p><img class="full-image" src="' + img + '"><p><div class="subdued time"><i class="icon ion-ios7-clock-outline"></i> ' + timePosted + '</div></p></div><div class="item tabs tabs-secondary tabs-icon-left"><a class="tab-item" href="#"><i class="icon ion-star"></i>Favorites: ' + favorites + '</a><a class="tab-item" href="#"><i class="icon ion-loop"></i>Retweets: ' + retweets + '</a><a class="tab-item" href="' + url + '"><i class="icon ion-share"></i>Go to tweet</a></div></div>');
	                        /*.replace('{USER}', data[i].user.screen_name)
	                        .replace('{IMG}', img)                                
	                        .replace('{AGO}', JQTWEET.timeAgo(data[i].created_at) )
	                        .replace('{URL}', url )
				.replace('{USERURL}', userUrl )*/
				//.replace('{PIC}', pic )
	                        
	                  }
                  
                  } catch (e) {
	                  //item is less than item count
                  }
                  
		                if (JQTWEET.useGridalicious) {                
			                //run grid-a-licious
					console.log("grid");
											$(JQTWEET.appendTo).gridalicious({
												gutter: 0, 
												width: "100%", 
												animate: true
											});	                   
										}                  
	                    
	               } else alert('no data returned');
	             
	            }   
	 
	        });
	 
	    }, 
	     
	         
	    /**
	      * relative time calculator FROM TWITTER
	      * @param {string} twitter date string returned from Twitter API
	      * @return {string} relative time like "2 minutes ago"
	      */
	    timeAgo: function(dateString) {
	        var rightNow = new Date();
	        var then = new Date(dateString);
	         
	        if ($.browser.msie) {
	            // IE can't parse these crazy Ruby dates
	            then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
	        }
	 
	        var diff = rightNow - then;
	 
	        var second = 1000,
	        minute = second * 60,
	        hour = minute * 60,
	        day = hour * 24,
	        week = day * 7;
	 
	        if (isNaN(diff) || diff < 0) {
	            return ""; // return blank string if unknown
	        }
	 
	        if (diff < second * 2) {
	            // within 2 seconds
	            return "right now";
	        }
	 
	        if (diff < minute) {
	            return Math.floor(diff / second) + " seconds ago";
	        }
	 
	        if (diff < minute * 2) {
	            return "about 1 minute ago";
	        }
	 
	        if (diff < hour) {
	            return Math.floor(diff / minute) + " minutes ago";
	        }
	 
	        if (diff < hour * 2) {
	            return "about 1 hour ago";
	        }
	 
	        if (diff < day) {
	            return  Math.floor(diff / hour) + " hours ago";
	        }
	 
	        if (diff > day && diff < day * 2) {
	            return "yesterday";
	        }
	 
	        if (diff < day * 365) {
	            return Math.floor(diff / day) + " days ago";
	        }
	 
	        else {
	            return "over a year ago";
	        }
	    }, // timeAgo()
	     
	     
	    /**
	      * The Twitalinkahashifyer!
	      * http://www.dustindiaz.com/basement/ify.html
	      * Eg:
	      * ify.clean('your tweet text');
	      */
	    ify:  {
	      link: function(tweet) {
	        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
	          var http = m2.match(/w/) ? 'http://' : '';
	          return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
	        });
	      },
	 
	      at: function(tweet) {
	        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
	          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
	        });
	      },
	 
	      list: function(tweet) {
	        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
	          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
	        });
	      },
	 
	      hash: function(tweet) {
	        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
	          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
	        });
	      },
	 
	      clean: function(tweet) {
	        return this.hash(this.at(this.list(this.link(tweet))));
	      }
	    } // ify
	 
	     
	};		
	console.log(JQTWEET);
});
