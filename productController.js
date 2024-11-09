const db = require('./db/config');

const productController = {
    getAllProducts: (req, res) => {
        db.all('SELECT * FROM products', [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    },

    getProduct: (req, res) => {
        db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(row);
        });
    },

    createProduct: (req, res) => {
        const { name, price, description } = req.body;
        db.run(
            'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
            [name, price, description],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({
                    id: this.lastID,
                    name,
                    price,
                    description
                });
            }
        );
    },

    updateProduct: (req, res) => {
        const { name, price, description } = req.body;
        db.run(
            'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
            [name, price, description, req.params.id],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (this.changes === 0) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                res.json({ message: 'Product updated successfully' });
            }
        );
    },

    deleteProduct: (req, res) => {
        db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        });
    }
};

module.exports = productController;