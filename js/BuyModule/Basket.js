function Basket(id) {
    this.id = id;
    this.items = [];
    this.countGoods = 0;
    this.totalPrice = 0;
    this.loadBasketItems();
}

Basket.prototype.loadBasketItems = function () {
    $.ajax({
        type: 'GET',
        url: './basket.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            for (var itemKey in data.basket){
                this.items.push(data.basket[itemKey]);
            }
            this.render();
            this.refreshItemList();
        }
    });
};

Basket.prototype.render = function () {
    $('#' + this.id).append('<div class="cart-menu menu">' +
        '                         <ul id="goods-in-cart"></ul>' +
        '                         <div class="total">' +
        '                              <span>TOTAL</span>' +
        '                              <div id="total-price"></div>' +
        '                         </div>' +
        '                         <a href="checkout.html">Checkout</a>' +
        '                         <a href="shoppingcart.html">Go to cart</a>' +
        '                     </div>')
                    .append('<div id="' + this.id + '__quantity-items"></div>');

};

Basket.prototype.renderClearBacket = function () {
    $('#' + this.id).empty()
                    .append('<h6>Корзина пуста</h6>')
};

Basket.prototype.refreshItemList = function () {
    var $container = $('#goods-in-cart');
    $container.empty();
    for (var itemKey in this.items){
        var $item = $('<li> /', {
            class: 'live-card__item'
        });

        var $itemImg = $('<a href="singlepage.html"><img  class="cart-goods-img" src="'+ this.items[itemKey].img +'" alt="Goods photo"></a>');

        var $itemCaption = $('<div class="live-card__item-caption">' +
            '                       <h6><a href="singlepage.html">' + this.items[itemKey].title + '</a></h6>' +
            '                       <div class="stars"><img src="img/stars.png" alt="stars"></div>' +
            '                       <div class="goods-quantity">' + this.items[itemKey].quantity + '</div> X' +
            '                       <div class="goods-price">$' + (this.items[itemKey].price / 100).toFixed(2) + '</div>' +
            '                 </div>');
        var $delete = $('<div class="delete"><button type="button" class="delete__button" data-index="' + itemKey
            + '"></button></div>');

        $item.append($itemImg, $itemCaption, $delete);
        $container.append($item);
    }
    this.calculateTotalPriceAndQuantity();
};

Basket.prototype.calculateTotalPriceAndQuantity = function () {
    this.totalPrice = 0;
    this.countGoods = 0;
    for (var itemKey in this.items){
        this.totalPrice += this.items[itemKey].price * this.items[itemKey].quantity;
        this.countGoods += this.items[itemKey].quantity;
    }
    this.setTotalPrice();
    this.setQuantity();
};

Basket.prototype.setTotalPrice = function () {
    $('#total-price').text('$' + (this.totalPrice / 100).toFixed(2));
};

Basket.prototype.setQuantity = function () {
    var $quantity = $('#live-card__quantity-items');
    if(this.countGoods === 0){
        $quantity.hide();
    }else{
        $quantity.text(this.countGoods);
        $quantity.show();
    }
};

Basket.prototype.addItem = function (item) {
    for(var itemKey in this.items){
        if(item.id_product === this.items[itemKey].id_product){
            this.items[itemKey].quantity++;
            this.refreshItemList();
            return;
        }
    }
    item.quantity = 1;
    this.items.push(item);
    this.refreshItemList();

};

Basket.prototype.deleteItem = function (index) {
    this.items.splice(index, 1);
    this.refreshItemList();
}