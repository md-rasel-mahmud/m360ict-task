import { api } from "../../apiConfig";
import {
  Category,
  GetProductsParams,
  Product,
  ProductsResponse,
  UpdateProductParams,
} from "./product.type";

const productService = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, GetProductsParams>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: build.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    getCategories: build.query<Category[], void>({
      query: () => "products/categories",
    }),
    updateProduct: build.mutation<Product, UpdateProductParams>({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export default productService;
