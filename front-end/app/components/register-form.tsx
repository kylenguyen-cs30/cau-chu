import Image from "next/image";
import React from "react";
import Button from "../components/ui/button/page";

interface RegisterFormProps {
  formData: {
    email: string;
    username: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
  handleBack: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  handleBack,
  handleChange,
  error,
  handleSubmit,
}) => {
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
};

export default RegisterForm;
