const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// ============================
// Database Path
// ============================
const dbPath = path.join(__dirname, 'db.json');

// ============================
// Middleware
// ============================
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================
// Multer Storage
// ============================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads/products'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({
    storage
});

// ============================
// Home
// ============================
app.get('/', (req, res) => {
    res.send('Server Running...');
});

// ============================
// Get Products
// ============================
app.get('/products', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        res.json(db.products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// ============================
// Get Product By ID
// ============================
app.get('/products/:id', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const id = decodeURIComponent(req.params.id);
        const product = db.products.find(
            p => String(p.id) === id || String(p.productId) === id
        );
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                requestedId: id
            });
        }
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// ============================
// Get Categories
// ============================
app.get('/categories', (req, res) => {
    try {
        const db = JSON.parse(
            fs.readFileSync(dbPath, 'utf8')
        );
        res.json(db.categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// ============================
// Get Category By ID
// ============================
app.get('/categories/:id', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const id = decodeURIComponent(req.params.id);
        const category = db.categories.find(
            item => String(item.id) === id
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// ============================
// Add Category
// ============================
app.post('/categories', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const category = {
            id: req.body.id,
            name: req.body.name
        };

        db.categories.push(category);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));
        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// ============================
// Update Category
// ============================
app.put('/categories/:id', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const id = decodeURIComponent(req.params.id);
        const categoryIndex = db.categories.findIndex(
            item => String(item.id) === id
        );

        if (categoryIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        const updatedCategory = {
            ...db.categories[categoryIndex],
            name: req.body.name
        };

        db.categories[categoryIndex] = updatedCategory;
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));
        res.json(updatedCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// ============================
// Delete Category
// ============================
app.delete('/categories/:id', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const id = decodeURIComponent(req.params.id);
        const categoryIndex = db.categories.findIndex(
            item => String(item.id) === id
        );

        if (categoryIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        const category = db.categories[categoryIndex];
        db.categories.splice(categoryIndex, 1);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));
        res.json({
            success: true,
            message: 'Category deleted successfully',
            category
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// ============================
// Get Users
// ============================
app.get('/user', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        let users = db.user || [];
        const { email, mobileNumber, password } = req.query;

        if (email) {
            users = users.filter(
                user => String(user.email || '').toLowerCase() === String(email).toLowerCase()
            );
        }

        if (mobileNumber) {
            users = users.filter(
                user => String(user.mobileNumber) === String(mobileNumber)
            );
        }

        if (password) {
            users = users.filter(
                user => String(user.password) === String(password)
            );
        }

        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// ============================
// Register User
// ============================
app.post('/user', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        db.user = db.user || [];
        const body = req.body || {};
        const email = String(body.email || '').trim();
        const mobileNumber = String(body.mobileNumber || '').trim();

        if (!body.fullName || !email || !mobileNumber || !body.password) {
            return res.status(400).json({
                success: false,
                message: 'Full name, email, mobile number and password are required'
            });
        }

        const emailExists = db.user.some(
            user => String(user.email || '').toLowerCase() === email.toLowerCase()
        );

        if (emailExists) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }

        const mobileExists = db.user.some(
            user => String(user.mobileNumber) === mobileNumber
        );

        if (mobileExists) {
            return res.status(409).json({
                success: false,
                message: 'Mobile number already exists'
            });
        }

        const user = {
            ...body,
            email,
            mobileNumber,
            id: '#USER' + (101 + db.user.length),
            createdAt: body.createdAt || new Date().toISOString()
        };

        db.user.push(user);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// ============================
// Add Product
// ============================
app.post('/products',
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        },
        {
            name: 'images',
            maxCount: 10
        }
    ]),
    (req, res) => {
        try {
            const db = JSON.parse(
                fs.readFileSync(dbPath, 'utf8')
            );
            const body = req.body;
            const mainImage = req.files?.image?.length ? '/uploads/products/' + req.files.image[0].filename : '';
            const galleryImages = req.files?.images ? req.files.images.map( file => '/uploads/products/' + file.filename) : [];
            const productId = '#PROD' + (101 + db.products.length);
            const product = {
                id: productId,
                productId,
                name: body.name,
                category: body.category,
                description: body.description,
                oldPrice: Number(
                    body.oldPrice
                ),
                price: Number(
                    body.price
                ),
                stock: Number(
                    body.stock
                ),
                rating: 5,
                image: mainImage,
                images: galleryImages
            };
            db.products.push(product);
            fs.writeFileSync(
                dbPath,
                JSON.stringify(db, null, 4)
            );
            res.json({
                success: true,
                product
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }
);

// ============================
// DELETE PRODUCT
// ============================
app.delete('/products/:id', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const id = decodeURIComponent(req.params.id);
        // Find product
        const productIndex =
            db.products.findIndex(
                product => String(product.id) === id || String(product.productId) === id
            );
        // Not found
        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        // Product before deleting
        const product = db.products[productIndex];
        // ============================
        // Delete Main Image
        // ============================
        if (product.image) {
            const imagePath = path.join(__dirname, product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(
                    imagePath
                );
            }
        }
        // ============================
        // Delete Gallery Images
        // ============================
        if ( product.images && Array.isArray(product.images)) {
            product.images.forEach(
                image => {
                    const imagePath =
                        path.join( __dirname, image);
                    if ( fs.existsSync(imagePath)) {
                        fs.unlinkSync(
                            imagePath
                        );
                    }
                }
            );
        }
        // ============================
        // Remove Product
        // ============================
        db.products.splice(
            productIndex,
            1
        );
        // ============================
        // Save JSON
        // ============================
        fs.writeFileSync(dbPath, JSON.stringify( db, null, 4 ));
        res.json({success: true, message: 'Product deleted successfully', product});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// ============================
// UPDATE PRODUCT
// ============================
app.put('/products/:id',
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        },
        {
            name: 'images',
            maxCount: 10
        }
    ]),
    (req, res) => {
        try {
            const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            const id = decodeURIComponent(
                req.params.id
            );
            const productIndex = db.products.findIndex(p => String(p.id) === id || String(p.productId) === id);
            if (productIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            const oldProduct = db.products[productIndex];
            const body = req.body;
            // ============================
            // Main Image
            // ============================
            let mainImage = oldProduct.image || '';
            if ( req.files?.image && req.files.image.length > 0 ) {
                mainImage = '/uploads/products/' + req.files.image[0].filename;
            }
            // ============================
            // Gallery Images
            // ============================
            let galleryImages = oldProduct.images || [];
            if ( req.files?.images && req.files.images.length > 0 ) {
                galleryImages = req.files.images.map( file => '/uploads/products/' + file.filename);
            }
            // ============================
            // Updated Product
            // ============================
            const updatedProduct = {
                ...oldProduct,
                name: body.name,
                category: body.category,
                description: body.description,
                oldPrice: Number(
                    body.oldPrice
                ),
                price: Number(
                    body.price
                ),
                stock: Number(
                    body.stock
                ),
                image: mainImage,
                images: galleryImages
            };
            db.products[productIndex] = updatedProduct;
            // ============================
            // Save JSON
            // ============================
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 4 ));
            res.json({
                success: true,
                message: 'Product updated successfully',
                product: updatedProduct
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }
);

// ============================
// CREATE ORDER
// ============================
app.post('/orders', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        db.orders = db.orders || [];
        const order = {
            ...req.body,
            id: '#ORD' + (101 + db.orders.length),
            createdAt: new Date().toISOString(),
            status: 'Pending'
        };
        db.orders.push(order);
        fs.writeFileSync(
            dbPath,
            JSON.stringify(db, null, 4)
        );
        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// ============================
// GET ORDER
// ============================
app.get('/orders', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        res.json(db.orders || []);
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});


// ============================
// Start Server
// ============================

app.listen(5000, () => {
    console.log('Server Running On Port 5000');
});
