import { useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function Header() {
   const [openDialog, setOpenDialog] = useState(false);
   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

   const login = useGoogleLogin({
     onSuccess: (codeResp) => {
       GetUserProfile(codeResp);
     },
     onError: (error) => {
       console.error("Login failed:", error);
     }
   });

   const GetUserProfile = (tokenInfo) => {
     axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
       headers: {
         Authorization: `Bearer ${tokenInfo.access_token}`,
         Accept: 'application/json',
       },
     })
     .then((resp) => {
       console.log("User profile data:", resp.data);
       localStorage.setItem('user', JSON.stringify(resp.data));
       setUser(resp.data);
       setOpenDialog(false);
     })
     .catch((error) => {
       console.error('Error fetching user profile:', error);
     });
   };

   const handleLogout = () => {
     googleLogout();
     localStorage.removeItem("user");
     setUser(null);
   };

  return (
    <div className="p-3 shadow-md flex justify-between items-center w-screen px-5 bg-white">
      <Link to="/">
        <img src="https://res.cloudinary.com/drwvfwj4b/image/upload/v1729789278/tubyq1gbopynul0hswjk.jpg" alt="Logo" className="h-12 sm:h-16 md:h-20 lg:h-24" />
      </Link>
      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <Link to="/create-trip">
              <Button variant="outline" className="rounded-full">Create Trip</Button>
            </Link>
            <Link to="/contact-us">
              <Button variant="outline" className="rounded-full">Contact us</Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                <button onClick={handleLogout} className='bg-black text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-800 transition duration-200'>Log Out</button>
              </PopoverTrigger>
            </Popover>
          </div>
        ) : (
          <button 
            className="bg-black text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-800 transition duration-200" 
            onClick={() => setOpenDialog(true)}
          >
            Sign In
          </button>
        )}
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-lg mt-7 text-black">Login Required</DialogTitle>
            <DialogDescription>
              <img src="https://res.cloudinary.com/drwvfwj4b/image/upload/v1729789278/tubyq1gbopynul0hswjk.jpg" className="top-0 left-0 w-15 sm:w-20 md:w-23 lg:w-17 xl:w-31 h-auto rounded-md" alt="Top-left travel image" />
              <p className="text-black">Sign in to the App with Google authentication securely</p>
              <button onClick={login} className="flex flex-row gap-4 justify-center items-center bg-black h-10 w-full mt-5 text-white font-semibold py-2 rounded-md">
                <FcGoogle className='h-7 w-7' /> Sign In With Google
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
