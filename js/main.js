$(document).ready(function(){
var data = movies["movies"];
    var html = "";
    $.each(data, function(k,v){
        html += loadTemplate(data[k]);
    });

    $(".movie_container").html(html);
   
});

function loadTemplate(object) {

            var string = template;
            var other2;

            //console.log(typeof string);
            $.each(object, function (k, v) {
                other2 = string.replace('{{' + k + '}}', v);
                string = other2;
                console.log("HEY")
            });
            return other2;
}
