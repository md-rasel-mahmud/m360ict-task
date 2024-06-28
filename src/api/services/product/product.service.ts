import {
  Category,
  GetProductsParams,
  Product,
  ProductsResponse,
  UpdateProductParams,
} from "../../../types/api-services/product.type";
import { api } from "../../apiConfig";

const productService = api.injectEndpoints({
  endpoints: (build) => ({
    // @GET PRODUCTS /products
    getProducts: build.query<ProductsResponse, GetProductsParams>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),

    // @GET PRODUCTS BY ID /products/:id
    getProductById: build.query<Product, number>({
      query: (id) => `products/${id}`,
    }),

    // @GET CATEGORIES /products/categories
    getCategories: build.query<Category[], void>({
      query: () => "products/categories",
    }),

    // @UPDATE PRODUCT BY ID /products/:id
    updateProduct: build.mutation<Product, UpdateProductParams>({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export default productService;
