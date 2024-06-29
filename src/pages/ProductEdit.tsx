import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../api/services/product/product.service";
import FormComponent from "../components/form/FormComponent";
import { Breadcrumb, Col, Row, Skeleton, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useProductFormData from "../hooks/form-data/useProductFormData";

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

  // ================= CUSTOM HOOKS =================
  // -> GET FORM DATA
  const formData = useProductFormData({ categories, categoriesLoading });

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
