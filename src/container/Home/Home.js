import React, {useState, useEffect} from 'react';

import Divider from '../../component/Divider/Divider';
import Steps from '../../component/Steps/Steps';
import Toast from '../../component/Toast/Toast';

import InputForm from '../InputForm/InputForm';
import UploadData from '../UploadData/UploadData';
import InputPreview from '../InputPreview/InputPreview';

import { generateRandomData } from '../../utils/data_initialization';

const Home = () => {
  // Values for current step - 0 [input form]/1 - [input visual]/2 - [output]
  const [currentStep, setCurrentStep] = useState(0);
  // excel mode - true (parse data) ; false (generate random data)
  const [excelInputMode, setExcelInputMode] = useState(false)
  const [numberOfCustomers, setNumberOfCustomers] = useState(23);
  const [vehicleCapacity, setVehicleCapacity] = useState(100);
  const [inputData, setInputData] = useState({});
  const [toastStatus, setToastStatus] = useState(false);
  const [toastText, setToastText] = useState(false);

  useEffect(() => {
    if (currentStep === 1) {
      if (excelInputMode) {
        // parse data from excel
      }
      else {
        const data = generateRandomData(Number(numberOfCustomers), vehicleCapacity)
        setInputData(data)
      }
    }
  }, [
    currentStep,
    excelInputMode,
    numberOfCustomers,
    vehicleCapacity
  ])

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => {
        setToastStatus(false)
      }, 2500)
    }
  }, [toastStatus])

  return <div>
    {toastStatus ? <Toast text={toastText} setToastStatus={setToastStatus}/> : <></>}
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
            setToastText={setToastText}
            setToastStatus={setToastStatus}
          />
        }
      />
      : currentStep === 1
        ? <InputPreview inputData={inputData}/>
        : <></>
    }
  </div>
}

export default Home