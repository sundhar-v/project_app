import React, {useState} from 'react';

import Divider from '../../component/Divider/Divider';
import Steps from '../../component/Steps/Steps';

import InputForm from '../InputForm/InputForm';
import UploadData from '../UploadData/UploadData';

const Home = () => {
  const [currentStep] = useState(0);

  return <div>
    <Steps stepNumber={currentStep}/>
    {currentStep === 0 ? <Divider
      leftColumn={<UploadData />}
      rightColumn={<InputForm />}
    />: <></>}
  </div>
}

export default Home