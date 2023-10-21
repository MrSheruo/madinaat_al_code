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
  const password = useRef<HTMLInputElement>(null); // Provide the type for useRef
  const router = useRouter();
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      email: email.current?.value,
      password: password.current?.value,
    };
    try {
      const res = await axios.post("/api/users/signin", formData);

      if (res.data.errorMessage === "User does not exist") {
        setError("User does not exist, Please Sign Up or type a valid email");
      } else if (res.data.errorMessage === "Invalid password") {
        setError("Invalid password");
      } else {
        setError("");
      }
      if (res.data.message === "Logged in successfully") router.refresh();
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
      <Button type="submit">Sign in</Button>
    </form>
  );
};

export default FormSignIn;
