const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         brand:
 *           type: string
 *           description: Ürün markası
 *         title:
 *           type: string
 *           description: Ürün başlığı
 *         price:
 *           type: number
 *           description: Ürün fiyatı
 *         discountPercentage:
 *           type: number
 *           nullable: true
 *           description: İndirim yüzdesi (varsa)
 *         viewCount:
 *           type: number
 *           description: Ürün görüntüleme sayısı
 *         sizes:
 *           type: array
 *           items:
 *             type: string
 *           description: Ürün bedenleri
 *         colors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Renk adı
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Renk ile ilgili fotoğrafların dosya adları
 *         stock:
 *           type: number
 *           description: Ürün stoğu
 *         sku:
 *           type: string
 *           description: Ürün stok kodu
 *         description:
 *           type: string
 *           description: Ürün açıklaması
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Oluşturulma tarihi
 *         modifiedAt:
 *           type: string
 *           format: date-time
 *           description: Güncellenme tarihi
 */
const productSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    sizes: {
      type: [String],
      required: true,
    },
    colors: [
      {
        name: {
          type: String,
          required: true,
        },
        photos: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
    stock: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
