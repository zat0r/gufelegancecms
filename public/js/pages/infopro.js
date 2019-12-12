var data=''
if (window.location.pathname === "/prodacts/add") {
    console.log("add new prodact")
    $(document).ready(function() {
        getcategories()
        $('#pro_id').val('سيتم إضافة الرمز عند إنشاء المنتج')
        $("#supbutton").attr('onclick', 'AddProdact()');
        $('#prosell').inputmask('999.99', { placeholder: '___.__' });
        $('#probuy').inputmask('999.99', { placeholder: '___.__' });
        autosize($('textarea.auto-growth'));
        $('#barcode').replaceWith($('<h4 id="#barcode">لم يتم إضافة رقم باركود بعد</h4>'));
    });
}else{
    console.log("show user")
    $(document).ready(function() {
        getcategories()
        $("#supbutton").attr('onclick', 'updateProdact()');
        $('#prosell').inputmask('999.99', { placeholder: '___.__' });
        $('#probuy').inputmask('999.99', { placeholder: '___.__' });
        autosize($('textarea.auto-growth'));
        JsBarcode("#barcode", $('#oldprobarcode').val());
        if ($('#OnlineChecked').attr('data-value') ===  'on')
        $('#OnlineChecked').val('on');
        $('#Onlineshowtrigger').collapse('toggle');
        $('.shop .header').removeClass('bg-red');
        $('.shop .header').addClass('bg-green');
    });
}
  Dropzone.options.Mainpicupload = {  
    paramName: "Mainpic",
    encode: 'multipart/form-data',
    maxFilesize: 3,
    maxFiles: 1,
    url: "/uploadfile",
    addRemoveLinks: true,
    uploadMultiple: false,
    init: function () {

        this.on("addedfile", function (file) {
            $('#Mainpicupload div div img').attr('src', file.url)
            $('#Mainpicupload .dz-preview').removeClass("dz-file-preview")
            $('#Mainpicupload .dz-preview').addClass("dz-processing dz-success dz-complete dz-image-preview");
        });
        this.on("maxfilesexceeded", function (file) {
        });
        this.on("complete", function (file) {

          if (this.files.length == 2) {
              file.status = "maxupload"
              this.removeFile(file)
          } else {
                var result = JSON.parse(file.xhr.responseText).Mainpic[0].filename;
                if (file.status == 'success') {
                  showNotification("bg-green", 'تم رفع الصورة بنجاح', "top", "right", null, null)
                  $('#Mainpicupload').val(result);
                }
          }
        });
        this.on("removedfile", function (file) {
            if (file.status === 'maxupload') {
              showNotification("bg-blue", 'تم الوصول للحد الأقصى للصور', "top", "right", null, null)
            }else{
            var uploadfile = { type:'deleteFile', name: JSON.parse(file.xhr.responseText).Mainpic[0].path }
           $.ajax({
              url: '/uploadfile',
              dataType: 'json',
              data: uploadfile,
              success: function(data){
                  console.log(data.responseText)
                  showNotification("bg-green", 'تم حذف الصورة', "top", "right", null, null)
                  $('#Mainpicupload').val('');
              },
              error: function(data){
                  console.log(data)
              }
           })
          }
      });
      this.on('resetFiles', function () {
          this.removeAllFiles();
      });
}
}
  Dropzone.options.Otherpicupload = { 
  paramName: "OtherPics",
  encode: 'multipart/form-data',
  maxFilesize: 2,
  maxFiles: 8,
  url: "/uploadfile",
  addRemoveLinks: true,
  uploadMultiple: false,
  init: function () {

      this.on("addedfile", function (file) {
        $('#Otherpicupload div div img:last').attr('src', file.url)
        $('#Otherpicupload .dz-preview:last').removeClass("dz-file-preview")
        $('#Otherpicupload .dz-preview:last').addClass("dz-processing dz-success dz-complete dz-image-preview");

      });
      this.on("maxfilesexceeded", function (file) {
      });
      this.on("complete", function (file) {

          if (this.files.length == 9) {
              file.status = "maxupload"
              this.removeFile(file)
          } else {
                var result = JSON.parse(file.xhr.responseText).OtherPics[0].filename;
                if (file.status == 'success') {
                  showNotification("bg-green", 'تم رفع الصورة بنجاح', "top", "right", null, null)
                  var allresult = $('#Otherpicupload').val()
                  if( allresult === '' || allresult === undefined){allresult += result; console.log('first pic')}
                  else{allresult += ',' + result}
                  $('#Otherpicupload').val(allresult);
                }
          }
      });
      this.on("removedfile", function (file) {
          console.log(file)
          if (file.status === 'maxupload') {
              showNotification("bg-blue", 'تم الوصول للحد الأقصى للصور', "top", "right", null, null)
            }else{
                if(file.status === 'oldupload'){
                    var uploadfile = { type:'deleteFile', name: 'public' + file.url }
                    var result = file.name;
                }else{
                var uploadfile = { type:'deleteFile', name: JSON.parse(file.xhr.responseText).OtherPics[0].path}
                var result = JSON.parse(file.xhr.responseText).OtherPics[0].filename;}
           $.ajax({
              url: '/uploadfile',
              dataType: 'json',
              data: uploadfile,
              success: function(data){
                var final = ''
                var allpics = $('#Otherpicupload').attr('data-value').split(',')
                for (i=0; allpics.length > i; ++i){
                    if(allpics[i] === result || allpics[i] === ''){console.log('found it')}else{
                        if( final === '' || final === undefined){final += allpics[i]}else{final += ','+ allpics[i]}
                    }
                }
                $('Otherpicupload').attr('data-value', final)
                  console.log(data.responseText)
                  $('#' + result.split('.')[0]).replaceWith ('');
                  showNotification("bg-green", 'تم حذف الصورة', "top", "right", null, null)
              },
              error: function(data){
                  console.log(data)
              }
           })
          }
      });
      this.on('resetFiles', function () {
        this.removeAllFiles();
      });
}
}
  Dropzone.options.Dpicupload = {
  paramName: "tdpic",
  encode: 'multipart/form-data',
  maxFilesize: 20,
  maxFiles: 1,
  url: "/uploadfile",
  addRemoveLinks: true,
  uploadMultiple: false,
  init: function () {

      this.on("addedfile", function (file) {
        $('#Dpicupload div div img').attr('src', file.url)
        $('#Dpicupload .dz-preview').removeClass("dz-file-preview")
        $('#Dpicupload .dz-preview').addClass("dz-processing dz-success dz-complete dz-image-preview");
      });
      this.on("maxfilesexceeded", function (file) {
      });
      this.on("complete", function (file) {
          if (this.files.length == 2) {
              file.status = "maxupload"
              this.removeFile(file)
          } else {
                var result = JSON.parse(file.xhr.responseText).tdpic[0].filename;
                if (file.status == 'success') {
                  showNotification("bg-green", 'تم رفع الصورة بنجاح', "top", "right", null, null)
                  $('#Dpicupload').val(result);
                }
          }
      });
      this.on("removedfile", function (file) {
          if (file.status === 'maxupload') {
              showNotification("bg-blue", 'تم الوصول للحد الأقصى للصور', "top", "right", null, null)
            }else{
            var uploadfile = { type:'deleteFile', name: JSON.parse(file.xhr.responseText).tdpic[0].path }
           $.ajax({
              url: '/uploadfile',
              dataType: 'json',
              data: uploadfile,
              success: function(data){
                  
                  console.log(data.responseText)
                  $('#Dpicupload').val('');
                  showNotification("bg-green", 'تم حذف الصورة', "top", "right", null, null)
              },
              error: function(data){
                  console.log(data)
              }
           })
          }
    });
    this.on('resetFiles', function () {
        this.removeAllFiles();
    });
}
}
$('#OnlineChecked').click(function() {
    if ($(this).val() === "on") {
        console.log("turned off");
        $(this).val("off");
        $('#Onlineshowtrigger').collapse('toggle')
        $('.shop .header').removeClass('bg-green')
        $('.shop .header').addClass('bg-red')

    }else{
        console.log("turned on");
        $(this).val("on")
        $('#Onlineshowtrigger').collapse('toggle');
        $('.shop .header').removeClass('bg-red');
        $('.shop .header').addClass('bg-green');

    }
});
function loading(msg, stat) {
    if (stat === "start") {
    $("#loading").css('display', 'inline-block')
    $("#supbutton").prop('disabled', true);
    $("#supbutton").text(msg);
}   if (stat === "stop") {
    $("#loading").css('display', 'none')
    $("#supbutton").prop('disabled', false);
    $("#supbutton").text(msg);
}
}
function AddProdact(){
    removealarms ()
    var valid = true;
    if ($('#proname').val() == '' || $("#proname").val() == undefined ){
        $("#proname").parent().addClass("focused error");
        var valid = false
    }
    if ($('#procat').val() == '' || $("#procat").val() == undefined ){
        $('button[data-id="procat"]').removeClass("btn-default");
        $('button[data-id="procat"]').addClass("btn-danger");
        var valid = false
    }
    if ($('#prosell').val() == '' || $("#prosell").val() == undefined ){
        $("#prosell").parent().addClass("focused error");
        var valid = false
    }
    if ($('#Mainpicupload').val() == '' || $("#Mainpicupload").val() == undefined ){
        $("#Mainpicupload").addClass("animated shake bg-red");
        $("#Mainpicupload .dz-message span").html('الرجاء رفع الصورة الرئيسية')
        var valid = false
    }
    if ($('#Otherpicupload').val() == '' || $("#Otherpicupload").val() == undefined ){
        $("#Otherpicupload").addClass("animated shake bg-red");
        $("#Otherpicupload .dz-message span").html('الرجاء رفع صورة إضافية واحدة على الأقل')
        var valid = false
    }
    if ($('#OnlineChecked').val() == 'on'){
        if ($('#prostoreinfo').val() == '' || $("#prostoreinfo").val() == undefined ){
            $("#prostoreinfo").parent().addClass("focused error");
            var valid = false
        }
        if ($('#procityinfo').val() == '' || $("#procityinfo").val() == undefined ){
            $("#procityinfo").parent().addClass("focused error");
            var valid = false
        }
        if ($('#procontinfo').val() == '' || $("#procontinfo").val() == undefined ){
            $("#procontinfo").parent().addClass("error");
            var valid = false
        }

    }
    if (valid === false){
        showNotification("bg-red", 'الرجاء تصحيح المدخلات الخاطئة', "top", "right", null, null)
        return
    }
    console.log('first point')

    var prodata = { type: 'addprodact', data: {
        name: $('#proname').val(),
        catagory: $('#procat').val(),
        buy: $('#probuy').val(),
        sell: $('#prosell').val(),
        barcode: $('#probarcode').val(),
        quantity: {
            mainstore: $('#proqunt').val()
        },
        pics: {
            main: $('#Mainpicupload').val(),
            tdpic: $('#Dpicupload').val(),
            otherpic: $('#Otherpicupload').val()
        },
        online: {
            status: $('#OnlineChecked').val(),
            about: $('#prostoreinfo').val(),
            create: $('#procityinfo').val(),
            contain: $('#procontinfo').val()
        }
    }
        
    }
    $.ajax({
        url: '/api',
        dataType: 'json',
        data: prodata,
        success: function(data){
            console.log(data);
            window.location.href = '/prodacts/' + data.success.insertedId;
        }
    })

}
function removealarms (){
    $("#proname").parent().removeClass("focused error");
    $('button[data-id="procat"]').removeClass("btn-danger");
    $('button[data-id="procat"]').addClass("btn-default");
    $("#prosell").parent().removeClass("focused error");
    $("#Mainpicupload").removeClass("animated shake bg-red");
    $("#Mainpicupload .dz-message span").html('إضغط أو أسقط ملف هنا لرفعه')
    $("#Otherpicupload").removeClass("animated shake bg-red");
    $("#Mainpicupload .dz-message span").html('إضغط أو أسقط ملف هنا لرفعه')
    $("#prostoreinfo").parent().removeClass("focused error");
    $("#procityinfo").parent().removeClass("focused error");
    $("#procontinfo").parent().removeClass("error");


}
function getcategories() {
    var request = {type: 'getcat'}
    $.ajax({
        url: '/api',
        dataType: 'json',
        data: request,
        success: function(data) {
            outtable = '<option value="">-- التصنيف --</option>';
            for (i = 0; i < data.success.length; i++) {
                outtable += '<option value="' + data.success[i].name + '">' + data.success[i].name + '</option>' 
            }
            $("#procat").html(outtable);
            $("#procat").selectpicker();
            $(".filter-option").html($("#procat")[0].attributes[1].value)
            existfiles()
        },
        error: function(data){console.log(data)}
    })
}
function existfiles() {
    if (window.location.pathname !== "/prodacts/add") {
    Mainpicupload.dropzone.emit("addedfile", {status: 'oldupload', name: $("#Mainpicupload").attr("data-value"), url: '/images/prodacts/' + $("#Mainpicupload").attr("data-value") });
    if ($("#Dpicupload").attr("data-value") !== '' || $("#Dpicupload").attr("data-value") !== undefined){
    Dpicupload.dropzone.emit("addedfile", {status: 'oldupload', name: $("#Dpicupload").attr("data-value"), url: '/images/prodacts/' + $("#Dpicupload").attr("data-value")})
    }
    var otherpic = $('#Otherpicupload').attr("data-value").split(',');
    for (i=0; otherpic.length > i; ++i){
        Otherpicupload.dropzone.emit("addedfile", {status: 'oldupload', name: otherpic[i], url: '/images/prodacts/' + otherpic[i]})
    }
}
}
