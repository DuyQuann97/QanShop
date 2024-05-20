

$(document).ready(() => {
    RenderTable();
    renderCategory();
});


// Xử lý hiển thị dữ liệu table 
const RenderTable = () => {
    $("#listRole").empty();
    $.ajax({
        type: 'GET',
        url: '/assignment/roles/all',
        success: function (result) {
            console.log(result)
            if (result.length > 0) {
                result.forEach((item, index) => {
                    let r = `<tr>
                                <td class="text-center" data-id="${item.id}"><input type="checkbox" class="form-check-input checkbox-item"/></td>
                                <td class="text-center align-middle">${item.name}</td>
                                <td class="text-center align-middle"></td>
                                <td class="text-center align-middle"></td>
                                <td class="text-center">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <a onclick="UpdateById('${item.id}')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#productModal">
                                            <i class="fas fa-info-circle"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                    $("#listRole").append(r);
                });
            }
            else {
                let r = `<tr>
                            <td class="text-center" colspan = "5">Không có dữ liệu</td>
					    </tr >` ;
                $("#listRole").append(r);
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
    $("#roleId").val('');
    $("#roleName").val('');
}

//xử lý sự kiện check-box true and fasle
$("#isEmailConfirmed").on('change', function () {
    if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
    } else {
        $(this).attr('value', 'false');
    }
})

//Create and Update: xử lý khởi tạo item và cập nhật 
function RoleModalBtn() {
    var roleId = $("#roleId").val();
    var roleName = $("#roleName").val();

    //create form data
    if (roleId === '') {
        // Create Items
        $.ajax({
            type: 'POST',
            url: '/assignment/roles/',
            data: {
                name: roleName
            },

            success: function (result) {
                //Handle the response from the controller
                if (result) {
                    $("#roleModal").modal('hide');
                    resetModal();
                    RenderTable();
                    alert("Thành công");
                }
            }
        });
    }
    else
    {
        $.ajax({
            type: 'PUT',
            url: '/assignment/roles/',
            data:
            {
                id: roleId,
                name: roleName
            },
            success: function (result) {
                //Handle the response from the controller
                if (result != null) {
                    $("#roleModal").modal('hide');
                    resetModal();
                    RenderTable();
                }
            }
        });
    }
};

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

