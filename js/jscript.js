$(document).ready(function() {


            var selectedStory = $("#top-stories").val();
            console.log(selectedStory);


            var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
            url += '?' + $.param({
                'api-key': "b340bf0706784521880392a9f328b350"
            });
            $.ajax({
                url: url,
                method: 'GET',
            })

            .done(function(data) {
                    console.log(data);
                    console.log(data.results);

                    var resultsArray = data.results;

                })
                .fail(function(err) {
                    throw err;
                }).always(function() {


                });