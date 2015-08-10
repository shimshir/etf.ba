'use strict';

function mainController($scope, SocialService) {

		$scope.posts = {};
		$scope.comments= {};
		$scope.comments.data= {};
		
		SocialService.getAllPosts().then(function (response) {
			$scope.posts=response.data;
		});

		$scope.closeComments = function() {
			$('#commentModal').modal('hide');
		}
		$scope.getFormattedPostDate = function(unixTimestamp) {
			var date = new Date(unixTimestamp * 1000);
			var day = date.getDate();
			var month = date.getMonth();
			var year = date.getFullYear();
			var hours = date.getHours();
			var minutes = ("0" + date.getMinutes()).substr(-2);
			var seconds = ("0" + date.getSeconds()).substr(-2);

			var formattedTime = date.getDate() + "." + date.getMonth() + "." + year + 
				", " + hours + ':' + minutes + ':' + seconds;
			return formattedTime;
		}
}
