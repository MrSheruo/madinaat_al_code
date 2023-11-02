"use client";
import React, { FormEvent, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSignIn = () => {
  const [error, setError] = useState("");

  const email = useRef<HTMLInputElement>(null); // Provide the type for useRef
  const userName = useRef<HTMLInputElement>(null); // Provide the type for useRef
  const password = useRef<HTMLInputElement>(null); // Provide the type for useRef
  const router = useRouter();
  const isPasswordValid = (password: string) => {
    // Password must be at least 8 characters and contain both letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: any = {
      email: email.current?.value,
      userName: userName.current?.value,
      password: password.current?.value,
    };
    if (!isPasswordValid(formData.password)) {
      setError(
        "Password must be at least 8 characters long and contain at least 1 letter and 1 number."
      );
      return;
    }

    try {
      const res = await axios.post("/api/users/signup", formData);
      if (res.data.message === "User already exists") {
        setError("User already exists, please sign in or type a valid email");
      } else {
        setError("");
      }

      if (res.data.message === "Created user successfully") router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      className="flex flex-col justify-center items-center gap-10"
      onSubmit={onFormSubmit}
    >
      <div className="grid w-full max-w-sm place-items-start gap-2 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          required
          ref={email}
          type="email"
          id="email"
          placeholder="Email"
          className="border-[#222]"
        />
      </div>
      <div className="grid w-full max-w-sm place-items-start gap-2 mb-4">
        <Label htmlFor="userName">User Name</Label>
        <Input
          required
          ref={userName}
          type="text"
          id="userName"
          placeholder="User Name"
          className="border-[#222]"
        />
      </div>
      <div className="grid w-full max-w-sm place-items-start gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          required
          ref={password}
          type="password"
          id="password"
          placeholder="Password"
          className="border-[#222]"
        />
        <p className="text-red-500">{error}</p>
      </div>

      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default FormSignIn;
