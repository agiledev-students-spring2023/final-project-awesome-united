import "./NewAccountSelection.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NewAccountSelection() {
  const [show, setShow] = useState(false);

  const [selling, setSelling] = useState(false);
  const [buying, setBuying] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setSelling(false);
    setBuying(false);
  }, [show])

  const focusSelling = () => {
    setSelling(true);
    setBuying(false);
  }
  const focusBuying = () => {
    setSelling(false);
    setBuying(true);
  }

  return (
    <>
      <Typography variant="h7" className="createAccountText2" onClick={handleShow}>
        {/* <Button variant="primary" > */}
          Register an Account
        {/* </Button> */}
      </Typography>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Why are you using Homie?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div onClick={focusBuying} id="buying" className={"option "+(buying ? "focused" : "")}>
            <div className="title">
              I'm here to browse!
            </div>
          </div>
          <div onClick={focusSelling} id="selling" className={"option "+(selling ? "focused" : "")}>
            <div className="title">
              I'm here to sell a property!
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

// function NewAccountSelection() {
//   return (
//     <AccountSelectModal/>
//     <div className="NewAccountSelection">
//       <div className="Options">
//         <Typography variant="h5" className="questionText">
//           Why are you using Homie?
//         </Typography>
//         <Link
//           className="NewAccountSelectionLink"
//           to="/createAccount"
//           state={{ accountType: "seller" }}
//         >
//           <div>I'm Selling</div>
//         </Link>
//         <Link
//           className="NewAccountSelectionLink"
//           to="/createAccount"
//           state={{ accountType: "buyer" }}
//         >
//           <div>I'm Buying</div>
//         </Link>
//       </div>
//     </div>
//   );
// }

export default NewAccountSelection
