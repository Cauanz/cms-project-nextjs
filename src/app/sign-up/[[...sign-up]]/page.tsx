import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-dvh w-full flex items-center justify-center">
      <SignUp />
    </div>
  );
}
