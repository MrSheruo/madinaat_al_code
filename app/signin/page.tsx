import FormSignIn from "@/components/FormSignIn";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";
// import getSession from "@/lib/hooks/useSession";

// import useAuth from "@/lib/hooks/useAuth";

const SignInPage = async () => {
  const session = await getSession();

  if (session?.authStatues === true) {
    redirect("/");
  }
  return (
    <section className=" max-w-7xl m-auto bg-white border-2 border-[#222]  p-10 lg:p-20 text-center">
      <h2 className=" text-3xl font-bold">Sign In</h2>
      <h4 className=" mt-4 text-[20px] font-semibold">
        you do not have account ?{" "}
        <Link
          href="/signup"
          className=" text-[#222] hover:border-b-2 border-[#222] p-[0.2px] hover:text-[#454545]"
        >
          Sign up
        </Link>
      </h4>
      {/* Add Space between */}
      <div className="mt-20"></div>
      <FormSignIn />
    </section>
  );
};

export default SignInPage;
