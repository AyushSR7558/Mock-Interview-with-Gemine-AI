import { UserButton } from "@clerk/nextjs";
import Image from "next/image";


export default function Home() {
  return (
    <div>
      This is the default page
      <UserButton />
    </div>
  );
}
