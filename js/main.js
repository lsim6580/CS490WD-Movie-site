$(document).ready(function(){
var data = movies["movies"];
data.sort(sortByYear)
    var html = loadTemplate(data)

    $(".movie_container").html(html);
    $("#sortBy").on('change',function(){
        var value = $("#sortBy").val();
        if(value == '0'){
            data.sort(sortByYear);
            $(".movie_container").html(loadTemplate(data));
        }
        if(value == '1'){
            data.sort(sortByRating);
            $(".movie_container").html(loadTemplate(data));
        }
    })

    var search =$("#search") ;
    search.on("focus", function(e){
        $(this).on("keyup", function(r){
            console.log("here");
            r.stopPropagation();
            onSearch(data);
        });


    })

    //search.keydown('keyup',onSearch(data));
    //search.on("blur", function(e){
    //    e.stopPropagation();
    //    $(".suggestion_box").css("display", "none");
    //})

});
function onSearch(data){
    var suggestion = "";

    if($("#search").val()) {
        $(".suggestion_box").show()
        $.each(data, function (x) {
            var value = data[x]["title"] +' '+ data[x]["year"]+' '  + data[x]["starring"];
            var match = value.toLowerCase().search($("#search").val().toLowerCase().trim());
            if (match != -1) {
                suggestion += '<div class="suggestion"> <b>' + data[x]["title"] +'</b>('+ data[x]["year"]+')' + ',' + ' Starring: ' + data[x]["starring"] + '</div>';

            }
            $(".suggestion_box").html(suggestion);
            $('.suggestion').on('click',function(){
                $("#search").val($(this).children($("b")).html());
                $(".suggestion_box").hide()
            })
        })
    }
    else{
        $(".suggestion_box").hide()
    }
}
function loadTemplate(data) {
    var html = '';
        $.each(data, function(x){
            var string = template;
            var other2;
            $.each(data[x], function (k, v) {
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
            html += other2;
    });
            return html;
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