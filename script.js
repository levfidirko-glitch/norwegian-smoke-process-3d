const products = [

{
id:1,
name:{
ru:"Копчёная форель",
en:"Smoked Trout",
kz:"Ысталған форель"
},
cat:"fish",
category:{
ru:"КОПЧЁНАЯ РЫБА",
en:"SMOKED FISH",
kz:"ЫСТАЛҒАН БАЛЫҚ"
},
weight:"200 г",
price:8900,
image:"images/salmon.jpeg"
},


{
id:2,
name:{
ru:"Копчёный лосось",
en:"Smoked Salmon",
kz:"Ысталған албырт"
},
cat:"fish",
category:{
ru:"КОПЧЁНАЯ РЫБА",
en:"SMOKED FISH",
kz:"ЫСТАЛҒАН БАЛЫҚ"
},
weight:"200 г",
price:10900,
image:"images/salmon.jpeg"
},


{
id:3,
name:{
ru:"Фирменная копчёная курица",
en:"Signature Smoked Chicken",
kz:"Фирмалық ысталған тауық"
},
cat:"chicken",
category:{
ru:"КОПЧЁНАЯ КУРИЦА",
en:"SMOKED CHICKEN",
kz:"ЫСТАЛҒАН ТАУЫҚ"
},
weight:"500 г",
price:7900,
image:"images/chicken.jpeg"
},


{
id:4,
name:{
ru:"Куриное филе горячего копчения",
en:"Smoked Chicken Fillet",
kz:"Ысталған тауық филесі"
},
cat:"chicken",
category:{
ru:"КОПЧЁНАЯ КУРИЦА",
en:"SMOKED CHICKEN",
kz:"ЫСТАЛҒАН ТАУЫҚ"
},
weight:"300 г",
price:6900,
image:"images/chicken.jpeg"
}

];



let currentLang =
localStorage.getItem("ns-language") || "ru";



let cart =
JSON.parse(
localStorage.getItem("ns-cart") || "[]"
);



const $ = s => document.querySelector(s);



const money = n =>
"₸" + n.toLocaleString("ru-RU");






const translations={


ru:{

catalog:"КАТАЛОГ",
story:"НАША ИСТОРИЯ",
process:"КОПЧЕНИЕ",
delivery:"ДОСТАВКА",
contacts:"КОНТАКТЫ",

cart:"КОРЗИНА",
checkout:"ОФОРМИТЬ ЗАКАЗ",

hero:"КОПЧЁНАЯ РЫБА И КУРИЦА",

heroText:
"Создано дымом. Сделано с душой.",

shop:
"СМОТРЕТЬ КОЛЛЕКЦИЮ",

collection:
"КОЛЛЕКЦИЯ",

fish:
"КОПЧЁНАЯ РЫБА",

chicken:
"КОПЧЁНАЯ КУРИЦА",

products:
"НАШИ ПРОДУКТЫ"

},



en:{

catalog:"SHOP",
story:"OUR STORY",
process:"SMOKING",
delivery:"DELIVERY",
contacts:"CONTACT",

cart:"CART",
checkout:"CHECKOUT",

hero:"SMOKED FISH & CHICKEN",

heroText:
"Crafted with smoke. Made with soul.",

shop:
"SHOP COLLECTION",

collection:
"THE COLLECTION",

fish:
"SMOKED FISH",

chicken:
"SMOKED CHICKEN",

products:
"OUR PRODUCTS"

},




kz:{

catalog:"КАТАЛОГ",
story:"БІЗДІҢ ТАРИХ",
process:"ЫСТАУ",
delivery:"ЖЕТКІЗУ",
contacts:"БАЙЛАНЫС",

cart:"СЕБЕТ",
checkout:"ТАПСЫРЫС БЕРУ",

hero:
"ЫСТАЛҒАН БАЛЫҚ ЖӘНЕ ТАУЫҚ",

heroText:
"Түтінмен жасалған. Жанмен дайындалған.",

shop:
"КОЛЛЕКЦИЯНЫ КӨРУ",

collection:
"КОЛЛЕКЦИЯ",

fish:
"ЫСТАЛҒАН БАЛЫҚ",

chicken:
"ЫСТАЛҒАН ТАУЫҚ",

products:
"БІЗДІҢ ӨНІМДЕР"

}

};








function setLanguage(lang){

currentLang=lang;

localStorage.setItem(
"ns-language",
lang
);



document
.querySelectorAll("[data-i18n]")
.forEach(el=>{

let key=el.dataset.i18n;

if(translations[lang][key]){

el.textContent =
translations[lang][key];

}

});



document
.querySelectorAll(".lang")
.forEach(btn=>{

btn.classList.toggle(
"active",
btn.dataset.lang===lang
);

});


renderProducts();

renderCart();

}







document
.querySelectorAll(".lang")
.forEach(btn=>{

btn.onclick=()=>{

setLanguage(
btn.dataset.lang
);

};

});









function renderProducts(filter="all"){


$("#products").innerHTML =

products
.filter(
p=>filter==="all" || p.cat===filter
)

.map(p=>`

<article class="product">


<div class="product-img">

<img src="${p.image}" alt="${p.name[currentLang]}">

</div>



<div class="product-info">


<span class="product-cat">

${p.category[currentLang]}

</span>



<h3>

${p.name[currentLang]}

</h3>


<p>

${p.weight} · Premium

</p>



<div class="product-bottom">


<span class="price">

${money(p.price)}

</span>



<button class="add"
onclick="addToCart(${p.id})">

В КОРЗИНУ

</button>



</div>


</div>


</article>


`).join("");

}









function save(){

localStorage.setItem(
"ns-cart",
JSON.stringify(cart)
);

renderCart();

}







function addToCart(id){

let item =
cart.find(
x=>x.id===id
);


if(item){

item.qty++;

}else{

cart.push({
id:id,
qty:1
});

}


save();

openCart();

}








function changeQty(id,d){

let item =
cart.find(
x=>x.id===id
);


if(!item)return;


item.qty+=d;



if(item.qty<=0){

cart =
cart.filter(
x=>x.id!==id
);

}


save();

}









function renderCart(){


$("#cartCount")
.textContent =
cart.reduce(
(a,x)=>a+x.qty,
0
);



let total=0;



$("#cartItems").innerHTML =


cart.length ?

cart.map(x=>{


let p =
products.find(
y=>y.id===x.id
);


let sum =
p.price*x.qty;



total+=sum;



return `


<div class="cart-item">


<div class="cart-thumb">

<img src="${p.image}">

</div>



<div>


<h4>

${p.name[currentLang]}

</h4>



<p>

${money(p.price)}

</p>



<div class="qty">

<button onclick="changeQty(${p.id},-1)">
−
</button>


<span>
${x.qty}
</span>


<button onclick="changeQty(${p.id},1)">
+
</button>


</div>


</div>



<strong>

${money(sum)}

</strong>


</div>


`;

}).join("")


:

"<p>Корзина пустая</p>";



$("#subtotal")
.textContent =
money(total);

}









function openCart(){

$("#cart")
.classList.add("open");


$("#overlay")
.classList.add("show");

}




function closeCart(){

$("#cart")
.classList.remove("open");


$("#overlay")
.classList.remove("show");

}





$("#openCart").onclick=openCart;

$("#closeCart").onclick=closeCart;

$("#overlay").onclick=closeCart;









document
.querySelectorAll(".filter")
.forEach(btn=>{


btn.onclick=()=>{


document
.querySelectorAll(".filter")
.forEach(x=>
x.classList.remove("active")
);


btn.classList.add("active");


renderProducts(
btn.dataset.filter
);


};


});








$("#checkoutBtn").onclick=()=>{


if(!cart.length){

alert("Корзина пустая");

return;

}



let total =
cart.reduce(
(a,x)=>
a+
products.find(
p=>p.id===x.id
).price*x.qty,
0
);



$("#checkoutSummary")
.innerHTML =

cart.map(x=>{

let p =
products.find(
p=>p.id===x.id
);


return `${p.name[currentLang]} × ${x.qty}`;

}).join("<br>")

+
`

<br><br>

<b>
${money(total)}
</b>

`;



$("#checkoutModal")
.classList.add("show");


};







$("#closeCheckout").onclick=()=>{

$("#checkoutModal")
.classList.remove("show");

};








$("#checkoutForm").onsubmit=e=>{

e.preventDefault();


alert(
"Демо заказ создан. Подключите backend и платежный шлюз."
);


cart=[];

save();


$("#checkoutModal")
.classList.remove("show");


closeCart();

};







window.addEventListener(
"scroll",
()=>{

$("#header")
.classList.toggle(
"scrolled",
scrollY>30
);

});








renderProducts();

renderCart();

setLanguage(currentLang);
/* =========================================================
   ATMOSPHERIC INTERACTIONS
   ========================================================= */
(function(){
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal sections as the visitor scrolls.
  const sections = document.querySelectorAll('.reveal-section');
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('is-visible'); io.unobserve(entry.target); }});
    }, {threshold:.12});
    sections.forEach(el=>io.observe(el));
  } else sections.forEach(el=>el.classList.add('is-visible'));

  // Scroll progress line.
  const progress = document.querySelector('.scroll-progress span');
  const updateProgress = ()=>{
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  // Soft cursor light on desktop.
  const glow = document.querySelector('.cursor-glow');
  if (glow && !reduced && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', e=>{
      glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'; glow.style.opacity='.85';
    });
    document.addEventListener('mouseleave',()=>glow.style.opacity='0');
  }

  // Gentle parallax for the mountain/smoke layers.
  const hero = document.querySelector('.hero');
  if (hero && !reduced) {
    window.addEventListener('pointermove', e=>{
      const x=(e.clientX/window.innerWidth-.5), y=(e.clientY/window.innerHeight-.5);
      hero.querySelector('.mountain-back')?.style.setProperty('transform',`translate(${x*-12}px,${y*-5}px) scale(1.08)`);
      hero.querySelector('.mountain-mid')?.style.setProperty('transform',`translate(${x*-7}px,${y*-3}px) scale(1.03)`);
      hero.querySelector('.mountain-front')?.style.setProperty('transform',`translate(${x*-3}px,${y*-1}px)`);
      hero.querySelector('.hero-photo-fish')?.style.setProperty('margin-left',`${x*10}px`);
    }, {passive:true});
  }

  // Product tilt — restrained and disabled on touch devices.
  if (!reduced && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('pointermove', e=>{
      const card=e.target.closest('.product');
      document.querySelectorAll('.product.tilt-active').forEach(c=>{if(c!==card){c.style.transform='';c.classList.remove('tilt-active')}});
      if(!card) return;
      const r=card.getBoundingClientRect();
      const rx=((e.clientY-r.top)/r.height-.5)*-4;
      const ry=((e.clientX-r.left)/r.width-.5)*5;
      card.classList.add('tilt-active');
      card.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
    }, {passive:true});
    document.addEventListener('pointerleave',()=>{}, {passive:true});
  }
})();
