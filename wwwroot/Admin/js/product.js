
$(document).ready(() => {
    RenderTable();
    renderCategory();
});


// Xử lý tải dữ liệu table 
const RenderTable = () => {
    $("#listProduct").empty();
    $.ajax({
        type: 'GET',
        url: '/Product/all',
        success: function (result) {
            if (result.length > 0) {
                result.forEach((item, index) => {
                    let r = `<tr>
                                <td class="text-center" data-productid="${item.id}"><input type="checkbox" class="form-check-input checkbox-item"/></td>
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
                                        <a onclick="loadDataById('${item.id}')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#editProductModal">
                                            <i class="fas fa-info-circle"></i>
                                        </a>
                                        <a onclick="DeleteById('${item.id}')" class="btn btn-danger btn-circle btn-sm">
                                            <i class="fas fa-trash"></i>
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

    $.ajax({
        type: 'POST',
        url: '/Product/create',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log(result);
            //Handle the response from the controller
            if (result != null) {
                $("#productModal").modal('hide');
                RenderTable();
            }
        }
    });
};

//Xử render Image ở Modal
$('#formFile').change(function () {
    $('#areaimage').empty();
    $('#areaimage').append(`<img src="${URL.createObjectURL(this.files[0])}" class="img-fluid" alt="Image" />`);
});

//xử lý sự kiện check-box true and fasle
$("#isActive").on('change', function () {
    if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
    } else {
        $(this).attr('value', 'false');
    }
})
////Update Product
//function loadDataById(id) {
//    // alert(id);
//    // $("#staticBackdrop").modal('show');
//    $.ajax({
//        type: 'GET',
//        url: '/Product/LoadDataById',
//        data: { id: id },
//        success: function (result) {
//            console.log(result);
//            RenderModalUpdate(result);
//        }
//    });

//}

//function RenderModalUpdate(data) {
//    $("#ProductId").val(data.id);
//    $("#editProductName").val(data.name);
//    $("#editProductPrice").val(data.price);
//    $("#editProductImageUrl").val(data.imageUrl);
//    $("#editProductDescription").val(data.description);
//    $("#editProductCategoryID").val(data.categoryId) ;
//    $("#editProductModal").modal('show');
//}

//$("#EditBtn").click(() => {
//    var productName = $("#editProductName").val();
//    var productId = $("#ProductId").val();
//    var productPrice = $("#editProductPrice").val();
//    var imageUrl = $("#editProductImageUrl").val();
//    var categoryID = $("#editProductCategoryID").val();
//    var description = $("#editProductDescription").val();

//    $.ajax({
//        type: 'PUT',
//        url: '/Product/EditProduct',
//        data: { Id: productId, Name: productName, Description: description, ImageUrl: imageUrl, price: productPrice, CategoryId: categoryID },
//        success: function (result) {
//            // Handle the response from the controller
//            if (result != null) {
//                $("#editProductModal").modal('hide');
//                LoadData();
//            }
//        }
//    });
//});

//// Delete Product

//function DeleteById(id) {
//    // alert(id);
//    // $("#staticBackdrop").modal('show');
//    $.ajax({
//        type: 'DELETE',
//        url: '/Product/DeleteProduct',
//        data: { id: id },
//        success: function (result) {
//            LoadData();
//            alert("Xoa Thanh Cong");
//        }
//    });

//}