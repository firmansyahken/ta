const name_domain = ["gmail.com", "yahoo.com"]
const isFill = val => /\S+/.test(val);
const isEmail = val => name_domain.indexOf(val.split("@")[1]) == -1 ? false : true;
const lenChar = (val, min, max) => val.length >= min && val.length <= max;
const isNumber = val => /^[0-9]*$/.test(val)

function required(val) {
  var pattern = /\S+/
  return pattern.test(val)
}


const messages = {
  undefined: "",
  required: "Data Tidak Boleh Kosong!",
  email: "Format Email Tidak Sesuai!",
  len: "Jumlah Karakter Tidak Sesuai",
  number: "Inputan Harus Berupa Angka!"
}

function validation(val, types, min, max) {
    var result = {}
    var validations = {
      required: isFill(val),
      email: isEmail(val),
      len: lenChar(val, min, max),
      number: isNumber(val)
    };
    types.forEach(type => {
        result[type] = validations[type]
    })
    return Object.keys(result).find(key => result[key] == false)  
}

const myform = document.getElementById("myform");
const message = document.querySelectorAll(".message");

myform.addEventListener("submit", function(e) {
  e.preventDefault()

  var dataForm = {
    nama: validation(myform.nama.value, ["required", "len"], 3, 24),
    no: validation(myform.no.value, ["required", "number"]),
    email: validation(myform.email.value, ["required", "email"]),
    tujuan: validation(myform.tujuan.value, ["required"]),
    alamat: validation(myform.alamat.value, ["required", "len"], 4, 255)
  }
  
  message.forEach(msg => {
    var inputElement = document.querySelector("*[name="+msg.dataset.id+"]");
    msg.innerText = messages[dataForm[msg.dataset.id]]
    dataForm[msg.dataset.id] !== undefined ? inputElement.classList.add("error") : inputElement.classList.remove("error");
  })

  const check = Object.values(dataForm)

  if(check.filter(ck => ck !== undefined).length === 0) {
    return window.location.href="https://google.com"
  }
})