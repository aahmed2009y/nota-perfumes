import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// إضافة الفئات
const categories = [
  { nameAr: 'تقاسيم عطور', nameEn: 'Perfume Decants', description: 'عطور مقسمة بأحجام مختلفة' },
  { nameAr: 'عطور كاملة', nameEn: 'Full Perfumes', description: 'عطور أصلية وكاملة' },
];

for (const cat of categories) {
  await connection.execute(
    'INSERT INTO categories (nameAr, nameEn, description) VALUES (?, ?, ?)',
    [cat.nameAr, cat.nameEn, cat.description]
  );
}

console.log('✓ تمت إضافة الفئات');

// الحصول على معرفات الفئات
const [categories_data] = await connection.execute('SELECT id FROM categories');
const decantsCategoryId = categories_data[0].id;
const fullCategoryId = categories_data[1].id;

// إضافة المنتجات
const products = [
  {
    nameAr: 'خمرة واحه',
    nameEn: 'Khamra Waha',
    descriptionAr: 'عطر فاخر برائحة دافئة وجذابة',
    descriptionEn: 'Luxury fragrance with warm and attractive scent',
    categoryId: decantsCategoryId,
    badge: 'new',
  },
  {
    nameAr: 'Erba Pura | اربابورا',
    nameEn: 'Erba Pura',
    descriptionAr: 'عطر إيطالي فاخر برائحة طبيعية',
    descriptionEn: 'Italian luxury fragrance with natural scent',
    categoryId: fullCategoryId,
    badge: 'bestseller',
  },
  {
    nameAr: 'Hawas Kobra | هوس كوبرا',
    nameEn: 'Hawas Kobra',
    descriptionAr: 'عطر شرقي قوي وجذاب',
    descriptionEn: 'Strong oriental fragrance',
    categoryId: fullCategoryId,
    badge: 'none',
  },
  {
    nameAr: 'Hawas Black | هوس بلاك',
    nameEn: 'Hawas Black',
    descriptionAr: 'عطر داكن وفاخر',
    descriptionEn: 'Dark and luxury fragrance',
    categoryId: fullCategoryId,
    badge: 'bestseller',
  },
  {
    nameAr: 'Versace Eros Eau de Parfum | ايروس',
    nameEn: 'Versace Eros',
    descriptionAr: 'عطر عالمي معروف برائحة منعشة',
    descriptionEn: 'World famous fragrance with refreshing scent',
    categoryId: fullCategoryId,
    badge: 'bestseller',
  },
  {
    nameAr: 'Sauvage | سوفاج',
    nameEn: 'Sauvage',
    descriptionAr: 'عطر كلاسيكي بسيط وفاخر',
    descriptionEn: 'Classic simple and luxury fragrance',
    categoryId: fullCategoryId,
    badge: 'bestseller',
  },
  {
    nameAr: 'Gucci Intense Oud | كوجي انتنس عود',
    nameEn: 'Gucci Intense Oud',
    descriptionAr: 'عطر شرقي فاخر برائحة العود',
    descriptionEn: 'Oriental luxury fragrance with oud scent',
    categoryId: decantsCategoryId,
    badge: 'rare',
  },
  {
    nameAr: 'Hawas Ice | هوس ايس',
    nameEn: 'Hawas Ice',
    descriptionAr: 'عطر منعش برائحة باردة',
    descriptionEn: 'Refreshing fragrance with cool scent',
    categoryId: decantsCategoryId,
    badge: 'bestseller',
  },
];

const productIds = [];
for (const prod of products) {
  const [result] = await connection.execute(
    'INSERT INTO products (nameAr, nameEn, descriptionAr, descriptionEn, categoryId, badge) VALUES (?, ?, ?, ?, ?, ?)',
    [prod.nameAr, prod.nameEn, prod.descriptionAr, prod.descriptionEn, prod.categoryId, prod.badge]
  );
  productIds.push(result.insertId);
}

console.log('✓ تمت إضافة المنتجات');

// إضافة الأحجام والأسعار
const sizes = [
  { sizeAr: '3 مل', sizeEn: '3ml', price: '50000' },
  { sizeAr: '5 مل', sizeEn: '5ml', price: '80000' },
  { sizeAr: '10 مل', sizeEn: '10ml', price: '150000' },
  { sizeAr: '30 مل', sizeEn: '30ml', price: '400000' },
  { sizeAr: 'كامل', sizeEn: 'Full', price: '500000' },
];

for (const productId of productIds) {
  for (const size of sizes) {
    await connection.execute(
      'INSERT INTO productSizes (productId, sizeAr, sizeEn, price, stock) VALUES (?, ?, ?, ?, ?)',
      [productId, size.sizeAr, size.sizeEn, size.price, 100]
    );
  }
}

console.log('✓ تمت إضافة الأحجام والأسعار');

await connection.end();
console.log('✓ تم إغلاق الاتصال');
console.log('✅ تمت إضافة جميع البيانات التجريبية بنجاح!');
