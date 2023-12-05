import React, { useState } from "react";
import "./Password.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decryptThePass, deleteAPassword } from "../../axios/instance";
import { delPass } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Password({ id, name, password, email, iv }) {
  const [show, setShow] = useState(false);
  const [decPassword, setDecPassword] = useState(password);

  const dispatch = useDispatch();

  const deletePassword = async () => {
    try {
      const res = await deleteAPassword({ id });

      if (res.status === 400) {
      } else if (res.status === 200) {
        dispatch(delPass(id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const decryptPassword = async () => {
    try {
      if (!show) {
        const res = await decryptThePass({
          iv: iv,
          encryptedPassword: password,
          id: id,
        });

        if (res.status === 200) {
          setDecPassword(res.data);
          setShow(!show);
        }
      } else {
        setShow(!show);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="password">
      <ToastContainer />
      <div className="media">
        <i className={`fab fa-${name.toLowerCase()}`}></i>
        <h3 className="password__name"> {name} </h3>

        {/* {
          <FontAwesomeIcon
            className="delete__btn1"
            onClick={deletePassword}
            icon={faTrash}
          />
        } */}
      </div>

      <div className="email">
        <p> {email} </p>
      </div>

      <div className="user-password">
        <input
          type={show ? "text" : "password"}
          value={decPassword}
          disabled={true}
        />

        <FontAwesomeIcon icon={faEyeSlash} onClick={decryptPassword} />
      </div>

      {
        <FontAwesomeIcon
          className="delete__btn2"
          onClick={deletePassword}
          icon={faTrash}
        />
      }
    </div>
  );
}

export default Password;
