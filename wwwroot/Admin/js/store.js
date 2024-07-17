

$(document).ready(() => {
    RenderTable();
});


// Xử lý hiển thị dữ liệu table 
const RenderTable = () => {
    $("#listStore").empty();
    $.ajax({
        type: 'GET',
        url: '/Store/all',
        success: function (result) {
            console.log(result);
            if (result.length > 0) {
                result.forEach((item, index) => {
                    let r = `<tr>
                                <td class="text-center" data-id="${item.id}"><input type="checkbox" class="form-check-input checkbox-item"/></td>                               
                                <td class="text-center align-middle">${item.name}</td>
                                <td class="text-center align-middle">${item.address}</td>
                                <td class="text-center align-middle">${item.phoneNumber}</td>
                                <td class="text-center align-middle">${item.timeOpen} - ${item.timeClose}</td>
                                <td class="text-center">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <a onclick="UpdateById('${item.id}')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#storeModal">
                                            <i class="fas fa-info-circle"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                    $("#listStore").append(r);
                });
            } else {
                let r = `<tr>
                            <td class="text-center" colspan ="6"> Chưa có cửa hàng nào !!</td>
					    </tr >` ;
                $("#listStore").append(r);
            }
        }
    });
}


//Xử lý hiển thi update item by Id 
function UpdateById(id)
{
    $.ajax({
        type: 'GET',
        url: '/Store/byid/' + id,
        success: function (result) {
            console.log(result);
            //Handle the response from the controller
            if (result != null) {
                $("#storeId").val(result.id)
                $("#storeName").val(result.name);
                $("#storeAddress").val(result.address);
                $("#storePhone").val(result.phoneNumber);
                $("#storeTimeOpen").val(result.timeOpen);
                $("#storeTimeClose").val(result.timeClose);
                $("#storeNote").val(result.note);
                $('#storeModal').modal('show');
            }
        }
    });
}

// Xử lý sự kiện reset form modal sau khi create/update
function resetModal()
{
    $("#storeId").val('');
    $("#storeName").val('');
    $("#storeAddress").val('');
    $("#storePhone").val('');
    $("#storeTimeOpen").val('');
    $("#storeTimeClose").val('');
    $("#storeNote").val('');
}


//Create and Update: xử lý khởi tạo item và cập nhật 
function StoreModalBtn() {
    var storeId = $("#storeId").val();
    var storeName = $("#storeName").val();
    var storeAddress = $("#storeAddress").val();
    var storePhone = $("#storePhone").val();
    var storeTimeOpen = $("#storeTimeOpen").val();
    var storeTimeClose = $("#storeTimeClose").val();
    var storeNote = $("#storeNote").val();

    //create form data
    var formData = new FormData();
    formData.append('Id', storeId);
    formData.append('Name', storeName);
    formData.append('Address', storeAddress);
    formData.append('PhoneNumber', storePhone);
    formData.append('TimeOpen', storeTimeOpen);
    formData.append('TimeClose', storeTimeClose);
    formData.append('Note', storeNote);

    if (storeId === '') {
        // Create Items
        $.ajax({
            type: 'POST',
            url: '/Store/create',
            data: formData,
            contentType: false,
            processData: false,
            success: function (result) {
                //Handle the response from the controller
                if (result != null) {
                    $("#storeModal").modal('hide');
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
            url: '/Store/edit',
            data: formData,
            contentType: false,
            processData: false,
            success: function (result) {
                console.log(result);
                //Handle the response from the controller
                if (result != null) {
                    $("#storeModal").modal('hide');
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
            url: '/Store/delete',
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

