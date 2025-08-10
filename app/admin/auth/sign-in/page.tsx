import SigninWithPassword from "../_components/SigninWithPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function SignIn() {
  return (
    <>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <div className="my-6 flex items-center justify-center">
                <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
                <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
                  Or sign in with email
                </div>
                <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
              </div>

              <div>
                <SigninWithPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
