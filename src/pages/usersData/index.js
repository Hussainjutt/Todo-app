import React from "react";
import Layout from "../../components/sidebar";
import UsersTable from "../../components/userList/index";
const Index = () => {
  return (
    <Layout title={"User's List"}>
      <div className="Layout_2" id="scroller">
        <UsersTable />
      </div>
    </Layout>
  );
};

export default Index;
