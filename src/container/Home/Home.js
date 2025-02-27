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
  ClarkeWright
} from '../../utils/simple_cw';
import { toastTimer, averageVehicleSpeed, maximumWaitingTime } from '../../utils/constants';
import { generateOutputPlotData, generateOutputTableData } from '../../utils/functions';

/* eslint-disable */
const Home = () => {
  // Values for current step - 0 [input form]/1 - [input visual]/2 - [output]
  const [currentStep, setCurrentStep] = useState(0);
  // excel mode - true (parse data) ; false (generate random data)
  const [jsonInputMode, setJSONInputMode] = useState(false)
  const [numberOfCustomers, setNumberOfCustomers] = useState(23);
  const [vehicleCapacity, setVehicleCapacity] = useState(100);
  const [deliveryStart, setDeliveryStart] = useState("00:00");
  const [deliveryEnd, setDeliveryEnd] = useState("23:59");
  const [inputFile, setInputFile] = useState(null);
  const [inputFileValidity, setInputFileValidity] = useState(false);
  const [inputData, setInputData] = useState({});
  const [inputDataGenerated, setInputDataGenerated] = useState(false);
  const [toastStatus, setToastStatus] = useState(false);
  const [toastText, setToastText] = useState(false);
  const [plotData, setPlotData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [finalNumberOfRoutes, setFinalNumberOfRoutes] = useState(0);
  // const [averageVehicleSpeed] = useState(averageVehicleSpeed);
  // const [maximumWaitingTime] = useState(maximumWaitingTime);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentStep === 1) {
      if (jsonInputMode) {
        console.log(inputFile) // process data using FileReader or external library
      }
      else {
        if (!inputDataGenerated) {
          const data = generateRandomData(Number(numberOfCustomers), vehicleCapacity, deliveryStart, deliveryEnd)
          setInputData(data)
          setInputDataGenerated(true)
        }
      }
    }
  }, [
    currentStep,
    jsonInputMode,
    numberOfCustomers,
    vehicleCapacity,
    deliveryStart,
    deliveryEnd,
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
      const finalRoutes = ClarkeWright(
        savings,
        kimtiNodes,
        vehicleCapacity,
        inputData,
        distanceMatrix,
        averageVehicleSpeed,
        maximumWaitingTime,
        deliveryStart,
        deliveryEnd
      )
      const plotData = generateOutputPlotData(finalRoutes, inputData)
      setPlotData(plotData);
      const tableData = generateOutputTableData(finalRoutes, inputData, distanceMatrix, deliveryStart)
      setTableData(tableData)
      setFinalNumberOfRoutes(finalRoutes.length)
    }
  }, [
    currentStep,
    numberOfCustomers,
    vehicleCapacity,
    inputData
  ])

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => {
        setToastStatus(false)
      }, toastTimer)
    }
  }, [toastStatus])

  return <div>
    {toastStatus ? <Toast text={toastText} setToastStatus={setToastStatus}/> : <></>}
    <Steps
      stepNumber={currentStep}
      setCurrentStep={setCurrentStep}
      setInputDataGenerated={setInputDataGenerated}
    />
    {currentStep === 0 
      ? <Divider
        leftColumn={
          <UploadData 
            setCurrentStep={setCurrentStep}
            setJSONInputMode={setJSONInputMode}
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
            setJSONInputMode={setJSONInputMode}
            numberOfCustomers={numberOfCustomers}
            setNumberOfCustomers={setNumberOfCustomers}
            vehicleCapacity={vehicleCapacity}
            setVehicleCapacity={setVehicleCapacity}
            deliveryStart={deliveryStart}
            setDeliveryStart={setDeliveryStart}
            deliveryEnd={deliveryEnd}
            setDeliveryEnd={setDeliveryEnd}
            setToastText={setToastText}
            setToastStatus={setToastStatus}
          />
        }
      />
      : currentStep === 1
        ? <InputPreview inputData={inputData} />
        : currentStep === 2
          ? <Output
              plotData={plotData}
              tableData={tableData}
              finalNumberOfRoutes={finalNumberOfRoutes}
            />
          : <></>
    }
  </div>
}

/* eslint-enable */

export default Home