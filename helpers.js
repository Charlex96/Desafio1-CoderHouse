const fs = require("fs");

const createFile = async (file_path) =>{

    try {
        if (!fs.existsSync(file_path)) {
            console.log('El archivo no exite, entonces lo creo');
            await fs.promises.writeFile(file_path, " ", "utf8");
        }
    } catch (error) {
        console.log('Error en la creacion del archivo', err);
    }
};

const productToSave = [
    {
        title:'Celular',
        description:'Celular Samsung S23 Ultra',
        price:1200,
        thumbnail:'https://th.bing.com/th/id/OIP.aqRuEjpg1G9fUBFkR0QDEQHaFj?rs=1&pid=ImgDetMain',
        code:'12345',
        stock:10
    },
    {
        title:'Celular',
        description:'Celular Iphone 15 Pro',
        price:1300,
        thumbnail:'https://th.bing.com/th/id/OIP.HoodR7IQkD-iz80js0kYxQAAAA?rs=1&pid=ImgDetMain',
        code:'13414',
        stock:20
    }
]


module.exports = {createFile, productToSave};

