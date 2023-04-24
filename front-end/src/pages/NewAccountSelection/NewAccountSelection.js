import "./NewAccountSelection.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import React, { useState, useEffect } from 'react';
import CreateAccount from "../CreateAccount/CreateAccount";

function NewAccountSelection() {
  const [open, setOpen] = useState(false);

  const [selling, setSelling] = useState(false);
  const [buying, setBuying] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    setSelling(false);
    setBuying(false);
  }, [open])

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
      <Typography variant="h7" className="createAccountText2"  color="blue" onClick={handleOpen}>
        {/* <Button variant="primary" > */}
          Register an Account
        {/* </Button> */}
      </Typography>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          Why are you using Homie?
        </DialogTitle>
        <DialogContent>
          <div onClick={focusBuying} id="buying" className={"option "+(buying ? "focused" : " ") + (selling ? "hidden" : "")}>
            <div className="title">
              I'm here to browse!
              {(buying ? <div className="AccountCreation"><CreateAccount closeModal={handleClose} accountType="Buyer"/></div> : "")}
            </div>
          </div>
          <div onClick={focusSelling} id="selling" className={"option "+(selling ? "focused" : " ") + (buying ? "hidden" : "")}>
            <div className="title">
              I'm here to sell a property!
              {(selling ? <div className="AccountCreation"><CreateAccount closeModal={handleClose} accountType="Seller" /></div> : "")}
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
