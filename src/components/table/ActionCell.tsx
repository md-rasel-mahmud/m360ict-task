import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
import { FC } from "react";

interface ActionCellPropsType {
  view: {
    tooltip: string;
    onClick: () => void;
  };
  edit: {
    onClick: () => void;
    tooltip: string;
  };
}

const ActionCell: FC<ActionCellPropsType> = ({ edit, view }) => {
  return (
    <Flex gap=".1rem" vertical>
      <Tooltip title={view.tooltip}>
        <Button type="primary" htmlType="button" onClick={view.onClick}>
          <EyeOutlined />
        </Button>
      </Tooltip>

      <Tooltip title={edit.tooltip}>
        <Button type="default" htmlType="button" onClick={edit.onClick}>
          <EditOutlined />
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default ActionCell;
