import React from "react";
import Layout from "../../components/layout/index";
import UsersTable from "../../components/userList/index";
const Index = () => {
  return (
    <Layout title={"User's List"}>
      <UsersTable />
    </Layout>
  );
};

export default Index;
