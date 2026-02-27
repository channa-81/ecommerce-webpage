
// ================= app.js =================
const products=[
{id:1,name:"Headphones",price:2499,img:"https://picsum.photos/300?1"},
{id:2,name:"Smart Watch",price:4999,img:"https://picsum.photos/300?2"},
{id:3,name:"Keyboard",price:1999,img:"https://picsum.photos/300?3"},
{id:4,name:"Gaming Mouse",price:1499,img:"https://picsum.photos/300?4"},
{id:5,name:"Laptop Stand",price:999,img:"https://picsum.photos/300?5"},
{id:6,name:"Bluetooth Speaker",price:2799,img:"https://picsum.photos/300?6"}
];
let cart=JSON.parse(localStorage.getItem("cart"))||[];

function renderProducts(list){
const container=document.getElementById("products");
container.innerHTML="";
list.forEach(p=>{
container.innerHTML+=`<div class='card'>
<img src='${p.img}'>
<div class='title'>${p.name}</div>
<div class='price'>₹${p.price}</div>
<button class='btn' onclick='addToCart(${p.id})'>Add to Cart</button>
</div>`;
});
}

function addToCart(id){
const item=products.find(p=>p.id===id);
cart.push(item);
save();
renderCart();
}

function removeFromCart(i){
cart.splice(i,1);
save();
renderCart();
}

function renderCart(){
const cartDiv=document.getElementById("cartItems");
const totalDiv=document.getElementById("total");
cartDiv.innerHTML="";
let total=0;
if(cart.length===0){cartDiv.innerHTML="<div class='empty'>Cart is empty</div>"}
cart.forEach((c,i)=>{
total+=c.price;
cartDiv.innerHTML+=`<div class='cart-item'>
<span>${c.name}</span>
<span>₹${c.price} <button onclick='removeFromCart(${i})'>❌</button></span>
</div>`;
});
totalDiv.innerText="Total: ₹"+total;
}

function save(){localStorage.setItem("cart",JSON.stringify(cart))}

const search=document.getElementById("search");
search.addEventListener("input",()=>{
const q=search.value.toLowerCase();
renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)));
});

renderProducts(products);
renderCart();
