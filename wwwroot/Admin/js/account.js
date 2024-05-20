

$(document).ready(() => {
    RenderTable();
    renderCategory();
});


// Xử lý hiển thị dữ liệu table 
const RenderTable = () => {
    $("#listAccount").empty();
    $.ajax({
        type: 'GET',
        url: '/Account/all',
        success: function (result) {
            console.log(result)
            if (result.length > 0) {
                result.forEach((item, index) => {
                    let r = `<tr>
                                <td class="text-center" data-id="${item.id}"><input type="checkbox" class="form-check-input checkbox-item"/></td>
                                <td class="text-center align-middle">${item.userName}</td>
                                <td class="text-center align-middle">${item.email}</td>
                                <td class="text-center text-white ${item.emailConfirmed ? 'bg-success' : 'bg-danger'}">${item.emailConfirmed ? 'Đã xác thực' : 'Chưa xác thực'}</td>
                                <td class="text-center align-middle">${item.phoneNumber == null ? "" : item.phoneNumber}</td>
                                <td class="text-center align-middle">${item.lockoutEnabled ? 'Đã kích Hoạt' : 'Chưa kích hoạt'}</td>
                                <td class="text-center">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <a onclick="UpdateById('${item.id}')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#productModal">
                                            <i class="fas fa-info-circle"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                    $("#listAccount").append(r);
                });
            } else {
                let r = `<tr>
                            <td class="text-center" colspan = "7"">Không có dữ liệu</td>
					    </tr >` ;
                $("#listAccount").append(r);
            }
        }
    });
}


//Xử lý hiển thi update item by Id 
function UpdateById(id)
{
    $.ajax({
        type: 'GET',
        url: '/Product/byid/' + id,
        success: function (result) {
            console.log(result);
            //Handle the response from the controller
            if (result != null) {
                $("#productId").val(result.id)
                $("#productName").val(result.name);
                $("#productPrice").val(result.price);
                $("#isActive").prop('checked', result.isActive);
                $("#category").val(result.categoryId);
                $("#description").val(result.description);
                $("#formFile").val();
                $("#areaimage").empty();
                $("#areaimage").append(`<img src="${result.imageUrl}" class="img-fluid" alt="Image" />`);
                $('#productModal').modal('show');
            }
        }
    });
}

//Xử hiển thị Image ở Modal
$('#formFile').change(function () {
    $('#areaimage').empty();
    $('#areaimage').append(`<img src="${URL.createObjectURL(this.files[0])}" class="img-fluid" alt="Image" />`);
});

// Xử lý sự kiện reset form modal sau khi create/update
function resetModal()
{
    $("#userId").val('');
    $("#userName").val('');
    $("#userEmail").val('');
    $("#isEmailConfirmed").prop('checked', false);
    $("#password").val('');
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
function ProductModalBtn() {
    var userId = $("#userId").val();
    var userName = $("#userName").val();
    var userEmail = $("#userEmail").val();
    var userPassword = $("#password").val();
    var isEmailConfirmed = $("#isEmailConfirmed").is(':checked');

    //create form data
    if (userId === '') {
        // Create Items
        $.ajax({
            type: 'POST',
            url: '/Account/create',
            data: {
                userName: userName,
                email: userEmail,
                password: userPassword,
                EmailConfirmed: isEmailConfirmed
            },

            success: function (result) {
                //Handle the response from the controller
                if (result) {
                    $("#accountModal").modal('hide');
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
            url: '/Account/create',
            data: formData,
            success: function (result) {
                console.log(result);
                //Handle the response from the controller
                if (result != null) {
                    $("#accountModal").modal('hide');
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
            url: '/Product/delete',
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

