import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Password from "../../Components/Password/Password";
import "./Passwords.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveNewPassword, checkAuthenticated } from "../../axios/instance";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setPasswords } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
function Passwords() {
  const [platform, setPlatform] = useState("");
  const [platEmail, setPlatEmail] = useState("");
  const [platPass, setPlatPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);

  const history = useHistory();

  const { isAuthenticated, name, email, passwords } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const verifyUser = async () => {
    try {
      const res = await checkAuthenticated();

      if (res.status === 400) {
        dispatch(setAuth(false));
      } else {
        const { passwords } = res.data;
        console.log(res.data);
        dispatch(setPasswords(passwords));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewPassword = async () => {
    if (validateEmail(platEmail)) {
      try {
        const data = {
          platform: platform,
          userPass: platPass,
          platEmail: platEmail,
          userEmail: email,
        };

        const res = await saveNewPassword(data);

        if (res.status === 400) {
          toast.error(res.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (res.status === 200) {
          setOpen(false);
          verifyUser();
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setPlatform("");
          setPlatEmail("");
          setPlatPass("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const generatePass = (e) => {
    e.preventDefault();

    // Define possible character sets for the password
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numChars = "0123456789";
    const specialChars = "@#$^&_+-?";

    // Combine all characters into a single string
    const allChars = upperChars + lowerChars + numChars + specialChars;

    // A function to get a random character from a given set
    const getRandomChar = (characterSet) =>
      characterSet[Math.floor(Math.random() * characterSet.length)];

    // Start building the password with required character types to ensure strong password criteria
    let pass = "";
    pass += getRandomChar(upperChars);
    pass += getRandomChar(lowerChars);
    pass += getRandomChar(numChars);
    pass += getRandomChar(specialChars);

    // Calculate random password length between 10 and 15
    const passwordLength = Math.floor(Math.random() * (15 - 10 + 1) + 10);

    // Complete the rest of the password randomly
    for (let i = pass.length; i < passwordLength; i++) {
      pass += getRandomChar(allChars);
    }

    // Shuffle the generated password to ensure randomness of character positions
    pass = pass
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    // Set the generated password as needed (assuming setPlatPass is a state update function)
    setPlatPass(pass);
  };

  useEffect(() => {
    console.log("history", history);
    !isAuthenticated && history.replace("/passwords");
  }, [isAuthenticated, history]);

  return (
    <div className="passwords">
      <ToastContainer />
      <h1>
        Welcome <span className="name"> to Password Store </span>{" "}
      </h1>

      <div className="modal">
        <button className="modalButton" onClick={() => setOpen(true)}>
          Create a New Password
        </button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <h2>Create a New Password</h2>
          <form className="form">
            <div className="form__inputs">
              <label> Website </label>
              <input
                type="text"
                placeholder="E.g. Google"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
              />
            </div>

            <div className="form__inputs">
              <label> Email </label>
              <input
                type="email"
                placeholder="E.g. jhon@gmail.com"
                value={platEmail}
                onChange={(e) => setPlatEmail(e.target.value)}
                required
              />
            </div>

            <div className="form__inputs">
              <label> Password </label>
              <div className="password-input" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={platPass}
                  onChange={(e) => setPlatPass(e.target.value)}
                  style={{ paddingRight: "30px" }} // Make room for the icon
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash} // Toggle between eye and eye-slash
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={{
                    position: "absolute",
                    top: "50%", // Center vertically
                    right: "10px", // Distance from right
                    transform: "translateY(-50%)",
                    cursor: "pointer", // Indicate it's clickable
                  }}
                />
              </div>
            </div>
            <button className="genpass-btn" onClick={(e) => generatePass(e)}>
              {" "}
              Autogenerate Secured Password{" "}
            </button>
            <br />
            <button onClick={addNewPassword} className="add-btn">
              {" "}
              Add{" "}
            </button>
          </form>
        </Modal>
      </div>

      <hr />

      <div className="passwords__list">
        {passwords?.length !== 0 ? (
          passwords?.map((data) => {
            return (
              <Password
                key={data._id}
                id={data._id}
                name={data.platform}
                password={data.password}
                email={data.platEmail}
                iv={data.iv}
              />
            );
          })
        ) : (
          <div className="nopass">
            <p> You have not added any passwords yet. </p>
            <button className="modalButton" onClick={() => setOpen(true)}>
              {" "}
              Try Adding a password now{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Passwords;
