const app = document.querySelector("#app");
const productCards = document.querySelector("#productCards");
const productDetailModal = new bootstrap.Modal("#productDetailModal");

//for Rating
const star = (num) => {
    let starStr = "";
    for(let i=1; i<=5 ; i++){
        if(Math.floor(num) >= i){
            starStr += `<i class="bi bi-star-fill"></i>`;
        }else{
            starStr += `<i class="bi bi-star"></i>`;
        }
    }
    return starStr;
};

//for product description
const excerpt = (str, maxLength = 60) => {
    if(str.length > maxLength){
        return str.substring(0, maxLength) + ".....";
    }
    return str;
}

const createProductCards = (product) => {
  const div = document.createElement("div");
  div.className = "col-12 col-sm-6 col-md-4 col-lg-3 product-card";
  div.setAttribute("product-id", product.id);
  div.innerHTML = `
    <div class="card mb-3">
        <div class="card-body">
            <img class="product-img mb-2" src="${product.thumbnail}" alt="">
            <h6 class="fw-bold text-truncate">${product.title}</h6>
            <div class="mb-1">
                <div class="badge bg-info text-white text-capitalize">
                    ${product.category.replaceAll("-"," ")}
                </div>
            </div>
            <div class="mb-1">
                ${star(product.rating)}
            </div>
            <p class="product-des text-black-50 small">
                ${excerpt(product.description)} 
            </p>
            <div class="d-flex justify-content-between align-items-center border-top pt-3">
                <p class="m-0">$ ${product.price}</p>
                <button class="btn btn-outline-dark">Add To Cart</button>
            </div>
        </div>
    </div>
    `;
    return div
};

products.forEach((product) => {
    // console.log(product)
    productCards.append(createProductCards(product))
})

//To open Modal Box
app.addEventListener("click",(event) => {
    // console.log(event.target)
    if(event.target.closest(".product-card")){
        const currentCard = event.target.closest(".product-card");
        console.log(currentCard.getAttribute("product-id"))
        const currentId = currentCard.getAttribute("product-id");
        const currentProduct = products.find(product => product.id == currentId);
        console.log(currentProduct.title)
        productDetailModal._element.querySelector(".modal-title").innerText = currentProduct.title ;
        productDetailModal.show();
    }
})
