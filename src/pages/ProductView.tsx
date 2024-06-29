import { Link, useParams } from "react-router-dom";
import productService from "../api/services/product/product.service";
import Title from "antd/es/typography/Title";
import {
  Card,
  Descriptions,
  Image,
  Rate,
  Tag,
  Typography,
  Divider,
  List,
  Breadcrumb,
} from "antd";

const ProductView = () => {
  // -> GET productId FROM URL PARAMS
  const { productId } = useParams<{ productId: string }>();

  // ================= RTK GET QUERY =================
  // @GET /products/:productId
  const { data, isLoading } = productService.useGetProductByIdQuery(
    parseInt(productId ?? "0"),
    {
      skip: !productId,
    }
  );

  const { Text } = Typography;

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
            title: data?.title,
          },
        ]}
      />

      <Title level={2}>Product Views</Title>

      <Card
        style={{ marginTop: "20px" }}
        loading={isLoading}
        title={data?.title}
      >
        <Image width={200} src={data?.thumbnail} />

        {/* OVERVIEW */}
        <Descriptions bordered style={{ marginTop: "20px" }}>
          <Descriptions.Item label="Price">
            <b>${data?.price}</b>
          </Descriptions.Item>
          <Descriptions.Item label="Discount">
            {data?.discountPercentage}%
          </Descriptions.Item>
          <Descriptions.Item label="Rating">
            <Rate disabled value={data?.rating} />
          </Descriptions.Item>
          <Descriptions.Item label="Stock">
            {data?.stock ? (
              <Tag color={data?.stock > 10 ? "green" : "red"}>
                {data?.availabilityStatus} ({data?.stock} in stock)
              </Tag>
            ) : (
              <Tag color="red">Out of Stock</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Brand">{data?.brand}</Descriptions.Item>
          <Descriptions.Item label="SKU">{data?.sku}</Descriptions.Item>
          <Descriptions.Item label="Weight">{data?.weight}g</Descriptions.Item>
          <Descriptions.Item label="Dimensions">
            {data?.dimensions.width} x {data?.dimensions.height} x{" "}
            {data?.dimensions.depth} mm
          </Descriptions.Item>
          <Descriptions.Item label="Warranty">
            {data?.warrantyInformation}
          </Descriptions.Item>
          <Descriptions.Item label="Shipping">
            {data?.shippingInformation}
          </Descriptions.Item>
          <Descriptions.Item label="Return Policy">
            {data?.returnPolicy}
          </Descriptions.Item>
          <Descriptions.Item label="Minimum Order Quantity">
            {data?.minimumOrderQuantity}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        {/* DESCRIPTION */}
        <Title level={4}>Description</Title>
        <Text>{data?.description}</Text>

        <Divider />

        {/* TAGS */}
        <Title level={4}>Tags</Title>
        {data?.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}

        <Divider />

        {/* REVIEWS */}
        <Title level={4}>Reviews</Title>
        <List
          itemLayout="horizontal"
          dataSource={data?.reviews}
          renderItem={(review) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Rate disabled value={review.rating} />}
                title={review.reviewerName}
                description={review.comment}
              />
              <Text type="secondary">
                {new Date(review.date).toLocaleDateString()}
              </Text>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default ProductView;
