"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Button from "../components/ui/button/page";
import PortalModal from "../components/portalModal";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill(""),
  );
  const [formData, setFormData] = useState({ email: "" });

  // NOTE: handle change the input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // NOTE: submit data to /send_verification_code backend server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/send_verification_code",
        {
          email: formData.email,
        },
      );

      if (response.status === 200) {
        setShowModal(true); // show the modal on success
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "An unexpected error occurred");
      } else {
        setError("An Unexpected error occurred");
      }
    }
  };

  // NOTE: handle verification code
  const handleVerificationChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
  };

  // NOTE: navigate verified user back to homepage
  const handleVerify = async () => {
    const code = verificationCode.join("");
    try {
      const response = await axios.post("http://127.0.0.1:5000/verify_code", {
        email: formData.email,
        code,
      });

      if (response.status === 200) {
        setShowModal(false); // close the modal
        console.log("Login successfully");
        window.location.href = "/"; // navigate the users to the homepage
      } else {
        alert("incorrect code, try again!!");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Invalid code");
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
          <h3 className="text-xl">Login</h3>
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
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex p-3 justify-between m-5">
              <Button type="submit">Login</Button>
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Conditionally render modal  */}
      {showModal && (
        <PortalModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div>
            <h3 className="text-xl mb-4">Enter Verification Code</h3>
            <div>
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleVerificationChange(index, e.target.value)
                  }
                  className="w-12 h-12 text-center border rounded"
                />
              ))}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button onClick={handleVerify}>Login</Button>
          </div>
        </PortalModal>
      )}
    </div>
  );
}
