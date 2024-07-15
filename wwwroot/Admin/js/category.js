
$(document).ready(() => {
    RenderTable();
});

const RenderTable = () => {
    $("#listCategories").empty();
    $.ajax({
        type: 'GET',
        url: '/Category/load-data',
        success: function (result) {
            if (result.length > 0) {
                result.forEach((item, index) => {
                    let r = `<tr>
                                <td class="text-center" data-id="${item.id}"><input type="checkbox" class="form-check-input checkbox-item"/></td>
                                <td class="text-center" >${index +1}</td>
                                <td class="text-center" >${item.id}</td>
                                <td class="text-center" >${item.name}</td>
                                <td class="text-center" >
                                    <div class="d-flex gap-2 justify-content-center">
                                        <a onclick="UpdateById('${item.id}')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#categoryModal">
                                            <i class="fas fa-info-circle"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                    $("#listCategories").append(r);
                });
            } else {
                let r = '<h4 class="text-center">Khong co du lieu</h4>';
                $("#listCategories").append(r);
            }
        }
    });
}

//Xử lý hiện thị update
function UpdateById(id) {
    $.ajax({
        type: 'GET',
        url: '/Category/byid/' + id,
        success: function (result) {
            console.log(result);
            if (result != null)
            {
                $("#categoryId").val(result.id);
                $("#addCategoryName").val(result.name);
            }
        }
    });

}

// Xử lý sự kiện reset form modal sau khi create/update
function resetModal() {
    $("#categoryId").val('');
    $("#addCategoryName").val('');
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
function CategoryModalBtn() {
    var categoryId = $("#categoryId").val();
    var categoryName = $("#addCategoryName").val();

    //create form data
    var formData = new FormData();
    formData.append('Id', categoryId);
    formData.append('Name', categoryName);

    if (categoryId === '') {
        // Create Items
        $.ajax({
            type: 'POST',
            url: '/Category/Add',
            data: formData,
            contentType: false,
            processData: false,
            success: function (result) {
                //Handle the response from the controller
                if (result != null) {
                    $("#categoryModal").modal('hide');
                    resetModal();
                    RenderTable();
                    alert("Thành công");
                }
            }
        });
    }
    else {
        $.ajax({
            type: 'PUT',
            url: '/Category/Edit',
            data: formData,
            contentType: false,
            processData: false,
            success: function (result) {
                console.log(result);
                //Handle the response from the controller
                if (result != null) {
                    $("#categoryModal").modal('hide');
                    resetModal();
                    RenderTable();
                }
            }
        });
    }
};

//Xử lý sự kiện all check an all uncheck cho Box
$('#allCheckbox').change(function () {
    if (this.checked) {
        $('.checkbox-item').prop('checked', true);
    } else {
        $('.checkbox-item').prop('checked', false);
    }
})

// Delete Category
function Deleted() {
    var listItems = [];

    $('.checkbox-item').each(function () {
        if (this.checked) {
            listItems.push($(this).closest('td').data('id'))
        }
    })

    if (listItems.length > 0) {
        $.ajax({
            type: 'DELETE',
            url: '/Category/delete',
            data: { ids: listItems },
            success: function (result) {
                alert('thành công');
                RenderTable();
            }
        });
    } else {
        alert('Vui lòng chọn Item để xóa');
    }
}