// Fetch Products
var newProducts;
var host = "http://localhost:8081"
var host2 = "https://centric-shop-backend.herokuapp.com"
async function getProducts() {
  var productHtml= ``
  var products =  await fetch(host2+'/api/v1/products/all', {
          method: 'GET', // or 'PUT'
          headers: {
          },
          }).then(res=>
          res.json()).then(data=>newProducts=data).catch(err=>alert(err.message));
          newProducts.forEach(prod=>{
          productHtml+=`<tr>
                                <td>${prod.name}</td>
                                <td>${prod.category}</td>
                                <td>${prod.quantity}</td>
                                <td>${prod.price}</td>
                                <td><button class="btn btn-sm">del</button></td>
                                <tr>
                                `
          })
          document.querySelector('.tbody').innerHTML=productHtml

}
getProducts();



  var openModalBtn = document.getElementById("openModal");
  var closeModalBtn = document.getElementById("closeModal");
  openModalBtn.addEventListener('click',()=> $("#exampleModal").modal("show"));
  closeModalBtn.addEventListener('click',()=> $("#exampleModal").modal("hide"));
  var form = document.getElementById("formAddProduct")

  form.addEventListener('submit',(e)=> {
    e.preventDefault();
    var name= form.productName.value.toLowerCase();
    var category = form.productCategory.value.toLowerCase()
    var price =  form.productPrice.value;
    var quantity = form.productQuantity.value;
    var description = form.productDescription.value.toLowerCase();
    var image = form.productImage.files[0].name;
    var file = form.productImage.files[0];
    var type = form.productType.value.toLowerCase();


      var fileData = new FormData()
             fileData.append('file' , file);
              fetch('https://myshopfrontend22.vercel.app/shop/uploadImage', {
               method: 'POST', // or 'PUT'
               headers: {
               },
               body:fileData
             }).
         then(data=>data.json()).then(res=> {
         console.log(res)
         var data = {name,category,price,type,quantity,description,image:res.name}
         fetch(host2+'/api/v1/products/add', {
                 method: 'POST', // or 'PUT'
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(data),
               }).then(s=>location.reload(true)).catch(error=> console.log(error))
  }).catch(error=> console.log(error))
  })


