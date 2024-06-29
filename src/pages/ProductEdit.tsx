import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../api/services/product/product.service";
import FormComponent from "../components/form/FormComponent";
import { InputFieldsType } from "../types/components/InputFieldTypes";
import { Col, Row, Skeleton, message } from "antd";

const ProductEdit: React.FC = () => {
  // ================= PACKAGE HOOKS =================
  // -> GET PRODUCT ID FROM PARAM
  const { productId } = useParams<{ productId: string }>();
  // -> GET TOAST MESSAGE DEPENDENCY
  const [messageApi, contextHolder] = message.useMessage();
  // -> GET NAVIGATE TO NAVIGATE ANOTHER PAGE
  const navigate = useNavigate();

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

  // ================= FORM SUBMIT =================
  const formSubmit = async (values: object) => {
    console.log("Product Updated Data:", values);

    try {
      const updateResponse = await updateProduct({
        id: parseInt(productId ?? "0"),
        data: values,
      }).unwrap();

      if (updateResponse) {
        // -> SHOW SUCCESS TOAST MESSAGE
        messageApi.open({
          type: "success",
          content: "Product updated successfully",
        });

        // -> NAVIGATE TO PRODUCT LIST PAGE
        navigate("/");
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `Failed to update the product: ${error}`,
      });

      console.error("Failed to update the product: ", error);
    }
  };

  const formData: InputFieldsType[] = [
    {
      id: "title",
      label: "Title",
      required: true,
      rules: [{ required: true, message: "Please fill the input title!" }],
      name: ["title"],
      type: "text",
      column: { xs: 1, lg: 2 },
    },
    {
      id: "price",
      label: "Price",
      required: true,
      rules: [{ required: true, message: "Please fill the input price!" }],
      name: ["price"],
      type: "number",
      column: { xs: 1, lg: 2 },
    },
    {
      id: "description",
      label: "Description",
      required: false,
      name: ["description"],
      type: "textarea",
      column: { xs: 1 },
    },
    {
      id: "category",
      label: "Category",
      required: true,
      rules: [{ required: true, message: "Please select the category!" }],
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
      required: true,
      rules: [{ required: true, message: "Please fill the input brand!" }],
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
          column: { xs: 1, lg: 6 },
        },
        {
          id: "reviewerEmail",
          label: "Reviewer Email",
          required: true,
          name: ["reviewerEmail"],
          column: { xs: 1, lg: 3 },
          rules: [
            { type: "email", message: "Invalid email!" },
            { required: true, message: "Please fill the input email!" },
          ],
          type: "text",
        },
        {
          id: "comment",
          label: "Comment",
          required: false,
          name: ["comment"],
          column: { xs: 2 },
          type: "text",
        },
      ],
    },
  ];

  return (
    <>
      {productLoading || categoriesLoading ? (
        <>
          <Row gutter={5}>
            {Array(formData.length)
              .fill({})
              .map(() => (
                <Col xs={12}>
                  <Skeleton />
                </Col>
              ))}
          </Row>
        </>
      ) : (
        <FormComponent
          isLoading={isLoading}
          title="Edit Product"
          formData={formData}
          formSubmit={formSubmit}
          defaultValues={product}
        />
      )}

      {/* TOAST MESSAGE DEPENDENCY */}
      {contextHolder}
    </>
  );
};

export default ProductEdit;
