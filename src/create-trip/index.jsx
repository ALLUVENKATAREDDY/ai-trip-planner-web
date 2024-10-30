import { useState, useEffect } from 'react';
import { AI_PROMPT, travel } from '../constants/options';
import { selectTravelList } from '../constants/selectTravelList';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { chatSession } from '@/service/AIModal';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Ensure navigate is imported

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Form Data Updated:", JSON.stringify(formData, null, 2));
  }, [formData]);

  const GenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    const days = parseInt(formData.days, 10);
    
    // Validate input
    if (!formData.days || !formData.location || !formData.budget || !formData.traveller) {
      toast.error("Please fill all details and ensure the trip is 5 days or less.");
      return;
    }

    if (days > 5) {
      toast.error("Please ensure the trip is 5 days or less.");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData.location)
      .replace('{days}', formData.days)
      .replace('{traveller}', formData.traveller)
      .replace('{budget}', formData.budget);

    setLoading(true);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("AI Response:", result.response.text());
      SaveAiTrip(result.response.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Error generating trip.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user.email,
        id: docId,
      });

      toast.success("Trip saved successfully!");
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Error saving trip.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      });

      console.log(response.data);  // Log the user profile data
      localStorage.setItem('user', JSON.stringify(response.data));  // Store user data in local storage
      setOpenDialog(false);
      GenerateTrip();  // Call GenerateTrip after successful login
    } catch (error) {
      console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
      toast.error("Error fetching user profile.");
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 lx:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🔥🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized plan based on your preferences.
      </p>

      <div className="mt-10 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <input
            type="text"
            placeholder="Enter a destination"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>

        <div className="mt-5">
          <h2 className="text-xl my-3 font-medium">How many days are you planning for the trip?</h2>
          <input
            placeholder="Ex. 3"
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => handleInputChange('days', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">Travel Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travel.map((eachItem) => (
            <div
              key={eachItem.id}
              onClick={() => handleInputChange('budget', eachItem.title)}
              className={`bg-white shadow-lg rounded-lg overflow-hidden border transition-transform transform hover:scale-110 hover:shadow-2xl cursor-pointer 
                ${formData.budget === eachItem.title ? 'shadow-2xl border-black' : 'border-gray-200'}`}
            >
              <img src={eachItem.url} alt={eachItem.title} className="w-full h-36 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{eachItem.title}</h2>
                <p className="text-gray-600 text-sm mt-2">{eachItem.Description}</p>
                <div className="mt-3">
                  <h3 className="font-semibold">Options:</h3>
                  {eachItem.options && eachItem.options.cheap ? (
                    <p>{eachItem.options.cheap.activity}: {eachItem.options.cheap.price}</p>
                  ) : (
                    <p>No cheap options available</p>
                  )}
                  {eachItem.options && eachItem.options.conscious ? (
                    <p>{eachItem.options.conscious.activity}: {eachItem.options.conscious.price}</p>
                  ) : (
                    <p>No conscious options available</p>
                  )}
                  {eachItem.options && eachItem.options.average ? (
                    <p>{eachItem.options.average.activity}: {eachItem.options.average.price}</p>
                  ) : (
                    <p>No average options available</p>
                  )}
                  {eachItem.options && eachItem.options.luxury ? (
                    <p>{eachItem.options.luxury.activity}: {eachItem.options.luxury.price}</p>
                  ) : (
                    <p>No luxury options available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">Travel Companions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          {selectTravelList.map((companion) => (
            <div
              key={companion.id}
              onClick={() => handleInputChange('traveller', companion.people)}
              className={`p bg-white shadow-lg rounded-lg overflow-hidden border transition-transform transform hover:scale-110 hover:shadow-2xl cursor-pointer 
                ${formData.traveller === companion.people ? 'shadow-2xl border-black' : 'border-gray-200'}`}
            >
              <span className="text-3xl">{companion.icon}</span>
              <h2 className="text-lg font-semibold">{companion.title}</h2>
              <p className="text-gray-600 text-sm">{companion.description}</p>
              <p className="text-gray-600 text-sm">{companion.people} people</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={GenerateTrip}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-200 flex items-center gap-2"
          disabled={loading}
        >
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"}
        </button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                src="https://res.cloudinary.com/drwvfwj4b/image/upload/v1729789278/tubyq1gbopynul0hswjk.jpg"
                className="top-0 left-0 w-15 sm:w-20 md:w-23 lg:w-17 xl:w-31 h-auto rounded-md"
                alt="Top-left travel image"
              />
              <DialogTitle className="font-bold text-lg mt-7 text-black">Login Required</DialogTitle>
              <p className="text-black">Sign in to the App with Google authentication securely</p>
              <button
                disabled={loading}
                onClick={login}
                className="flex flex-row gap-4 justify-center items-center bg-black h-10 w-full mt-5 text-white font-semibold py-2 rounded-md"
              >
                <FcGoogle className='h-7 w-7' /> Sign In With Google
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
