let data = [];

const handleFetch = () => {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(json => {
            data = json;
            console.log(data);
            handleDisplay();
            handelCartDisp();
        });
}

handleFetch();

let navitem = ['Home', 'Order', 'Products']
navitem.map((ele) => {
    ul.innerHTML += `
    <a href='#${ele}'><li class="cursor-pointer">${ele}</li></a>
    `
})

btn.onclick = () => {
    saidbar.classList.toggle('mr-[0%]')
}

function handleDisplay() {
    main.innerHTML = "";
    data.map((ele, index) => {
        main.innerHTML += `
        <div id="Products" class="card border w-[305px] mx-auto h-96 rounded-xl ">
            
            <img class="w-60 h-60 mx-auto" src=${ele.image} />
            <h4 class="truncate w-ful text-xl text-center mt-2 font-bold mx-4">${ele.title}</h4>
            <ul class="flex justify-around mt-2">
                <li class="font-bold text-lg">Price: $ ${ele.price}</li>
                <li class="font-bold text-lg">Rating: ${ele.rating.rate} <i class="fa-solid fa-star" style="color:white"></i></li>
            </ul>
            <li class="w-[90%] list-none mx-auto mt-4">
                <button onclick="handelCart(${index})" class="button border py-2 w-full text-center rounded-full ">Add to cart</button>
            </li>
        </div>
        `;
    });
}


function handelCart(index) {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const Item = cart.find(Item => Item.id == data[index].id);
    let newObj = data[index]
    newObj.qty = 1

    if (!Item) {

        cart.push(newObj);

    } else {
        Item.qty++;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    handelCartDisp();
}


function handelCartDisp() {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    pop.innerText = cart.reduce((sum, obj) => {
        return sum + obj.qty

    }, 0)

    saidbar.innerHTML = "";
    cart.map((ele, index) => {
        saidbar.innerHTML += `
        <a herf="#${ele}" 
        <div class="cart p-2 border border-white mt-2 flex w-full gap-4">
            <div class="w-[30%] h-40">
            <img class="w-full h-full " src=${ele.image} />
            </div>
            <div class="list-none  [70%]  ">
                    <div class="flex justify-end  px-2">
                        <button onclick="{Remove(${index})}" class=" font-bold text-gray-400 hover:text-blue-700 "><i class="fa-solid fa-trash"></i></button>
                    </div>
                    <li class="  w-full text-black mt-2 ">${ele.title} </li>
                    <li class="mt-1 w-full   text-black "> ${ele.category} </li>
                    <li class="mt-1 w-full  text-black  ">Price: $ ${ele.price * ele.qty} </li>
                <div class="flex w-full  mt-6 gap-1 justify-end text-black ">
                    <button onclick="decQty(${index})" class="w-10 h-8 rounded-md bg-red-500 text-black text-xl">-</button>
                    <p class="bg-white h-8 w-10 text-center  rounded-md">${ele.qty}</p>
                    <button onclick="incQty(${index})" class="w-10 h-8 rounded-md bg-red-500 text-black text-xl">+</button>
                </div>
            </div>
        </div>
        </a>
        
        `;

    });

    if (cart.length > 0) {
        const checkoutbutton = document.createElement('button')
        checkoutbutton.classList.add('text-white', 'sticky', 'b-0', 'w-40', 'mt-2', 'mx-36', 'mb-10', 'hover:bg-blue-500', 'px-10', 'py-2', 'rounded-full', 'border', 'text-xl');
        checkoutbutton.onclick = checkout;
        checkoutbutton.innerText = 'Checkout'
        saidbar.appendChild(checkoutbutton)
    }
}


function incQty(i) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart[i].qty++;

    localStorage.setItem("cart", JSON.stringify(cart))

    handelCartDisp()


}


function decQty(i) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[i].qty > 1) {
        cart[i].qty--;
        localStorage.setItem("cart", JSON.stringify(cart))

        handelCartDisp();
    }
}


function Remove(currentIndex) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.splice(currentIndex, 1)
    localStorage.setItem('cart', JSON.stringify(cart));

    handelCartDisp()
}



function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const TQ = cart.reduce((sum, obj) => sum + obj.qty, 0)
    const TB = cart.reduce((sum, obj) => sum + obj.qty * obj.price, 0)
    let clear = confirm('Please Confirm your Order: \nTotal Quantity : ' + TQ + '\nTotal Bill : ' + TB);


    if (clear) {
        let order = JSON.parse(localStorage.getItem('order')) || [];
        order.push(cart)
        localStorage.setItem('order', JSON.stringify(order))
        localStorage.removeItem("cart")
        window.location = href = "./order.html"

    }

    handelCartDisp()


}