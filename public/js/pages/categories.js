$(document).ready(function() {
    PageData();
    autosize($('textarea.auto-growth'));
  });
  function AddNewModal() {
    resetinputs()
    loading("إضافة تصنيف", "stop")
    $("#ModalLabel").html("إضافة تصنيف جديد");
    $("#CatModal").modal("show");
    $("#supbutton").attr('onclick', "AddCat()");
  }
  function PageData(){
    var effect = $('.card').data('loadingEffect');
    $('.card').waitMe({
        effect: effect,
        text: 'جاري تحميل البيانات ...',
        bg: 'rgba(255,255,255,0.90)',
        color: '#555'
    });
    var reqdata = {type: "getcat"}
    console.log(reqdata);
    $.ajax ({
        url: '/api',
        dataType: 'json',
        data: reqdata,
        success: function(catdata){
            console.log(catdata)
            var outTable = '';
            var as = '<button class="btn btn-primary  waves-effect" data-userid="THISID" onclick="editModal(\'THISID\')"><i class="fas fa-edit"></i></button><a onclick="Deletecat(THISID)" class="btn btn-danger waves-effect"><i class="fas fa-users-cog"></i></a>';
            for (i = 0; i < catdata["success"].length; i++) {
                outTable += '<tr><td>'+ catdata["success"][i].name + '</td><td>' + "عدد" + '</td><td>' + as.replace(/THISID/g, catdata["success"][i]._id) + '</td></tr>';
            }
            $("#UserData").html(outTable);
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