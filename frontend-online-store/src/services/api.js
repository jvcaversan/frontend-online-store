export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const categories = await fetch(url);
  const result = await categories.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const products = await fetch(url);
  const result = await products.json();
  return result;
}

export async function getProductsFromId(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const products = await fetch(url);
  const result = await products.json();
  return result;
}
