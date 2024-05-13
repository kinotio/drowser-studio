import Link from "next/link"
import { ImportIcon, ArrowRight } from "lucide-react";

export function HeroComponent() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[#874CCC]/80 to-[#10439F]/80 backdrop-blur-md">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4 text-white">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Test Your Software with Ease
              </h1>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Our powerful platform makes it easy to test your software and ensure it meets the highest standards.
                Streamline your testing process and deliver reliable, high-quality applications.
              </p>
              <div className="flex  justify-center items-center gap-3">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900/80 backdrop-blur-md px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50/80 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Import JSON <ImportIcon className="ml-2" />
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900/80 backdrop-blur-md px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50/80 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Login <ArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
