interface Values {
  fullName?: string;
  email?: string;
  password?: string;
  type: number;
}
export const getUser = () => {
  return localStorage.getItem("users");
};

export const setUser = (data: Values[]) => {
    localStorage.setItem("users", JSON.stringify(data));
};

export const setActiveUser = (data: Values) => {
    localStorage.setItem("activeUser", JSON.stringify(data))
}

export const getCurrentUser = () => {
  return localStorage.getItem("activeUser");
}

export const clearUser = () => {
  localStorage.removeItem("activeUser");
}