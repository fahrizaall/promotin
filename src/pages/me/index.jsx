import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Auth from "../auth";
import { Dropdown, LoadingBox } from "../../components";
import "./me.scss";

const Me = () => {
  const [displayed, setDisplayed] = useState("");
  const [open, setOpen] = useState(false);
  const nodeEmail = useRef();
  const nodePassword = useRef();
  const nodeDetails = useRef();
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ role, setRole ] = useState('user');

  useEffect(() => {
    axios
      .post("//promotin.herokuapp.com/api/v1/auth/user/find", {
        _id: Auth.getCurrentUser().data.id,
      })
      .then(response => {
        setName(response.data.data.name)
        setEmail(response.data.data.email)
        setRole(response.data.data.role)
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const handleClickOutside = (e) => {
    if (
      nodeEmail &&
      nodeEmail.current &&
      nodeEmail.current.contains(e.target)
    ) {
    } else if (
      nodePassword &&
      nodePassword.current &&
      nodePassword.current.contains(e.target)
    ) {
    } else if (
      nodeDetails &&
      nodeDetails.current &&
      nodeDetails.current.contains(e.target)
    ) {
    } else setOpen(false);
  };

  return (
    <div className="me-container">
      <div className="head">
        {/* <img src="" alt="profil-img" /> */}
        <div className="profil-img"></div>
        <div className="basic-info">
          <h3 className="name">{name !== '' ? name : <LoadingBox height="1.5rem" width="150px" borderRadius="1000px" />}</h3>
          <p className="email" style={{marginTop: '7px'}}>{email !== '' ? email : <LoadingBox height="1rem" width="200px" borderRadius="1000px" />}</p>
        </div>
        {
            role !== "user" ? 
            <p className={'role role-'+role}>{role.toUpperCase()}</p>
            :""
          }
      </div>
      <div className="account-setting">Account Setting</div>
      <div className="setting-menu">
        <div
          className="update u-email"
          onClick={() => {
            setDisplayed("email");
            setOpen(!open);
          }}
        >
          <p>Update Email</p>
          <span>l</span>
        </div>

        <div
          className="update u-password"
          onClick={() => {
            setDisplayed("password");
            setOpen(!open);
          }}
        >
          <p>Change Password</p>
          <span>l</span>
        </div>

        <div
          className="update u-details"
          onClick={() => {
            setDisplayed("details");
            setOpen(!open);
          }}
        >
          <p>Update detail</p>
          <span>l</span>
        </div>
      </div>

      <div
        className={`pop-up email ${
          open && displayed === "email" ? "show" : ""
        }`}
        ref={nodeEmail}
      >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />

        <button className="save-btn">Simpan</button>
      </div>

      <div
        className={`pop-up password ${
          open && displayed === "password" ? "show" : ""
        }`}
        ref={nodePassword}
      >
        <label htmlFor="old-pass">Old Password</label>
        <input type="password" name="old-pass" />

        <label htmlFor="new-pass">New Password</label>
        <input type="password" name="new-pass" />

        <button className="save-btn">Simpan</button>
      </div>

      <div
        className={`pop-up details ${
          open && displayed === "details" ? "show" : ""
        }`}
        ref={nodeDetails}
      >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />

        <label htmlFor="name">Lokasi</label>
        <input type="text" name="name" />

        <label htmlFor="no-hp">No Hp</label>
        <input type="text" name="no-hp" />

        <button className="save-btn">Simpan</button>
      </div>
    </div>
  );
};

export default Me;
