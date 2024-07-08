

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
                    // Hiển thị Category Áo 'c3db2a52-7b83-4b61-8863-f42d8a06d389'
                    if (item.categoryId == "c3db2a52-7b83-4b61-8863-f42d8a06d389") {
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



