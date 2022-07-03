export default () => {
  const user = useState("user");
  console.log("user in useUser:", user);

  const localUser = localStorage.getItem("user");
  if (!localUser) {
    navigateTo("/login");
  } else {
    console.log("setting user from localStorage");
    useState("user", () => JSON.parse(localUser));
  }

  return user;
};
