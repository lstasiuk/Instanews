$(document).ready(function() {

    $("#sections").on("change", function() {
        $("#appended-stories").empty();
        var selectedStory = $("#sections").val();

        var url = 'https://api.nytimes.com/svc/topstories/v2/' + selectedStory + '.json';
        url += '?' + $.param({
            'api-key': "b340bf0706784521880392a9f328b350"
        });

        $.ajax({
                url: url,
                method: 'GET',
            })
            .done(function(data) {
                console.log(data.results);
                $.each(data.results, function(key, value) {
                    $("#appended-stories").append("<div class='articles'>" + "<a target='_blank' href=" + value.url + ">" + "<img class='images' src=" + value.multimedia[4].url + ">" + "<div class='abstract' <p>" + value.abstract + "</p></div>" + "</a>" + "</div>")


                });
            })
    });
});