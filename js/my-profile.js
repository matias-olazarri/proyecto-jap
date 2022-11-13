
let inputEmail = document.getElementById("emailProfile");
let inputFirstName = document.getElementById("firstName");
let inputSecondName = document.getElementById("secondName");
let inputFirstSurname = document.getElementById("firstSurname");
let inputSecondSurname = document.getElementById("secondSurname");
let inputPhoneNum = document.getElementById("phoneNum");
let inputProfilePhoto = document.getElementById("profilePhotoFile");
let profilePhoto = document.getElementById("profilePhoto");

(function () { 'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                }

                if (form.checkValidity()) {

                    localStorage.setItem("fullUser", JSON.stringify({
                        firstName: inputFirstName.value,
                        secondName: inputSecondName.value,
                        firstSurname: inputFirstSurname.value,
                        secondSurname: inputSecondSurname.value,
                        email: inputEmail.value,
                        phoneNum: inputPhoneNum.value

                    }))

                }

                form.classList.add('was-validated')
            }, false)
        })
})()

inputProfilePhoto.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        localStorage.setItem("profilePhoto", reader.result);
        profilePhoto.src = reader.result;

    });

    reader.readAsDataURL(this.files[0]);

});
document.addEventListener("DOMContentLoaded", (e) => {

    let user = localStorage.getItem("user");
    let fullUser = localStorage.getItem("fullUser")

    if (fullUser) {

        let fullUserData = [];
        fullUserData.push(JSON.parse(fullUser));

        for (let data of fullUserData) {
            inputFirstName.value = data.firstName
            inputSecondName.value = data.secondName
            inputFirstSurname.value = data.firstSurname
            inputSecondSurname.value = data.secondSurname
            inputEmail.value = data.email
            inputPhoneNum.value = data.phoneNum
        };
    }
    if (!fullUser && user) {
        inputEmail.value = user
    };
    let profilePhotoStorage = localStorage.getItem("profilePhoto");
    if (profilePhotoStorage) {
        profilePhoto.src = profilePhotoStorage;
    };

});