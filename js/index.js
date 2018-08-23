$(document).ready(function() {
            //url for api request
            $("#sections").on("change", function() {
                $('header').addClass("active")
                $("#appended-stories").empty();
                $("#appended-stories").append('<img id="loading-gif" src="../images/ajax-loader.gif"/>')
                var selectedStory = $("#sections").val();

                $(".article-boxes").empty();


                $("#header-nav").addClass("articles-loaded");
                var url = 'https://api.nytimes.com/svc/topstories/v2/' + selectedStory + '.json';
                url += '?' + $.param({
                    'api-key': "b340bf0706784521880392a9f328b350"
                });

                $.ajax({ //ajax request 
                        url: url,
                        method: "GET"
                    })
                    .done(function(data) { //filter results for images only 
                        var images = data.results.filter(function(result) {
                                return result.multimedia.length;
                            })
                            .slice(0, 12);



                        $.each(images, function(key, value) {
                            var imageUrl = value.multimedia[4].url;
                            var storyUrl = value.url;
                            var abstract = value.abstract
                            var output = "<div class='articles' style='background: url(" + imageUrl + "); background-size:cover; background-position:center;'>" + "<a target='_blank' href='" + storyUrl + "'>";
                            output += "<div class='abstract'>";
                            output += "<p>" + abstract + "</p>";
                            output += "</div>";
                            output += "</a>";
                            output += "</div>";
                            $("#appended-stories")
                                .append(output);
                        });

                    })
                    .fail(function() { //error notification for failing to load
                        alert("Something went wrong.");
                    })
                    .always(function() {
                        $("#loading-gif").remove();
                    })
            });