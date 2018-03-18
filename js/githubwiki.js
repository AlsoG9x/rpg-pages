var githubwiki = (function() {
    var module = {};

    module.wikiurl = '';

    function githubname(name) {
	return name.replace(/ /g, '-').replace(/\?/g, '%3F');
    };

    function linkRenderer(link) {
	gh_name = githubname(link) + '.md';
	return '<a href="' + module.wikiurl + gh_name + '">' + link + '</a>';
    };

    function linkRendererTitle(title, link) {
	gh_name = githubname(link) + '.md';
	return '<a href="' + module.wikiurl + gh_name + '">' + title + '</a>';
    };

    marked.setOptions({
	internalLink: linkRenderer,
	internalLinkTitle: linkRendererTitle
    });

    module.get = function(page, callback) {
	$.get(module.wikiurl + page, function(data) {
	    callback(marked(data));
	});
    };

    module.setURL = function(url) {
	module.wikiurl = url;
    };

    module.setWiki = function(username, project) {
	base_url = 'https://raw.githubusercontent.com/wiki/';
	module.wikiurl = base_url + username + '/' + project + '/';
    };

    module.setMarkedOptions = function(options) {
	marked.setOptions(options);
    };

    module.getGithubName = githubname;

    return module;
}());
