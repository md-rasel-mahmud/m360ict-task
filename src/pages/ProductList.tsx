import { FC } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../api/services/product/product.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setProductLimit,
  setProductSkip,
} from "../redux/slices/queryParamsSlice";
import { Table } from "antd";
import useProductTableColumns from "../hooks/table-columns/useProductTableColumns";

const ProductList: FC = () => {
  // ================= PACKAGE HOOKS =================
  // -> REDUX STATE
  const { limit, skip } = useSelector(
    (state: RootState) => state.queryParams.product
  );

  // -> REDUX DISPATCH
  const dispatch = useDispatch();

  // -> GET NAVIGATE FROM HOOK
  const navigate = useNavigate();

  // ================= RTK GET QUERY =================
  // @GET /products?limit=10&skip=0
  const { data, isLoading, isFetching } = productService.useGetProductsQuery({
    limit,
    skip,
  });

  // ================= CUSTOM HOOKS =================
  // -> TABLE COLUMNS
  const columns = useProductTableColumns({ navigate });

  return (
    <div>
      <Table
        scroll={{ x: "100vw" }}
        pagination={{
          current: skip / limit + 1,
          pageSize: limit,
          total: data?.total,
          onChange: (page, pageSize) => {
            dispatch(setProductSkip((page - 1) * pageSize));
            dispatch(setProductLimit(pageSize));
          },
        }}
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={data?.products}
      />
    </div>
  );
};

export default ProductList;
