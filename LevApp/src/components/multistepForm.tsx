import React, { useState, createContext, useContext } from "react";
import './multistepForm.css'
import { useSelector, useDispatch } from "react-redux";
import {
  setStep,
  setFormData,
  resetForm,
} from "../reducers/multiStepFormReducer";

// Step Context
interface StepContextValue {
  currentStep: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const StepContext = createContext<StepContextValue | undefined>(undefined);

// Step Provider
interface StepProviderProps {
  totalSteps: number;
  children: React.ReactNode;
}

const StepProvider: React.FC<StepProviderProps> = ({
  totalSteps,
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <StepContext.Provider
      value={{
        currentStep,
        totalSteps,
        goToNextStep,
        goToPreviousStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

// Form Component
interface FormProps {
  onSubmit: () => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const stepContext = useContext(StepContext);

  if (!stepContext) {
    throw new Error("Form must be used within a StepProvider");
  }

  const { currentStep, totalSteps, goToNextStep, goToPreviousStep } =
    stepContext;

  const handleNextStep = () => {
    goToNextStep();
  };

  const handlePreviousStep = () => {
    goToPreviousStep();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div>
      <h2>Step {currentStep}</h2>
      {currentStep === 1 && <Step1 onNextStep={handleNextStep} />}
      {currentStep === 2 && <Step2 onNextStep={handleNextStep} />}
      {currentStep === 3 && <Step3 onNextStep={handleNextStep} />}
      {currentStep === 4 && <Step4 onNextStep={handleNextStep} />}
      {currentStep === 5 && (
        <Step5 onPreviousStep={handlePreviousStep} onSubmit={handleSubmit} />
      )}

      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
    </div>
  );
};

// Step 1 Component
interface Step1Props {
  onNextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNextStep }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleAddressLine1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressLine1(e.target.value);
  };

  const handleAddressLine2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressLine2(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleNextStep = () => {
    // Perform validation
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      addressLine1.trim() === "" ||
      city.trim() === "" ||
      state.trim() === "" ||
      pincode.trim() === "" ||
      country.trim() === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    onNextStep();
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />
      <input
        type="text"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Phone Number"
      />
      <input
        type="text"
        value={addressLine1}
        onChange={handleAddressLine1Change}
        placeholder="Address Line 1"
      />
      <input
        type="text"
        value={addressLine2}
        onChange={handleAddressLine2Change}
        placeholder="Address Line 2"
      />
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="City"
      />
      <input
        type="text"
        value={state}
        onChange={handleStateChange}
        placeholder="State"
      />
      <input
        type="text"
        value={pincode}
        onChange={handlePincodeChange}
        placeholder="Pincode"
      />
      <input
        type="text"
        value={country}
        onChange={handleCountryChange}
        placeholder="Country"
      />
      <button onClick={handleNextStep}>Next</button>
    </div>
  );
};

// Step 2 Component
interface Step2Props {
  onNextStep: () => void;
}

const Step2: React.FC<Step2Props> = ({ onNextStep }) => {
  const [address, setAddress] = useState("");

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleNextStep = () => {
    // Perform validation
    if (address.trim() === "") {
      alert("Please fill in the address field");
      return;
    }

    onNextStep();
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Address"
      />
      <button onClick={handleNextStep}>Next</button>
    </div>
  );
};

// Step 3 Component
interface Step3Props {
  onNextStep: () => void;
}

const Step3: React.FC<Step3Props> = ({ onNextStep }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
  };

  const handleNextStep = () => {
    // Perform validation
    if (!file) {
      alert("Please upload a file");
      return;
    }

    onNextStep();
  };

  return (
    <div>
      <input type="file" accept=".png,.pdf" onChange={handleFileChange} />
      <button onClick={handleNextStep}>Next</button>
    </div>
  );
};

// Step 4 Component
interface Step4Props {
  onNextStep: () => void;
}

const Step4: React.FC<Step4Props> = ({ onNextStep }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [geolocationStatus, setGeolocationStatus] = useState("Not Captured");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const newFiles = Array.from(fileList).slice(0, 5);
      setFiles(newFiles);
    }
  };

  const captureGeolocation = () => {
    // Simulating geolocation capture
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Update the status once coordinates are recorded
        setGeolocationStatus("Captured");
      },
      (error) => {
        console.log("Error capturing geolocation:", error);
        setGeolocationStatus("Error");
      }
    );
  };

  const handleNextStep = () => {
    // Perform validation
    if (files.length === 0) {
      alert("Please upload at least one file");
      return;
    }

    onNextStep();
  };

  return (
    <div>
      <input
        type="file"
        accept=".png,.pdf"
        multiple
        onChange={handleFileChange}
      />
      <p>Geolocation Status: {geolocationStatus}</p>
      {geolocationStatus !== "Captured" && (
        <button onClick={captureGeolocation}>Capture Geolocation</button>
      )}
      <button onClick={handleNextStep}>Next</button>
    </div>
  );
};

// Step 5 Component
interface Step5Props {
  onPreviousStep: () => void;
  onSubmit: () => void;
}

const Step5: React.FC<Step5Props> = ({ onPreviousStep, onSubmit }) => {
  const handlePreviousStep = () => {
    onPreviousStep();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div>
      <button onClick={handlePreviousStep}>Previous</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

// Progress Indicator Component
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          style={{
            backgroundColor: index + 1 === currentStep ? "blue" : "gray",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            display: "inline-block",
          }}
        ></div>
      ))}
    </div>
  );
};

// Usage example
const MultistepForm: React.FC = () => {
  
   const step = useSelector((state) => state.multiStepForm.step);
   const formData = useSelector((state) => state.multiStepForm.formData);
   const dispatch = useDispatch();

   const handleNextStep = () => {
     dispatch(setStep(step + 1));
   };

   const handlePreviousStep = () => {
     dispatch(setStep(step - 1));
   };

   const handleFormSubmit = () => {
     // Dispatch an action to save form data to the state
     dispatch(setFormData(formData));
     // Perform any additional logic or API calls as needed
   };

   const handleFormReset = () => {
     dispatch(resetForm());
   };
   
  return (
    <StepProvider totalSteps={5}>
      <Form onSubmit={() => console.log("Form submitted")} />
    </StepProvider>
  );
};

export default MultistepForm;
