class ProductManager{
    constructor(){
        this.products =[];
    }
    
    addProduct(newProduct){

        const productExists = this.products.find((product)=> newProduct.code === product.code);

        if(productExists){
            throw new Error('Bad request. Product code already exists');
        }

        if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock){
            throw new Error('Bad request. Missing fields');
        }

        // id autoincrementable
        const id = this.products.length + 1;
        newProduct.id = id;

        this.products.push(newProduct);
    }

    getProductsById(id){
        const product = this.products.find((product)=> product.id === id);
        if(!product){
            throw new Error('Product not found');
        }
        return product;
    }

    getProduct(){
        return this.products;
    }

    deleteAllProducts(){
        this.products = [];
    }

}

// Instancia de la clase ProductManager
const myProductManager = new ProductManager();

/** Agrego producto */
myProductManager.addProduct({
    title:'Celular',
    description:'Celular Samsung S23 Ultra',
    price:'1200',
    thumbnail:'https://th.bing.com/th/id/OIP.aqRuEjpg1G9fUBFkR0QDEQHaFj?rs=1&pid=ImgDetMain',
    code:'12345',
    stock:'10'
})

/** Agrego producto */
myProductManager.addProduct({
    title:'Celular',
    description:'Celular Iphone 15 Pro',
    price:'1300',
    thumbnail:'https://th.bing.com/th/id/OIP.HoodR7IQkD-iz80js0kYxQAAAA?rs=1&pid=ImgDetMain',
    code:'13414',
    stock:'20'
})


// Lista de todos los productos
console.log('Mis Productos son: ');
console.log(myProductManager.getProduct());

// Busco un producto por ID
console.log('Busco un producto por id: ');
console.log(myProductManager.getProductsById(1));

// myProductManager.deleteAllProducts();
// console.log(myProductManager.getProduct());

