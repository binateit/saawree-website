import { FieldInputProps, FieldProps, FormikProps, FormikValues } from "formik";
import React from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { Options, PropsValue } from "react-select";
import { SelectOptionProps } from "./SelectOptionProps";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Options<SelectOptionProps>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  selectedValue?: any;

  // options:OptionsOrGroups<Options<SelectOptionProps> ,GroupBase<Options<SelectOptionProps>>>
  onDropDownChange?: (
    newValue: SingleValue<Option> | MultiValue<Option>
  ) => void;
}

const onSelectChange = (
  option: PropsValue<Option>,
  isMulti: boolean,
  field: FieldInputProps<any>,
  form: FormikProps<FormikValues>
) => {
  form.setFieldValue(
    field.name,
    isMulti
      ? (option as Option[]).map((item: Option) => item.value)
      : (option as Option).value
  );
};

export function CustomSelect({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  disabled = false,
  selectedValue = field.value,
  onDropDownChange,
}: CustomSelectProps) {
  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(
            (option: { value: any }) =>
              selectedValue && selectedValue.indexOf(option.value) >= 0
          )
        : options.find(
            (option: { value: any }) => option.value === selectedValue
          );
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={(e: any) => {
        if (onDropDownChange == undefined) {
          onSelectChange(e, isMulti, field, form);
        } else {
          onDropDownChange(e);
        }
      }}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      menuPosition='fixed'
      isDisabled={disabled}
    />
  );
}

export default CustomSelect;
