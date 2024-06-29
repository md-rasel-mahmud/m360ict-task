import { Rate, TableProps, Tag } from "antd";
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
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
      render: (value) => (
        <Tag style={{ textTransform: "capitalize" }}>{value}</Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (value) => <b>${value}</b>,
    },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      width: 100,
      render: (value) => <>{value}%</>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 150,
      render: (value) => <Rate disabled value={value} />,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 120,
      render: (value, row) => (
        <Tag color={row.availabilityStatus === "In Stock" ? "green" : "red"}>
          {row.availabilityStatus} ({value})
        </Tag>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      width: 100,
      render: (value: string[]) =>
        value.map((tag) => (
          <Tag key={tag} style={{ margin: 1 }}>
            {tag.toUpperCase()}
          </Tag>
        )),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 100,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      width: 110,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      width: 100,
    },
    {
      title: "Dimensions",
      dataIndex: "dimensions",
      width: 150,
      key: "dimensions",
      render: (value) => `${value?.width} x ${value?.height} x ${value?.depth}`,
    },
    {
      title: "Warranty",
      dataIndex: "warrantyInformation",
      key: "warrantyInformation",
      width: 110,
    },
    {
      title: "Shipping",
      dataIndex: "shippingInformation",
      key: "shippingInformation",
      width: 100,
    },
    {
      title: "Min QTY",
      width: 100,
      dataIndex: "minimumOrderQuantity",
      key: "minimumOrderQuantity",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
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
