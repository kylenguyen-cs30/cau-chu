"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import RegisterForm from "../components/register-form";

interface SignupFormData {
  username: string;
  email: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    username: "",
  });
  const [error, setError] = useState<string | null>(null);

  // NOTE: Document change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // NOTE: send the form back to server computer
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("http://127.0.0.1:5000/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status == 201) {
        alert("Sign up Successfully");
        router.push("/login"); // redirect back to login
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setError(error.response.data.error || "An error during sign up");
        } else {
          setError("Network error. Please try again !!");
        }
      } else {
        setError("An Unexpected error occurred.");
      }
    }
  };

  // NOTE: going back to the homepage
  const handleBack = () => {
    router.push("/");
  };
  return (
    <RegisterForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      handleBack={handleBack}
    ></RegisterForm>
  );
}
