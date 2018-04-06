$(document).ready(function () {
    console.log("working");

    var target = $(".target");

    $(document).on("click", "#searchBtn", function (event) {
        event.preventDefault();
        target.empty();

        var searchText = $("#userInput").val();
        var newsAPI = "apiKey=591d63bc6d944775907209479376dfa4";
        var newsUrl = "https://newsapi.org/v2/everything?" + newsAPI + "&q=" + searchText + "&language=en";
        console.log("search text: " + searchText);
        console.log("API key: " + newsAPI);
        console.log("Query Url: " + newsUrl);
        $("#userInput").val("");
        $.ajax({

            url: newsUrl,
            method: "GET"
        }).then(function (newsResponse) {
            console.log(newsResponse);
            for (var i = 0; i < newsResponse.articles.length; i++) {
                var articleDiv = $("<div class='card-body article-well'>");
                var image = $("<img class='image-responsive'>");
                var article = $("<div class='card col-lg-4'>");

                image = image.addClass("image");
                image = image.attr("src",
                    newsResponse.articles[i].urlToImage);
                image = image.attr("alt", "Go to website to see image");

                articleDiv.prepend("<p>Author: " + newsResponse.articles[i].author + "</p>");

                articleDiv.append("<p>Date Published: " + newsResponse.articles[i].publishedAt + "</p>");

                articleDiv.append("<p>" + newsResponse.articles[i].description + "</p>");

                articleDiv.append("<p>Url: " + "<a href = " + newsResponse.articles[i].url + ">" + newsResponse.articles[i].url + "</a>");

                articleDiv.append(image);

                article.append(articleDiv);

                target.append(article);

            }
        })


    });
    console.log("working #2");
    $(document).on("click", "#imgSearch", function(event){
        console.log("working button");
        event.preventDefault();
        var beginDate = $("#begin-date").val();
        var endDate = $("#end-date").val();
        var count = $("#count").val();

        console.log(beginDate);
        console.log(endDate);
        console.log(count);

    })
});

