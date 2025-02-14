// const products = [
//     { id: 1, name: "P1", price: 30 },
//     { id: 2, name: "P2", price: 50 },
//     { id: 3, name: "P3", price: 40 },
// ];
let products = []
//fetch is an inbuilt function
fetch("products.json")
    .then((response) => response.json())
    .then((data) => (showProducts(data)))

const cart = {};
const addToCart = (id) => {
    if (!cart[id])
        cart[id] = 1;
    showCart();
};
const decrement = (id) => {
    cart[id] = cart[id] - 1;
    showCart();
}
const increment = (id) => {
    cart[id] = cart[id] + 1;
    showCart();
    // items.innerHTML=100;
}
const deletecart = (id) => {
    delete cart[id]
    showCart();
}
const showTotal = () => {
    // sum by default will be 0;
    // in reduce first variable will hold 0 and second variable will hold value
    let total = products.reduce((sum, value) => {
        return sum + value.price * (cart[value.id] ?? 0);//?? is nullish opertor. it excecutes when cart[valu.id] is false
    }, 0);
    order.innerHTML = total;

};
const displayCart = () => {
    cartBox.style.display = "block";
    productBox.style.display = "none"
};
const hideCart = () => {
    cartBox.style.display = "none";
    productBox.style.display = "block";
};
const showHome = () =>{
    productBox.style.display = "block";
}
const showCart = () => {
    let count = Object.keys(cart).length

    items.innerHTML = count
    showTotal()
    let str = "";
    products.map((value) => {
        if (cart[value.id]) {
            str += `<div>
        ${value.id}-${value.name}-${value.price}-
        <button onclick='decrement(${value.id})'>-</button>
        ${cart[value.id]}
        <button onclick='increment(${value.id})'>+</button>
        -${value.price * cart[value.id]}-
        <button onclick='deletecart(${value.id})'>delete</button>
        </div>`;
        }
    });
    divCart.innerHTML = str;
};
const showProducts = (data) => {
    products = data
    let str = "<div class='row'>";
    products.map((value) => {
      str += `
      <div class='box'>
      <img src='${value.url}'>
      <h3>${value.name}</h3>
      <p>${value.desc}</p>
      <h4>${value.price}</h4>
      <button onclick='addToCart(${value.id})'>Add to Cart</button>
      </div>
      `;
    });
    divProducts.innerHTML = str+"</div>";
  };