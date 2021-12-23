import { Formik } from "formik";
import { Button, Card, CardContent } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import "./signup.css";
import app_config from "../config";
import Swal from "sweetalert2";
import { useState } from "react";

const AddPodcast = () => {
  const url = app_config.api_url;

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  // Two important thing to use with Formik
  // 1. formObject
  const podcastForm = {
    title: "",
    tags: "",
    description: "",
    thumbnail: "",
    file: "",
    author: currentUser._id,
  };

  // 2. submit callback function
  const podcastSubmit = (formdata) => {
    console.log(formdata);

    // three things are required to request
    // 1. address
    // 2. http request method
    // 3. data and its format

    const reqOpt = {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url + "/podcast/add", reqOpt)
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Added Podcast successfully!",
        });
      });
  };

  return (
    <div className="signup-bg">
      <h1 className="text-center">Add New Podcast</h1>
      <hr />
      <div className="col-md-4 mx-auto">
        <Card>
          <CardContent>
            <Formik initialValues={podcastForm} onSubmit={podcastSubmit}>
              {({ values, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <label className="mt-3">Title</label>
                  <input
                    placeholder="title"
                    className="form-control"
                    id="title"
                    value={values.title}
                    onChange={handleChange}
                  />

                  <label className="mt-3">Username</label>
                  <input
                    placeholder="username"
                    className="form-control"
                    id="username"
                    value={values.username}
                    onChange={handleChange}
                  />

                  <label className="mt-3">Password</label>
                  <input
                    type="password"
                    placeholder="password"
                    className="form-control"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    className="w-100 mt-5"
                    variant="contained"
                    color="secondary"
                    startIcon={<GoogleIcon />}
                  >
                    Register to Continue
                  </Button>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddPodcast;
