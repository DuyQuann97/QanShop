
$(document).ready(() => {
    LoadData();
});

const LoadData = () => {
    $("#listUser").empty();
    $.ajax({
        type: 'GET',
        url: '/User/load-data',
        success: function (result) {
            console.log(result);
            if (result.length > 0) {
                result.forEach((row, index) => {
                    let r = `<tr>
                                <td>${index +1}</td>
                                <td>${row.userName}</td>
                                <td>${row.password}</td>
                                <td>${row.firstName}</td>
                                <td>${row.lastName}</td>
                                <td>${row.email}</td>
                                <td>${row.address}</td>
                                <td>${row.telephone}</td>
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
                    $("#listUser").append(r);
                });
            } else {
                let r = '<h4 class="text-center">Khong co du lieu</h4>';
                $("#listUser").append(r);
            }
        }
    });
}


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

////Add Product
//function AddProduct()
//{
//    $("#productLabel").text("Add Product");
//    $("#productName").val("");
//    $("#productPrice").val("");
//    $("#imageUrl").val("");
//    $("#description").val("");
//    $("#submit").text("Add Product");
//    $("#ProductModal").modal('show');
//}

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