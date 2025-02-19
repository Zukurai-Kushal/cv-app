import { Fragment, useState } from "react"
import { nanoid } from 'nanoid'
import "../styles/Form.css"
import Icon from "./Icon"
import arrowIcon from "../assets/right-arrow.svg"
import visibilityOnIcon from "../assets/eye-outline.svg"
import visibilityOffIcon from "../assets/eye-off-outline.svg"
import groupIcon from "../assets/group.svg"
import ungroupIcon from "../assets/ungroup.svg"
import editIcon from "../assets/edit.svg"
import deleteIcon from "../assets/delete-outline.svg"


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
        showProjects: true,
        showExperience: true,
        showAdditional: true,
        editSkillGroup: undefined,
        editEducation: undefined,
        editProjects: undefined,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResumeData({ ...resumeData, [name]: value });
    }

    const handleSubSectionInputChange = (section, e, variableName = "title") => {
        const { name, value } = e.target;
        setResumeData({ ...resumeData, [section]: { ...resumeData[section], [name]: { ...resumeData[section][name], [variableName]: value } } });
    }

    const handleCourseworkInputChange = (e, educationId) => {
        const { name, value } = e.target;
        const newCourseObj = { ...resumeData.education[educationId].coursework[name], title: value };
        const newEducationObj = { ...resumeData.education[educationId], coursework: {...resumeData.education[educationId].coursework, [name]: newCourseObj} };
        setResumeData({ ...resumeData, education: { ...resumeData.education, [educationId]: newEducationObj } });
    }

    const handleRemarksInputChange = (e, educationId) => {
        const { name, value } = e.target;
        const newRemarkObj = { ...resumeData.education[educationId].extras[name], title: value };
        const newEducationObj = { ...resumeData.education[educationId], extras: { ...resumeData.education[educationId].extras, [name]: newRemarkObj } };
        setResumeData({ ...resumeData, education: { ...resumeData.education, [educationId]: newEducationObj } });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    const toggleResumeSectionVisibility = (name) => {
        setResumeData({ ...resumeData, [name]: { ...resumeData[name], hidden: !resumeData[name].hidden } })
    }

    const toggleResumeSubSectionVisibility = (section, subSectionId) => {
        setResumeData({ ...resumeData, [section]: { ...resumeData[section], [subSectionId]: { ...resumeData[section][subSectionId], hidden: !resumeData[section][subSectionId].hidden } } });
    }
    
    const toggleResumeForthLayerVisibility = (section, subSectionId, objectGroup, objectId) => {
        const newObject = { ...resumeData[section][subSectionId][objectGroup][objectId], hidden: !resumeData[section][subSectionId][objectGroup][objectId].hidden };
        const newObjectGroup = { ...resumeData[section][subSectionId][objectGroup], [objectId]: newObject };
        const newSubSection = { ...resumeData[section][subSectionId], [objectGroup]: newObjectGroup };
        const newSection = { ...resumeData[section], [subSectionId]: newSubSection };
        setResumeData({ ...resumeData, [section]: newSection });
    }

    const deleteResumeForthLayer = (section, subSectionId, objectGroup, objectId) => {
        const newObjectGroup = { ...resumeData[section][subSectionId][objectGroup] };
        delete newObjectGroup[objectId];
        const newSubSection = { ...resumeData[section][subSectionId], [objectGroup]: newObjectGroup };
        const newSection = { ...resumeData[section], [subSectionId]: newSubSection };
        setResumeData({ ...resumeData, [section]: newSection });
    }

    const addNewCoursework = (educationId) => {
        const newCourseObj = { id: nanoid(), title: "" };
        const newCoursework = { ...resumeData.education[educationId].coursework, [newCourseObj.id]: newCourseObj };
        const newEducation = { ...resumeData.education, [educationId]: { ...resumeData.education[educationId], coursework: newCoursework } };
        setResumeData({ ...resumeData, education: newEducation });
    }

    const addNewRemark = (educationId) => {
        const newRemarkObj = { id: nanoid(), title: "" };
        const newExtras = { ...resumeData.education[educationId].extras, [newRemarkObj.id]: newRemarkObj };
        const newEducation = { ...resumeData.education, [educationId]: { ...resumeData.education[educationId], extras: newExtras } };
        setResumeData({ ...resumeData, education: newEducation });
    }

    const addNewSkill = (groupId) => {
        const skillId = nanoid();
        setResumeData({ ...resumeData, skills: { ...resumeData.skills, [skillId]: { id: skillId, title: "", childIds: [] }, [groupId]:{...resumeData.skills[groupId], childIds: [...resumeData.skills[groupId].childIds,skillId]} } });
        if (groupId === "root") {
            setFormMetaData({ ...formMetaData, editSkillGroup: skillId });
        }
    }

    const addNewEducation = () => {
        const educationId = nanoid();
        const newRootChildIds = [...resumeData.education.root.childIds, educationId];
        const newEducation = {
            ...resumeData.education,
            [educationId]: { id: educationId, institution:"", degree:"", subject:"", startDate:undefined, endDate:undefined, gpa: undefined, address:undefined, extras:[], coursework:[]},
            root: { ...resumeData.education.root, childIds: newRootChildIds }
        };
        setResumeData({ ...resumeData, education: newEducation });
        setFormMetaData({ ...formMetaData, editEducation: educationId });
    }

    const deleteSkill = (groupId, skillId) => {
        const newChildIds = resumeData.skills[groupId].childIds.filter(id => id !== skillId);
        const newSkills = { ...resumeData.skills, [groupId]: { ...resumeData.skills[groupId], childIds: newChildIds } };
        newSkills[skillId].childIds.forEach((childId) => delete newSkills[childId]);
        delete newSkills[skillId];
        setResumeData({ ...resumeData, skills: newSkills });
    }

    const deleteEducation = (educationId) => {
        const newChildIds = resumeData.education.root.childIds.filter(id => id !== educationId);
        const newEducation = { ...resumeData.education, root: { ...resumeData.education.root, childIds: newChildIds } };
        delete newEducation[educationId];
        setResumeData({ ...resumeData, education: { ...newEducation } });
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
                    <button onClick={() => toggleResumeSectionVisibility("objective")} title="Toggle Visibility">
                        <Icon src={resumeData.objective.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} alt={"visibility"} />
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
                    <button title="Add Skill Group" onClick={()=>addNewSkill("root")}>+ Add</button>
                    <button onClick={() => setResumeData({ ...resumeData, skills: { ...resumeData.skills, showGrouping: !resumeData.skills.showGrouping } })} title={resumeData.skills.showGrouping? "Group":"Ungroup"}>
                        <Icon src={resumeData.skills.showGrouping? groupIcon : ungroupIcon} type={"svg"} alt={"grouping"}/>
                    </button>
                    <button onClick={() => toggleResumeSectionVisibility("skills")} title="Toggle Visibility">
                        <Icon src={resumeData.skills.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} alt={"visibility"} />
                    </button>
                </>}
            >
                {resumeData.skills.root.childIds.map((groupId) =>
                    <button
                        key={groupId}
                        className={"edit-button" + (groupId === formMetaData.editSkillGroup ? " highlight" : "") + (resumeData.skills[groupId].hidden ? " strike-through" : "")}
                        onClick={() => setFormMetaData({ ...formMetaData, editSkillGroup: (formMetaData.editSkillGroup === groupId? undefined:groupId) })}
                    >    
                        <div>{(resumeData.skills[groupId].title || "(Empty)")+":"}</div>
                        <div>
                            <ul className="horizontal-list">
                                {resumeData.skills[groupId].childIds.map((childId) =>
                                    <li key={childId} className={resumeData.skills[childId].hidden ? "strike-through":""}>{resumeData.skills[childId].title}</li>
                                )}
                            </ul>
                        </div>
                        {!resumeData.skills[groupId].hidden && <Icon src={editIcon} />}
                    </button>
                    )
                }
                
                {formMetaData.editSkillGroup && <div className={"form-editor"}>
                    <div className="form-editor-content">
                        <label>
                            <strong>Skill Group :</strong>
                            <input
                                type="text"
                                name={formMetaData.editSkillGroup}
                                placeholder="(Technologies)"
                                value={resumeData.skills[formMetaData.editSkillGroup].title || ""}
                                onChange={(e) => handleSubSectionInputChange("skills", e)} />
                        </label>
                        <div className="list-container">
                            <strong>Skills :</strong>
                            {resumeData.skills[formMetaData.editSkillGroup].childIds.map((skillId) =>
                                <div className={"flex-apart"+(resumeData.skills[skillId].hidden ? " strike-through" : "")} key={skillId}>
                                    <input type="text" name={skillId} placeholder="Skill" value={resumeData.skills[skillId].title} onChange={e=>handleSubSectionInputChange("skills",e)} />
                                    <button title="Toggle Visibility" onClick={()=>toggleResumeSubSectionVisibility("skills",skillId)}><Icon src={resumeData.skills[skillId].hidden? visibilityOffIcon:visibilityOnIcon} type={"svg"} /></button>
                                    <button title="Delete Skill" className="red-on-hover" onClick={()=>deleteSkill(formMetaData.editSkillGroup, skillId)}>
                                        <Icon src={deleteIcon} type={"svg"} />
                                    </button>
                                </div>
                            )}
                            <button type="button" title="Add Skill" onClick={()=>addNewSkill(formMetaData.editSkillGroup)}>+ Add</button>
                        </div>
                    </div>
                    <div className="primary-buttons">
                        <button className="red-on-hover" onClick={() => {
                            if (confirm("Are you sure you want to delete: " + resumeData.skills[formMetaData.editSkillGroup].title+"?")) {
                                setFormMetaData({ ...formMetaData, editSkillGroup: undefined})
                                deleteSkill("root", formMetaData.editSkillGroup);
                            }
                        }}>Delete</button>
                        <button onClick={() => toggleResumeSubSectionVisibility("skills", formMetaData.editSkillGroup)}>
                            {resumeData.skills[formMetaData.editSkillGroup].hidden ? "Show" : "Hide"}
                        </button>
                        <button onClick={() => {
                            setFormMetaData({ ...formMetaData, editSkillGroup: undefined})
                        }}>Close</button>
                    </div>
                </div>}
            </FormSection>

            <FormSection
                formMetaData={formMetaData} setFormMetaData={setFormMetaData}
                showFormSection={"showEducation"} id={"education-form"} title={"Education"} strikeThrough={resumeData.education.hidden}
                sideButtons={
                    <>
                        <button title="Add Education" onClick={()=>addNewEducation()}>+ Add</button>
                        <button title="Toggle Visibility" onClick={()=>toggleResumeSectionVisibility("education")}>
                            <Icon src={resumeData.education.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} />
                        </button>
                    </>
                }
            >
                {resumeData.education.root.childIds.map((educationId) =>
                    <button
                        key={educationId}
                        className={"edit-button" + (educationId === formMetaData.editEducation ? " highlight" : "") + (resumeData.education[educationId].hidden ? " strike-through" : "")}
                        onClick={() => setFormMetaData({ ...formMetaData, editEducation: (formMetaData.editEducation === educationId? undefined:educationId) })}
                    >
                        {resumeData.education[educationId].institution || "(Empty)"}
                        {!resumeData.education[educationId].hidden && <Icon src={editIcon}/>}
                    </button>
                )}

                {formMetaData.editEducation &&
                    <div className="form-editor">
                        <div className="form-editor-content">
                            <label>
                                <strong>Institution:</strong>
                                <input
                                    type="text" name={formMetaData.editEducation}
                                    placeholder="(Pennsylvania State University)"
                                    value={resumeData.education[formMetaData.editEducation].institution || ""}
                                    onChange={(e) => handleSubSectionInputChange("education", e, "institution")}
                                />
                            </label>
                            <label>
                                <strong>Degree:</strong>
                                <input
                                    type="text" name={formMetaData.editEducation}
                                    placeholder="(Bachelor of Business Administration)"
                                    value={resumeData.education[formMetaData.editEducation].degree || ""}
                                    onChange={(e) => handleSubSectionInputChange("education", e, "degree")}
                                />
                            </label>
                            <label>
                                <strong>Major:</strong>
                                <input
                                    type="text" name={formMetaData.editEducation}
                                    placeholder="(Major in Marketing)"
                                    value={resumeData.education[formMetaData.editEducation].subject || ""}
                                    onChange={(e) => handleSubSectionInputChange("education", e, "subject")}
                                />
                            </label>
                            <div className="flex-apart">
                                <label>
                                    <strong>Start Date:</strong>
                                    <input
                                        type="text" name={formMetaData.editEducation}
                                        placeholder="(YYYY)"
                                        value={resumeData.education[formMetaData.editEducation].startDate || ""}
                                        onChange={(e) => handleSubSectionInputChange("education", e, "startDate")}
                                    />
                                </label>
                                <label>
                                    <strong>End Date:</strong>
                                    <input
                                        type="text" name={formMetaData.editEducation}
                                        placeholder="(YYYY)"
                                        value={resumeData.education[formMetaData.editEducation].endDate || ""}
                                        onChange={(e) => handleSubSectionInputChange("education", e, "endDate")}
                                    />
                                </label>
                            </div>
                            <label>
                                <strong>GPA:</strong>
                                <input
                                    type="text" name={formMetaData.editEducation}
                                    placeholder="(3.14)"
                                    value={resumeData.education[formMetaData.editEducation].gpa || ""}
                                    onChange={(e) => handleSubSectionInputChange("education", e, "gpa")}
                                />
                            </label>
                            <label>
                                <strong>Address:</strong>
                                <input
                                    type="text" name={formMetaData.editEducation}
                                    placeholder="(University Park, PA, US)"
                                    value={resumeData.education[formMetaData.editEducation].address || ""}
                                    onChange={(e) => handleSubSectionInputChange("education", e, "address")}
                                />
                            </label>
                            <div className="list-container">
                                <strong>Coursework:</strong>
                                {
                                    resumeData.education[formMetaData.editEducation].coursework &&
                                    Object.values(resumeData.education[formMetaData.editEducation].coursework).map((courseObj) =>
                                        <div className={"flex-apart" + (courseObj.hidden? " strike-through":"")} key={courseObj.id}>
                                            <input
                                                type="text"
                                                name={courseObj.id}
                                                placeholder="Course Title"
                                                value={courseObj.title}
                                                onChange={(e)=>handleCourseworkInputChange(e, formMetaData.editEducation)}
                                            />
                                            <button
                                                title="Toggle Visibility"
                                                onClick={() => toggleResumeForthLayerVisibility("education", formMetaData.editEducation, "coursework", courseObj.id)}
                                            >
                                                <Icon src={courseObj.hidden? visibilityOffIcon: visibilityOnIcon} type={"svg"}/>
                                            </button>
                                            <button
                                                title="Delete Coursework"
                                                onClick={() => deleteResumeForthLayer("education", formMetaData.editEducation, "coursework", courseObj.id)}
                                                className="red-on-hover"
                                            >
                                                <Icon src={deleteIcon} type={"svg"}/>
                                            </button>
                                        </div>)
                                }
                                <button title="Add Coursework" onClick={()=>addNewCoursework(formMetaData.editEducation)}>+ Add</button>
                            </div>
                            <div className="list-container">
                                <strong>Extra Remarks:</strong>
                                {
                                    resumeData.education[formMetaData.editEducation].extras &&
                                    Object.values(resumeData.education[formMetaData.editEducation].extras).map((extraObj) =>
                                        <div className={"flex-apart" + (extraObj.hidden? " strike-through":"")} key={extraObj.id}>
                                            <input
                                                type="text"
                                                name={extraObj.id}
                                                placeholder="Remark"
                                                value={extraObj.title}
                                                onChange={(e)=>handleRemarksInputChange(e, formMetaData.editEducation)}
                                            />
                                            <button
                                                title="Toggle Visibility"
                                                onClick={()=>toggleResumeForthLayerVisibility("education", formMetaData.editEducation, "extras", extraObj.id)}
                                            >
                                                <Icon src={extraObj.hidden? visibilityOffIcon:visibilityOnIcon} type={"svg"}/>
                                            </button>
                                            <button
                                                title="Delete Remark"
                                                onClick={() => deleteResumeForthLayer("education", formMetaData.editEducation, "extras", extraObj.id)}
                                                className="red-on-hover"
                                            >
                                                <Icon src={deleteIcon} type={"svg"}/>
                                            </button>
                                        </div>)
                                }
                                <button title="Add Remark" onClick={()=>addNewRemark(formMetaData.editEducation)}>+ Add</button>
                            </div>
                        </div>
                        <div className="primary-buttons">
                            <button className="red-on-hover" onClick={() => {
                                if (confirm("Are you sure you want to delete: " + resumeData.education[formMetaData.editEducation].institution+"?")) {
                                    setFormMetaData({ ...formMetaData, editEducation: undefined });
                                    deleteEducation(formMetaData.editEducation);
                                }
                            }}>Delete</button>
                            <button onClick={() => toggleResumeSubSectionVisibility("education", formMetaData.editEducation)}>
                                {resumeData.education[formMetaData.editEducation].hidden ? "Show" : "Hide"}
                            </button>
                            <button onClick={() => {
                                setFormMetaData({ ...formMetaData, editEducation: undefined})
                            }}>Close</button>
                        </div>
                    </div>
                }
            </FormSection>

            <FormSection
                formMetaData={formMetaData} setFormMetaData={setFormMetaData}
                showFormSection={"showProjects"}
                title="Projects"
                id={"projects-form"}
                strikeThrough={resumeData.projects.hidden}
                sideButtons={
                    <>
                    
                    </>
                }
                >

            </FormSection>
        </form>
    );
}