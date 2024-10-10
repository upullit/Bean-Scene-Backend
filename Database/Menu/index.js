const { MongoClient, ObjectId, Double } = require('mongodb');

async function MongoStart() {

    const db = await MongoClient.connect('mongodb://127.0.0.1:27017');

    let dbo = db.db('restaurantdb');
    let collection = await dbo.collection('menu');

    //dummy data
    await collection.insertMany([
        {
            _id: new ObjectId(),
            name: "Chicken Salad",
            price: new Double(12.99),
            category: "Lunch",
            description: "A tasty salad with grilled chicken and fresh greens",
            ingredients: ["Lettuce", "Cucumber", "Chicken", "Avocado", "Basil"]
         }
    ]);

        const findResult = await collection.find({}).toArray();

        await db.close();
    
        return findResult;
}

MongoStart().then(console.log).catch(console.error);