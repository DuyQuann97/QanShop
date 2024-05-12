

$(document).ready(() => {
    RenderTable();
    renderCategory();
});


// Xử lý hiển thị dữ liệu table 
const RenderTable = () => {
    $("#listProduct").empty();
    $.ajax({
        type: 'GET',
        url: '/Product/all',
        success: function (result) {
            if (result.length > 0) {
                result.forEach((item, index) => {
                    let r = `<tr>
                                <td class="text-center" data-id="${item.id}"><input type="checkbox" class="form-check-input checkbox-item"/></td>
                                <td class="text-center">${index +1}</td>
                                <td class="text-center">
                                    <img src="${item.imageUrl}" width=50px alt="ImageIcon" />
                                </td>
                                <td class="text-center align-middle">${item.name}</td>
                                <td class="text-center align-middle">${item.price}</td>
                                <td class="text-center align-middle">${item.category.name}</td>
                                <td class="text-center ${item.isActive ? 'bg-success' : 'bg-danger'} align-middle text-white">${item.isActive ? 'Kích hoạt' : 'Không Kích Hoạt'}</td>
                                <td class="text-center">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <a onclick="UpdateById('${item.id}')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#productModal">
                                            <i class="fas fa-info-circle"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                    $("#listProduct").append(r);
                });
            } else {
                let r = `<tr>
                            < td class="text-center" colspan = "7"">Không có dữ liệu</td>
					    </tr >` ;
                $("#listProduct").append(r);
            }
        }
    });
}

//xử lý hiển thị category ở Modal
function renderCategory() {
    $('#category').empty();
    $.ajax({
        url: '/category/all',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#category').append(`<option value="${item.id}">${item.name}</option>`);
                });
            }
            else {
                $('#category').append(`<option value="">Không có dữ liệu</option>`);
            }
        },
        error: function (error) {
            console.log(error);
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
    $("#productId").val('');
    $("#productName").val('');
    $("#productPrice").val('');
    $("#isActive").prop('checked', false);
    $("#category").prop('selectedIndex',0);
    $("#description").val('');
    $("#areaimage").empty();
    $("#areaimage").append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
                                <rect width="300" height="300" fill="#cccccc"></rect>
                                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="25px" fill="#333333">300x300</text>
                            </svg>`);
}

//xử lý sự kiện check-box true and fasle
$("#isActive").on('change', function () {
    if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
    } else {
        $(this).attr('value', 'false');
    }
})

//Create and Update: xử lý khởi tạo item và cập nhật 
function ProductModalBtn() {
    var productId = $("#productId").val();
    var productName = $("#productName").val();
    var productPrice = $("#productPrice").val();
    var isActive = $("#isActive").val();
    var category = $("#category").val();
    var description = $("#description").val();
    var file = $("#formFile")[0].files[0];

    //create form data
    var formData = new FormData();
    formData.append('file', file);
    formData.append('Id', productId);
    formData.append('Name', productName);
    formData.append('price', productPrice);
    formData.append('categoryId', category);
    formData.append('Description', description);
    formData.append('IsActive', isActive);

    if (productId === '') {
        // Create Items
        $.ajax({
            type: 'POST',
            url: '/Product/create',
            data: formData,
            contentType: false,
            processData: false,
            success: function (result) {
                //Handle the response from the controller
                if (result != null) {
                    $("#productModal").modal('hide');
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
            url: '/Product/update',
            data: formData,
            contentType: false,
            processData: false,
            success: function (result) {
                console.log(result);
                //Handle the response from the controller
                if (result != null) {
                    $("#productModal").modal('hide');
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

