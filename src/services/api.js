export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await result.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${categoryId}&q=${query}`);
  const categoryIdQuery = await result.json();
  return categoryIdQuery;
}

export async function getProductsFromQuery(query) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const queryResult = await result.json();
  return queryResult;
}

export async function getProductsFromCategory(categoryId) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${categoryId}`);
  const categoryIdResults = await result.json();
  return categoryIdResults;
}

export async function getCategoriesList(id) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
  const categories = await result.json();
  return categories;
}
