import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";
import { useSelector } from "react-redux";
import Dummy from "../../assets/images/dummy-man.png";
import ErrorImg from "../../assets/images/errorImg.jpg";
const Index = ({ num, setNum }) => {
  const data = useSelector((state) => state.profileReducer.userInfo);
  return (
    <div className="profile_page_container">
      <div className="profile_card_image_container">
        <img
          src={
            data.profile_pic === null
              ? Dummy
              : `${process.env.REACT_APP_IMG_URL}/${data.profile_pic}`
          }
          onError={(e) => (e.target.src = ErrorImg)}
          alt="Somthing went wrong"
        />
      </div>
      <div className="profile_card_content">
        <h3 className="card_name">
          {data.first_name === ""
            ? "user name"
            : `${data.first_name} ${data.last_name}`}
        </h3>
        <p className="card_email">{data.email}</p>
        <p className="card_dtb">🎂 {data.date_of_birth}</p>
        <Button variant="dark" className="w-50" onClick={() => setNum(num + 1)}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default Index;
