
$(document).ready(() => {
    LoadData();
});

const LoadData = () => {
    $("#listProduct").empty();
    $.ajax({
        type: 'GET',
        url: '/Product/load-data',
        success: function (result) {
            if (result.length > 0) {
                result.forEach((row, index) => {
                    let r = `<tr>
                                <td>${index +1}</td>
                                <td hidden><input type="text" class="form-control" id="productId" value="${row.id}" placeholder=""></td>
                                <td>${row.name}</td>
                                <td>
                                    <img src="${row.imageUrl}" width=50px alt="ImageIcon" />
                                </td>
                                <td>${row.price}</td>
                                <td>
                                    <div class="d-flex gap-2">
                                        <a onclick="loadDataById('${row.id}')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#editProductModal">
                                            <i class="fas fa-info-circle"></i>
                                        </a>
                                        <a onclick="DeleteById('${row.id}')" class="btn btn-danger btn-circle btn-sm">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                    $("#listProduct").append(r);
                });
            } else {
                let r = '<h4 class="text-center">Khong co du lieu</h4>';
                $("#listProduct").append(r);
            }
        }
    });
}


$("#submit").click(() => {
    var productName = $("#productName").val();
    var productPrice = $("#productPrice").val();
    var imageUrl = $("#imageUrl").val();
    var categoryID = $("#categoryID").val();
    var description = $("#description").val();

    $.ajax({
        type: 'POST',
        url: '/Product/AddProduct',
        data: { Name: productName, Description: description, ImageUrl: imageUrl, price: productPrice, CategoryId: categoryID },
        success: function (result) {
            // Handle the response from the controller
            if (result != null) {
                $("#productModal").modal('hide');
                LoadData();
            }
        }
    });
});

//Add Product
function AddProduct()
{
    $("#productLabel").text("Add Product");
    $("#productName").val("");
    $("#productPrice").val("");
    $("#imageUrl").val("");
    $("#description").val("");
    $("#submit").text("Add Product");
    $("#ProductModal").modal('show');
}

//Update Product
function loadDataById(id) {
    // alert(id);
    // $("#staticBackdrop").modal('show');
    $.ajax({
        type: 'GET',
        url: '/Product/LoadDataById',
        data: { id: id },
        success: function (result) {
            console.log(result);
            RenderModalUpdate(result);
        }
    });

}

function RenderModalUpdate(data) {
    $("#ProductId").val(data.id);
    $("#editProductName").val(data.name);
    $("#editProductPrice").val(data.price);
    $("#editProductImageUrl").val(data.imageUrl);
    $("#editProductDescription").val(data.description);
    $("#editProductCategoryID").val(data.categoryId) ;
    $("#editProductModal").modal('show');
}

$("#EditBtn").click(() => {
    var productName = $("#editProductName").val();
    var productId = $("#ProductId").val();
    var productPrice = $("#editProductPrice").val();
    var imageUrl = $("#editProductImageUrl").val();
    var categoryID = $("#editProductCategoryID").val();
    var description = $("#editProductDescription").val();

    $.ajax({
        type: 'PUT',
        url: '/Product/EditProduct',
        data: { Id: productId, Name: productName, Description: description, ImageUrl: imageUrl, price: productPrice, CategoryId: categoryID },
        success: function (result) {
            // Handle the response from the controller
            if (result != null) {
                $("#editProductModal").modal('hide');
                LoadData();
            }
        }
    });
});

// Delete Product

function DeleteById(id) {
    // alert(id);
    // $("#staticBackdrop").modal('show');
    $.ajax({
        type: 'DELETE',
        url: '/Product/DeleteProduct',
        data: { id: id },
        success: function (result) {
            LoadData();
            alert("Xoa Thanh Cong");
        }
    });

}