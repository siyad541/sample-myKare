"use client";
import React from "react";

interface TextFieldProperties {
  label?: string;
  variant: string;
  value: string | number;
  type: string;
  placeholder?: string;
  isError?: boolean | string;
  touched?: boolean;
  name: string;
  helperText?: string | boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Textfield = React.memo(
  ({
    type,
    placeholder,
    variant,
    value,
    handleChange,
    name,
    touched,
    isError,
    helperText,
    label,
  }: TextFieldProperties) => {

    const variantHandler = (data: string) => {
      switch (data) {
        case "filled-primary": {
          return "rounded-[2rem] bg-primaryBg border-0 outline-none text-textPrimary";
        }
        case "outlined": {
          return "text-base rounded-[1rem] min-h-[3.5rem] my-3 outline-none border-[1.5px] bg-transparent truncate border-borderSecondary text-textPrimary shadow-inputShadow placeholder:text-placeholderColor focus:border-[2px]";
        }
      }
    };

    return (
      <div className="w-full flex flex-col relative mb-4">
        {label && (
          <div className="text-base w-full text-textPrimary">
            {label}
          </div>
        )}
        <div className="w-full flex items-center relative">
          <input
            placeholder={placeholder}
            type={type}
            value={value}
            name={name}
            onChange={handleChange}
            className={`text-sm px-6 w-full ${variantHandler(variant)}`}
          />
        </div>
        {isError && touched ? (
          <div className="text-xs absolute text-left -bottom-2  text-warningColor text-ellipsis sm:-bottom-2">
            *{helperText}
          </div>
        ) : null}
      </div>
    );
  }
);
export default Textfield;
