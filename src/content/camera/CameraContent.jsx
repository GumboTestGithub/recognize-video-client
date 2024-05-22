import {useState} from "react";
import Shoot from "./Shoot.jsx";
import Analyze from "./Analyze.jsx";
import Result from "./Result.jsx";

const CameraContent = () => {

    const [step, setStep] = useState(1);

    const handleNextClick = () => {
        if (step < 3) {
            setStep(prevStep => prevStep + 1);
        }
    }

    return (
        <div>
            Camera Content
            {step === 1 && <Shoot/>}
            {step === 2 && <Analyze/>}
            {step === 3 && <Result/>}
            <button onClick={handleNextClick} >next</button>
        </div>
    )
}

export default CameraContent