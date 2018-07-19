$(document).ready(function() {})

$("#sections").on("change", function() {
    var selectedStory = $("#sections").val();
    console.log(selectedStory);

    var url = 'https://api.nytimes.com/svc/topstories/v2/' + selectedStory + '.json';
    url += '?' + $.param({
        'api-key': "b340bf0706784521880392a9f328b350"
    });
    console.log(url);
    $.ajax({
            url: url,
            method: 'GET',
        })
        .done(function(data) {
            console.log(data);
            console.log(data.results);

            $.each(data.results, function(key, value) {
                $("#appended-stories").append(value.abstract);
            });

            // var resultsArray = data.results;

        })
        .fail(function(err) {
            throw err;
        })
        .always(function() {});




})