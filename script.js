if (document.readyState=='loading'){
  document.addEventListener('DOMContentLoaded', ready)
}else{
  ready()
}
function ready(){
  var removeCartItemButtons = document.getElementsByClassName('btnj')
  console.log(removeCartItemButtons)
  for ( var i = 0; i<removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons [i]
    button.addEventListener('click', removeCartItem)
  }
  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i=0; i<quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }
  var addToCartButtons = document.getElementsByClassName('button')
  for (var i=0; i<addToCartButtons.length; i++){
    var button= addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }
  document.getElementsByClassName('betalning')[0].addEventListener('click', betalningClicked)
}
function betalningClicked (){
  alert('Tack för köpet')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}
function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}
function quantityChanged(event){
  var input= event.target
  if(isNaN(input.value) || input.value <= 0){
    input.value=1
  }
  updateCartTotal()
}
function addToCartClicked(event){
  var button= event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('title')[0].innerText
  var price = shopItem.getElementsByClassName('price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('img')[0].src
  addItemToCart(title, price, imageSrc )
  updateCartTotal()
}
function addItemToCart(title, price, imageSrc){
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i< cartItemNames.length; i++){
    if(cartItemNames[i].innerText === title){
      alert("Du har redan lagt till denna vara")
      return
    }
  }
  var cartRowContents = `
  <div class="cart-item cart-column">
  <img class="cart-item-image" src="${imageSrc}">
  <span class="cart-item-title">${title}</span>
</div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
    <input type="number" value="1" class="cart-quantity-input">
    <button type"button" class="btn cart-quantity-button btnj"> Ta bort </button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btnj')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

function updateCartTotal(){
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  total = 0
  for (var i = 0; i< cartRows.length; i++){
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('kr', ''))
    var quantity = quantityElement.value
    total = total + (price*quantity)
  }
  total = Math.round(total*100) / 100
  document.getElementsByClassName('cart-summan-price')[0].innerText = total + 'kr'
}
