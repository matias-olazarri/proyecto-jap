let minCost = undefined;
let maxCost = undefined;
//array donde se cargarán los datos recibidos:
let productsArray = []

function setProductID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}


function showProductsList() {
    let htmlContentToAppend = "";
  
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
for (let i = 0; i < productsArray.length; i++) {

    let products = productsArray[i];

    if (((minCost == undefined) || (minCost != undefined && products.cost >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && products.cost <= maxCost))){

        htmlContentToAppend += `
        <div onclick="setProductID(${products.id})" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="products image" class="img-thumbnail">
                    
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> <b>`+ products.name + `</b> </h4> 
                        <h4>`+ products.currency + '  ' + products.cost + `</h4> 
                        <p> `+ products.description + `</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("products-list").innerHTML = htmlContentToAppend;
    }
}
}

// EJECUCIÓN:

// -Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
// -Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en productsArray.
// -Por último, se llama a  showProductsList pasándole por parámetro productsArray.



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data.products;
            showProductsList();
        }
    });
  
    document.getElementById("clearFilter").addEventListener("click", function(){
      document.getElementById("filterCostMin").value = "";
      document.getElementById("filterCostMax").value = "";
  
      minCost = undefined;
      maxCost = undefined;
  
      showProductsList();
  
    });
    document.getElementById("rangeFilter").addEventListener("click", function(){
  
      minCost = document.getElementById("filterCostMin").value;
      maxCost = document.getElementById("filterCostMax").value;
  
      if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
        minCost = parseInt(minCost);
      }
      else{
        minCost = undefined;
      }
  
      if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
        maxCost = parseInt(maxCost);
      }
      else{
        maxCost = undefined;
      }
      showProductsList();
    });
  //método sort
    document.getElementById("sortAsc").addEventListener("click", function () {
      productsArray.sort(function (a, b){
        return b.cost - a.cost
      });
      showProductsList();  
    });
  
    document.getElementById("sortDesc").addEventListener("click", function() {
      productsArray.sort(function (a, b){
        return a.cost - b.cost
      });
      showProductsList();
    });
  
    document.getElementById("sortRev").addEventListener("click", function() {
      productsArray.sort(function (a, b){
        return b.soldCount - a.soldCount
      });
      showProductsList();
    });
  
  });

  