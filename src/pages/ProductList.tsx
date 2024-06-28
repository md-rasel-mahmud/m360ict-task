import { FC } from "react";
import { Table } from "antd";
import { TableProps } from "antd/es/table";
import productService from "../api/services/product/product.service";
import { Product } from "../api/services/product/product.type";

const ProductList: FC = () => {
  const { data } = productService.useGetProductsQuery({ limit: 10, skip: 0 });

  console.log(data);

  const columns: TableProps<Product>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => tags.join(", "),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Dimensions",
      dataIndex: "dimensions",
      key: "dimensions",
      render: (dimensions) =>
        `${dimensions.width} x ${dimensions.height} x ${dimensions.depth}`,
    },
    {
      title: "Warranty Information",
      dataIndex: "warrantyInformation",
      key: "warrantyInformation",
    },
    {
      title: "Shipping Information",
      dataIndex: "shippingInformation",
      key: "shippingInformation",
    },
    {
      title: "Availability Status",
      dataIndex: "availabilityStatus",
      key: "availabilityStatus",
    },
    {
      title: "Minimum Order Quantity",
      dataIndex: "minimumOrderQuantity",
      key: "minimumOrderQuantity",
    },
  ];

  return (
    <div>
      <Table
        scroll={{ x: "100vw" }}
        columns={columns}
        dataSource={data?.products}
      />
    </div>
  );
};

export default ProductList;
