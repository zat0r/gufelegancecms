$("#senddata").click(function() {
    DataCheck()

    data = { 
    name: $("#UserName").value, 
    Email: $("#UserEmail").value, 
    Password: $("#UserPass").value,
    City: $("#UserCity").value,
    Country: "Jordan",
    Phone: $("#UserPhone").value,
    Address: $("#UserAddress").value,
    RegDate: date.now()
}
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

function DataCheck(){
    var valid = true;
    if ($("#UserName").value === ''){
        $("#UserName").addClass("is-invalid")
        var valid = false
        return
    }
    if ($("#UserEmail").value === ''){
        $("#UserEmail").addClass("is-invalid")
        var valid = false
        return
    }
    if ($("#UserPass").value === ''){
        $("#UserPass").addClass("is-invalid")
        var valid = false
        return
    }
    if ($("#UserCity").value === ''){
        $("#UserCity").addClass("is-invalid")
        var valid = false
        return
    }
    if ($("#UserPhone").value === ''){
        $("#UserPhone").addClass("is-invalid")
        var valid = false
        return
    }
    if ($("#UserAddress").value === ''){
        $("#UserAddress").addClass("is-invalid")
        var valid = false
        return
    }
}
