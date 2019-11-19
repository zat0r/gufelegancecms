$(document).ready(function() {
    PageData();
      $(".closemodal").click(function() {
          $("#Addnew").removeClass("animated bounceInDown shake");
          $("#Addnew").addClass("animated bounceOutDown");
          setTimeout(function(){
              $("#Addnew").modal('hide');
              $("#Addnew").removeClass("show animated bounceOutDown");
      }, 1000);});
      
      $(".Openmodal").click(function() {
        $("#Addnew").removeClass("animated bounceOutDown shake");
        $("#Addnew").addClass("animated bounceInDown ");
        $("#Addnew").addClass("show ");
        setTimeout(function(){ $("#Addnew").removeClass("animated bounceInDown"); }, 1500);
      
      });
  });

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
            confirmButtonText: 'تصحيح'
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
                confirmButtonText: 'إغلاق'
              });
              loading("تم رفع البيانات", "stop");
              $("#Addnew").modal('hide');
        },
        error: function(data){
            console.log(data)
            Swal.fire({
                title: 'خطأ!',
                text: 'يوجد خطأ بالسيرفر الرجاء التواصل مع مسؤول النظام',
                icon: 'error',
                confirmButtonText: 'حاول مرة أخرى'
              });
              loading("يوجد خطأ", "stop");
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
function resetInputs () {
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
    $("#UserPhone").inputmask("0799999999", { placeholder: '07________' });
    $("#UserBirthDay").inputmask("99/99/9999", {placeholder: 'DD/MM/YYYY' });
    $("#UserPass").val('');
    $("#UserCity").val('');
    $("#UserAddress").val('');
    $("#Addnew").removeClass("animated bounceOutDown bounceInDown shake");
}
function PageData(){
    var reqdata = {type: "getUser"}
    console.log(reqdata);
    $.ajax ({
        url: '/api',
        dataType: 'json',
        data: reqdata,
        success: function(data){
            console.log(data)
            var outTable = '';
            var buttons = '<button type="button" class="btn btn-primary"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button><button type="button" class="btn btn-warning"><i class="fas fa-users-cog"></i></button>';
            for (i = 0; i < data["success"].length; i++) {
                outTable += '<tr><td>'+ data["success"][i].Name + '</td><td>' + data["success"][i].Phone + '</td><td>' + data["success"][i].City + '</td><td>' + data["success"][i].Address + '</td><td>' + buttons + '</td></tr>';
            }
            $("#Data").html(outTable);
            $('#example').DataTable();

        },
        error: function(data){
            console.log(data)
        }

    })

}