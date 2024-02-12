import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispacth = useDispatch();

  const handleCHange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("All fields are required");
    }
    try {
      dispacth(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispacth(signInFailure(data.message));
      }
      setLoading(false);
      if (res.ok) {
        dispacth(signInSuccess(data.user));
        navigate("/signin");
      }
    } catch (error) {
      dispacth(signInFailure(data.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
          <Link className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to pink-500 rounded-lg text-white">
              Yashraj's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is demo project. You can signin with email password
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleCHange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleCHange}
              />
            </div>

            <Button
              disabled={loading}
              className="mt-2"
              gradientDuoTone="purpleToPink"
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner color="white" size="sm" />
                  <span>Loading..</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Doesnt Have an account?</span>
            <Link to="/signup" className="text-blue-500 ">
              Sign up
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" className="mt-5">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
