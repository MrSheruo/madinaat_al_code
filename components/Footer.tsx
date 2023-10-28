import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" flex justify-evenly items-center border-t-2 border-[#222] p-10 bg-[#dadada]">
      <Link href={"/"}>
        <p className=" text-xl font-bold text-[#222]">
          Madinaat <br className="sm:hidden" />
          Al-Code
        </p>
      </Link>
      <div className="flex gap-4">
        <Link
          className="hover:text-[#3b3b3b] font-medium"
          href="mailto:atomicx4pro@gmail.com"
        >
          Contact us
        </Link>
        <Link className="hover:text-[#3b3b3b] font-medium" href={"#"}>
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
