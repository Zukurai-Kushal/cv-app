import Header from './components/Header'
import Form from './components/Form'
import Resume from './components/Resume'
import { Dwight_Schrute , Kushal, Clear_State} from './components/data'
import './App.css'
import './styles/fonts.css'
import { useState } from 'react'

export default function App() {
  const [resumeData, setResumeData] = useState({ ...Dwight_Schrute });
  return <>
    <Header />
    <div id="content">
      <div id="UI">
        <Form resumeData={resumeData} setResumeData={setResumeData}/>
      </div>
      <Resume {...resumeData} />
      <button>Print</button>
    </div>
  </>
}


