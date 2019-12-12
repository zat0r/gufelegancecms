$(document).ready(function() {
    PageData();
    autosize($('textarea.auto-growth'));
  });
function AddUser() {
    loading("جاري التأكد من صحة البيانات", "start");
    var valid = true;
    if ($("#UserName").val() == '' || $("#UserName").val() == undefined){
        $("#UserName").parent().addClass("focused error");
        var valid = false
    }
    if (validateEmail($("#UserEmail").val()) == false){
        $("#UserEmail").parent().addClass("focused error");
        var valid = false
    }
    if ($("#UserCity").val() == '' || $("#UserCity").val() == undefined){
        $("#UserCity").parent().addClass("focused error");
        var valid = false
    }

        var str = $('#UserPhone').val();
        var re = /07[0-9]{8}/i;
        var found = str.match(re);

    if ($("#UserPhone").val() == '' || $("#UserPhone").val() == undefined || found == null){
        $("#UserPhone").parent().addClass("focused error");
        var valid = false
    }
    if ($("#UserAddress").val() == '' || $("#UserAddress").val() == undefined){
        $("#UserAddress").parent().addClass("focused error");
        var valid = false
    }
    if (valid == false) {
        $('#UserModal').waitMe('hide');
        swal("خطأ", "الرجاء تعبئة الحقول المطلوبة", "error");
          $("#UserModal").removeClass("animated bounceOutDown bounceInDown shake");
          $("#UserModal").addClass("animated shake");
          showNotification("bg-red", "الرجاء إضافة البيانات", "top", "right", null, null);
          setTimeout(function(){ $("#UserModal").removeClass("animated shake"); }, 3000);
          loading("إعادة المحاولة", "stop");
          return;
    }
    loading("جاري رفع البيانات", "start")
    data = { 
        type: "addUser",
        Name: $("#UserName").val(), 
        Email: $("#UserEmail").val(), 
        Password: $("#UserPass").val(),
        City: $("#UserCity").val(),
        BirthDay: $("#UserBirthDay").val(),
        Country: $("#UserCountry").val(),
        Phone: $("#UserPhone").val(),
        Address: $("#UserAddress").val(),
        RegDate: moment().format(),
        isDeleted: false,
        isBlocked: false
    }
    $.ajax ({
        url:'/api',
        dataType: 'json',
        data: data,
        success: function(data){
            console.log(data)
            swal("نجاح", 'تم إضافة المستخدم ' + $("#UserName").val() + ' بنجاح', "success", 'إغلاق');
            $("#UserModal").modal("hide");
            showNotification("bg-green", 'تم إضافة المستخدم ' + $("#UserName").val() + ' بنجاح', "top", "right", null, null);
            loading("تم رفع البيانات بنجاح", "stop");
        },
        error: function(data){
            console.log(data)
            swal('خطأ!','يوجد خطأ بالسيرفر الرجاء التواصل مع مسؤول النظام', 'error','حاول مرة أخرى');
              loading("إعادة المحاولة", "stop");
              showNotification("bg-red", "خطأ في الإتصل في السيرفر", "top", "right", null, null);
        }

    })

}
function AddNewModal() {
    resetinputs()
    loading("إضافة المستخدم", "stop")
    $("#ModalLabel").html("إضافة مستخدم جديد");
    $("#UserModal").modal("show");
    $("#supbutton").attr('onclick', "AddUser()");
  }
function editModal(id) {
    $("button[data-userid='" + id + "']").prop('disabled', true);
    showNotification("bg-cyan", 'جاري طلب بيانات المستخدم', "top", "right", null, null);
    resetinputs();
    var reqdata = {type: "getinfo", idinfo: id}
    var edituser = 'edituser("'+ id +'")';
console.log(reqdata)
$.ajax ({
    url: "/api",
    dataType: 'json',
    data: reqdata,
    success: function (data) {
        console.log(data);
    $("#UserName").val(data["success"][0].Name);
    $("#UserEmail").val(data["success"][0].Email);
    $("#UserPhone").val(data["success"][0].Phone);
    $("#UserBirthDay").val(data["success"][0].BirthDay);
    $("#UserCity").val(data["success"][0].City);
    $("button[data-id=UserCity] .filter-option").html(data["success"][0].City   )
    $("#UserAddress").val(data["success"][0].Address);
    $("#UserPass").prop('disabled', true);
    $("#UserPass").val('لا تستطيع التعديل');
    $(".modal-title").html("تعديل بيانات: " + data["success"][0].Name);
    loading("تعديل", "stop")
    $("#supbutton").attr('onclick', edituser);
    $("#UserModal").modal("show");
    showNotification("bg-green", 'تم الحصول على البيانات', "top", "right", null, null);
    if ($("#UserName").val() !== "") {$("#UserName").parent().addClass("focused")}
    if ($("#UserEmail").val() !== "") {$("#UserEmail").parent().addClass("focused")}
    if ($("#UserPhone").val() !== "") {$("#UserPhone").parent().addClass("focused")}
    if ($("#UserBirthDay").val() !== "") {$("#UserBirthDay").parent().addClass("focused")}
    if ($("#UserCity").val() !== "") {$("#UserCity").parent().addClass("focused")}
    if ($("#UserAddress").val() !== "") {$("#UserAddress").parent().addClass("focused")}
    if ($("#UserPass").val() !== "") {$("#UserPass").parent().addClass("focused")}
    $("button[data-userid='" + id + "']").prop('disabled', false);
    }
});

}
function edituser(id){
    loading("جاري التأكد من صحة البيانات", "start");
    var valid = true;
    if ($("#UserName").val() == '' || $("#UserName").val() == undefined){
        $("#UserName").parent().addClass("focused error");
        var valid = false
    }
    if (validateEmail($("#UserEmail").val()) == false){
        $("#UserEmail").parent().addClass("focused error");
        var valid = false
    }
    if ($("#UserCity").val() == '' || $("#UserCity").val() == undefined){
        $("#UserCity").parent().addClass("focused error");
        var valid = false
    }

        var str = $('#UserPhone').val();
        var re = /07[0-9]{8}/i;
        var found = str.match(re);

    if ($("#UserPhone").val() == '' || $("#UserPhone").val() == undefined || found == null){
        $("#UserPhone").parent().addClass("focused error");
        var valid = false
    }
    if ($("#UserAddress").val() == '' || $("#UserAddress").val() == undefined){
        $("#UserAddress").parent().addClass("focused error");
        var valid = false
    }
    if (valid == false) {
        $('#UserModal').waitMe('hide');
        swal("خطأ", "الرجاء تعبئة الحقول المطلوبة", "error");
          $("#UserModal").removeClass("animated bounceOutDown bounceInDown shake");
          $("#UserModal").addClass("animated shake");
          showNotification("bg-red", "الرجاء إضافة البيانات", "top", "right", null, null);
          setTimeout(function(){ $("#UserModal").removeClass("animated shake"); }, 3000);
          loading("إعادة المحاولة", "stop");
          return;
    }
    loading("جاري تعديل البيانات", "start");
    var updateuser = {type: "UpdateUser", userid: id, Name: $("#UserName").val(), Email: $("#UserEmail").val(), City: $("#UserCity").val(), BirthDay: $("#UserBirthDay").val(), Phone: $("#UserPhone").val(), Address: $("#UserAddress").val() }
    $.ajax ({
        url: '/api',
        dataType: 'json',
        data: updateuser,
        success: function(data){
            console.log(data)
            loading("تم رفع البيانات", "stop");
            swal("نجاح", 'تم تعديل المستخدم ' + $("#UserName").val() + ' بنجاح', "success", 'إغلاق');
            $("#UserModal").modal("hide");
            showNotification("bg-green", 'تم تعديل المستخدم ' + $("#UserName").val() + ' بنجاح', "top", "right", null, null);            
        },
        error: function(data){
            console.log(data)
            loading("إعادة المحاولة", "stop");

        }
    })
}
function PageData(){
    var effect = $('.card').data('loadingEffect');
    $('.card').waitMe({
        effect: effect,
        text: 'جاري تحميل البيانات ...',
        bg: 'rgba(255,255,255,0.90)',
        color: '#555'
    });
  var reqdata = {type: "getUsers"}
    console.log(reqdata);
    $.ajax ({
        url: '/api',
        dataType: 'json',
        data: reqdata,
        success: function(data){
            console.log(data)
            var outTable = '';
            var as = '<button class="btn btn-primary  waves-effect" data-userid="THISID" onclick="editModal(\'THISID\')"><i class="fas fa-edit"></i></button><a href="users/THISID" class="btn btn-warning  waves-effect"><i class="fas fa-users-cog"></i></a>';
            for (i = 0; i < data["success"].length; i++) {
                outTable += '<tr><td>'+ data["success"][i].Name + '</td><td>' + data["success"][i].Phone + '</td><td>' + data["success"][i].City + '</td><td>' + data["success"][i].Address + '</td><td>' + as.replace(/THISID/g, data["success"][i]._id) + '</td></tr>';
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
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function loading(msg, stat) {
    if (stat === "start") {
    $("#addusermodalloading").css('display', 'inline-block')
    $("#supbutton").prop('disabled', true);
    $("#supbutton").text(msg);
}   if (stat === "stop") {
    $("#addusermodalloading").css('display', 'none')
    $("#supbutton").prop('disabled', false);
    $("#supbutton").text(msg);
}
}
function reloadData() {
    var effect = $('.card').data('loadingEffect');
    $('.card').waitMe({
        effect: effect,
        text: 'جاري تحميل البيانات ...',
        bg: 'rgba(255,255,255,0.90)',
        color: '#555'
    });
  var reqdata = {type: "getUsers"}
    console.log(reqdata);
    $("#UserData").html('');
    $.ajax ({
        url: '/api',
        dataType: 'json',
        data: reqdata,
        success: function(data){
            console.log(data)
            var outTable = '';
            var as = '<button class="btn btn-primary  waves-effect" data-userid="THISID" onclick="editModal(\'THISID\')"><i class="fas fa-edit"></i></button><a href="users/THISID" class="btn btn-warning  waves-effect"><i class="fas fa-users-cog"></i></a>';
            for (i = 0; i < data["success"].length; i++) {
                outTable += '<tr><td>'+ data["success"][i].Name + '</td><td>' + data["success"][i].Phone + '</td><td>' + data["success"][i].City + '</td><td>' + data["success"][i].Address + '</td><td>' + as.replace(/THISID/g, data["success"][i]._id) + '</td></tr>';
            }
            $("#UserData").html(outTable);
            $('.card').waitMe('hide');
        },
        error: function(data){
            console.log(data)
        }
    })
}
function resetinputs() {
    $("#ModalLabel").html('');
    $("#UserName").parent().removeClass("focused error");
    $("#UserEmail").parent().removeClass("focused error");
    $("#UserBirthDay").parent().removeClass("focused error");
    $("#UserPass").parent().removeClass("focused error");
    $("#UserCity").parent().removeClass("focused error");
    $("#UserPhone").parent().removeClass("focused error");
    $("#UserAddress").parent().removeClass("focused error");
    $("#UserPass").prop('disabled', false);
    $("#UserName").val('');
    $("#UserEmail").val('');
    $("#UserPhone").val('');
    $("#UserBirthDay").val('');
    $("#UserBirthDay").inputmask('dd/mm/yyyy', { placeholder: '__/__/____' });
    $("#UserPhone").inputmask('0799999999', { placeholder: '07________' });
    $("#UserPass").val('');
    $("#UserCity").val('');
    $("#UserAddress").val('');
    $("#supbutton").attr('onclick', "");
}