import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Config } from '../../../../../config';
import { useSession } from "next-auth/react";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Form = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  console.log("Session data:", session);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = window.localStorage.getItem('userID');

    if (newPassword !== confirmPassword) {
      setSnackbarMessage("New Password and Confirm Password do not match.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${Config.NEXT_PUBLIC_SERVER_HOST}/change-password`, {
        userID: session.user.userID,
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        setSnackbarMessage("Password changed successfully.");
        setSnackbarOpen(true);
        setTimeout(() => router.push('/'), 2000);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setSnackbarMessage("Failed to change password. Please try again.");
      setSnackbarOpen(true);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Old Password */}
        <div className="form-group col-lg-7 col-md-12">
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        {/* New Password */}
        <div className="form-group col-lg-7 col-md-12">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="form-group col-lg-7 col-md-12">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Update
          </button>
        </div>
      </div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </form>
  );
};

export default Form;