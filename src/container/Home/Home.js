import React, {useState, useEffect} from 'react';

import Divider from '../../component/Divider/Divider';
import Steps from '../../component/Steps/Steps';

import InputForm from '../InputForm/InputForm';
import UploadData from '../UploadData/UploadData';

const Home = () => {
  // Values for current step - 0 [input form]/1 - [input visual]/2 - [output]
  const [currentStep, setCurrentStep] = useState(0);
  // excel mode - true (parse data) ; false (generate random data)
  const [excelInputMode, setExcelInputMode] = useState(false)
  const [numberOfCustomers, setNumberOfCustomers] = useState(23);
  const [vehicleCapacity, setVehicleCapacity] = useState(100);

  useEffect(() => {
    if (currentStep === 1) {
      if (excelInputMode) {
        // parse data from excel
      }
      else {
        //generate data
      }
    }
  }, [currentStep, excelInputMode])

  return <div>
    <Steps
      stepNumber={currentStep}
      setCurrentStep={setCurrentStep}
    />
    {currentStep === 0 
      ? <Divider
        leftColumn={<UploadData />}
        rightColumn={
          <InputForm 
            setCurrentStep={setCurrentStep}
            setExcelInputMode={setExcelInputMode}
            numberOfCustomers={numberOfCustomers}
            setNumberOfCustomers={setNumberOfCustomers}
            vehicleCapacity={vehicleCapacity}
            setVehicleCapacity={setVehicleCapacity}
          />
        }
      />
      : <></>
    }
  </div>
}

export default Home