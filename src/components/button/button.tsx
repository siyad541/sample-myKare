"use client";
import React from "react";

interface ButtonProps {
  variant: string;
  label: string;
  className?: string;
  click: () => void;
}

const Button = React.memo(
  ({ variant, label, className, click }: ButtonProps) => {
    const variantHandler = (data: string) => {
      switch (data) {
        case "filled": {
          return "w-fit rounded-[1rem] min-h-[3.5rem] bg-secondaryBg text-textSecondary min-w-[10rem] text-base font-medium px-8";
        }
        case "outlined": {
          return "w-fit rounded-[1rem] min-h-[3.5rem] text-textTernary text-base outline outline-secondaryBg text-primary-color min-w-[10rem]";
        }
      }
    };

    return (
      <div
        className={`flex justify-center items-center px-12 py-2 text-base cursor-pointer
          ${variantHandler(variant)} ${className}`}
        onClick={() => click()}
      >
        {label}
      </div>
    );
  }
);
export default Button;
