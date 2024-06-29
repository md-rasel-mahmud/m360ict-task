import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../api/services/product/product.service";
import FormComponent from "../components/form/FormComponent";
import { InputFieldsType } from "../types/components/InputFieldTypes";
import { Breadcrumb, Col, Row, Skeleton, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ProductEdit: React.FC = () => {
  // ================= PACKAGE HOOKS =================
  // -> GET PRODUCT ID FROM PARAM
  const { productId } = useParams<{ productId: string }>();
  // -> GET TOAST MESSAGE DEPENDENCY
  const [toast, toastContextHolder] = message.useMessage();
  // -> GET NAVIGATE TO NAVIGATE ANOTHER PAGE
  const navigate = useNavigate();
  // -> REDUX STATE
  const { limit, skip } = useSelector(
    (state: RootState) => state.queryParams.product
  );

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

    // Update product by id
    updateProduct({
      data: { ...product, ...values },
      toast,
      navigate,
      limit,
      skip,
    });
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
      {/* Breadcrumb for navigating product page */}
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          {
            title: <Link to="/">Product</Link>,
          },
          {
            title: product?.title,
          },
        ]}
      />

      {productLoading || categoriesLoading ? (
        <>
          {/* LOADING SKELETON  */}
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
        //  RENDER FORM COMPONENT
        <FormComponent
          isLoading={isLoading}
          title="Edit Product"
          formData={formData}
          formSubmit={formSubmit}
          defaultValues={product}
        />
      )}

      {/* TOAST MESSAGE DEPENDENCY */}
      {toastContextHolder}
    </>
  );
};

export default ProductEdit;
