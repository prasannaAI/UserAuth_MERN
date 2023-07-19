import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  async function userLogout(id) {
    console.log(id);
    const response = await fetch(`http://localhost:3001/api/logout?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);

    if (result.status === "ok") {
      console.log("Logged out success");
      toast.success(result.message, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("loginId");
      localStorage.removeItem("isLoggedIN");
      setTimeout(() => {
        window.location.href = "/loginForm";
      }, 3000);
    } else {
      console.log("Logged out failed");
      toast.success(result.message, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="flex justify-around p-8">
      <ToastContainer />
      <div>HomePage</div>
      <div>
        <button
          className="outline rounded-sm p-2"
          onClick={() => userLogout(localStorage.getItem(`loginId`))}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
