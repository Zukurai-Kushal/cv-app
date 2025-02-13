import { Fragment, useState } from "react"
import "../styles/Form.css"
import Icon from "./Icon"
import arrowIcon from "../assets/right-arrow.svg"
import addIcon from "../assets/plus.svg"
import showOnIcon from "../assets/eye-outline.svg"
import showOffOnIcon from "../assets/eye-off-outline.svg"
import groupIcon from "../assets/group.svg"
import ungroupIcon from "../assets/ungroup.svg"
import editIcon from "../assets/edit.svg"


function FormSection({ formMetaData, setFormMetaData, showFormSection, title, id, children, sideButtons, strikeThrough}) {
    return <section id={id} className={strikeThrough? " strike-through":""}>
        <div className="form-header">
            <button className="form-header-button" onClick={() => setFormMetaData({ ...formMetaData, [showFormSection]: !formMetaData[showFormSection] })}>
                <Icon src={arrowIcon} style={formMetaData[showFormSection] ? { transform: "rotate(90deg)" } : null} /><h1>{title};</h1>
            </button>
            {formMetaData[showFormSection] ? <div className="form-side-buttons">
                {sideButtons}
            </div>: null}
        </div>
        {formMetaData[showFormSection] ? <div className={"form-content"}>
            {children}
        </div>:null}
    </section>
    
}


export default function Form({ resumeData, setResumeData }) {

    const [formMetaData, setFormMetaData] = useState({
        showPersonalDetail: true,
        showObjective: true,
        showSkills: true,
        showEducation: true,
        showExperience: true,
        showAdditional: true,
        editSkillGroup: undefined,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResumeData({ ...resumeData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const toggleResumeSectionVisibility = (name) => {
        setResumeData({ ...resumeData, [name]: { ...resumeData[name], hidden: !resumeData[name].hidden } })
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormSection
                formMetaData={formMetaData} setFormMetaData={setFormMetaData}
                showFormSection="showPersonalDetail" title="Personal Detail" id="personal-detail-form"
            >
                <label className="flex-apart"><strong>Full Name: </strong> <input type="text" name="fullName" placeholder="Full Name" value={resumeData.fullName} onChange={handleInputChange} /></label>
                <label className="flex-apart"><strong>Email: </strong> <input type="email" name="email" placeholder="Email" value={resumeData.email} onChange={handleInputChange} /></label>
                <label className="flex-apart"><strong>Phone Number: </strong> <input type="tel" name="phone" placeholder="Phone Number" value={resumeData.phone} onChange={handleInputChange} /></label>
                <label className="flex-apart"><strong>Address: </strong> <input type="text" name="address" placeholder="Address" value={resumeData.address} onChange={handleInputChange} /></label>
                <label className="flex-apart"><strong>LinkedIn: </strong> <input type="url" name="linkedIn" placeholder="LinkedIn" value={resumeData.linkedIn} onChange={handleInputChange} /></label>
                <label className="flex-apart"><strong>GitHub: </strong> <input type="url" name="github" placeholder="GitHub" value={resumeData.github} onChange={handleInputChange} /></label>
                <label className="flex-apart"><strong>Personal Website: </strong> <input type="url" name="link" placeholder="Personal Website" value={resumeData.link} onChange={handleInputChange} /></label>
            </FormSection>

            <FormSection
                formMetaData={formMetaData} setFormMetaData={setFormMetaData}
                showFormSection="showObjective" title="Objective" id="objective-form"
                strikeThrough={resumeData.objective.hidden}
                sideButtons={<>
                    <button onClick={() => toggleResumeSectionVisibility("objective")}>
                        <Icon src={resumeData.objective.hidden ? showOffOnIcon : showOnIcon} type={"svg"} alt={"visibility"} />
                    </button>
                </>}
            >
                <textarea name="objective" rows="4" value={resumeData.objective.value} onChange={(e)=>setResumeData({...resumeData, objective: {...resumeData.objective, value:e.target.value}})} />
            </FormSection>

            <FormSection
                formMetaData={formMetaData}
                setFormMetaData={setFormMetaData}
                showFormSection="showSkills"
                title="Skills"
                id="skills-form"
                strikeThrough={resumeData.skills.hidden}
                sideButtons={<>
                    <button>+ Add</button>
                    <button onClick={() => setResumeData({ ...resumeData, skills: { ...resumeData.skills, showGrouping: !resumeData.skills.showGrouping } })}>
                        <Icon src={resumeData.skills.showGrouping? groupIcon : ungroupIcon} type={"svg"} alt={"grouping"}/>
                    </button>
                    <button onClick={() => toggleResumeSectionVisibility("skills")}>
                        <Icon src={resumeData.skills.hidden ? showOffOnIcon : showOnIcon} type={"svg"} alt={"visibility"} />
                    </button>
                </>}
            >
                {Object.values(resumeData.skills.groups).map((group) =>
                    <button key={group.group} className="edit-button" onClick={()=>setFormMetaData({...formMetaData, editSkillGroup: group.group})}>
                        <div>{group.group + ":"}</div>
                        <div>
                            <ul className="horizontal-list">
                                {group.skillList.map((skillData) => <li key={skillData.id}>{skillData.value}</li>)}
                            </ul>
                        </div>
                        <Icon src={editIcon}/>
                    </button>)}
                <dialog open={formMetaData.editSkillGroup} onClose={()=>setFormMetaData({...formMetaData, editSkillGroup:undefined})}>
                    {formMetaData.editSkillGroup}
                </dialog>
            </FormSection>
        </form>
    );
}