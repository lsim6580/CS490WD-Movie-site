$(document).ready(function(){
    var data = movies["movies"];//load the movies and add them to the page
    data.sort(sortByYear)
    var html = loadTemplate(data,false,false);
    $(".movie_container").html(html);


    $("#sortBy").on('change',function(){//change the order of the movies
        var value = $("#sortBy").val();
        if(value == '0'){
            data.sort(sortByYear);
            $(".movie_container").html(loadTemplate(data,false,false));
        }
        if(value == '1'){
            data.sort(sortByRating);
            $(".movie_container").html(loadTemplate(data,false,false));
        }
    })

    var search = $("#search") ;
    search.on("focus", function(e){//add a live search feature
        $(this).on("keyup", function(r){
            console.log("here");
            r.stopPropagation();
            onSearch(data);
        });
        $(this).on("click",function(){
            $(".suggestion_box").hide();
        })
        $("html").on('click',function(){$(".suggestion_box").hide();});


    })

});


function onSearch(data){//load the search suggestions
    var suggestion = "";
    var index = [];
    if($("#search").val()) {
        $(".suggestion_box").show()
        $.each(data, function (x) {
            var value = data[x]["title"] +' '+ data[x]["year"]+' '  + data[x]["starring"];
            var match = value.toLowerCase().search($("#search").val().toLowerCase().trim());
            if (match != -1) {
                index.push(x);

                suggestion += '<div class="suggestion"> <b>' + data[x]["title"] +'</b>('+ data[x]["year"]+')' + ',' + ' Starring: ' + data[x]["starring"] + '</div>';

            }
            $(".suggestion_box").html(suggestion);
            $('.suggestion').on('click',function() {
                $("#search").val($(this).children($("b")).html());
                console.log(index)
                $(".suggestion_box").hide()
                var html = loadTemplate(data, index[$(this).index()], true);
                $(".movie_container").html(html);
            });
            $("#search_button").on("click",function(){
                    var html = loadTemplate(data, index, false);
                    $(".movie_container").html(html);
                })


        })
    }
    else{
        $(".suggestion_box").hide()
    }
}
function loadTemplate(data,array, single) {// load the movies to the page
    var html = '';
        if(!array && single ==false) {
            $.each(data, function (x) {
                html += goThrough(data, x)

            });
        }
        if(array && single==false){
            $.each(array, function(x){
                console.log(x);
                html += goThrough(data,array[x])
            })
        }
        else if(single){
            html = goThrough(data, array)
        }
            return html;
}

function goThrough(data, index){
    var string = template;
    var other2;
    $.each(data[index], function (k, v) {
        if(v == true){
            other2 = string.replace('{{' + k + '}}', 'HD')
        }
        else if(v == false){
            other2 = string.replace('{{' + k + '}}', 'hd_hidden')
        }
        else {
            other2 = string.replace('{{' + k + '}}', v);
        }
        string = other2;

    });
    return other2;
}
function sortByYear(a,b){
    if(a["year"] < b["year"]){
        return 1;
    }
}
function sortByRating(a,b){
    if(a["rating"] < b["rating"]){
        return 1;
    }
}