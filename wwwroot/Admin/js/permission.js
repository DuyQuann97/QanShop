
$(document).ready(() => {
    RenderTable();
});


// Xử lý hiển thị dữ liệu table 
const RenderTable = () => {
    $("#listPermission").empty();
    $.ajax({
        type: 'GET',
        url: '/assignment/permission/all',
        success: function (result) {
            if (result.length > 0) {
                result.forEach((item, index) => {
                    let r = `<tr>
                                <td class="text-center" data-id="${item.userId}"><input type="checkbox" class="form-check-input checkbox-item"/></td>
                                <td class="text-center align-middle">${item.userName}</td>
                                <td class="text-center align-middle">${item.email}</td>
                                <td class="text-center align-middle">${item.roleName}</td>
                                <td class="text-center align-middle"></td>
                                <td class="text-center">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <a onclick="UpdateById('${item.userId}','${item.roleId}')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#productModal">
                                            <i class="fas fa-info-circle"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                    $("#listPermission").append(r);
                });
            }
            else {
                let r = `<tr>
                            <td class="text-center" colspan = "5">Không có dữ liệu</td>
					    </tr >` ;
                $("#listPermission").append(r);
            }
        },

        error: function (er)
        {
            console.log(er);
        }
    });
}


//Xử lý hiển thi update item by Id 
function UpdateById(id)
{
    $.ajax({
        type: 'GET',
        url: '/assignment/roles/' + id,
        success: function (result) {
            console.log(result);
            //Handle the response from the controller
            if (result != null) {
                $("#roleId").val(result.id)
                $("#roleName").val(result.name);
                $('#roleModal').modal('show');
            }
        }
    });
}


// Xử lý sự kiện reset form modal sau khi create/update
function resetModal()
{
    $("#userName").val('0');
    $("#roleName").val('0');
}


//Create and Update: xử lý khởi tạo item và cập nhật 
function PermissionModalBtn() {
    var userid = $("#userName").val();
    var roleid = $("#roleName").val();
// Create Items
    $.ajax({
        type: 'POST',
        url: '/assignment/permission/create',
        data: {
            userId: userid,
            roleId: roleid
        },

        success: function (result) {
            //Handle the response from the controller
            if (result) {
                $("#permissionModal").modal('hide');
                resetModal();
                RenderTable();
                alert("Thành công");
            }
        },

        error: function (error) {
            alert('Quyền đã tồn tại');
            $('#permissionModal').modal('hide');
        }
    });
    //else
    //{
    //    $.ajax({
    //        type: 'PUT',
    //        url: '/assignment/roles/',
    //        data:
    //        {
    //            id: roleId,
    //            name: roleName
    //        },
    //        success: function (result) {
    //            //Handle the response from the controller
    //            if (result != null) {
    //                $("#roleModal").modal('hide');
    //                resetModal();
    //                RenderTable();
    //            }
    //        }
    //    });
    //}
};

// Xử lý Render Account and Role trong Modal
$('#permissionModal').on('show.bs.modal', function (e) {
    renderAccounts();
    renderRoles();
});
function renderAccounts() {
    $.ajax({
        url: '/account/all',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                $('#userName').empty();
                $('#userName').append(`
                            <option value="0">Chọn tài khoản</option>
                        `);
                data.forEach((item, index) => {
                    $('#userName').append(`
                            <option value="${item.id}">${item.userName}</option>
                        `);
                });
            } else {
                $('#userName').append(`
                            <option value="-1">Không có dữ liệu</option>
                        `);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

}
function renderRoles() {
    $.ajax({
        url: '/assignment/roles/all',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                $('#roleName').empty();
                $('#roleName').append(`<option value="0">Chọn Vai Trò</option>`);
                data.forEach((item, index) => {
                    $('#roleName').append(`<option value="${item.id}">${item.name}</option>`);
                });
            }
            else {
                $('#roleName').append(`
                            <option value="-1">Không có dữ liệu</option>
                        `);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

//Xử lý sự kiện all check an all uncheck cho Box
$('#allCheckbox').change(function ()
{
    if (this.checked) {
        $('.checkbox-item').prop('checked', true);
    } else
    {
        $('.checkbox-item').prop('checked', false);
    }
})

//Delete by Id: xử lý xóa theo danh sách
function Deleted()
{
    var listItems = [];

    $('.checkbox-item').each(function ()
    {
        if (this.checked)
        {
            listItems.push($(this).closest('td').data('id'))
        }
    })

    if (listItems.length > 0) {
        $.ajax({
            type: 'DELETE',
            url: '/assignment/roles/',
            data: { ids: listItems },
            success: function (result) {
                alert('thành công');
                RenderTable();
            }
        });
    } else
    {
        alert('Vui lòng chọn Item để xóa');
    }
}

