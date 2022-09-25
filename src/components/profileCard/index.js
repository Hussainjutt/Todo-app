import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";
import { useSelector } from "react-redux";
import Dummy from "../../assets/images/dummy-man.png";
import ErrorImg from "../../assets/images/errorImg.jpg";
import { Skeleton } from "@mui/material";
const Index = ({ num, setNum, loader }) => {
  const data = useSelector((state) => state.profileReducer.userInfo);
  return (
    <div className="profile_page_container">
      <div className="profile_card_image_container">
        {loader ? (
          <Skeleton
            sx={{ bgcolor: "white" }}
            variant="circular"
            height={160}
            width={160}
            animation="wave"
            style={{
              position: "absolute",
              bottom: "-60px",
            }}
          />
        ) : (
          <img
            src={
              data.profile_pic === null
                ? Dummy
                : `${process.env.REACT_APP_IMG_URL}/${data.profile_pic}`
            }
            onError={(e) => (e.target.src = ErrorImg)}
            alt="Somthing went wrong"
          />
        )}
      </div>
      <div className="profile_card_content">
        <h3 className="card_name">
          {loader ? (
            <Skeleton
              variant="text"
              height={22}
              width={105}
              animation="wave"
              style={{ margin: "auto" }}
            />
          ) : (
            <>
              {data.first_name === ""
                ? "user name"
                : `${data.first_name} ${data.last_name}`}
            </>
          )}
        </h3>
        <p className="card_email">
          {loader ? (
            <Skeleton
              variant="text"
              height={35}
              width={220}
              animation="wave"
              style={{ margin: "auto" }}
            />
          ) : (
            data.email
          )}
        </p>
        <p className="card_dtb">
          {loader ? (
            <Skeleton
              variant="text"
              height={35}
              width={220}
              animation="wave"
              style={{ margin: "auto", marginTop: "1rem" }}
            />
          ) : (
            <>🎂 {data.date_of_birth}</>
          )}
        </p>
        {loader ? (
          <Skeleton
            className="w-50"
            variant="rounded"
            height={35}
            animation="wave"
            style={{ margin: "auto", marginTop: "1rem" }}
          />
        ) : (
          <Button
            variant="dark"
            className="w-50"
            onClick={() => setNum(num + 1)}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;
