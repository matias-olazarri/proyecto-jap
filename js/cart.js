let cartOfUser = [];
let timeReal = false
function subTotalCalculator(id, cost, currency) {
    let idInput = "input" + id;
    let actualCountValue = document.getElementById(idInput).value;

    document.getElementById("subtotal" + id).innerHTML = currency + (actualCountValue * cost);

}


function showCartInfo(cart) {
    let htmlContent = ""

    if (localStorage.getItem("articles") != undefined) {
        let articlesToAdd = JSON.parse(localStorage.getItem("articles"));
        let artToAdd = cartOfUser.articles[0];
        articlesToAdd.push(artToAdd);
        cartOfUser.articles = articlesToAdd;
    }

    for (let i = 0; i < cart.articles.length; i++) {
        let article = cart.articles[i];
        let subtotal = article.count * article.unitCost;

        htmlContent += `          
        <tr>
            <th scope="row" class="col-2 align-middle"><img class="w-50" src="${article.image}" alt="img${i}"></th>
            <td class="align-middle">${article.name}</td>
            <td class="align-middle">${article.currency} ${article.unitCost}</td>
            <td class="align-middle col-1"><input class="text-center form-control form-control-sm" onchange="subTotalCalculator(${article.id},${article.unitCost},'${article.currency}')"  type="number" value="${article.count}" min="1" id="input${article.id}"></td>
            <td class="align-middle fw-bold" id="subtotal${article.id}"> ${article.currency} ${subtotal}</td>
        </tr>`;
    }

    document.getElementById("products-cart").innerHTML = htmlContent;
    totalCost();
}

function totalCost() {

    let cart = JSON.parse(localStorage.getItem('articles'))
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].currency == 'USD') {
            subTotal += cart[i].count * cart[i].unitCost;
        } else {
            subTotal += cart[i].count * cart[i].unitCost / 41;
        }
    }
    let btnRadio = document.getElementsByName("tipoEnvio");
    let envio = 0
    for (i = 0; i < btnRadio.length; i++) {
        if (btnRadio[i].checked) {
            envio = subTotal / 100 * btnRadio[i].value;
        }
    }

    document.getElementById("subTotal").innerHTML = Math.round(subTotal);
    document.getElementById("envio").innerHTML = Math.round(envio);
    document.getElementById("total").innerHTML = Math.round(subTotal + envio);

}

document.addEventListener("DOMContentLoaded", () => {
    let url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
    getJSONData(url)
        .then(function (resultObj) {
            if (resultObj.status === "ok") {
                cartOfUser = resultObj.data;
                showCartInfo(cartOfUser);
            }
        });



})



function deactivatePaymentMethod() {
    document.getElementById("linkFormaPago").innerHTML = 'Modificar'
    if (document.getElementById('tarjeta').checked) {
        document.getElementById('numTarjeta').disabled = false;
        document.getElementById('codigoSeg').disabled = false;
        document.getElementById('vencimiento').disabled = false;
        document.getElementById('numCuenta').disabled = true;
        document.getElementById("txtFormaPago").innerHTML = 'Tarjeta de crédito.'
    } else {
        document.getElementById('numTarjeta').disabled = true;
        document.getElementById('codigoSeg').disabled = true;
        document.getElementById('vencimiento').disabled = true;
        document.getElementById('numCuenta').disabled = false;
        document.getElementById("txtFormaPago").innerHTML = 'Transferencia bancaria.'
    }
}

function validateForm() {

    document.getElementById('form').classList.add('was-validated')
    if (!(document.getElementById('tarjeta').checkValidity() &&
        document.getElementById('numTarjeta').checkValidity() &&
        document.getElementById('codigoSeg').checkValidity() &&
        document.getElementById('vencimiento').checkValidity() &&
        document.getElementById('numCuenta').checkValidity())) {
        document.getElementById('msjErrorFormaPago').innerHTML = 'Ingrese forma de pago'
    } else {
        document.getElementById('msjErrorFormaPago').innerHTML = ''
    }
    realTime = true

}
