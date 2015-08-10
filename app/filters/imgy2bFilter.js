app.filter('imgy2bFilter', ['$filter', '$sce', function ($filter, $sce) {
		return function (value) {
			if (!value) return '';

			var imageMatch = /(https?:\/\/\S+(\.png|\.jpg|\.gif))/g;
			var y2bMatch = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;

			var isfiltered = 0;
			if (value.search(imageMatch) >= 0) {
				value=value.replace(imageMatch, '<a href="$1" target="_blank"><img width="100%" src="$1" /></a>');
				if (value.search("pokit.org") >= 0) {
					value=value.replace(/\?/g, 'img/');
				}
				isfiltered = 1;
			}

			if (value.search(y2bMatch) >= 0) {
				value = $sce.trustAsHtml(value.replace(y2bMatch, 
					'<iframe width="450" height="253" src="https://www.youtube.com/embed/$1"' + 
					' frameborder="0" allowfullscreen></iframe>'));
				isfiltered = 1;
			}

			if (!isfiltered)
				value = $filter('linky')(value,'_blank');
			return value;
		};
	}]);
