import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImportIcon, ArrowRight } from "lucide-react";

export function HeaderComponent() {
  return (
    <>
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-gradient-to-r from-[#874CCC]/80 to-[#10439F]/80 backdrop-blur-md">
        <Link className="mr-6 hidden lg:flex" href="#">
          <h1 className="font-bold text-2xl text-white">Drowser Hub</h1>
        </Link>
        <div className="ml-auto gap-3 flex">
          <Button className="bg-gray-900/80 backdrop-blur-md text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50/80 dark:text-gray-900 dark:hover:bg-gray-50/90">
            Import JSON <ImportIcon className="ml-2" />
          </Button>
          <Button className="bg-gray-900/80 backdrop-blur-md text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50/80 dark:text-gray-900 dark:hover:bg-gray-50/90">
            Login <ArrowRight className="ml-2" />
          </Button>
        </div>
      </header>
    </>
  );
}
