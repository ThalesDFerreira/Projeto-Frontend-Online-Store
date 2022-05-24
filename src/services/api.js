export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await result.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${categoryId}&q=${query}`);
  result = await result.json();
  return result;
}

// export async function getProductId(id) {
//   const result = await fetch(`https://api.mercadolibre.com/items/${id}`);
//   const productId = await result.json();
//   return productId;
// }
