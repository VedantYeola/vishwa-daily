import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_Prompt,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.travelers
    ) {
      toast("Please fill all the Details.");
      return;
    }

    setLoading(true);
    const finalPrompt = AI_Prompt.replace(
      "{location}",
      formData?.location.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{travelers}", formData?.travelers)
      .replace("{budget}", formData?.budget);

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
      if (!apiKey) {
        console.error("API key not found.");
        toast.error("API key not found.");
        setLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();

      console.log("Generated Trip Plan:\n", text);
      await SaveAiTrip(text);
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error(`Failed to generate trip plan: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      const startIndex = TripData.indexOf("{");
      const endIndex = TripData.lastIndexOf("}") + 1;

      const cleanJsonString = TripData.slice(startIndex, endIndex);
      const parsedTripData = JSON.parse(cleanJsonString);

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId,
      });

      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("JSON parsing failed:", error);
      toast.error("Generated trip could not be parsed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    console.log("Token Received:", tokenInfo);
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
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Failed to fetch user profile:", error);
        if (error.response && error.response.status === 401) {
          console.error("401 Unauthorized - Invalid Token");
        }
        toast.error("Failed to login. Please try again.");
      });
  };



  return (
    <div className="sm:px-10 md:px-31 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-4xl">
        Tell us your travel Preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-2xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-2xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-2xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div className="container mx-auto my-10 px-5">
        <h2 className="text-2xl font-medium mb-6">What is Your Budget?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-6 border border-black-500 rounded-lg shadow-md cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105 ${formData.budget === item.title ? "shadow-lg border-black" : ""
                }`}
            >
              <div>
                <h2 className="text-5xl mb-3">{item.icon}</h2>
                <h3 className="font-semibold text-xl text-black-600">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto my-10 px-5">
        <h2 className="text-2xl font-medium mb-6">
          Who are you traveling with?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleInputChange("travelers", item.people)}
              className={`p-6 border border-black-500 rounded-lg shadow-md cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105 ${formData.travelers === item.people
                ? "shadow-lg border-black"
                : ""
                }`}
            >
              <div>
                <h2 className="text-5xl mb-3">{item.icon}</h2>
                <h3 className="font-semibold text-xl text-black-600">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            " Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="logot-.png" />
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

export default CreateTrip;
