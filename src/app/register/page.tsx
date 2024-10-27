"use client";
import React, { useState } from "react";
import { NextPage } from "next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
import { getUser, setUser } from "@/utils/localStorage";
import { UserTypes } from "@/constants/appConstants";

interface Values {
  fullName?: string;
  email?: string;
  password?: string;
}

const Register: NextPage = () => {
  const [status, setStatus] = useState("");

  const router = useRouter();
  const validationSchema = yup.object({
    fullName: yup.string().required("This field is required"),
    email: yup
      .string()
      .required("This field is required")
      .email("Enter a valid email"),
    password: yup.string().required("This Field is Required"),
  });

  const handleRegister = (values: Values) => {
    const { fullName, email, password } = values;

    const storedUsers = getUser();
    let userData = [];
    userData = storedUsers ? JSON.parse(storedUsers) : [];

    if (typeof userData === "string") {
      userData = JSON.parse(userData);
    }
    const userExists = userData.find((user: Values) => user.email === email);
    if (userExists) {
      setStatus("User with this email already exists.");
      return;
    }

    const newUser = { fullName, email, password };
    userData.push({ ...newUser, type: UserTypes.USER });
    setUser(userData);

    setStatus("Registration successful");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col bg-primaryBg justify-center items-end p-8 md:items-end">
      <div className="flex flex-col w-full px-4 py-8 gap-12 max-w-[35rem] backdrop-blur-sm bg-primaryBg shadow-ShadowBox rounded-[2rem] xl:px-12 md:px-28 xl:max-w-[40rem] sm:!px-8">
        <div className="w-full flex flex-col items-center justify-start gap-4">
          <div className="text-2xl text-center text-textPrimary font-semibold">
            Welcome to Sample Mykare!
          </div>
          <div className="text-lg text-center text-textPrimary">Sign Up</div>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            fullName: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleRegister(values);
          }}
        >
          {({ handleChange, values, errors, touched, submitForm }) => (
            <Form
              className="flex flex-col justify-around"
              onKeyDown={(event: { key: string }) => {
                if (event.key === "Enter") {
                  submitForm();
                }
              }}
            >
              <TextField
                label={"Full Name"}
                variant="outlined"
                type="text"
                name="fullName"
                value={values.fullName}
                handleChange={handleChange}
                touched={touched.email}
                isError={errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                label={"Email"}
                variant="outlined"
                type="text"
                name="email"
                value={values.email}
                handleChange={handleChange}
                touched={touched.email}
                isError={errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                label={"Password"}
                variant="outlined"
                type="password"
                name="password"
                value={values.password}
                handleChange={handleChange}
                touched={touched.password}
                isError={errors.password}
                helperText={touched.password && errors.password}
              />
              <div className="flex justify-center w-full gap-4 my-4">
                <Button variant="filled" label={"Sign In"} click={submitForm} />
              </div>
              <div className="w-full text-center text-warningColor text-ellipsis mt-4 text-base">
                {status}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
