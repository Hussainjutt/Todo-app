import React, { useState } from "react";
import Layout from "../../components/sidebar/index";
import ProfileCard from "../../components/profileCard/index";
import EditProfile from "../../components/editProfile/index";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Index = () => {
  const [num, setNum] = useState(0);
  return (
    <Layout title={"Profile"}>
      <Row className="Layout_1" id="scroller">
        <Col className="col-lg-8 col-md-7 col-sm-12 mb-5">
          <EditProfile num={num} />
        </Col>
        <Col className="col-lg-4 col-md-5 col-sm-12">
          <ProfileCard num={num} setNum={setNum} />
        </Col>
      </Row>
    </Layout>
  );
};

export default Index;
