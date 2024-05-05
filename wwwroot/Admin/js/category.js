
$(document).ready(() => {
    LoadData();
});

const LoadData = () => {
    $("#listCategories").empty();
    $.ajax({
        type: 'GET',
        url: '/Category/load-data',
        success: function (result) {
            if (result.length > 0) {
                result.forEach((row, index) => {
                    let r = `<tr>
                                <td>${index +1}</td>
                                <td>${row.id}</td>
                                <td>${row.name}</td>
                                <td>
                                    <div class="d-flex gap-2">
                                        <a onclick="loadDataById('${row.id}')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#editCategoryModal">
                                            <i class="fas fa-info-circle"></i>
                                        </a>
                                        <a onclick="DeleteById('${row.id}')" class="btn btn-danger btn-circle btn-sm">
                                            <i class="fas fa-trash"></i>
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

//Add Category
$("#submit").click(() => {
    var categoryName = $("#addCategoryName").val();

    $.ajax({
        type: 'POST',
        url: '/Category/AddCategory',
        data: {
            Name: categoryName
        },
        success: function (result) {
            // Handle the response from the controller
            if (result != null) {
                $("#addCategoryModal").modal('hide');
                LoadData();
            }
        }
    });
});


//Update Category
function loadDataById(id) {
    $.ajax({
        type: 'GET',
        url: '/Category/LoadDataById',
        data: { id: id },
        success: function (result) {
            RenderModalUpdate(result);
        }
    });

}

function RenderModalUpdate(data) {
    $("#editCategoryName").val(data.name);
    $("#categoryId").val(data.id);
    $("#editCategoryModal").modal('show');
}

$("#edit").click(() => {
    var categoryId = $("#categoryId").val();
    var categoryName = $("#editCategoryName").val();

    $.ajax({
        type: 'PUT',
        url: '/Category/EditCategory',
        data: {
            id: categoryId,
            Name: categoryName
        },
        success: function (result) {
            // Handle the response from the controller
            if (result != null) {
                $("#editCategoryModal").modal('hide');
                LoadData();
            }
        }
    });
});

// Delete Category

function DeleteById(id) {
    $.ajax({
        type: 'DELETE',
        url: '/Category/DeleteCategory',
        data: { id: id },
        success: function (result) {
            LoadData();
            alert("Xoa Thanh Cong");
        }
    });

}