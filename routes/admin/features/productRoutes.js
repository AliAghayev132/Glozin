const express = require("express");
const router = express.Router();
const productController = require("../../../controllers/productControllers");
/**
 * @swagger
 * tags:
 *   name: Products Admin
 *   description: Product management
 */
/**
 * @swagger
 * /api/admin/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products Admin]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'  # Reference to Product schema
 *       500:
 *         description: Error retrieving products
 */
router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);
/**
 * @swagger
 * /api/admin/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'  # Reference to Product schema
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error retrieving the product
 */
/**
 * @swagger
 * /api/admin/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *                 description: Brand of the product
 *                 example: "Nike"
 *               title:
 *                 type: string
 *                 description: Title of the product
 *                 example: "Running Shoes"
 *               price:
 *                 type: number
 *                 description: Price of the product
 *                 example: 120.99
 *               discountPercentage:
 *                 type: number
 *                 description: Discount percentage if available
 *                 example: 10
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Available sizes for the product
 *                 example: ["S", "M", "L"]
 *               colors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the color
 *                       example: "Red"
 *                     photos:
 *                       type: array
 *                       items:
 *                         type: string
 *                         description: Photo file names for the color
 *                         example: "red_shoe.png"
 *                 description: Available colors for the product along with their photos
 *                 example: [{"name": "Red", "photos": ["red_shoe.png"]}, {"name": "Blue", "photos": ["blue_shoe.png"]}]
 *               stock:
 *                 type: number
 *                 description: Stock quantity
 *                 example: 100
 *               sku:
 *                 type: string
 *                 description: Stock keeping unit
 *                 example: "SKU12345"
 *               description:
 *                 type: string
 *                 description: Detailed description of the product
 *                 example: "High-quality running shoes for daily workouts."
 *               photos:
 *                 type: string
 *                 format: binary
 *                 description: Product image files to be uploaded for each color
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All required fields must be provided"
 *       500:
 *         description: Error creating the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating product"
 *                 error:
 *                   type: string
 */
router.post("/", productController.createProduct);

/**
 * @swagger
 * /api/admin/product/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'  # Reference to Product input schema
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'  # Reference to Product schema
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error updating the product
 */
router.put("/:id", productController.updateProduct);

/**
 * @swagger
 * /api/admin/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error deleting the product
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;
