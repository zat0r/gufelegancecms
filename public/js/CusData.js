$(document).ready(function() {
    PageData();
  });
  var reqdata ='';
function OpenAddNew() {
    resetInputs();
    modal("in", "#Addnew");
    $(".supbutton").attr('onclick', "SendUser()");
}
function SendUser() {
    
    var valid = true;
    if ($("#UserName").val() == '' || $("#UserName").val() == undefined){
        $("#UserName").addClass("is-invalid");
        var valid = false
    }
    if (validateEmail($("#UserEmail").val()) == false){
        $("#UserEmail").addClass("is-invalid");
        var valid = false
    }
    if ($("#UserPass").val() == '' || $("#UserPass").val() == undefined){
        $("#UserPass").addClass("is-invalid");
        var valid = false
    }
    if ($("#UserCity").val() == '' || $("#UserCity").val() == undefined){
        $("#UserCity").addClass("is-invalid");
        var valid = false
    }

        var str = $('#UserPhone').val();
        var re = /07[0-9]{8}/i;
        var found = str.match(re);

    if ($("#UserPhone").val() == '' || $("#UserPhone").val() == undefined || found == null){
        $("#UserPhone").addClass("is-invalid");
        var valid = false
    }
    if ($("#UserAddress").val() == '' || $("#UserAddress").val() == undefined){
        $("#UserAddress").addClass("is-invalid");
        var valid = false
    }
    if (valid == false) {
        Swal.fire({
            title: 'خطأ!',
            text: 'توجد حقول لم تعبأ بالشكل الصحيح',
            icon: 'error',
            confirmaText: 'تصحيح'
          });
          $("#Addnew").removeClass("animated bounceOutDown bounceInDown shake");
          $("#Addnew").addClass("animated shake");
          setTimeout(function(){ $("#Addnew").removeClass("animated shake"); }, 3000);
          return;
    }
    loading("جاري رفع البيانات", "start");


    data = { 
    type: "addUser",
    Name: $("#UserName").val(), 
    Email: $("#UserEmail").val(), 
    Password: $("#UserPass").val(),
    City: $("#UserCity").val(),
    BirthDay: $("#UserBirthDay").val(),
    Country: "Jordan",
    Phone: $("#UserPhone").val(),
    Address: $("#UserAddress").val(),
    RegDate: moment().format()
}
    $.ajax ({
        url:'/api',
        dataType: 'json',
        data: data,
        success: function(data){
            console.log(data)
            Swal.fire({
                title: 'نجاح',
                text: 'تم رفع البيانات',
                icon: 'success',
                confirmaText: 'إغلاق'
              });
              loading("تم رفع البيانات", "stop");
              modal("out", "#Adduser");
        },
        error: function(data){
            console.log(data)
            Swal.fire({
                title: 'خطأ!',
                text: 'يوجد خطأ بالسيرفر الرجاء التواصل مع مسؤول النظام',
                icon: 'error',
                confirmaText: 'حاول مرة أخرى'
              });
              loading("يوجد خطأ", "stop");
        }

    })
}
function openediting(id) {
resetInputs ();
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
    $("#UserAddress").val(data["success"][0].Address);
    $("#UserPass").attr('disabled', 'disabled');
    $("#UserPass").val('لا تستطيع التعديل');
    $(".modal-title").html("تعديل بيانات: " + data["success"][0].Name);
    $(".supbutton").attr('onclick', edituser);
    modal("in", "#Addnew");
    }
})
}
function edituser (id){
    var valid = true;
    if ($("#UserName").val() == '' || $("#UserName").val() == undefined){
        $("#UserName").addClass("is-invalid");
        var valid = false
    }
    if (validateEmail($("#UserEmail").val()) == false){
        $("#UserEmail").addClass("is-invalid");
        var valid = false
    }
    if ($("#UserCity").val() == '' || $("#UserCity").val() == undefined){
        $("#UserCity").addClass("is-invalid");
        var valid = false
    }

        var str = $('#UserPhone').val();
        var re = /07[0-9]{8}/i;
        var found = str.match(re);

    if ($("#UserPhone").val() == '' || $("#UserPhone").val() == undefined || found == null){
        $("#UserPhone").addClass("is-invalid");
        var valid = false
    }
    if ($("#UserAddress").val() == '' || $("#UserAddress").val() == undefined){
        $("#UserAddress").addClass("is-invalid");
        var valid = false
    }
    if (valid == false) {
        Swal.fire({
            title: 'خطأ!',
            text: 'توجد حقول لم تعبأ بالشكل الصحيح',
            icon: 'error',
            confirmaText: 'تصحيح'
          });
          $("#Addnew").removeClass("animated bounceOutDown bounceInDown shake");
          $("#Addnew").addClass("animated shake");
          setTimeout(function(){ $("#Addnew").removeClass("animated shake"); }, 3000);
          return;
    }
    loading("جاري تحديث البيانات", "start");
    var updateuser = {type: "UpdateUser", userid: id, Name: $("#UserName").val(), Email: $("#UserEmail").val(), City: $("#UserCity").val(), BirthDay: $("#UserBirthDay").val(), Phone: $("#UserPhone").val(), Address: $("#UserAddress").val() }
    $.ajax ({
        url: '/api',
        dataType: 'json',
        data: updateuser,
        success: function(data){
            console.log(data)
            loading("تم رفع البيانات", "stop");
            Swal.fire({
                title: 'نجاح',
                text: 'تم رفع البيانات',
                icon: 'success',
                confirmaText: 'إغلاق'
              });
            modal("out", "#Addnew");
        },
        error: function(data){
            console.log(data)
            loading("يوجد خطأ", "stop");
            Swal.fire({
                title: 'خطأ!',
                text: 'يوجد خطأ بالسيرفر الرجاء التواصل مع مسؤول النظام',
                icon: 'error',
                confirmaText: 'حاول مرة أخرى'
              });
        }
    })
    
}
function loading(msg, stat) {
    if (stat === "start") {
    $(".loading").addClass("spinner-border text-primary");
    $(".supbutton").prop('disabled', true);
    $(".supbutton").text(msg);
}   if (stat === "stop") {
    $(".loading").removeClass("spinner-border text-primary");
    $(".supbutton").prop('disabled', false);
    $(".supbutton").text(msg);
}
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function modal(move, name) {
    if (move === "in") {
    $(name).removeClass("animated bounceOutDown shake");
    $(name).addClass("animated bounceInDown ");
    $(name).modal("show");
    setTimeout(function(){ $(name).removeClass("animated bounceInDown"); }, 1500);
    }
    if(move ==="out") {
        $(name).removeClass("animated bounceInDown shake");
        $(name).addClass("animated bounceOutDown");
        setTimeout(function(){
            $(name).modal('hide');
            $(name).removeClass("show animated bounceOutDown");}, 1000);}
    }
function resetInputs() {
    loading("إضافة", "stop");
    $("#UserName").removeClass("is-invalid");
    $("#UserEmail").removeClass("is-invalid");
    $("#UserBirthDay").removeClass("is-invalid");
    $("#UserPass").removeClass("is-invalid");
    $("#UserCity").removeClass("is-invalid");
    $("#UserPhone").removeClass("is-invalid");
    $("#UserAddress").removeClass("is-invalid");
    $("#UserName").val('');
    $("#UserEmail").val('');
    $("#UserPhone").val('');
    $("#UserBirthDay").val('');
    $("#UserPhone").inputmask("0799999999", { placeholder: '07________' });
    $("#UserBirthDay").inputmask("99/99/9999", {placeholder: 'DD/MM/YYYY' });
    $("#UserPass").val('');
    $("#UserCity").val('');
    $("#UserAddress").val('');
    $("#Addnew").removeClass("animated bounceOutDown bounceInDown shake");
}
function PageData(){
    var reqdata = {type: "getUsers"}
    console.log(reqdata);
    $.ajax ({
        url: '/api',
        dataType: 'json',
        data: reqdata,
        success: function(data){
            console.log(data)
            var outTable = '';
            var as = '<a class="btn btn-primary Openmodal" onclick="openediting(\'THISID\')"><i class="fas fa-edit"></i></a><a href="users/THISID" class="btn btn-warning"><i class="fas fa-users-cog"></i></a>';
            for (i = 0; i < data["success"].length; i++) {
                outTable += '<tr><td>'+ data["success"][i].Name + '</td><td>' + data["success"][i].Phone + '</td><td>' + data["success"][i].City + '</td><td>' + data["success"][i].Address + '</td><td>' + as.replace(/THISID/g, data["success"][i]._id) + '</td></tr>';
            }
            $("#Data").html(outTable);
            $('#example').DataTable();

        },
        error: function(data){
            console.log(data)
        }

    })

}

//realTime check input