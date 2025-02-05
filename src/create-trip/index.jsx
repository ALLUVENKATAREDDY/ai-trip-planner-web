import { useState, useEffect } from 'react';
import { AI_PROMPT, travel } from '../constants/options';
import { selectTravelList } from '../constants/selectTravelList';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { chatSession } from '@/service/AIModal';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    const days = parseInt(formData.days, 10);
    
    if (!formData.days || !formData.location || !formData.budget || !formData.traveller) {
      toast.error("Please fill all details and ensure the trip is 5 days or less.");
      return;
    }

    if (days > 20) {
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
    const docId = Date.now().toString();

    try {
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        id: docId,
      });

      toast.success("Trip saved successfully!");
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Error saving trip.");
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
           className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>

        <div className="mt-5">
          <h2 className="text-xl my-3 font-medium">How many days are you planning for the trip?</h2>
          <input
            placeholder="Ex. 3"
            type="number"
           className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
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
              className={`p bg-white shadow-lg rounded-lg overflow-hidden border transition-transform transform hover:scale-110 hover:shadow-2xl cursor-pointer p-5
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
    </div>
  );
}

export default CreateTrip;
