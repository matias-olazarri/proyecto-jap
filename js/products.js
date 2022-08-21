//array donde se cargarán los datos recibidos:
let productsArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array) {
    let htmlContentToAppend = "";
    let registro = array.products

    for (let i = 0; i < registro.length; i++) {
        let products = registro[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
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

// EJECUCIÓN:

// -Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
// -Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
// -Por último, se llama a  showProductsList pasándole por parámetro productsArray.



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});
