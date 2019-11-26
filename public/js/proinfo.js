$(document).ready(function () {
});
function MainPicSubmit(event) {

// Create an FormData object 
  var data = new FormData(event);

// If you want to add an extra field for the FormData
  data.append("CustomField", "This is some extra data, testing");

  $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: "/uploadfile",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 5000,
      success: function (data) {
          $("#ProMainPic label").hide();
          console.log("SUCCESS : ", data);
          $("#ProMainPic").css("background-image", "url('/images/prodacts/" + data.filename + "')");
          $("#MainPicID").val(data.filename);
          $.notify("تم رفع الصورة الرئيسية", "success");
      },
      error: function (e) {
          console.log("ERROR : ", e);
          $("#btnSubmit").prop("disabled", false);
      }
  });
}
function OtherPicSubmit(event) {

  // Create an FormData object 
    var data = new FormData(event);
  
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/uploadfile",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            $("#ProOtherPics label").hide();
            console.log("SUCCESS : ", data);
            var url = "url('/images/prodacts/" + data.filename + "')"
            $("#ProOtherPics").append("<div class='showOnePro col-md-2 align-self-center' style='background-image: " + url + "'></div>");
           // $("#ProOtherID").val(data.filename);
            $.notify("تم رفع مجموعة الصور", "success");
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $("#btnSubmit").prop("disabled", false);
        }
    });
   }