const products = [
  {
    name: "iPhone 14 Pro Max",
    description:
      "iPhone 14 Pro Max is the latest and greatest smartphone from Apple.",
    price: 1099,
  },
  {
    name: "iPad Air",
    description:
      "The iPad Air is a powerful and versatile tablet that is perfect for both work and play.",
    price: 599,
  },
  {
    name: "Macbook Pro 14 Inch",
    description:
      "The Macbook Pro 14 Inch is a powerful laptop that is perfect for professionals and power users.",
    price: 1999,
  },
  {
    name: "AirPods",
    description:
      "AirPods are wireless earbuds that provide a seamless listening experience with all your Apple devices.",
    price: 179,
  },
];

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  // display product information for current slide
  const currentProduct = products[slideIndex - 1];
  const productNameElement = document.getElementById("product-name");
  const productDescriptionElement = document.getElementById(
    "product-description"
  );
  const productPriceElement = document.getElementById("product-price");

  productNameElement.textContent = currentProduct.name;
  productDescriptionElement.textContent = currentProduct.description;
  productPriceElement.textContent = "$" + currentProduct.price.toFixed(2);
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Get form and add-to-cart button elements
const form = document.getElementById("customer-info-form");
const addToCartBtn = document.getElementById("add-to-cart-btn");

// Get product name element
const productName = document.getElementById("product-name");

// Add click event listener to add-to-cart button
addToCartBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  // Check if any form fields are blank
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const cellphone = document.getElementById("cellphone").value;
  if (!name || !address || !cellphone) {
    alert("Please fill out all fields before adding to cart.");
    return;
  }

  // Get current slide index
  const slideIndex = currentSlideIndex();

  // Get product name based on current slide index
  let product;
  switch (slideIndex) {
    case 1:
      product = "iPhone 14 Pro Max";
      break;
    case 2:
      product = "iPad Air";
      break;
    case 3:
      product = "Macbook Pro 14 Inch";
      break;
    case 4:
      product = "AirPods";
      break;
    default:
      product = "Unknown product";
      break;
  }

  // Create shopping cart list item element and populate it with form input values and product name
  const cartItem = document.createElement("li");
  cartItem.innerHTML = `
    <ul>
      <li>Your Order: ${product}</li>
      <li>Price: ${getProductPrice(product)}</li>
      <li>Your name: ${name}</li>
      <li>Your address: ${address}</li>
      <li>Your cell phone number: ${cellphone}</li>
    </ul>
  `;

  // Add cart item to shopping cart list
  const shoppingCart = document.querySelector(".shopping-cart ul");
  shoppingCart.appendChild(cartItem);

  // Reset form input values
  form.reset();

  if (shoppingCart.childElementCount > 0) {
    // Add "Submit" button to shopping cart
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    shoppingCart.appendChild(submitButton);

    // Add click event listener to "Submit" button
    submitButton.addEventListener("click", () => {
      alert("Done. Time to take a rest");
    });
  }
  // Helper function to get current slide index
  function currentSlideIndex() {
    const slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].style.display === "block") {
        return i + 1;
      }
    }
  }

  // Helper function to get product price based on product name
  function getProductPrice(product) {
    switch (product) {
      case "iPhone 14 Pro Max":
        return "$1,099.00";
      case "iPad Air":
        return "$599.00";
      case "Macbook Pro 14 Inch":
        return "$1,999.00";
      case "AirPods":
        return "$179.00";
      default:
        return "Unknown price";
    }
  }
});
