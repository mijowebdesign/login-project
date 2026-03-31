import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Svi mogu da vide proizvode
router.get('/', getProducts);
router.get('/:id', getProductById);

// Samo admin i manager mogu da kreiraju, ažuriraju i brišu
router.post('/', verifyToken, authorizeRoles('admin', 'manager'), createProduct);
router.put('/:id', verifyToken, authorizeRoles('admin', 'manager'), updateProduct);
router.delete('/:id', verifyToken, authorizeRoles('admin', 'manager'), deleteProduct);

export default router;
