window.onload = function()
{
    const API_URL_REPOS = 'https://api.github.com/users/mopp/repos?per_page=60';
    const NUM_REPOS = 6;

    function on_load_repos(results, text_status, jq_xhr)
    {
        var repos = [];
        for (var i = 0; i < results.length; ++i) {
            var repo = results[i];
            var date = repo.updated_at.replace(/T.*$/, '')
            repos.push({
                url: repo.html_url,
                description: repo.description,
                name: repo.name,
                stars: repo.stargazers_count,
                language: repo.language,
                updated: date,
            });
        }

        repos.sort(function(x, y) {
            return y.stars - x.stars;
        });

        var doms = ''
        for (var i = 0; i < NUM_REPOS; ++i) {
            var repo = repos[i];
            var dom =
                '<div class="github-repo pure-u-24-24 pure-u-md-12-24">' +
                    '<div class="github-repo-frame">' +
                        '<div class="github-repo-name icon-head-h0">' +
                            '<i class="fa fa-quote-right"></i>' +
                            '<a target="_blank" href="' + repo.url + '">' + repo.name + '</a>' +
                        '</div>' +
                        '<div class="github-repo-desc">' + repo.description + '</div>' +
                        '<span class="github-repo-updated-tag">Update:</span>' +
                        '<span class="github-repo-updated">' + repo.updated + '</span>' +
                        '<span class="github-repo-lang-tag">Lang:</span>' +
                        '<span class="github-repo-lang">' + repo.language + 'C</span>' +
                        '<div>' +
                            '<span class="github-repo-star-tag"><i class="fa fa-star"></i></span>' +
                            '<span class="github-repo-star">' + repo.stars + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            doms += dom;
        }
        $('#github-repos > .spinner').replaceWith(doms);
    }

    $.ajax({
        url: API_URL_REPOS,
        data: {
            type: 'owner',
            sort: 'full_name',
            direction: 'asc'
        },
        success: on_load_repos,
        dataType: 'json'
    });
}
