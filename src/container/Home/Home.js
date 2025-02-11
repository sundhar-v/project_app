import React, {useState, useEffect, useRef} from 'react';

import Divider from '../../component/Divider/Divider';
import Steps from '../../component/Steps/Steps';
import Toast from '../../component/Toast/Toast';

import InputForm from '../InputForm/InputForm';
import UploadData from '../UploadData/UploadData';
import InputPreview from '../InputPreview/InputPreview';
import Output from '../Output/Output';

import { generateRandomData } from '../../utils/data_initialization';
import { 
  generateDistanceMatrix,
  generateNodesList,
  generateSavings,
  ClarkeWrightDelivery
} from '../../utils/simple_cw';

/* eslint-disable */
const Home = () => {
  // Values for current step - 0 [input form]/1 - [input visual]/2 - [output]
  const [currentStep, setCurrentStep] = useState(0);
  // excel mode - true (parse data) ; false (generate random data)
  const [excelInputMode, setExcelInputMode] = useState(false)
  const [numberOfCustomers, setNumberOfCustomers] = useState(23);
  const [vehicleCapacity, setVehicleCapacity] = useState(100);
  const [inputFile, setInputFile] = useState(null);
  const [inputFileValidity, setInputFileValidity] = useState(false);
  const [inputData, setInputData] = useState({});
  const [toastStatus, setToastStatus] = useState(false);
  const [toastText, setToastText] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentStep === 1) {
      if (excelInputMode) {
        console.log(inputFile) // process data using FileReader or external library
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
    vehicleCapacity,
    inputFile
  ])

  useEffect(() => {
    if(fileInputRef.current && inputFile) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(inputFile)
      fileInputRef.current.files = dataTransfer.files
    }
  }, [currentStep, inputFile])

  useEffect(() => {
    if (currentStep === 2) {
      const distanceMatrix = generateDistanceMatrix(
        numberOfCustomers,
        inputData.depot,
        inputData.xCoords,
        inputData.yCoords
      )
      const [kimtiNodes, faltuNodes] = generateNodesList(inputData.demands, inputData.pickups)
      const savings = generateSavings(distanceMatrix, faltuNodes)
      const finalRoutes = ClarkeWrightDelivery(savings, kimtiNodes)
      console.log(savings, finalRoutes)
    }
  }, [
    currentStep,
    numberOfCustomers,
    inputData
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
        leftColumn={
          <UploadData 
            setCurrentStep={setCurrentStep}
            setExcelInputMode={setExcelInputMode}
            setInputFile={setInputFile}
            inputFileValidity={inputFileValidity}
            setInputFileValidity={setInputFileValidity}
            setToastText={setToastText}
            setToastStatus={setToastStatus}
            fileInputRef={fileInputRef}
          />
        }
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
        ? <InputPreview inputData={inputData} />
        : currentStep === 2
          ? <Output />
          : <></>
    }
  </div>
}

/* eslint-enable */

export default Home