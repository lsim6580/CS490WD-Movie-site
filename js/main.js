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
