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
    search.on("focus", function(){
        $(".suggestion_box").css("display", "block");
        onSearch(data);
    })
    search.on("blur", function(){
        $(".suggestion_box").css("display", "none");
    })

});
function onSearch(data){
    var suggestion = "";

    $.each(data, function(x){
        console.log(data[x]);
        var value = data[x]["title"]+data[x]["year"] + "," + " Starring: " + data[x]["starring"];
        var match = value.toLowerCase().search($("#search").val().toLowerCase().trim());
        if(match != -1){
            suggestion += '<div class="suggestion">' + value+ '</div>';

        }
        $(".suggestion_box").html(suggestion);
    })
}
function loadTemplate(data) {
    var html = '';
        $.each(data, function(x){
            var string = template;
            var other2;
            $.each(data[x], function (k, v) {
                console.log(x);
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