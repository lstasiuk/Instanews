$(document).ready(function() {

    $("#sections").on("change", function() {

        $('header').addClass("active")
        $("#appended-stories").empty();
        $("#appended-stories").append('<img id="loading-gif" src="../images/ajax-loader.gif"/>')
        var selectedStory = $("#sections").val();

        $("#header-nav").addClass("articles-loaded");

        var url = 'https://api.nytimes.com/svc/topstories/v2/' + selectedStory + '.json';
        url += '?' + $.param({
            'api-key': "b340bf0706784521880392a9f328b350"
        });

        $.ajax({
                url: url,
                method: 'GET',
            })
            .done(function(data) {
                var images = data.results
                    .filter(function(result) {
                        return result.multimedia.length;
                    })
                    .slice(0, 12);

                $.each(images, function(key, value) {
                    $("#appended-stories").append("<div class='articles'>" + "<a target='_blank' href=" + value.url + ">" + "<img class='images' src=" + value.multimedia[4].url + ">" + "<div class='abstract' <p>" + value.abstract + "</p></div>" + "</a>" + "</div>")


                });

            })

        .fail(function(err) {
            alert("Something went wrong.");
        })

        .always(function() {
            $("#loading-gif").remove();
        })
    });
});