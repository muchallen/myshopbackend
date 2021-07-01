// Fetch Products
var newProducts;
async function getProducts() {
  var productHtml= ``
  var products =  await fetch('https://centric-shop-backend.herokuapp.com/api/v1/products/all', {
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

     var data = {name,category,price,type,quantity,description,image}
         fetch('https://centric-shop-backend.herokuapp.com/api/v1/products/add', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(response=>response.json()).then(data=> {
        var fileData = new FormData()
        fileData.append('file' , file);
         fetch('https://centric-shop-backend.herokuapp.com/api/v1/products/uploadImage', {
          method: 'POST', // or 'PUT'
          headers: {
          },
          body:fileData
        }).then((res)=>location.reload(true)).catch(error=> console.log(error))
  }).catch(err=>alert(err));
      })

