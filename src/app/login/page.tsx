"use client";
import React, { useState } from "react";
import { NextPage } from "next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
import { getUser, setActiveUser } from "@/utils/localStorage";

interface Values {
  email?: string;
  password?: string;
}

const Login: NextPage = () => {
  const [status, setStatus] = useState("");

  const router = useRouter();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("This field is required")
      .email("Enter a valid email"),
    password: yup.string().required("This Field is Required"),
  });

  const handleLogin = (values: Values) => {
    const { email, password } = values;

    const users = getUser();

    if (users) {
      const storedUsers = JSON.parse(users) || [];

      const user = storedUsers.find(
        (user: Values) => user.email === email && user.password === password
      );

      if (user) {
        setStatus("Login successful!");

        setActiveUser({
          fullName: user.fullName,
          email: user.email,
          type: user.type
        })
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setStatus("Incorrect email or password");
      }
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col bg-primaryBg justify-center items-end p-2 md:items-end sm:!p-4">
      <div className="flex h-full flex-col w-full px-12 py-12 gap-10 max-w-[35rem] backdrop-blur-sm bg-primaryBg shadow-ShadowBox rounded-[2rem] xl:px-12 md:px-28 xl:max-w-[40rem] sm:!px-8">
        <div className="text-2xl text-center text-textPrimary font-semibold">
          Welcome to Sample Mykare!
        </div>
        <div className="text-lg text-center text-textPrimary">Login</div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ handleChange, values, errors, touched, submitForm }) => (
            <Form
              className="flex flex-col gap-4"
              onKeyDown={(event: { key: string }) => {
                if (event.key === "Enter") {
                  submitForm();
                }
              }}
            >
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

export default Login;
