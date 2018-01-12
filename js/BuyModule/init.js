$(document).ready(function () {
    var goods1 = new Goods('goods1', 8); //index.html
    var goods2 = new Goods('goods2', 9); //product.html
    var goods3 = new Goods('goods3', 4); //singlepage.html
    var basket = new Basket('live-card');

    $('#show_more').on('click', function () { //кнопка Browse All на index.html
        goods1.browseAll();
        $(this).hide();
    });


    // слушатели для кнопок добавления в корзину
    $('#goods1').on('click', '.buy_button', function () {
        var item = goods1.getProductByIndex($(this).parent().attr('data-index'));
        basket.addItem(item);
    });

    $('#goods2').on('click', '.buy_button', function () {
        var item = goods2.getProductByIndex($(this).parent().attr('data-index'));
        basket.addItem(item);
    });

    $('#goods3').on('click', '.buy_button', function () {
        var item = goods3.getProductByIndex($(this).parent().attr('data-index'));
        basket.addItem(item);
    });


    //слушатель для кнопок удаления из корзины
    $('#live-card').on('click', '.delete__button', function () {
        basket.deleteItem($(this).attr('data-index'));
    });

    $('#show-quantity-goods').change(function(){ // select для выбора количества отображаемых товаров на product.html
        goods2.render($(this).val());
    });
});