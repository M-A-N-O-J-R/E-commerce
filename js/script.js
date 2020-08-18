if(document.readyState=='loading')
{
    document.addEventListener("DOMContentLoaded",ready)

}
else
{
 ready();
}
function ready()
{
    var buttons=document.getElementsByClassName("cart-btn");
    for(var i=0;i<buttons.length;i++)
    {
        
        var button=buttons[i];
        button.addEventListener("click",removeCartItem);
    }
    var qntyArry=document.getElementsByClassName("cart-qnty");
    for(var j=0;j<qntyArry.length;j++)
    {
        var qntyEle=qntyArry[j];
        qntyEle.addEventListener('change',changeQnty);
    }
    var cartButtArr = document.getElementsByClassName("shop-btn");
    for(var i=0;i<cartButtArr.length;i++)
    {
        cartButt=cartButtArr[i];
        cartButt.addEventListener("click",getItemInfo);
    }
    var purchase_butt=document.getElementsByClassName("pur-btn")[0];
    console.log(purchase_butt);
    purchase_butt.addEventListener("click",purchaseItem);
}
function purchaseItem(event)
{
    alert("THANK YOU FOR YOUR ORDER "); 
    
}
function getItemInfo(event)
{
    var input=event.target;
    var shop_item=input.parentElement.parentElement;
    var img = shop_item.getElementsByClassName("shop-item-img")[0].src;
    var price=shop_item.getElementsByClassName("shop-item-price")[0].innerText;
    var title=shop_item.getElementsByClassName("shop-item-tit")[0].innerText;
    addToCart(title,price,img);
    updateCart();
}
function addToCart(title,price,img)
{
    var cart_row =document.createElement("div");
    var cart_items=document.getElementsByClassName("cart-item")[0];
    var img_src = document.getElementsByClassName("cart-img");
    for(var i=0;i<img_src.length;i++)
    {
        if(img_src[i].src==img)
        {
            alert('ITEM ALREADY ADDED');
            return 0;
        }
    }
    var row_cont=` <img class="cart-img cart-item-col" src="${img}" width="60">
    <span class="cart-price cart-price-col" >${price}</span>
    <div class="cart-qty-col">
      <input type="number" value="1" class="cart-qnty">
      <button class="cart-btn">Remove</button>
    </div>  `;
    cart_row.innerHTML=row_cont;
    cart_items.append(cart_row);
    cart_row.classList.add("cart-row");
    cart_row.getElementsByClassName("cart-btn")[0].addEventListener("click",removeCartItem);
    cart_row.getElementsByClassName("cart-qnty")[0].addEventListener("click",changeQnty);

}
function changeQnty(event)
{
 var input = event.target;
 console.log(input.value);
 if(isNaN(input.value) || input.value<0)
 {
     input.value=1;
 }
 else if(input.value==0)
 {
     input.parentElement.parentElement.remove();
 }
 updateCart();

}
function removeCartItem(event)
{
    var but_click=event.target;
    but_click.parentElement.parentElement.remove();
    updateCart();
}


function updateCart()
{
 console.log("Updated Cart");
 var cart_item =document.getElementsByClassName("cart-item")[0];
 var cart_rows = cart_item.getElementsByClassName("cart-row");
 var totElement=document.getElementsByClassName("total-prc")[0];
 totElement.innerText=0;
 var totPrice=0
 for(var i=0;i<cart_rows.length;i++)
 {
    var cart_row= cart_rows[i];
     var priceElement = cart_row.getElementsByClassName("cart-price")[0];
     var qtyElement=cart_row.getElementsByClassName("cart-qnty")[0];
     console.log(priceElement);
     console.log(qtyElement);
     var price=priceElement.innerText.replace("$","");
     var qty=qtyElement.value;
     console.log(price);
     price=parseFloat(price);
     qty=Number(qty);
     console.log(qty);
     var totElement=document.getElementsByClassName("total-prc")[0];
     console.log(totElement);
    totPrice+=(price*qty);
    
 }
 totPrice=totPrice.toPrecision(4);
 totPrice="$"+totPrice;
 totElement.innerText=totPrice;

 console.log(totElement.innerText);
}