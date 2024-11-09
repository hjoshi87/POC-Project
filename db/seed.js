const db = require('./config');

const seedProducts = [
    {
        name: 'Laptop',
        price: 999.99,
        description: 'High-performance laptop with 16GB RAM'
    },
    {
        name: 'Smartphone',
        price: 699.99,
        description: 'Latest model with 5G capability'
    },
    {
        name: 'Headphones',
        price: 199.99,
        description: 'Wireless noise-cancelling headphones'
    },
    {
        name: 'Tablet',
        price: 499.99,
        description: '10-inch display with 128GB storage'
    },
    {
        name: 'Smartwatch',
        price: 299.99,
        description: 'Fitness tracking and notifications'
    }
];

// Clear existing products and seed new ones
db.serialize(() => {
    // Delete existing records
    db.run('DELETE FROM products', [], (err) => {
        if (err) {
            console.error('Error clearing products table:', err);
            return;
        }
        console.log('Cleared products table');
    });

    // Insert new records
    const stmt = db.prepare('INSERT INTO products (name, price, description) VALUES (?, ?, ?)');
    
    seedProducts.forEach(product => {
        stmt.run([product.name, product.price, product.description], (err) => {
            if (err) {
                console.error('Error inserting product:', err);
            }
        });
    });

    stmt.finalize();

    // Verify seeded data
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            console.error('Error verifying seed data:', err);
            return;
        }
        console.log('Seeded products:', rows);
    });
}); 