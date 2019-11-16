$(document).ready(function() {
    $('#example').DataTable();
});

$(".Openmodal").click(function() {
  $("#Addnew").removeClass("animated bounceOutDown ");
  $("#Addnew").addClass("animated bounceInDown ");
  $("#Addnew").addClass("show ");
});
$(".closemodal").click(function() {
    $("#Addnew").removeClass("animated bounceInDown");
    $("#Addnew").addClass("animated bounceOutDown");
})
$("#senddata").click(function() {

    var data = {type: "addUser", name: "servertest", age: "2", City: "inside pc"}
    $.ajax ({
        url:'/api',
        dataType: 'json',
        data: data,
        success: function(data){
            console.log(data)
        },
        error: function(data){
            console.log(data)
        }

    })
})


