$(document).ready(function() {
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
  var UserData = {
      id: $("#UserID").val(),
      username: $("#UserName").val(),
      userbd: $("#UserBD").val(),
      useremail: $("#UserEmail").val(),
      userphone: $("#UserPhone").val(),
      usercountry: $("#UserCountry").val(),
      usercity: $("#UserCity").val(),
      useraddress: $("#UserAdress").val()

  }