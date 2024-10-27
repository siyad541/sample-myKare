"use client";

import { UserTypes } from "@/constants/appConstants";
import { getUser, setUser } from "@/utils/localStorage";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Button = dynamic(() => import("../components/button/button"));

interface Values {
  fullName?: string;
  email?: string;
  password?: string;
  type: UserTypes.ADMIN;
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedUsers = getUser();
    const adminData = {
      email: "admin@sample.com",
      fullName: "admin",
      password: "password#123",
      type: UserTypes.ADMIN,
    };

    let userData = [];

    if (storedUsers) {
      userData = JSON.parse(storedUsers);

      if (userData) {
        const adminExists = userData.find(
          (user: Values) => user.type === UserTypes.ADMIN
        );

        if (!adminExists) {
          userData.push(adminData);
          setUser(userData);
        }
      } else {
        setUser([adminData]);
      }
    } else {
      setUser([adminData]);
    }
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen gap-8 bg-primaryBg p-8">
      <div className="w-full flex flex-col justify-start items-center">
        <div className="text-4xl font-bold text-center text-textPrimary mb-24">
          Welcome to Sample Mykare!
        </div>
        <div className="text-lg font-medium text-center text-textPrimary">
          We&apos;re glad you&apos;re here. Explore, discover, and enjoy everything we
          have to offer.
        </div>
        <div className="text-lg font-semibold text-center text-textTernary">
          Dive in and start your journey with us!
        </div>
      </div>
      <div className="flex justify-center items-center gap-8 flex-wrap">
        <Button
          variant="filled"
          label="Register"
          click={() => router.push("register")}
        />
        <Button
          variant="outlined"
          label="Login"
          click={() => router.push("/login")}
        />
      </div>
    </div>
  );
}
