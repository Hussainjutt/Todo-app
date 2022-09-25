import React, { useState } from "react";
import Layout from "../../components/layout/index";
import ProfileCard from "../../components/profileCard/index";
import EditProfile from "../../components/editProfile/index";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Index = () => {
  const [num, setNum] = useState(0);
  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, 1500);
  return (
    <Layout title={"Profile"}>
      <Row style={{ zIndex: "-1" }}>
        <Col className="col-lg-8 col-md-7 col-sm-12 mb-5 col-12">
          <EditProfile num={num} loader={loader} />
        </Col>
        <Col className="col-lg-4 col-md-5 col-sm-12 col-12">
          <ProfileCard num={num} setNum={setNum} loader={loader} />
        </Col>
      </Row>
    </Layout>
  );
};

export default Index;
