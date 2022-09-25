import React from "react";
import { useState } from "react";
import Layout from "../../components/layout/index";
import UsersTable from "../../components/userList/index";
const Index = () => {
  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, 1500);
  return (
    <Layout title={"User's List"}>
      <UsersTable loader={loader} />
    </Layout>
  );
};

export default Index;
