import FormSignUp from "@/components/FormSignUp";
import { getSession } from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";
const SignUpPage = async () => {
  const session = await getSession();

  if (session?.authStatues === true) {
    redirect("/");
  }
  return (
    <section className=" max-w-7xl m-auto bg-white border-2 border-[#222]  p-10 lg:p-20 text-center">
      <h2 className=" text-3xl font-bold">Sign Up</h2>
      <h4 className=" mt-4 text-[20px] font-semibold">
        do you have account ?{" "}
        <Link
          href="/signin"
          className=" text-[#222] hover:border-b-2 border-[#222] p-[0.2px] hover:text-[#454545]"
        >
          {" "}
          Sign In
        </Link>
      </h4>
      {/* Add Space between */}
      <div className="mt-20"></div>
      <FormSignUp />
    </section>
  );
};

export default SignUpPage;
