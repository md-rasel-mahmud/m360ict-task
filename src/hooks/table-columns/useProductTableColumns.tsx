import { TableProps } from "antd";
import { Product } from "../../types/api-services/product.type";
import ActionCell from "../../components/table/ActionCell";

interface UseProductTableColumnsProps {
  navigate: (url: string) => void;
}

const useProductTableColumns = ({ navigate }: UseProductTableColumnsProps) => {
  // -> TABLE COLUMNS
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
        `${dimensions?.width} x ${dimensions?.height} x ${dimensions?.depth}`,
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
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: ({ id }) => (
        <ActionCell
          edit={{
            onClick: () => navigate(`/product/edit/${id}`),
            tooltip: "Edit Product",
          }}
          view={{
            onClick: () => navigate(`/product/view/${id}`),
            tooltip: "View Product",
          }}
        />
      ),
    },
  ];
  return columns;
};

export default useProductTableColumns;
