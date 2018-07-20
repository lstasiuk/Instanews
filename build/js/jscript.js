$(document).ready(function() {

    $("#sections").on("change", function() {

        var selectedStory = $("#sections").val();

        $('#appended-stories').empty();

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
                    $("appended-stories").append("<div class='articles'>" + "<a href=" + value.url + "></a>" + "<img src=" + value.multimedia[4].url + ">" + "<p>" + value.abstract + "</p>" + "</div>")
                        ("#appended-stories").append(
                            console.log(data.results)

                        )
                });
            })
            .fail(function(err) {
                throw err;
            })
            .always(function() {});
    });
});