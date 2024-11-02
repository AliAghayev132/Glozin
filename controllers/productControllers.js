const Product = require("../schemas/Product");
const multer = require("multer");
const path = require("path");

// Çoklu dosya yükleme için storage yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/uploads/product-photos/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).any();

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Ürünler alınırken hata oluştu.", error });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı." });
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Ürün alınırken hata oluştu.", error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // Önce req.body verilerini test edelim
    console.log("Received req.body:", req.body);

    // Gerekli alanların olup olmadığını kontrol edelim
    const {
      brand,
      title,
      price,
      sizes = ["s", "m"], // Varsayılan değer
      stock,
      sku,
      description,
      colors,
      discountPercentage = 0, // Varsayılan değer
    } = req.body;

    if (
      !brand ||
      !title ||
      !description ||
      !price ||
      !discountPercentage ||
      !sizes ||
      !stock ||
      !colors ||
      !sku
    ) {
      return res
        .status(400)
        .json({ message: "Tüm gerekli alanlar sağlanmalıdır." });
    }

    // Eğer req.body verileri doğruysa, dosya yükleme işlemini başlat
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          message: "Dosya yükleme sırasında hata oluştu.",
          error: err,
        });
      }

      // Dosya yükleme işlemi sonrası req.files ve req.body tekrar test edilebilir
      console.log("Received req.files:", req.files);
      console.log("Received req.body after upload:", req.body);

      // Renk ve fotoğraf eşlemesi
      const colorsPhotosMap = JSON.parse(colors).map((color) => {
        return {
          name: color,
          photos: req.files[`photos[${color}]`]
            ? req.files[`photos[${color}]`].map((file) => file.filename)
            : [],
        };
      });

      // Yeni ürün oluşturma
      const newProduct = new Product({
        brand,
        title,
        price,
        sizes,
        stock,
        sku,
        description,
        discountPercentage,
        colors: colorsPhotosMap,
      });

      // Ürünü kaydet
      await newProduct.save();
      return res
        .status(201)
        .json({ success: true, message: "Yeni ürün oluşturuldu", newProduct });
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "İç sunucu hatası", error });
  }
};
exports.updateProduct = async (req, res) => {
  const {
    brand,
    title,
    price,
    discountedPrice,
    viewCount,
    sizes,
    colors,
    stock,
    sku,
    description,
  } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        brand,
        title,
        price,
        discountedPrice,
        viewCount,
        sizes,
        colors,
        stock,
        sku,
        description,
      },
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Ürün bulunamadı." });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ürün güncellenirken hata oluştu.", error });
  }
};
// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Ürün bulunamadı." });
    res.status(200).json({ message: "Ürün başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: "Ürün silinirken hata oluştu.", error });
  }
};
