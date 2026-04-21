"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface IErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<IErrorProps> = ({ error, reset }) => {
  return (
    <div className="flex-center h-screen border">
      <div className="flex-center w-125 flex-col gap-2.5">
        <p className="p2-bold text-red-primary!">There was a problem</p>
        <h2 className="h2-bold text-center">
          {error.message ? error.message : "Something went wrong, please retry"}
        </h2>
        <div className="flex-center w-full gap-2.5">
          <Button className="w-auto" onClick={reset}>
            Try Again
          </Button>
          <Button variant="secondary" className="w-auto">
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
