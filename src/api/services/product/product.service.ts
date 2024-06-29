import {
  Category,
  GetProductsParams,
  Product,
  ProductsResponse,
  UpdateProductParams,
} from "../../../types/api-services/product.type";
import { api } from "../../apiConfig";

export interface ResponseError {
  error: {
    data: {
      message: string;
    };
  };
}

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
      query: ({ data: { id, ...restData } }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: restData,
      }),
      async onQueryStarted(
        { data, limit, skip, toast, navigate },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: updatedProduct } = await queryFulfilled;

          // -> UPDATE THE PRODUCT IN THE CACHE
          dispatch(
            productService.util.updateQueryData(
              "getProducts",
              { limit, skip },
              (draft: ProductsResponse) => {
                // Find the index of the product to be updated
                const index = draft.products.findIndex(
                  (product) => product.id === data.id
                );

                if (index !== -1) {
                  // if found the index then update the product in the draft
                  draft.products[index] = { ...data, ...updatedProduct };
                }
              }
            )
          );

          // -> SHOW SUCCESS TOAST MESSAGE
          toast.open({
            type: "success",
            content: "Product updated successfully",
          });

          // Navigate to product list page
          navigate("/");
        } catch (error) {
          console.log("Error: ", error);
          const err = error as ResponseError;

          // -> SHOW ERROR TOAST MESSAGE
          toast.open({
            type: "error",
            content: err?.error?.data.message || "Something went wrong",
          });
        }
      },
    }),
  }),
});

export default productService;
