// Seed data file
const mongoose = require('mongoose');
const MenuItem = require('../Menu/models/MenuItem'); // Adjust path as needed
const TicketOrder = require('../Menu/models/ticket'); // Adjust path as needed

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define your seed data
const menuItemsData = [
    // Breakfast
    {
      name: "Avocado Toast",
      price: 8.99,
      category: "Breakfast",
      description: "Toasted sourdough topped with fresh avocado and a sprinkle of chilli flakes.",
      ingredients: ["Sourdough", "Avocado", "Chilli Flakes", "Lemon"],
      available: true,
      isVegan: true,
      isVegetarian: true,
      imageUrl: "fakeImg.com/avocado-toast"
    },
    {
      name: "Pancakes with Maple Syrup",
      price: 10.99,
      category: "Breakfast",
      description: "Fluffy pancakes served with pure maple syrup and fresh berries.",
      ingredients: ["Flour", "Eggs", "Milk", "Maple Syrup", "Berries"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/pancakes"
    },
    {
      name: "Breakfast Burrito",
      price: 9.99,
      category: "Breakfast",
      description: "A hearty burrito filled with scrambled eggs, cheese, and salsa.",
      ingredients: ["Tortilla", "Eggs", "Cheese", "Salsa"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/breakfast-burrito"
    },
    {
      name: "Smoothie Bowl",
      price: 7.99,
      category: "Breakfast",
      description: "A blend of tropical fruits topped with granola and coconut flakes.",
      ingredients: ["Banana", "Mango", "Granola", "Coconut Flakes"],
      available: true,
      isVegan: true,
      isVegetarian: true,
      imageUrl: "fakeImg.com/smoothie-bowl"
    },
    {
      name: "Omelette",
      price: 8.49,
      category: "Breakfast",
      description: "Three-egg omelette with your choice of veggies and cheese.",
      ingredients: ["Eggs", "Cheese", "Bell Peppers", "Spinach"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/omelette"
    },
    {
      name: "Bagel with Cream Cheese",
      price: 6.99,
      category: "Breakfast",
      description: "Toasted bagel with a generous spread of cream cheese.",
      ingredients: ["Bagel", "Cream Cheese"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/bagel-cream-cheese"
    },
  
    // Lunch
    {
      name: "Chicken Caesar Wrap",
      price: 11.99,
      category: "Lunch",
      description: "Grilled chicken, romaine lettuce, and Caesar dressing in a wrap.",
      ingredients: ["Chicken", "Romaine Lettuce", "Caesar Dressing", "Wrap"],
      available: true,
      isVegan: false,
      isVegetarian: false,
      imageUrl: "fakeImg.com/chicken-caesar-wrap"
    },
    {
      name: "Veggie Sandwich",
      price: 9.99,
      category: "Lunch",
      description: "Whole grain bread with hummus, cucumber, and mixed veggies.",
      ingredients: ["Bread", "Hummus", "Cucumber", "Tomato", "Spinach"],
      available: true,
      isVegan: true,
      isVegetarian: true,
      imageUrl: "fakeImg.com/veggie-sandwich"
    },
    {
      name: "Beef Burger",
      price: 12.49,
      category: "Lunch",
      description: "Juicy beef patty with lettuce, tomato, and special sauce.",
      ingredients: ["Beef Patty", "Lettuce", "Tomato", "Burger Bun"],
      available: true,
      isVegan: false,
      isVegetarian: false,
      imageUrl: "fakeImg.com/beef-burger"
    },
    {
      name: "Quinoa Salad",
      price: 10.49,
      category: "Lunch",
      description: "A refreshing salad with quinoa, chickpeas, and fresh veggies.",
      ingredients: ["Quinoa", "Chickpeas", "Cucumber", "Tomato"],
      available: true,
      isVegan: true,
      isVegetarian: true,
      imageUrl: "fakeImg.com/quinoa-salad"
    },
    {
      name: "Grilled Cheese Sandwich",
      price: 7.99,
      category: "Lunch",
      description: "Melty cheese between two slices of toasted bread.",
      ingredients: ["Bread", "Cheese", "Butter"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/grilled-cheese"
    },
    {
      name: "Fish Tacos",
      price: 12.99,
      category: "Lunch",
      description: "Crispy fish served with slaw and creamy sauce in soft tacos.",
      ingredients: ["Fish", "Cabbage Slaw", "Taco Shells", "Creamy Sauce"],
      available: true,
      isVegan: false,
      isVegetarian: false,
      imageUrl: "fakeImg.com/fish-tacos"
    },
  
    // Dinner
    {
      name: "Steak and Veggies",
      price: 18.99,
      category: "Dinner",
      description: "Grilled steak served with a side of steamed vegetables.",
      ingredients: ["Steak", "Broccoli", "Carrots"],
      available: true,
      isVegan: false,
      isVegetarian: false,
      imageUrl: "fakeImg.com/steak-veggies"
    },
    {
      name: "Spaghetti Bolognese",
      price: 14.99,
      category: "Dinner",
      description: "Classic Italian pasta with rich meat sauce.",
      ingredients: ["Pasta", "Ground Beef", "Tomato Sauce"],
      available: true,
      isVegan: false,
      isVegetarian: false,
      imageUrl: "fakeImg.com/spaghetti-bolognese"
    },
    {
      name: "Mushroom Risotto",
      price: 13.49,
      category: "Dinner",
      description: "Creamy risotto with fresh mushrooms and parmesan.",
      ingredients: ["Arborio Rice", "Mushrooms", "Parmesan", "Onion"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/mushroom-risotto"
    },
    {
      name: "Chicken Alfredo",
      price: 15.99,
      category: "Dinner",
      description: "Fettuccine pasta with creamy Alfredo sauce and grilled chicken.",
      ingredients: ["Chicken", "Pasta", "Alfredo Sauce"],
      available: true,
      isVegan: false,
      isVegetarian: false,
      imageUrl: "fakeImg.com/chicken-alfredo"
    },
    {
      name: "Vegetable Stir-fry",
      price: 11.99,
      category: "Dinner",
      description: "Mixed veggies stir-fried with soy sauce and garlic.",
      ingredients: ["Broccoli", "Bell Peppers", "Carrots", "Soy Sauce"],
      available: true,
      isVegan: true,
      isVegetarian: true,
      imageUrl: "fakeImg.com/vegetable-stir-fry"
    },
    {
      name: "Lamb Chops",
      price: 19.99,
      category: "Dinner",
      description: "Tender lamb chops served with garlic mashed potatoes.",
      ingredients: ["Lamb", "Garlic", "Potatoes"],
      available: true,
      isVegan: false,
      isVegetarian: false,
      imageUrl: "fakeImg.com/lamb-chops"
    },
  
    // Drinks
    {
      name: "Espresso",
      price: 3.00,
      category: "Drinks",
      description: "Strong and bold espresso shot.",
      ingredients: ["Espresso"],
      available: true,
      isVegan: true,
      isVegetarian: true,
      imageUrl: "fakeImg.com/espresso"
    },
    {
      name: "Latte",
      price: 4.50,
      category: "Drinks",
      description: "Smooth espresso with steamed milk.",
      ingredients: ["Espresso", "Milk"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/latte"
    },
    {
      name: "Green Tea",
      price: 2.99,
      category: "Drinks",
      description: "Refreshing green tea brewed to perfection.",
      ingredients: ["Green Tea Leaves", "Water"],
      available: true,
      isVegan: true,
      isVegetarian: true,
      imageUrl: "fakeImg.com/green-tea"
    },
    {
      name: "Smoothie",
      price: 5.99,
      category: "Drinks",
      description: "A blend of mixed fruits for a refreshing drink.",
      ingredients: ["Banana", "Strawberry", "Apple Juice"],
      available: true,
      isVegan: true,
      isVegetarian: true,
      imageUrl: "fakeImg.com/smoothie"
    },
    {
      name: "Iced Coffee",
      price: 4.99,
      category: "Drinks",
      description: "Cold brew coffee served with ice.",
      ingredients: ["Cold Brew", "Ice", "Milk"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/iced-coffee"
    },
    {
      name: "Orange Juice",
      price: 3.50,
      category: "Drinks",
      description: "Freshly squeezed orange juice.",
      ingredients: ["Oranges"],
      available: true,
      isVegan: true,
      isVegetarian: true,
      imageUrl: "fakeImg.com/orange-juice"
    },
  
    // Café/Dessert
    {
      name: "Chocolate Cake",
      price: 6.99,
      category: "Dessert",
      description: "Rich and moist chocolate cake with ganache.",
      ingredients: ["Chocolate", "Flour", "Eggs", "Butter"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/chocolate-cake"
    },
    {
      name: "Cheesecake",
      price: 7.99,
      category: "Dessert",
      description: "Classic creamy cheesecake with a graham cracker crust.",
      ingredients: ["Cream Cheese", "Sugar", "Eggs", "Graham Crackers"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/cheesecake"
    },
    {
      name: "Fruit Tart",
      price: 5.99,
      category: "Dessert",
      description: "Pastry crust filled with custard and topped with fresh fruit.",
      ingredients: ["Pastry", "Custard", "Berries"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/fruit-tart"
    },
    {
      name: "Ice Cream Sundae",
      price: 6.49,
      category: "Dessert",
      description: "Vanilla ice cream topped with chocolate sauce and nuts.",
      ingredients: ["Ice Cream", "Chocolate Sauce", "Nuts"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/ice-cream-sundae"
    },
    {
      name: "Apple Pie",
      price: 5.49,
      category: "Dessert",
      description: "Warm apple pie with a flaky crust.",
      ingredients: ["Apples", "Cinnamon", "Pie Crust"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/apple-pie"
    },
    {
      name: "Brownie",
      price: 4.99,
      category: "Dessert",
      description: "Fudgy chocolate brownie with a crisp top.",
      ingredients: ["Chocolate", "Flour", "Eggs", "Butter"],
      available: true,
      isVegan: false,
      isVegetarian: true,
      imageUrl: "fakeImg.com/brownie"
    }
  ];

  const ticketOrdersData = [
    {
      items: [
        { menuItem: null, quantity: 2, specialInstructions: 'Extra spicy' },
        { menuItem: null, quantity: 1, specialInstructions: 'No onions' }
      ],
      status: 'Pending',
      totalPrice: 25.22,
      CustomerId: new mongoose.Types.ObjectId()
    },
    {
      items: [
        { menuItem: null, quantity: 1, specialInstructions: '' }
      ],
      status: 'Pending',
      totalPrice: 10.99,
      CustomerId: new mongoose.Types.ObjectId()
    },
    {
      items: [
        { menuItem: null, quantity: 3, specialInstructions: 'Add extra cheese' }
      ],
      status: 'Completed',
      totalPrice: 30.00,
      CustomerId: new mongoose.Types.ObjectId()
    },
    {
      items: [
        { menuItem: null, quantity: 2, specialInstructions: '' },
        { menuItem: null, quantity: 1, specialInstructions: 'Gluten-free' }
      ],
      status: 'Completed',
      totalPrice: 45.50,
      CustomerId: new mongoose.Types.ObjectId()
    }
  ];

  const seedDatabase = async () => {
    try {
      // Clear existing data
      await MenuItem.deleteMany();
      await TicketOrder.deleteMany();
      console.log('Existing data cleared');
  
      // Insert MenuItems
      const insertedMenuItems = await MenuItem.insertMany(menuItemsData);
      console.log('Menu items added:', insertedMenuItems);
  
      // Ensure that menuItems are present before creating ticket orders
      if (insertedMenuItems.length === 0) {
        throw new Error('No menu items found to associate with tickets');
      }
  
      // Update ticketOrdersData with actual MenuItem IDs
      ticketOrdersData.forEach((ticket) => {
        ticket.items.forEach((item, index) => {
          // Use modulo to ensure we cycle through available menu items
          item.menuItem = insertedMenuItems[index % insertedMenuItems.length]._id;
        });
      });
  
      // Insert TicketOrders
      const insertedTicketOrders = await TicketOrder.insertMany(ticketOrdersData);
      console.log('Ticket orders added:', insertedTicketOrders);
  
    } catch (error) {
      console.error('Error seeding the database:', error);
    } finally {
      // Close the connection
      mongoose.connection.close();
    }
  };
  
  // Run the seed function
  seedDatabase();