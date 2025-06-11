import Header from './components/Header'
import Form from './components/Form'
import Resume from './components/Resume'
import { Dwight_Schrute, Clear_State} from './components/data'
import './App.css'
import './styles/fonts.css'
import { useState , useRef , useEffect } from 'react'
import { useReactToPrint } from "react-to-print";
import { nanoid } from 'nanoid'
import { useStickyState } from './storage'
import Icon from './components/Icon'
import resumeIcon from './assets/paper.svg'
import resumeHighlightIcon from './assets/paper-highlight.svg'
import copyIcon from './assets/copy.svg'
import addIcon from './assets/plus.svg'
import sampleIcon from './assets/file-compare.svg'
import clearIcon from './assets/broom.svg'
import deleteIcon from './assets/delete-outline.svg'
import printIcon from './assets/printer-outline.svg'

export default function App() {
  const [currResumeId, setCurrResumeId] = useStickyState('firstId', 'currResumeId');
  const [resumeIds, setResumeIds] = useStickyState(['firstId'], 'resumeIds');
  const [resumeData, setResumeData] = useStickyState({ ...Dwight_Schrute }, currResumeId);
  
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: contentRef, documentTitle: (resumeData.fullName + " Resume") });

  function deleteResume() {
    if (resumeIds.length <= 1) {
      clearResume();
    }
    else {
      localStorage.removeItem(currResumeId);
      const newResumeIds = resumeIds.filter((id) => id !== currResumeId);
      setResumeIds(newResumeIds);
      selectResume(newResumeIds[0]);
    }
  }

  function selectResume(id) {
    setCurrResumeId(id);
    setResumeData(JSON.parse(localStorage.getItem(id)));
  }

  function addResume(option) {
    const newId = nanoid();
    setResumeIds([...resumeIds, newId]);
    setCurrResumeId(newId);

    switch (option) {
      case "sample":
        setResumeData(Dwight_Schrute);
        break;
      case "empty":
        setResumeData(Clear_State);
        break;
      case "copy":
      default:
    }
  }

  function clearResume() {
    setResumeData(Clear_State);
  }

  return <>
    <Header />
    <div id="content">
      <div id="UI">
        <div className='resume-manager'>
          <div className="resume-slots">
            {resumeIds.map((id) => <button
              key={id}
              className={currResumeId === id ? "highlight":""}
              onClick={() => selectResume(id)}
            >
              <Icon src={currResumeId === id ? resumeHighlightIcon : resumeIcon} type={"svg"}/>
            </button>)}
          </div>
          <div className='primary-buttons'>
            <button
              title='Add New Resume'
              onClick={() => addResume("empty")}
            >
              <Icon src={addIcon} type={"svg"}/>
            </button>

            <button
              title='Make Resume Copy'
              onClick={() => addResume("copy")}
            >
              <Icon src={copyIcon} type={"svg"}/>
            </button>

            <button
              title='Add Example Resume'
              onClick={() => addResume("sample")}
            >
              <Icon src={sampleIcon} type={"svg"}/>
            </button>

            <button
              title='Clear Resume'
              onClick={() => {
                if (confirm("Are you sure you want to clear out this resume?")) {
                  clearResume();
                }
              }}
            >
              <Icon src={clearIcon} type={"svg"}/>
            </button>

            <button
              title='Delete Resume'
              onClick={() => {
              if (confirm("Are you sure you want to delete this resume?")) {
                deleteResume();
              }
              }}
            >
              <Icon src={deleteIcon} type={"svg"}/>
            </button>

            <button
              title='Print Resume'
              onClick={() => reactToPrintFn()}
            >
              <Icon src={printIcon} type={"svg"}/>
            </button>

          </div>
        </div>
        
        <Form resumeData={resumeData} setResumeData={setResumeData}/>
      </div>
      <div id="resume-sticky-container" ref={contentRef}><Resume {...resumeData} /></div>
      <button
        className='mobile-print-button'
        title='Print Resume'      
        onClick={() => reactToPrintFn()}
      >
        Print <Icon src={printIcon} type={"svg"} />
      </button>
    </div>
  </>
}
