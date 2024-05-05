
$(document).ready(() => {
    LoadData();
});

const LoadData = () => {
    $("#listUser").empty();
    $.ajax({
        type: 'GET',
        url: '/User/load-data',
        success: function (result) {
            if (result.length > 0) {
                result.forEach((row, index) => {
                    let r = `<tr>
                                <td>${index + 1}</td>
                                <td>${row.userName}</td>
                                <td>${row.password}</td>
                                <td>${row.firstName}</td>
                                <td>${row.lastName}</td>
                                <td>${row.email}</td>
                                <td>${row.address}</td>
                                <td>${row.telephone}</td>
                                <td>
                                    <div class="d-flex gap-2">
                                        <a  onclick="LoadDataById('${row.id}')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#editUserModal">
                                            <i class="fas fa-info-circle"></i>
                                        </a>
                                        <a onclick="DeleteById('${row.id}')" class="btn btn-danger btn-circle btn-sm">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                    $("#listUser").append(r);
                });
            } else {
                let r = '<h4 class="text-center">Khong co du lieu</h4>';
                $("#listUser").append(r);
            }
        }
    });
}

// Add User
$("#submit").click(() => {
    var userName = $("#userName").val();
    var userPassword = $("#userPassword").val();
    var userFirstName = $("#userFirstName").val();
    var userLastName = $("#userLastName").val();
    var userEmail = $("#userEmail").val();
    var userAddDress = $("#userAddDress").val();
    var userTelephone = $("#userTelephone").val();

    $.ajax({
        type: 'POST',
        url: '/User/AddUser',
        data: {
            UserName: userName,
            Password: userPassword,
            FirstName: userFirstName,
            LastName: userLastName,
            Email: userEmail,
            Address: userAddDress,
            Telephone: userTelephone
        },
        success: function (result) {
            // Handle the response from the controller
            if (result != null) {
                $("#AddUserModal").modal('hide');
                LoadData();
            }
        }
    });
});

//Update User
function LoadDataById(id) {
    console.log(id);
    $.ajax({
        type: 'GET',
        url: '/User/LoadDataById',
        data: { id: id },
        success: function (result) {
            console.log(result);
            RenderModalUpdate(result);
        }
    });

}

function RenderModalUpdate(data) {
    $("#userId").val(data.id);
    $("#editUserName").val(data.userName);
    $("#editUserPassword").val(data.password);
    $("#editUserFirstName").val(data.firstName);
    $("#editUserLastName").val(data.lastName);
    $("#editUserEmail").val(data.email);
    $("#editUserAddDress").val(data.address);
    $("#editUserTelephone").val(data.telephone);
    $("#editUserModal").modal('show');
}

$("#EditUserBtn").click(() => {
    var userId = $("#userId").val();
    var userName = $("#editUserName").val();
    var userPassword = $("#editUserPassword").val();
    var userFirstName = $("#editUserFirstName").val();
    var userLastName = $("#editUserLastName").val();
    var userEmail = $("#editUserEmail").val();
    var userAddDress = $("#editUserAddDress").val();
    var userTelephone = $("#editUserTelephone").val();

    $.ajax({
        type: 'PUT',
        url: '/User/EditUser',
        data: {
            Id:userId,
            UserName: userName,
            Password: userPassword,
            FirstName: userFirstName,
            LastName: userLastName,
            Email: userEmail,
            Address: userAddDress,
            Telephone: userTelephone
        },
        success: function (result) {
            // Handle the response from the controller
            if (result != null) {
                $("#editUserModal").modal('hide');
                LoadData();
            }
        }
    });
});

// Delete User

function DeleteById(id) {
    $.ajax({
        type: 'DELETE',
        url: '/User/DeleteUser',
        data: { id: id },
        success: function (result) {
            LoadData();
            alert("Xoa Thanh Cong");
        }
    });

}