import { FC } from "react";
import {
  GridColumn,
  InputFieldsType,
} from "../../types/components/InputFieldTypes";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Tooltip,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

/**
 * Props for the FormComponent component.
 */
interface InputFieldsPropType {
  /**
   * Array of form field configurations.
   */
  formData: InputFieldsType[];

  /**
   * Grid column layout configuration for form items.
   */
  column?: GridColumn;

  /**
   * Title for the form card.
   */
  title?: string;

  /**
   * Layout type for the form (`horizontal` or `vertical`).
   */
  layout?: "horizontal" | "vertical";

  /**
   * Initial values for the form fields.
   */
  defaultValues?: object;

  /**
   * Callback function invoked on form submission.
   * @param values - Form values object.
   */
  formSubmit: (values: object) => void;

  /**
   * Indicates if the form contains a dynamic form list.
   */
  hasFormList?: boolean;

  /**
   * Loading state for form submission.
   */
  isLoading: boolean;
}

/**
 * FormComponent is a reusable React component for rendering a dynamic form.
 * It supports various types of form fields and can include a dynamic form list.
 *
 * @example
 * // Example usage:
 * // Render a simple vertical form with text and select inputs
 * <FormComponent
 *   formData={[
 *     { type: 'text', name: 'firstName', label: 'First Name' },
 *     { type: 'text', name: 'lastName', label: 'Last Name' },
 *     { type: 'select', name: 'gender', label: 'Gender',
 *        options: [
 *          { label: 'Male', value: 'male' },
 *          { label: 'Female', value: 'female' }]
 *        },
 *     ]}
 *   title="User Information"
 *   formSubmit={(values) => console.log('Form submitted with values:', values)}
 *   isLoading={false}
 * />
 */
const FormComponent: FC<InputFieldsPropType> = ({
  formData,
  column = { xs: 1, sm: 1, md: 2, lg: 3, xl: 3 },
  title,
  layout = "vertical",
  defaultValues,
  formSubmit,
  isLoading,
  hasFormList = false,
}) => {
  const visibleFormData = formData.filter(
    ({ visibility = true }) => visibility // Filtered form data based on visibility flag
  );

  /**
   * Helper function to render form items based on input type.
   *
   * @param input - Form field configuration object.
   * @param index - Index of the form field in the formData array.
   * @returns Rendered JSX element for the form item.
   */
  const renderFormItem = (
    input: InputFieldsType,
    index: number
  ): JSX.Element => {
    const itemColumn: GridColumn = input.column || column; // Column configuration for current item
    const colProps = {
      key: index,
      xs: itemColumn.xs && 24 / itemColumn.xs,
      sm: itemColumn.sm && 24 / itemColumn.sm,
      md: itemColumn.md && 24 / itemColumn.md,
      lg: itemColumn.lg && 24 / itemColumn.lg,
      xl: itemColumn.xl && 24 / itemColumn.xl,
    };

    // Render different types of form items based on input type
    switch (input.type) {
      case "text":
      case "number":
        return (
          <Col {...colProps}>
            <Form.Item {...input} name={input.name} label={input.label}>
              <Input disabled={input.disabled} type={input.type} />
            </Form.Item>
          </Col>
        );

      case "textarea":
        return (
          <Col {...colProps}>
            <Form.Item name={input.name[0]} label={input.label}>
              <TextArea disabled={input.disabled} />
            </Form.Item>
          </Col>
        );

      case "select":
        return (
          <Col {...colProps}>
            <Form.Item name={input.name[0]} label={input.label}>
              <Select
                options={input.options}
                loading={input.optionLoading}
                disabled={input.disabled}
              />
            </Form.Item>
          </Col>
        );

      case "form-list":
        return (
          <Col key={index} xs={24}>
            <Divider />
            <Form.Item label={input.label}>
              {input.name && (
                <Form.List name={input.name[0]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => {
                        if (input.formListItems) {
                          return (
                            <Row key={key}>
                              <Col xs={22}>
                                <FormComponent
                                  formData={input.formListItems.map(
                                    (formListItem) => ({
                                      ...formListItem,
                                      ...restField,
                                      name: [name, formListItem.name[0]],
                                    })
                                  )}
                                  isLoading={false}
                                  column={column}
                                  layout="vertical"
                                  formSubmit={() => {}}
                                  hasFormList
                                />
                              </Col>
                              <Col
                                xs={2}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Tooltip title="Remove Item">
                                  <Button
                                    danger
                                    type="link"
                                    icon={<DeleteOutlined />}
                                    onClick={() => remove(name)}
                                  />
                                </Tooltip>
                              </Col>
                            </Row>
                          );
                        }
                      })}
                      <Button
                        icon={<PlusOutlined />}
                        type="dashed"
                        onClick={() => add()}
                        block
                      >
                        Add Item
                      </Button>
                    </>
                  )}
                </Form.List>
              )}
            </Form.Item>
          </Col>
        );

      default:
        return <></>; // Default case returns an empty fragment
    }
  };

  // Component rendering based on hasFormList prop
  return (
    <>
      {hasFormList ? (
        <Row gutter={5}>
          {/* Render visible form data items */}
          {visibleFormData.map((input, index) => renderFormItem(input, index))}
        </Row>
      ) : (
        <Card title={title}>
          <Form
            layout={layout}
            initialValues={defaultValues}
            onFinish={formSubmit}
          >
            <Row gutter={5}>
              {/* Render visible form data items */}
              {visibleFormData.map((input, index) =>
                renderFormItem(input, index)
              )}
            </Row>
            {/* Button group for form actions */}
            <Flex gap={5} align="end" justify="end">
              <Form.Item>
                <Button type="default" htmlType="reset">
                  Reset
                </Button>
              </Form.Item>
              <Form.Item>
                <Button loading={isLoading} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Card>
      )}
    </>
  );
};

export default FormComponent;
