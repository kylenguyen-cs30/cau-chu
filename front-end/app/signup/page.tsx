"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Button from "../components/ui/button/page";

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

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
    <div className="fixed inset-0 flex flex-col justify-between items-center p-60 z-50">
      <div className=" relative  p-4 w-full max-h-full max-w-md rounded-lg shadow  ">
        <div className="flex flex-col items-center justify-between  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <Image
            src="/image/logo3-cropped.png"
            alt="logo"
            width={50}
            height={50}
            className="object-cover rounded"
          />
          <h3 className="text-xl">Create your account</h3>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 md:p-5 justify-center items-center"
        >
          <div className="mb-4 flex flex-col">
            <div className="mb-4 flex flex-col">
              <label htmlFor="email" className="text-sm font-medium">
                Email:{" "}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded px-4 py-2"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="username" className="text-sm font-medium">
                Username:{" "}
              </label>
              <input
                type="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="border rounded px-4 py-2"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <div className="flex p-3 justify-between m-5">
              <Button type="submit">Reigster</Button>
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
