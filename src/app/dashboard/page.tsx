"use client";

import ListItem from "@/components/listItem/listItem";
import { UserTypes } from "@/constants/appConstants";
import { clearUser, getCurrentUser, getUser } from "@/utils/localStorage";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logout_icon from "@/assets/images/logout_icon.svg";
import Image from "next/image";

interface User {
  fullName: string;
  email: string;
  password: string;
  type: number;
}

const Dashboard: NextPage = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [userList, setUserList] = useState<User[]>([]);
  const [userType, setUserType] = useState(UserTypes.USER);

  const router = useRouter();

  useEffect(() => {
    const loginUser = getCurrentUser();
    if (loginUser) {
      const userData = JSON.parse(loginUser);
      setCurrentUser(userData.fullName);
      if (userData.type === UserTypes.ADMIN) {
        setUserType(userData.type);
        const users = getUser();
        if (users) {
          const userDetailsList = JSON.parse(users);
          setUserList(userDetailsList);
        }
      }
    } else {
      router.replace("/");
    }
  }, []);

  const logoutHandler = () => {
    clearUser();
    router.replace("/");
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col bg-primaryBg justify-start items-center p-4 pt-16">
      <Image
        className="w-8 fixed top-4 right-4 cursor-pointer"
        alt="Logout"
        src={logout_icon}
        onClick={() => logoutHandler()}
      />
      {userType === UserTypes.USER ? (
        <div className="text-4xl font-bold text-center text-textPrimary">
          Welcome {currentUser}
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-[50rem]">
          <div className="text-xl text-textPrimary mb-8">User List</div>
          <div className="flex flex-col w-full items-center justify-start gap-6">
            {userList.map((item, index) => (
              <ListItem
                key={index + Math.random()}
                name={item.fullName}
                email={item.email}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
