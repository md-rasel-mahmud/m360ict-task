import { Rule } from "antd/es/form";

export type GridColumn = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

export type InputFieldsType = {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  visibility?: boolean;
  size?: "small" | "medium";
  column?: GridColumn;
  name: (string | number)[];
  rules?: Rule[];
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formListItems?: InputFieldsType[];
  optionLoading?: boolean;
  options?: { label: string; value: string | number }[];
};
