import { InputFieldsType } from "../../types/components/InputFieldTypes";

const useProductFormData = ({
  categoriesLoading,
  categories,
}: {
  categoriesLoading: boolean;
  categories: { name: string; slug: string }[] | undefined;
}) => {
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

  return formData;
};

export default useProductFormData;
