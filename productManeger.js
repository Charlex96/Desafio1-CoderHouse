const fs = require('fs');

class ProductManager{
    constructor(path){
        this.path =path;
    }
    
    addProduct(newProduct){

        if(
            !newProduct.title || 
            !newProduct.description || 
            !newProduct.price || 
            !newProduct.thumbnail || 
            !newProduct.code || 
            !newProduct.stock
        ){
            throw new Error('Bad request. Missing fields');
        }

        let nextId = this.getNextId();
        newProduct.id = nextId;
        const allProductsArray = this.read();
        allProductsArray.push(newProduct);
        this.write(allProductsArray);

    }

    getNextId(){
        let lastId = 0;
        let allProductsArray = this.read(this.file);
        if(allProductsArray.length > 0){
            lastId = allProductsArray[allProductsArray.length - 1].id;
        }
        // id autoincrementable
        return lastId + 1;
    }

    getProductById(id){
        let allProductsArray = this.read(this.file);
        const product = allProductsArray.find((product)=> product.id === id);
        if(!product){
            throw new Error('Product not found');
        }
        return product;
    }

    getProducts(){
        return this.read(this.file);
    }

    updateProduct(id, newProduct){
        let allProductsArray = this.read(this.file);
        const productToUpdate = allProductsArray.find((product) => product.id === id);
        if(!productToUpdate){
            throw new Error('Update. Product not fount');
        }
        if(
            !newProduct.title || 
            !newProduct.description || 
            !newProduct.price || 
            !newProduct.thumbnail || 
            !newProduct.code || 
            !newProduct.stock
        ){
            throw new Error('Bad request. Missing fields');
        }

        const updateProduct = this.updateProductFields(productToUpdate, newProduct);
        const index = allProductsArray.indexOf(productToUpdate);
        allProductsArray[index] = updateProduct;
        this.write(allProductsArray);

        const response = {
            message: "Product update successfully",
            product: updateProduct,
        };

        return response;
    }

    updateProductFields(productToUpdate, newProduct){
        /**Los campos que se repiten los actualiza,
         * los que no (como el id) los deja igual*/
        const updateProduct = {...productToUpdate, ...newProduct};
        return updateProduct;
    }

    deleteProductById(id){
        const allProductsArray = this.read(this.file);
        const product = allProductsArray.find((product) => product.id === id);
        if (!product) {
            throw new Error("Delete. Product not found");
        }
        console.log("🔥 Producto a eliminar: ", product);
        const index = allProductsArray.indexOf(product);
        allProductsArray.splice(index, 1);
        this.write(allProductsArray);
        const response = {
            message: "Product deleted successfully",
            product: product,
        };
        return response;
    }

    deleteAllProduct(){
        const allProductsArray = this.read(this.file);
        allProductsArray.splice(0, allProductsArray.length);
        this.write(allProductsArray);
    }

    read(){
        let allProductsArray = [];
        try {
            let allProductsString = fs.readFileSync(this.path, "utf8");
            allProductsString.length > 0
                ?(allProductsArray = JSON.parse(allProductsString))
                :(allProductsArray = []);
        } catch (error) {
            console.log('Error en la lectura del archivo', error)
        }

        return allProductsArray;
    }

    write(allProductsArray){
        // vuelvo a convertir el array en string para guardarlo en el archivo
        let allProductsString = JSON.stringify(allProductsArray);
        try{
            fs.writeFileSync(this.path, allProductsString);
        } catch(error){
            console.log('Error en la escritura'. error);
        }
    }


}

module.exports = ProductManager;

