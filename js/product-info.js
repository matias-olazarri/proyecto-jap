
let d = new Date();
let date = d.getDate();
let month = d.getMonth() + 1;
let year = d.getFullYear();
let hour = d.getHours();
let min = d.getMinutes();
let sec = d.getSeconds();
let dateStr = year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;

function setProductID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}


document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL + localStorage.getItem('prodID') + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infoProductsArray = resultObj.data
      showArrayProd();
      comprar();
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      commentProductsArray = resultObj.data
      showArrayComments()
    }
  });

  getJSONData(PRODUCT_INFO_URL + localStorage.getItem('prodID') + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      prod = resultObj.data
      showArrayProdRel();
    }
  });
});





function showArrayProd() {

  let htmlContentToAppend = "";

  htmlContentToAppend += `

  <br><br>
  <div class="row">
    <div class="col-lg-6 mb-4">
  
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"><img src="${infoProductsArray.images[0]}" class="d-block w-100" alt="first image"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
            aria-label="Slide 2"><img src="${infoProductsArray.images[1]}" class="d-block w-100" alt="scn image"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
            aria-label="Slide 3"><img src="${infoProductsArray.images[2]}" class="d-block w-100" alt="third image"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
            aria-label="Slide 4"><img src="${infoProductsArray.images[3]}" class="d-block w-100" alt="fourth image"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="4500">
            <img src="${infoProductsArray.images[0]}" class="d-block w-100" alt="first image">
          </div>
          <div class="carousel-item" data-bs-interval="4500">
            <img src="${infoProductsArray.images[1]}" class="d-block w-100" alt="scn image">
          </div>
          <div class="carousel-item" data-bs-interval="4500">
            <img src="${infoProductsArray.images[2]}" class="d-block w-100" alt="third image">
          </div>
          <div class="carousel-item" data-bs-interval="4500">
            <img src="${infoProductsArray.images[3]}" class="d-block w-100" alt="fourth image">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
  
    </div>
  
    <div class="col-lg-6">
      <!-- Product Price  -->
      <div class="form-group  row">
        <hr>
        <div class="text-center w-100 ">
          <h1 class="fw-bold">${infoProductsArray.name}</h1>
        </div>
      </div>
      <hr>
      <div class="form-group row">
        <p class="mb-1 p-3 display-6"><span class="fw-bold"></span> ${infoProductsArray.currency}
          ${infoProductsArray.cost}</p>
      </div>
  
      <div class="form-group row">
        <p class="mb-1 p-2"><span class="fw-bold">Categoria:</span> ${infoProductsArray.category}</p>
      </div>
  
      <div class="form-group row">
        <label class="col-sm-2 fw-bold p-2">Descripción:</label>
        <div class="col-sm-8 col-md-9 p-2">
          <p>${infoProductsArray.description}</p>
        </div>
      </div>
  
      <div class="form-group row">
        <p class="mb-1 p-2"><span class="fw-bold">Cantidad vendidos:</span> ${infoProductsArray.soldCount}</p>
      </div>
      <button onclick="windowCart()" class="btn btn-primary col-2 mb-5 mt-2 btnheight" id="comprar">Comprar</button>
  
  
    </div>
  </div> 
 `

  document.getElementById("product-container").innerHTML = htmlContentToAppend;

}


function showArrayComments() {
  let htmlContentToAppend = "";
  for (let i = 0; i < commentProductsArray.length; i++) {
    let comments = commentProductsArray[i];
    htmlContentToAppend += `
                  <div class="list-group-item list-group-item-action">
                  <div class="row">
                      <div class="col">
                          <div class="d-flex">
                              <p class="mb-1 lead fw-bold"> <strong>${comments.user}</strong>  ${showStars(comments.score)} </p>
                          </div>
                          <p class="mb-1 lead"> ${comments.description} <span class="text-black-50">${comments.dateTime}</span></p>
                      </div>
                  </div>
              </div>
              `

  }

  document.getElementById("showComent").innerHTML = htmlContentToAppend;
}




function showStars(score) {
  let stars = ``
  if (score == 1) {
    stars = `<span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>`
  }
  else if (score == 2) {
    stars = `<span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>`
  }
  else if (score == 3) {
    stars = `<span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>`
  }
  else if (score == 4) {
    stars = `<span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star "></span>`
  }
  else {
    stars = `<span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star checked text-primary" ></span>
              <span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star checked text-primary"></span>
              <span class="fa fa-star checked text-primary"></span>`
  }
  return stars
}


let btnComentario = document.getElementById('btnComentar');

btnComentario.addEventListener('click', function (e) {

  let htmlContentToAppend = "";
  let puntuacion = document.getElementById('puntuacion').value;
  let comentario = document.getElementById('comentario').value;
  let usuario = localStorage.getItem('user')
  if (puntuacion > "0" && puntuacion <= "5" && comentario != "") {
    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col">
            <div class="d-flex">
                <p class="mb-1 lead fw-bold"> <strong>`+ usuario + `</strong> ${showStars(puntuacion)} </p>
            </div>
            <p class="mb-1 lead"> `+ comentario + `<span class="text-black-50"> ` + dateStr + ` </span> </p>
        </div>
    </div>
</div>
`
    document.getElementById("showMyComent").innerHTML = htmlContentToAppend;
  }

  else if (comentario === "") {
    alert("Agrega un comentario")
  } else if (puntuacion === "") {
    alert("Ingrese una Puntuacion entre 1-5")
  }

});



function showArrayProdRel() {
  let htmlContentToAppend = "";
  for (let prodRel of prod.relatedProducts) {



    htmlContentToAppend += `
   <div class="col-md-4 w-25 ">
      <div class="card mb-4 list-group-item-action cursor-active" onclick="setProductID(${prodRel.id})">
        <img class="bd-placeholder-img card-img-top" src="${prodRel.image}" class="img-thumbnail" >
        <p class="m-3">${prodRel.name}</p>

       
      </div>
   </div>

   
        `
    document.getElementById("product-rel").innerHTML = htmlContentToAppend;
  }
}



function comprar(){

  document.getElementById("comprar").addEventListener("click", ()=>{
    let listOfArticles = []
    let newArticleOnCart = {
      "id": infoProductsArray.id,
      "name": infoProductsArray.name,
      "count": 1,
      "unitCost": infoProductsArray.cost,
      "image": infoProductsArray.images[0],
      "currency": infoProductsArray.currency
    }
  
    if(localStorage.getItem("articles") == undefined){
      listOfArticles.push(newArticleOnCart);
      localStorage.setItem("articles",JSON.stringify(listOfArticles));
    }else{
      listOfArticles = JSON.parse(localStorage.getItem("articles"));
      localStorage.removeItem("articles");
      listOfArticles.push(newArticleOnCart);
      localStorage.setItem("articles",JSON.stringify(listOfArticles));
    }
  })
}



function windowCart() {
  window.location = "cart.html";
}