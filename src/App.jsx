import Header from './components/Header'
import Form from './components/Form'
import Resume from './components/Resume'
import { Dwight_Schrute , Kushal, Clear_State} from './components/data'
import './App.css'
import './styles/fonts.css'
import { useState , useRef } from 'react'
import { useReactToPrint } from "react-to-print";


export default function App() {
  const [resumeData, setResumeData] = useState({ ...Dwight_Schrute });
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: contentRef, documentTitle: (resumeData.fullName+" Resume")});
  return <>
    <Header />
    <div id="content">
      <div id="UI">
        <Form resumeData={resumeData} setResumeData={setResumeData}/>
      </div>
      <div ref={contentRef}><Resume {...resumeData} /></div>
      <button onClick={() => reactToPrintFn()}>Print</button>
    </div>
  </>
}


