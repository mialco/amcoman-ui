module.exports = function () {
    var faker = require("faker");

    var testCategories = [];
    var testDataSource = [];
    var liveCategories = [];
    var liveDataSource = [];
    

    testCategories = generateCategories();
    testDataSource = generateProductData(testCategories);
    liveCategories = generateCategories();
    liveDataSource = generateProductData(liveCategories);


    function generateCategories(){
        let categories = [];
        for(let i=0;i<30;i++){
            categories.push(faker.commerce.productName());
        } 
        return categories;
    }
   
    function generateRandomIndexes(){
        let indexArray =[];
        for(let i=0;i<250;i++){
            indexArray.push(Math.floor(Math.random() * (500 - 1)+1));
        }
        return indexArray;
    }

    function generateProductData(categories){

        let productArray = [];
        let nullImageIndexes = generateRandomIndexes();
        let nullLinkIndexes = generateRandomIndexes();
        for(let i=0;i<500;i++){
            productArray.push({
                id : i,
                productName : faker.commerce.product(),
                description : faker.lorem.paragraphs(),
                category : categories[Math.floor(Math.random() * (30 - 1)+1)],
                image : nullImageIndexes.indexOf(i) >=0 ? null : faker.image.abstract(),
                link : nullLinkIndexes.indexOf(i) >=0 ? null : faker.internet.url()
            });
        }
        
        return productArray;
    }
    

    return {
        // application: {
        //     banner: faker.image.image(),
        //     title: faker.lorem.sentence(),
        //     desc: faker.lorem.paragraphs(),
        //     feature1: faker.lorem.paragraph(),
        //     feature2: faker.lorem.paragraph(),
        //     feature3: faker.lorem.paragraph()
        // },
        test :{
            categories : testCategories,
            dataSource : testDataSource,
        },
        live : {
            categories : liveCategories,
            dataSource : liveDataSource
        }
    };
}