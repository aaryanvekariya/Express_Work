// import express from 'express';

// const PORT = process.env.PORT || 5000
// const app = express();

// app.get('/', (req,res)=>{
//     res.send('Welcome to GlowDerma - Your Skincare Journey Starts Here');
// })

// app.get('/about', (req, res)=>{
//     res.send('<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products</h3>')
// })

// const contactDetails = {
//     "email" : "care@glowderma.com",
//     "instagram" : "http://instagram.com/glowderma",
//     "consultation" :  "http://glowderma.com/book-appointment"
// }

// app.get('/contact', (req,res)=>{
//     res.send(contactDetails);
// })

// let items = [
//     {
//         "name": "Hydrating Serum",
//         "price": "$25",
//         "description": "A lightweight serum that deeply hydrates and plumps the skin."
//       },
//       {
//         "name": "Vitamin C Cream",
//         "price": "$30",
//         "description": "Brightens skin tone and reduces the appearance of dark spots."
//       }
// ]

// app.get('/products', (req,res)=>{
//     res.send(JSON.stringify(items));
// }
// )

// app.get('*', (req,res)=>{
//     res.status(404).json({
//         "error" : "Route Not Found"
//     })
// })

// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);
// })






import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to GlowDerma - Your Skincare Journey Starts Here');
});

app.get('/about', (req, res) => {
    res.send('<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products</h3>');
});

const contactDetails = {
    "email": "care@glowderma.com",
    "instagram": "http://instagram.com/glowderma",
    "consultation": "http://glowderma.com/book-appointment"
};

app.get('/contact', (req, res) => {
    res.send(contactDetails);
});

let items = [
    {
        "id": 1,
        "price": "$25",
        "product": "A lightweight serum that deeply hydrates and plumps the skin."
    },
    {
        "id": 2,
        "price": "$30",
        "product": "Brightens skin tone and reduces the appearance of dark spots."
    }
];

app.get('/products', (req, res) => {
    res.send(JSON.stringify(items));
});

app.post('/products', (req, res) => {
    try {
        const { id, product, price, ...extraFields } = req.body;

        // Check for missing fields
        if (!id || !product || !price) {
            return res.status(400).json({
                "error": "Please provide 'id', 'product', and 'price'"
            });
        }

        // Check for extra fields
        const extraFieldKeys = Object.keys(extraFields);
        if (extraFieldKeys.length > 0) {
            return res.status(400).json({
                "error": "Only 'id', 'product', and 'price' are allowed"
            });
        }

        // Add the item
        const newItem = { id, product, price };
        items.push(newItem);
        console.log("Item added successfully");
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error processing the request:", error.message);
        res.status(500).json({
            "error": "An unexpected error occurred. Please try again later."
        });
    }
});

app.post('/add_to_cart', (req, res) => {
    try {
        const { id, product, price, ...extraFields } = req.body;

        // Check for missing fields
        if (!id || !product || !price) {
            return res.status(400).json({
                "error": "Please provide 'id', 'product', and 'price'"
            });
        }

        // Check for extra fields
        const extraFieldKeys = Object.keys(extraFields);
        if (extraFieldKeys.length > 0) {
            return res.status(400).json({
                "error": "Only 'id', 'product', and 'price' are allowed"
            });
        }

        // Add the item
        const newItem = { id, product, price };
        items.push(newItem);
        console.log("Item added successfully");
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error processing the request:", error.message);
        res.status(500).json({
            "error": "An unexpected error occurred. Please try again later."
        });
    }
});

// Shopping Cart
// Initialize empty shoppingCart array

// cart Route
// Create handlers:

// GET: Return cart contents
// POST:
// Process JSON body (id, name, price, qty)
// Add item if all fields present
// Return error if fields missing (Status 400)

let shoppingCart = [];

app.get('/cart', (req, res) => {
    res.send(JSON.stringify(items));
});

app.post('/cart', (req, res) => {
    try {
        const { id, product, price, ...extraFields } = req.body;

        // Check for missing fields
        if (!id || !product || !price) {
            return res.status(400).json({
                "error": "Please provide 'id', 'product', and 'price'"
            });
        }

        // Check for extra fields
        const extraFieldKeys = Object.keys(extraFields);
        if (extraFieldKeys.length > 0) {
            return res.status(400).json({
                "error": "Only 'id', 'product', and 'price' are allowed"
            });
        }

        // Add the item
        const newItem = { id, product, price };
        items.push(newItem);
        console.log("Item added successfully");
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error processing the request:", error.message);
        res.status(500).json({
            "error": "An unexpected error occurred. Please try again later."
        });
    }
});

// orders/:orderID Route
// Create GET handler that:

// Uses orderID parameter
// Returns matching order (Status 200)
// Returns "Order Not Found" for no match (Status 404)

let orders = [
    { id: 1, product: 'Anti-Aging Serum', quantity: 2 },
    { id: 2, product: 'Vitamin C Moisturizer', quantity: 1 },
    { id: 3, product: 'Hyaluronic Acid', quantity: 3 }
]

app.get('/orders/:orderID', (req, res) => {
    const orderID = parseInt(req.params.orderID);
    const order = orders.find(order => order.id === orderID);

    if (!order) {
        return res.status(404).json({
            "error": "Order Not Found"
        });
    }
    res.status(200).json(order);
});

// products Route
// Create GET handler that filters by:

// No parameters: Return full list
// name parameter (Example: name=Retinol)
// maxPrice parameter (Example: maxPrice=1000)
// Both parameters combined

let products = [
    { id: 11, name: "Retinol Serum", price: 1200, availableQty: 50 },
    { id: 12, name: "Niacinamide Solution", price: 800, availableQty: 30 },
    { id: 14, name: "Peptide Moisturizer", price: 1500, availableQty: 100 },
    { id: 15, name: "Glycolic Acid Toner", price: 900, availableQty: 20 }
]

app.get('/products', (req, res) => {
    const { name, maxPrice } = req.query;

    if (name && maxPrice) {
        const filteredProducts = products.filter(product => product.name === name && product.price <= maxPrice);
        return res.status(200).json(filteredProducts);
    }

    if (name) {
        const filteredProducts = products.filter(product => product.name === name);
        return res.status(200).json(filteredProducts);
    }

    if (maxPrice) {
        const filteredProducts = products.filter(product => product.price <= maxPrice);
        return res.status(200).json(filteredProducts);
    }

    res.status(200).json(products);
});

app.get('*', (req, res) => {
    res.status(404).json({
        "error": "Route Not Found"
    });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


