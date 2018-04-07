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
        //getting news articles from api
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
    var today = moment().format('YYYY-MM-DD');
    $("#begin-date").attr("max", today);
    $("#end-date").attr("max", today);
    var start = (moment().subtract(parseInt(count) - 1, "days")).format('YYYY-MM-DD');

    var apodUrl = "https://api.nasa.gov/planetary/apod?api_key=oM7otWCuoVaMMTGg3kQeUpnYI8Az1dY0J18qtpKc";
    $.ajax({
        url: apodUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var target = $(".podTarget");
        var apod = $("<div class='card'>");
        var img = $("<img class='image-responsive'>");

        if ((!$("#hi-def").is(':checked'))) {
            img = img.attr("src", response.url);
        } else {
            img = img.attr("src", response.hdurl);
        }
        if (response.copyright === undefined) {

            apod.prepend("<p>Image Credits: " + "Public Domain</p>");
        } else {
            apod.prepend("<p>Image Credits: " + response.copyright + "</p>");
        }
        apod.append("<p>Date: " + response.date + "</p>");
        apod.append("<p>Title: " + response.title + "</p>");
        apod.append(img);
        apod.append("<p>" + response.explanation + "</p>");
        target.append(apod);
    });

    $(document).on("click", "#imgSearch", function (event) {

        console.log("working button");
        $(".podTarget").empty();
        event.preventDefault();
        var beginDate = "&start_date=" + $("#begin-date").val();

        var endDate = "&end_date=" + $("#end-date").val();
        var count = "&count=" + $("#count").val();

        // start = start.format('YYYY-MM-DD')
        console.log("count: " + count);
        console.log("today: " + today);
        console.log("start date: " + start);

        console.log("begin date: " + beginDate);
        console.log(" end date: " + endDate);
        console.log("count: " + count);

        if (count === '' && endDate === '' && beginDate === '') {
            apodUrl = "https://api.nasa.gov/planetary/apod?api_key=oM7otWCuoVaMMTGg3kQeUpnYI8Az1dY0J18qtpKc&count=6";
        } if(beginDate === ''){
            apodUrl = "https://api.nasa.gov/planetary/apod?api_key=oM7otWCuoVaMMTGg3kQeUpnYI8Az1dY0J18qtpKc" + count;

        }else if (moment(endDate).subtract(moment(beginDate))) {

        }

        $.ajax({

            url: apodUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log("response length: " + response.length);
            for (var i = 0; i < response.length; i++) {

                var target = $(".podTarget");
                var img = $("<img class='image-responsive'>");
                var vid = $("<iframe>");
                if (response[i].media_type === "image") {
                    if ((!$("#hi-def").is(':checked'))) {
                        var apod = $("<div class='card col-lg-6'>");
                        console.log("Unchecked: " + response[i].url);
                        img = img.attr("src", response[i].url);
                    } else {
                        var apod = $("<div class='card col-lg-12'>");
                        console.log("Checked: " + response[i].hdurl);
                        img = img.attr("src", response[i].hdurl);
                    }
                    if (response[i].copyright === undefined) {

                        apod.prepend("<p>Image Credits: " + "Public Domain</p>");
                    } else {
                        apod.prepend("<p>Image Credits: " + response[i].copyright + "</p>");
                    }
                    apod.append("<p>Date: " + response[i].date + "</p>");
                    apod.append("<p>Title: " + response[i].title + "</p>");
                    apod.append(img);
                    apod.append("<p>" + response[i].explanation + "</p>");

                    target.append(apod);
                } else {
                    console.log("this is the iframe and hopefully it works");
                    var iframe = $("<div class='video-container'>");
                    vid = vid.attr("src", response[i].url);
                    iframe.append(vid);

                    if (response[i].copyright === undefined) {

                        apod.prepend("<p>Video Credits: " + "Public Domain</p>");
                    } else {
                        apod.prepend("<p>Video Credits: " + response[i].copyright + "</p>");
                    }
                    apod.append("<p>Date: " + response[i].date + "</p>");
                    apod.append("<p>Title: " + response[i].title + "</p>");
                    apod.append(iframe);
                    apod.append("<p>" + response[i].explanation + "</p>");

                    target.append(apod);
                }


            }

        })
    });

});



   
