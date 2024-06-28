import React from "react";
import { useParams } from "react-router-dom";
import productService from "../api/services/product/product.service";
import FormComponent from "../components/form/FormComponent";
import { InputFieldsType } from "../types/components/InputFieldTypes";

const ProductEdit: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  // ================= RTK GET QUERIES =================
  // @GET PRODUCTS BY ID /products/:productId
  const { data: product, isLoading: productLoading } =
    productService.useGetProductByIdQuery(parseInt(productId ?? "0"), {
      skip: !productId,
    });

  // @GET CATEGORIES /products/categories
  const { data: categories, isLoading: categoriesLoading } =
    productService.useGetCategoriesQuery(undefined, {
      skip: !productId,
    });

  // ================= RTK UPDATE MUTATION =================
  // @UPDATE PRODUCT BY ID /products/:productId
  const [updateProduct, { isLoading }] =
    productService.useUpdateProductMutation();

  if (productLoading) return <div>Loading...</div>;

  // ================= FORM SUBMIT =================
  const formSubmit = async (values: object) => {
    console.log("Received values:", values);

    try {
      await updateProduct({
        id: parseInt(productId ?? "0"),
        data: values,
      }).unwrap();
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Failed to update the product: ", error);
    }
  };

  const formData: InputFieldsType[] = [
    {
      id: "title",
      label: "Title",
      required: true,
      name: ["title"],
      type: "text",
      column: { xs: 1, lg: 2 },
    },
    {
      id: "price",
      label: "Price",
      required: true,
      name: ["price"],
      type: "number",
      column: { xs: 1, lg: 2 },
    },
    {
      id: "description",
      label: "Description",
      required: true,
      name: ["description"],
      type: "textarea",
      column: { xs: 1 },
    },
    {
      id: "category",
      label: "Category",
      required: true,
      name: ["category"],
      type: "select",
      optionLoading: categoriesLoading,
      options:
        categories?.map(({ name, slug }) => ({
          label: name,
          value: slug,
        })) || [],
    },
    {
      id: "brand",
      label: "Brand",
      name: ["brand"],
      type: "text",
      column: { xs: 1, lg: 3 },
    },
    {
      id: "weight",
      label: "Weight",
      name: ["weight"],
      type: "text",
      column: { xs: 1, lg: 3 },
    },
    {
      id: "reviews",
      label: "Reviews",
      required: true,
      name: ["reviews"],
      type: "form-list",
      formListItems: [
        {
          id: "reviewerName",
          label: "Reviewer Name",
          required: true,
          name: ["reviewerName"],
          type: "text",
        },
        {
          id: "reviewerEmail",
          label: "Reviewer Email",
          required: true,
          name: ["reviewerEmail"],
          type: "text",
        },
        {
          id: "comment",
          label: "Comment",
          required: true,
          name: ["comment"],
          type: "text",
        },
      ],
    },
  ];

  return (
    <>
      {product && (
        <FormComponent
          isLoading={isLoading}
          title="Edit Product"
          formData={formData}
          formSubmit={formSubmit}
          defaultValues={product}
        />
      )}
    </>
  );
};

export default ProductEdit;
