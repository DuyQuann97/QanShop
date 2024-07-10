

$(document).ready(() => {
    RenderTable();
});


// Xử lý hiển thị dữ liệu table 
const RenderTable = () => {
    $("#cartItem").empty();
    $('#totalPrice').empty();
    $.ajax({
        type: 'GET',
        url: 'https://localhost:7071/Cart',
        success: function (result) {
            if (result.length > 0) {
                var tolal = 0;
                result.forEach((item, index) => {
                    tolal += (item.product.price * item.quantity);
                    let r = `<tr>
                                <td>
                                    <div class="product-item">
                                        <a class="product-thumb" href="#"><img src="${item.product.imageUrl}" alt="Product"></a>
                                        <div class="product-info">
                                            <h4 class="product-title"><a href="#">${item.product.name}</a></h4><span><em>Size:</em> 10.5</span><span><em>Color:</em> Dark Blue</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="count-input">${item.quantity}</div>
                                </td>
                                <td class="text-center text-lg text-medium">$ ${item.product.price * item.quantity}</td>
                                <td class="text-center text-lg text-medium">$0</td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-outline-danger" onclick="DeleteCart('${item.id}')">Remove</button>
                                </td>
                            </tr>`;
                    $("#cartItem").append(r);
                });
                $('#totalPrice').append(`Subtotal: <span class="text-medium">$${tolal}</span>`);
            }
            else {
                let r = `<tr>
                            <td class="text-center" colspan = "5">Chưa có sản phẩm</td>
					    </tr >` ;
                $("#cartItem").append(r);
            }
        }
    });
}
// Xử lý tính tồng Giá Tiền
function UpdateCart()
{
    RenderTable();
}

//Xử Lý thêm giỏ hàng
function AddCart(id) {
    var item = {
        productId: id,
        quantity: 1
    }
    $.ajax({
        url: 'https://localhost:7071/Cart/create',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(item),
        success: function (result) {
            alert('thành công');
        }
    });
}

// xử lý xóa item khỏi cart
function DeleteCart(id) {
    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:7071/Cart/delete/' + id,
        success: function (result) {
            alert('thành công');
            RenderTable();
        }
    });
}


