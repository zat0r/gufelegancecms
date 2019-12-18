$(document).ready(function () {
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
function AddCat() {
    console.log('add cat function is working')
}
function PageData() {
    var effect = $('.card').data('loadingEffect');
    $('.card').waitMe({
        effect: effect,
        text: 'جاري تحميل البيانات ...',
        bg: 'rgba(255,255,255,0.90)',
        color: '#555'
    });
    var reqdata = { type: "getcat" }
    console.log(reqdata);
    $.ajax({
        url: '/api',
        dataType: 'json',
        data: reqdata,
        success: function (catdata) {
            console.log(catdata)
            var outTable = '';
            var as = '<button class="btn btn-primary  waves-effect" data-userid="THISID" onclick="editModal(\'THISID\')"><i class="fas fa-edit"></i></button><a onclick="Deletecat(\'THISID\', \'THISNAME\')" class="btn btn-danger waves-effect"><i class="fas fa-trash-alt"></i></a>';
            for (i = 0; i < catdata["success"].length; i++) {
                outTable += '<tr><td>' + catdata["success"][i].name + '</td><td>' + "عدد" + '</td><td>' + as.replace(/THISID/g, catdata["success"][i]._id).replace(/THISNAME/g, catdata["success"][i].name) + '</td></tr>';
            }
            $("#UserData").html(outTable);
            $('#MainTable').DataTable({
                "language": {
                    "url": "/plugins/jquery-datatable/arabic.json"
                }
            });
            $('.card').waitMe('hide');
        },
        error: function (data) {
            console.log(data)
        }
    })
}
function Deletecat(id, name) {
    console.log(id + '  ' + name);
    swal({
        title: "هل أنت متأكد?",
        text: "هل أنت متأكد بأنك تريد حذف " + name + "من قاعدة البيانات",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "نعم , قم بالحذف!",
        cancelButtonText: "إلفاء الأمر",
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
    }, function (isConfirm) {
        if (isConfirm) {
            var data = { type: "DeleteCat", id: id }
            $.ajax({
                url: "/api",
                data: data,
                success: function (data) {
                    console.log(data);
                    swal("تم الحذف!", "لقد تم حذف التصنيف بنجاح.", "success");
                    showNotification("bg-green", 'تم الحذف بنجاح', "top", "right", null, null);
                },
                error: function (data) {
                    swal("حصلت مشكلة", "لم يتم الحذف .. الرجاء المحاولة فيما بعد أو التواصل مع مسؤول النظام", "error");
                    showNotification("bg-orange", 'لم يتم الحذف .. حصل خطأ ما', "top", "right", null, null)
                }
            })
        } else {
            swal("تم الإلفاء", "لم يتم حذف " + name, "error");
        }
    });
}
function resetinputs() {
    $('#CatName').val('')
    $('#CatDes').val('')
}
function loading(msg, stat) {
    if (stat === "start") {
        $("#addusermodalloading").css('display', 'inline-block')
        $("#supbutton").prop('disabled', true);
        $("#supbutton").text(msg);
    } if (stat === "stop") {
        $("#addusermodalloading").css('display', 'none')
        $("#supbutton").prop('disabled', false);
        $("#supbutton").text(msg);
    }
}