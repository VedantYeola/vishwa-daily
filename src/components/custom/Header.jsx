import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    console.log(user);
    if (!import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID) {
      toast.error("Google Auth Client ID is missing. Please check your environment variables.");
      console.error("VITE_GOOGLE_AUTH_CLIENT_ID is not set");
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    console.log("Token Received:", tokenInfo); // Debugging
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Failed to fetch user profile:", error);
        if (error.response && error.response.status === 401) {
          console.error("401 Unauthorized - Invalid Token");
          toast.error("Login session expired. Please try again.");
          // Optionally clear storage or retry
        }
      });
  };

  return (
    <div className="p-3 shadow-md flex justify-between items-center px-5">
      {/* Debug Check - Remove before production if desired, but helpful for setup */}
      {!import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID && (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center p-4 z-50 font-bold">
          ⚠️ ERROR: Google Client ID is MISSING. Please add VITE_GOOGLE_AUTH_CLIENT_ID to your Vercel Env Variables! ⚠️
        </div>
      )}
      <img
        src="/logot-.png"
        alt="Travel Trip"
        className="h-20 w-auto object-contain "
      />

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className=" text-black rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className=" text-black rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logot-.png" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="w-7 h-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
