$(document).ready(function() {
    PageData();
  });

  function PageData(){
    var effect = $('.card').data('loadingEffect');
    $('.card').waitMe({
        effect: effect,
        text: 'جاري تحميل البيانات ...',
        bg: 'rgba(255,255,255,0.90)',
        color: '#555'
    });
  var reqdata = {type: "getprodacts"}
    console.log(reqdata);
    $.ajax ({
        url: '/api',
        dataType: 'json',
        data: reqdata,
        success: function(data){
            console.log(data)
            var outTable = '';
            var as = '</button><a href="prodacts/THISID" class="btn btn-warning  waves-effect"><i class="fas fa-users-cog"></i></a>';
            for (i = 0; i < data["success"].length; i++) {
                outTable += '<tr><td>'+ data["success"][i]._id + '</td><td>' + data["success"][i].name + '</td><td>' + data["success"][i].catagory + '</td><td>' + data["success"][i]['quantity[mainstore]'] + '</td><td>' + as.replace(/THISID/g, data["success"][i]._id) + '</td></tr>';
            }
            $("#ProData").html(outTable);
            $('#MainTable').DataTable({
                "language": {
                    "url": "/plugins/jquery-datatable/arabic.json"
                }
            });
            $('.card').waitMe('hide');
        },
        error: function(data){
            console.log(data)
        }
    })
}