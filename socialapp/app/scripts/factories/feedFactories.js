// This is being used to retrieve feeds from Facebook
app.factory('feedsFactory',function($http){
	return{
		getFeeds : function(){
			var pageId = '110106192432427';
			var accessToken='CAACEdEose0cBABsYmymyFqAQ6ZCMwZAiIBa9KgLhUo8UrMsITDPuttNWGcuhzhpez3ZAAsgsiH9ElFTwEUsJRZBfPOPeaY9JcZAiTfALzP78aeAZBZANz5UtDNv3t3ZAf6BBupJo72Q3Hf5tZAADxdASwOQDv5X1ZCdNynkAZCyP1wDt3N3uz44l0eAZAd9rZCiLyffZBeo1yEo1Q6bQZDZD';
			var url = 'https://graph.facebook.com/v2.2/'+pageId+'/feed?access_token='+accessToken;
			return $http.get(url);
		}
	}
});