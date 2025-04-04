
let products={
   product1:{

   
    name:"BANK 49 lövés",
    ar:29000,
    kep:"https://drive.google.com/thumbnail?id=1TRRGnVImerM-Ksa1ncWGAVZkqj_1nIhQ&sz800"
   },
   product2:{

   
    name:"ASTEROID 35 lövés",
    ar:22000,
    kep:"https://drive.google.com/thumbnail?id=1oJuozVMyWXFx1ZzvKa_cUe4m-O5OcNuL&sz800"
   },
   product3:{

   
    name:"BATTLESHIP 16 lövés",
    ar:4500,
    kep:"https://drive.google.com/thumbnail?id=149Dngw8d_ODcP21UrZFO3vCFQeHYxC9i&sz800"
   },
   product4:{

   
    name:"DIAMOND 19 lövés",
    ar:5000,
    kep:"https://drive.google.com/thumbnail?id=1JVckUnDMnzyWvi6Rf7aJEKla9Ae0S0sS&sz800"
   },
   product5:{

   
    name:"FIRST CLASS 25 lövés",
    ar:46000,
    kep:"https://drive.google.com/thumbnail?id=1Gr194EakN-3OxBWMRE47c4D_aAgxuYPK&sz800"
   },
   product6:{

   
    name:"EUFORIA 54 lövés",
    ar:45000,
    kep:"https://drive.google.com/thumbnail?id=1rUl1kv86sqF5j323eYdA-foF5V9Y0lA6&sz800"
   },
   product7:{

   
    name:"K.O.AIRBOMB 3DB/CS",
    ar:1600,
    kep:"https://drive.google.com/thumbnail?id=1f_YikFa232HFMaTgYjDmy5WdmDkmItBE&sz800"
   },
   product8:{

   
    name:"KATYUSA 25 lövés",
    ar:600,
    kep:"https://drive.google.com/thumbnail?id=1MuGV_LNMO88IVvXtUFyftEv9tb9JnrS5&sz800"
   },
   product9:{

   
    name:"FLASH POP-POP 50DB/CS",
    ar:300,
    kep:"https://drive.google.com/thumbnail?id=1ddtiwRrvuo85FGoe5R0QHqktuScijFkR&sz800"
   },
   product10:{

   
    name:"BIENE - Röppentyű 6DB/CS",
    ar:500,
    kep:"https://drive.google.com/thumbnail?id=14GcB7UoWT5Unt6mvrujXJ6E8zZdY-ZFy&sz800"
   },
   product11:{

   
    name:"BLITZ - RECSEGŐ tojás 12DB/CS",
    ar:500,
    kep:"https://drive.google.com/thumbnail?id=1CcD5jARnwpS8BG8dU6MN_gm5StGtZuPg&sz800"
   },
   product12:{

   
    name:"SHOT MIX RÓMAIGYERTYA 20MM 5 LÖVÉS",
    ar:1200,
    kep:"https://drive.google.com/thumbnail?id=1fxvkAWpj-pbE0pDhKk4ZLzhXIKmfUyks&sz800"
   },
   product13:{

   
    name:"MYSTIC C BALLS RÓMAI GYERTYA 20 LÖVÉS 70 CM",
    ar:800,
    kep:"https://drive.google.com/thumbnail?id=1qrrzYodpCA9xqgRRtxNBFcB0v2XWGKOP&sz800"
   },
   product14:{

   
    name:"WINCHESTER RÓMAI GYERTYA 10 LÖVÉS 70 CM",
    ar:800,
    kep:"https://drive.google.com/thumbnail?id=1Rj-5S-zTwyQVODvKrjnRZlwAZli3IWuZ&sz800"
   },
   product15:{

   
    name:"BIG SHOT AIRBOMB (TALPAS) 3DB/CS",
    ar:3500,
    kep:"https://drive.google.com/thumbnail?id=1wOlmEwRaO_V5uKTDxQXoWoSMizyFolGe&sz800"
   },
};
//létrehozás
   let productCounter=15;
   const form = document.getElementById("productForm");
   const container = document.getElementById("productcontainer");

   form.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const ar = parseInt(document.getElementById("ar").value);
    const kep = document.getElementById("kep").value;

    const id = "product" + productCounter++;
    products[id]= {name, ar, kep};

    form.reset()
    renderProduct();
   });

function renderProduct(){
    container.innerHTML = "";

    for (let key in products){
        const product = products[key];

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <img src="${product.kep}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Ár: ${product.ar} Ft</p>
        <button class="kosar" onclick="addToCart('${key}')">Kosárba</button>
        <button class="torles" onclick="deleteProduct('${key}')">Törlés</button>`;

        container.appendChild(card);

    }
}

function addToCart(key){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(products[key]);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Kosárba téve: ${products[key].name}`);
}

function deleteProduct(key) {
    if (confirm(`Biztos törölni szeretnéd: ${products[key].name}?`)){
        delete products[key];
        renderProduct();
    }
}

renderProduct();
