import {
  cart,
  deleteMe,
//   deletebtn,
  updateCartPrice,
  changeQuantity,
} from "../cart/cart.js";
import { allProducts } from "../data/all-products.js";






let cartSummaryHTML = '';

cart.forEach(cartItem => {
    
        const productId = cartItem.productId;

        
        let matchingProduct;

        allProducts.forEach((product) => {
          if (product.productId === productId) {
            matchingProduct = product;
          }
        });

        cartSummaryHTML += `
    <div class="product" id="product${matchingProduct.productId}">
        <div class="product-image">
            <img src="${matchingProduct.productImage}" alt="Silver Ring">
        </div>
        <div class="product-details">
            <h2 class="product-title">${matchingProduct.productName}</h2>
            <div class="quantity">
                <p class="quantity-label">Amount:</p>
                <button class="quantity-btn minus-btn" data-product-id="${matchingProduct.productId}">-</button>
                <input class="quantity-input" data-product-id="${matchingProduct.productId}"  type="text" value="${cartItem.amount}">
                <button class="quantity-btn plus-btn" data-product-id="${matchingProduct.productId}" >+</button>
            </div>
            <div class="size">
                <label for="size">Size:</label>
                <select id="size" name="size">
                    <option value="50">Size 50</option>
                    <option value="53">Size 53</option>
                    <option value="60">Size 60</option>
                </select>
            </div>
        </div>
        <div class="product-price">
            <div class="discount">
                <p class="discount-percentage">${matchingProduct.status}</p>
            </div>
            <div class="price">
                <p class="new-price">${matchingProduct.productPrice} </p>
            </div>
        </div>
        <div class="delete-logo js-deleteBtn" data-product-id="${matchingProduct.productId}">
            <i class="fa fa-trash-o" style="font-size:24px"></i>
        </div>
    </div>
    `;
    
    
})


document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;


// activating the delete button
const deleteButton = document.querySelectorAll(".js-deleteBtn");

deleteButton.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        deleteMe(productId);
        
        const container = document.getElementById(
          `product${productId}`
        );
        container.remove();
        updateCartPrice();
    })
})



// deletebtn();
updateCartPrice();
changeQuantity();


