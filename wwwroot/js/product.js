

$(document).ready(() => {
    RenderProduct();
});


// Xử lý hiển thị dữ liệu table 
const RenderProduct = () => {
    $("#ShirtItems").empty();
    $("#TrouserItems").empty();
    $.ajax({
        type: 'GET',
        url: 'https://localhost:7071/Product',
        success: function (result) {
            if (result.length > 0) {
                result.forEach((item, index) => {
                    // Hiển thị Category Áo 'b6ac5592-b3bb-4353-8021-02ead73edcdf'
                    if (item.categoryId == "b6ac5592-b3bb-4353-8021-02ead73edcdf") {
                        let x = `<div class="swiper-slide">
                                <div class="product-card position-relative">
                                    <div class="image-holder">
                                        <img src="${item.imageUrl}" alt="product-item" class="img-fluid">
                                    </div>
                                    <div class="cart-concern position-absolute">
                                        <div class="cart-button d-flex">
                                            <a onclick="AddCart('${item.id}')" class="btn btn-medium btn-black">
                                                Add to Cart
                                            <svg class="cart-outline"><use xlink:href="#cart-outline"></use></svg></a>
                                        </div>
                                    </div>
                                    <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                                        <h3 class="card-title text-uppercase">
                                            <a href="${item.id}">${item.name}</a>
                                        </h3>
                                        <span class="item-price text-primary">$${item.price}</span>
                                    </div>
                                </div>
                            </div>`;
                        $("#ShirtItems").append(x);
                    }

                    // Hiển thị Category Quần 'a54129b6-d73d-4511-bf00-8ab5ea586e5f'
                    if (item.categoryId == "a54129b6-d73d-4511-bf00-8ab5ea586e5f") {
                        let x = `<div class="swiper-slide">
                                <div class="product-card position-relative">
                                    <div class="image-holder">
                                        <img src="${item.imageUrl}" alt="product-item" class="img-fluid">
                                    </div>
                                    <div class="cart-concern position-absolute">
                                        <div class="cart-button d-flex">
                                            <a onclick="AddCart('${item.id}')" class="btn btn-medium btn-black">
                                                Add to Cart
                                            <svg class="cart-outline"><use xlink:href="#cart-outline"></use></svg></a>
                                        </div>
                                    </div>
                                    <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                                        <h3 class="card-title text-uppercase">
                                            <a href="${item.id}">${item.name}</a>
                                        </h3>
                                        <span class="item-price text-primary">$${item.price}</span>
                                    </div>
                                </div>
                            </div>`;
                        $("#TrouserItems").append(x);
                    }
                });
            };
        }
    });
}

//Chức năng tìm kiếm sản phẩm

function GetProduct() {
    var searchKey = $("#inputSearch").val();
    //$.ajax({
    //    type: 'POST',
    //    url: 'https://localhost:7071/Product/',
    //    data: {
    //        keyWord: searchKey
    //    },
    //    contentType: 'application/json',
    //    dataType: "json",
    //    success: function (data) {
    //        console.log(data);
    //        //var table = $("#tblCustomers");
    //        //table.find("tr:not(:first)").remove();
    //        //$.each(customers, function (i, customer) {
    //        //    var table = $("#tblCustomers");
    //        //    var row = table[0].insertRow(-1);
    //        //    $(row).append("<td />");
    //        //    $(row).find("td").eq(0).html(customer.CustomerID);
    //        //    $(row).append("<td />");
    //        //    $(row).find("td").eq(1).html(customer.ContactName);
    //        //    $(row).append("<td />");
    //        //    $(row).find("td").eq(2).html(customer.City);
    //        //    $(row).append("<td />");
    //        //    $(row).find("td").eq(3).html(customer.Country);
    //        //});
    //    }
    //});

    $.ajax({
        type: 'GET',
        url:'https://localhost:7071/Product/search',
        data: {
            keyword: searchKey
        },
        contentType: 'application/json',
        dataType: 'json',

        success: function (data) {
            console.log(data);
        }
    });
}


