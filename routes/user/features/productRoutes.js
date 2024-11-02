const express = require("express");
const router = express.Router();
const productController = require("../../../controllers/productControllers");
// Route to get all products

/**
 * @swagger
 * tags:
 *   name: Products User
 *   description: Ürünler ile ilgili işlemler
 */

/**
 * @swagger
 * /api/user/product:
 *   get:
 *     summary: Tüm ürünleri getir
 *     tags: [Products User]
 *     responses:
 *       200:
 *         description: Başarıyla ürünler getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product' 
 *       500:
 *         description: Ürünler alınırken hata oluştu
 */
router.get("/", productController.getAllProducts);

/**
 * @swagger
 * /api/user/product/{id}:
 *   get:
 *     summary: Belirli bir ürünü getir
 *     tags: [Products User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Ürün kimliği
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Başarıyla ürün getirildi
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Product' 
 *       404:
 *         description: Ürün bulunamadı
 *       500:
 *         description: Ürün alınırken hata oluştu
 */
router.get("/:id", productController.getProductById);

module.exports = router;