const ProductManager = require('./productManeger');
const {createFile, productToSave} = require('./helpers');


const path = './product.txt';
createFile(path);
const myProductManager = new ProductManager(path);

productToSave.forEach((product) =>{
    myProductManager.addProduct(product);
})

//Lista de Productos 
console.log('🔥  Mis productos son:');
console.log(myProductManager.getProducts());

console.log('🔥 Busco un producto por id:');
console.log(myProductManager.getProductById(1));

const newProduct = {
    title:'Celular',
    description:'Celular Xiaomi Ultra',
    price:900,
    thumbnail:'https://th.bing.com/th/id/OIP.aqRuEjpg1G9fUBFkR0QDEQHaFj?rs=1&pid=ImgDetMain',
    code:'12345',
    stock:4
}

const response = myProductManager.updateProduct(1, newProduct);
console.log('🔥  Actualizo un producto:');
console.log(response);

//Eliminar producto por id
// const response2 = myProductManager.deleteProductById(3);
// console.log("🔥 Elimino un producto por id: ");
// console.log(response2);


