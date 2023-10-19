export let cart = [
  {
    productId: "3",
    amount: 1,
  },
  {
    productId: "4",
    amount: 1,
  },
];





export function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


export function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}


loadCartFromLocalStorage();



export function updateCartCount() {
 const tryMe = document.querySelector(".js-products-in-cart");
  let totalAmount = 0;

  cart.forEach((item) => {
    totalAmount += item.amount;
  });

  tryMe.textContent = totalAmount;
}




export function addToCart(productId) {
  let matchingitem;
  let cartItems = 0;

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingitem = cartItem;
    }
    
  });

  if (matchingitem) {
    matchingitem.amount += 1;
    
  } else {
    cart.push({
      productId: productId,
      amount: 1
    })
    
    
  }
  updateCartCount();
  saveCartToLocalStorage();
  
}  
 




export function updateCartPrice() {
  const finalePrice = document.querySelector(".final-price");
  const subTotalPrice = document.querySelector(".subtotal-price");

  let cartProductContainer = document.querySelector(".products");
  let products = cartProductContainer.getElementsByClassName("product");
  let total = 0;
  Array.from(products).forEach((product) => {
    let priceContainer = product
      .querySelector(".new-price")
      .textContent.replace("€", "");
    let quantity = product.querySelector(".quantity-input").value;
    total = total + priceContainer * quantity;
  });
  finalePrice.innerHTML =  "€ " + total;
  subTotalPrice.innerHTML = "€ " + total;
  saveCartToLocalStorage();
}




export function changeQuantity() {
  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    const minusButton = product.querySelector(".minus-btn");
    const plusButton = product.querySelector(".plus-btn");
    const quantityInput = product.querySelector(".quantity-input");
    const productId = quantityInput.getAttribute("data-product-id");

    quantityInput.addEventListener("change", (event) => {
      let quantity = parseInt(event.target.value);
      if (isNaN(quantity) || quantity <= 0) {
        quantity = 1;
        event.target.value = quantity;
      }
      updateCartQuantity(productId, quantity);
      updateCartPrice();
      updateCartCount();
      saveCartToLocalStorage();
      
    });

    minusButton.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateCartQuantity(productId, quantity);
        updateCartPrice();
        updateCartCount();
        saveCartToLocalStorage();
        
      }
    });

    plusButton.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      quantity++;
      quantityInput.value = quantity;
      updateCartQuantity(productId, quantity);
      updateCartPrice();
      updateCartCount();
      saveCartToLocalStorage();
      
    });
  });
}

function updateCartQuantity(productId, quantity) {
  const cartItemIndex = cart.findIndex((item) => item.productId === productId);
  if (cartItemIndex !== -1) {
    // If the item exists in the cart, update its quantity
    cart[cartItemIndex].amount = quantity;
  } else {
    // If the item does not exist, add a new item to the cart
    cart.push({ productId, amount: quantity });
  }
}





 export function deleteMe(productId) {
    const newCart = [];

    cart.forEach(cartItem => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem)
      }

      
    })
    cart = newCart;
    saveCartToLocalStorage();
    
}

document.addEventListener("DOMContentLoaded", function () {
  const mainSignUpBtn = document.querySelector(".signup-btn");
  const popup = document.querySelector(".popup");
  const body = document.body;
  const signUpCloseEl = document.querySelector(".close-btn");

  function signUp() {
    mainSignUpBtn.addEventListener("click", () => {
      popup.style.display = "block";
      body.style.overflow = "hidden";
    });
  }

  signUp();

  signUpCloseEl.addEventListener("click", () => {
    popup.style.display = "none";
    body.style.overflow = "scroll";
  });
});

