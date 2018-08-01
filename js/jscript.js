$(document).ready(function() {

    $("#sections").on("change", function() {
        $('header').addClass("active")
        $("#appended-stories").empty();
        let selectedStory = $("#sections").val();

        $("#header-nav").addClass("articles-loaded");

        let url = 'https://api.nytimes.com/svc/topstories/v2/' + selectedStory + '.json';
        url += '?' + $.param({
            'api-key': "b340bf0706784521880392a9f328b350"
        });

        $.ajax({
                url: url,
                method: 'GET',
            })
            .done(function(data) {
                let images = data.results
                    .filter(function(result) {
                        return result.multimedia.length;
                    })
                    .slice(0, 12);

                $.each(images, function(key, value) {
                    $("#appended-stories").append("<div class='articles'>" + "<a target='_blank' href=" + value.url + ">" + "<img class='images' src=" + value.multimedia[4].url + ">" + "<div class='abstract' <p>" + value.abstract + "</p></div>" + "</a>" + "</div>")


                });
            })
    });
});