import { Fragment, useState } from "react"
import { nanoid } from 'nanoid'
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from 'array-move'
import "../styles/Form.css"
import Icon from "./Icon"
import arrowIcon from "../assets/right-arrow.svg"
import visibilityOnIcon from "../assets/eye-outline.svg"
import visibilityOffIcon from "../assets/eye-off-outline.svg"
import groupIcon from "../assets/group.svg"
import ungroupIcon from "../assets/ungroup.svg"
import editIcon from "../assets/edit.svg"
import deleteIcon from "../assets/delete-outline.svg"
import sortBeginIcon from "../assets/sort-begin.svg"
import sortEndIcon from "../assets/sort-end.svg"
import linkIcon from "../assets/link.svg"
import linkOffIcon from "../assets/link-off.svg"
import qrIcon from "../assets/qrcode.svg"
import qrOffIcon from "../assets/qrcode-scan.svg"



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
        editProject: undefined,
        editExperience: undefined,
        editAdditional: undefined,
        sortSkills: false,
        sortEducation: false,
        sortProjects: false,
        sortExperience: false,
        sortAdditional: false,
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

    const handleProjectAccomplishmentInputChange = (e, projectId) => {
        const { name, value } = e.target;
        const newAccomplishmentObj = { ...resumeData.projects[projectId].accomplishments[name], title: value };
        const newProjectObj = { ...resumeData.projects[projectId], accomplishments: {...resumeData.projects[projectId].accomplishments, [name]: newAccomplishmentObj} };
        setResumeData({ ...resumeData, projects: { ...resumeData.projects, [projectId]: newProjectObj } });
    }

    const handleWorkAccomplishmentInputChange = (e, experienceId) => {
        const { name, value } = e.target;
        const newAccomplishmentObj = { ...resumeData.experience[experienceId].accomplishments[name], title: value };
        const newExperienceObj = { ...resumeData.experience[experienceId], accomplishments: {...resumeData.experience[experienceId].accomplishments, [name]: newAccomplishmentObj} };
        setResumeData({ ...resumeData, experience: { ...resumeData.experience, [experienceId]: newExperienceObj } });
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

    const addNewProjectAccomplishment = (projectId) => {
        const newAccomplishmentObj = { id: nanoid(), title: "" };
        const newAccomplishments = { ...resumeData.projects[projectId].accomplishments, [newAccomplishmentObj.id]: newAccomplishmentObj };
        const newProjects = { ...resumeData.projects, [projectId]: { ...resumeData.projects[projectId], accomplishments: newAccomplishments } };
        setResumeData({ ...resumeData, projects: newProjects });
    }

    const addNewWorkAccomplishment = (experienceId) => {
        const newAccomplishmentObj = { id: nanoid(), title: "" };
        const newAccomplishments = { ...resumeData.experience[experienceId].accomplishments, [newAccomplishmentObj.id]: newAccomplishmentObj };
        const newExperience = { ...resumeData.experience, [experienceId]: { ...resumeData.experience[experienceId], accomplishments: newAccomplishments } };
        setResumeData({ ...resumeData, experience: newExperience });
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
        setResumeData({ ...resumeData, skills: { ...resumeData.skills, [skillId]: { id: skillId, title: "", childIds: [] }, [groupId]: { ...resumeData.skills[groupId], childIds: [...resumeData.skills[groupId].childIds, skillId] } } });
        if (groupId === "root") {
            setFormMetaData({ ...formMetaData, editSkillGroup: skillId });
        }
    }

    const addNewAdditionalItem = (categoryId) => {
        const itemId = nanoid();
        setResumeData({ ...resumeData, additional: { ...resumeData.additional, [itemId]: { id: itemId, title: "", childIds: [] }, [categoryId]: { ...resumeData.additional[categoryId], childIds: [...resumeData.additional[categoryId].childIds, itemId] } } });
        if (categoryId === "root") {
            setFormMetaData({ ...formMetaData, editAdditional: itemId });
        }
    }

    const addNewEducation = () => {
        const educationId = nanoid();
        const newRootChildIds = [...resumeData.education.root.childIds, educationId];
        const newEducation = {
            ...resumeData.education,
            [educationId]: { id: educationId },
            root: { ...resumeData.education.root, childIds: newRootChildIds }
        };
        setResumeData({ ...resumeData, education: newEducation });
        setFormMetaData({ ...formMetaData, editEducation: educationId });
    }

    const addNewProject = () => {
        const projectId = nanoid();
        const newRootChildIds = [...resumeData.projects.root.childIds, projectId];
        const newProjects = {
            ...resumeData.projects,
            [projectId]: { id: projectId },
            root: { ...resumeData.education.root, childIds: newRootChildIds }
        };
        setResumeData({ ...resumeData, projects: newProjects });
        setFormMetaData({ ...formMetaData, editProject: projectId });
    }

    const addNewWorkExperience = () => {
        const experienceId = nanoid();
        const newRootChildIds = [...resumeData.experience.root.childIds, experienceId];
        const newExperience = {
            ...resumeData.experience,
            [experienceId]: { id: experienceId },
            root: { ...resumeData.experience.root, childIds: newRootChildIds }
        };
        setResumeData({ ...resumeData, experience: newExperience });
        setFormMetaData({ ...formMetaData, editExperience: experienceId });
    }

    const deleteSkill = (groupId, skillId) => {
        const newChildIds = resumeData.skills[groupId].childIds.filter(id => id !== skillId);
        const newSkills = { ...resumeData.skills, [groupId]: { ...resumeData.skills[groupId], childIds: newChildIds } };
        newSkills[skillId].childIds.forEach((childId) => delete newSkills[childId]);
        delete newSkills[skillId];
        setResumeData({ ...resumeData, skills: newSkills });
    }

    const deleteAdditionalItem = (categoryId, itemId) => {
        const newChildIds = resumeData.additional[categoryId].childIds.filter(id => id !== itemId);
        const newAdditional = { ...resumeData.additional, [categoryId]: { ...resumeData.additional[categoryId], childIds: newChildIds } };
        newAdditional[itemId].childIds.forEach((childId) => delete newAdditional[childId]);
        delete newAdditional[itemId];
        setResumeData({ ...resumeData, additional: newAdditional });
    }

    const deleteEducation = (educationId) => {
        const newChildIds = resumeData.education.root.childIds.filter(id => id !== educationId);
        const newEducation = { ...resumeData.education, root: { ...resumeData.education.root, childIds: newChildIds } };
        delete newEducation[educationId];
        setResumeData({ ...resumeData, education: { ...newEducation } });
    }

    const deleteProject = (projectId) => {
        const newChildIds = resumeData.projects.root.childIds.filter(id => id !== projectId);
        const newProjects = { ...resumeData.projects, root: { ...resumeData.projects.root, childIds: newChildIds } };
        delete newProjects[projectId];
        setResumeData({ ...resumeData, projects: { ...newProjects } });
    }

    const deleteExperience = (experienceId) => {
        const newChildIds = resumeData.experience.root.childIds.filter(id => id !== experienceId);
        const newExperience = { ...resumeData.experience, root: { ...resumeData.experience.root, childIds: newChildIds } };
        delete newExperience[experienceId];
        setResumeData({ ...resumeData, experience: { ...newExperience } });
    }

    const onSortEndSkills = (oldIndex, newIndex) => {
        const newOrder = arrayMoveImmutable(resumeData.skills.root.childIds, oldIndex, newIndex);
        setResumeData({ ...resumeData, skills: { ...resumeData.skills, root: { ...resumeData.skills.root, childIds: newOrder } } });
    }

    const onSortEndAdditional = (oldIndex, newIndex) => {
        const newOrder = arrayMoveImmutable(resumeData.additional.root.childIds, oldIndex, newIndex);
        setResumeData({ ...resumeData, additional: { ...resumeData.additional, root: { ...resumeData.additional.root, childIds: newOrder } } });
    }

    const onSortEndEducation = (oldIndex, newIndex) => {
        const newOrder = arrayMoveImmutable(resumeData.education.root.childIds, oldIndex, newIndex);
        setResumeData({ ...resumeData, education: { ...resumeData.education, root: { ...resumeData.education.root, childIds: newOrder } } });
    }

    const onSortEndProjects = (oldIndex, newIndex) => {
        const newOrder = arrayMoveImmutable(resumeData.projects.root.childIds, oldIndex, newIndex);
        setResumeData({ ...resumeData, projects: { ...resumeData.projects, root: { ...resumeData.projects.root, childIds: newOrder } } });
    }

    const onSortEndExperience = (oldIndex, newIndex) => {
        const newOrder = arrayMoveImmutable(resumeData.experience.root.childIds, oldIndex, newIndex);
        setResumeData({ ...resumeData, experience: { ...resumeData.experience, root: { ...resumeData.experience.root, childIds: newOrder } } });
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormSection
                formMetaData={formMetaData} setFormMetaData={setFormMetaData}
                showFormSection="showPersonalDetail" title="Personal Detail" id="personal-detail-form"
                sideButtons={<>
                    <button
                        title={resumeData.hideLinks ? "Show Links" : "Hide Links"}
                        onClick={() => setResumeData({ ...resumeData, hideLinks: !resumeData.hideLinks })}
                    >
                        <Icon src={resumeData.hideLinks ? linkOffIcon : linkIcon} type={"svg"} />
                    </button>
                    <button
                        title={resumeData.showQR ? "Hide QR Code (Personal Website)" : "Show QR Code (Personal Website)"}
                        onClick={() => setResumeData({ ...resumeData, showQR: !resumeData.showQR })}
                    >
                        <Icon src={resumeData.showQR ? qrIcon : qrOffIcon} type={"svg"} />
                    </button>
                </>}
            >
                <label><strong>Full Name: </strong> <input type="text" name="fullName" placeholder="Full Name" value={resumeData.fullName || ""} onChange={handleInputChange} /></label>
                <label><strong>Email: </strong> <input type="email" name="email" placeholder="Email" value={resumeData.email || ""} onChange={handleInputChange} /></label>
                <label><strong>Phone Number: </strong> <input type="tel" name="phone" placeholder="Phone Number" value={resumeData.phone || ""} onChange={handleInputChange} /></label>
                <label><strong>Address: </strong> <input type="text" name="address" placeholder="Home Address" value={resumeData.address || ""} onChange={handleInputChange} /></label>
                <label><strong>LinkedIn: </strong> <input type="url" name="linkedIn" placeholder="LinkedIn Profile" value={resumeData.linkedIn || ""} onChange={handleInputChange} /></label>
                <label><strong>GitHub: </strong> <input type="url" name="github" placeholder="GitHub Profile" value={resumeData.github || ""} onChange={handleInputChange} /></label>
                <label>
                    <strong>Personal Website: </strong>
                    <input type="url" name="link" placeholder="Personal Website" value={resumeData.link || ""} onChange={handleInputChange} />
                </label>
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
                <textarea
                    name="objective"
                    rows="4"
                    value={resumeData.objective.value || ""}
                    placeholder="Description"
                    onChange={(e) => setResumeData({ ...resumeData, objective: { ...resumeData.objective, value: e.target.value } })} />
            </FormSection>

            <FormSection
                formMetaData={formMetaData}
                setFormMetaData={setFormMetaData}
                showFormSection="showSkills"
                title="Skills"
                id="skills-form"
                strikeThrough={resumeData.skills.hidden}
                sideButtons={<>
                    <button title="Add Skill Group" onClick={() => addNewSkill("root")}>+ Add</button>
                    <button onClick={() => setResumeData({ ...resumeData, skills: { ...resumeData.skills, showGrouping: !resumeData.skills.showGrouping } })} title={resumeData.skills.showGrouping ? "Ungroup" : "Group"}>
                        <Icon src={resumeData.skills.showGrouping ? groupIcon : ungroupIcon} type={"svg"} alt={"grouping"} />
                    </button>
                    <button title={formMetaData.sortSkills ? "Done Sorting" : "Sort Skill Group"} onClick={() => setFormMetaData({ ...formMetaData, sortSkills: !formMetaData.sortSkills })}>
                        <Icon src={formMetaData.sortSkills ? sortEndIcon : sortBeginIcon} type={"svg"} />
                    </button>
                    <button onClick={() => toggleResumeSectionVisibility("skills")} title="Toggle Visibility">
                        <Icon src={resumeData.skills.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} alt={"visibility"} />
                    </button>
                </>}
            >
                {formMetaData.sortSkills ?
                    <SortableList
                        onSortEnd={onSortEndSkills}
                        className="sortable-list"
                        draggedItemClassName="sortable-dragged"
                    >
                        {resumeData.skills.root.childIds.map((groupId) =>
                            <SortableItem key={groupId}>
                                <div className="sortable-item">
                                    {"⋮ "}{resumeData.skills[groupId].title}
                                </div>
                            </SortableItem>)}
                    </SortableList>
                    : <>
                        {resumeData.skills.root.childIds.map((groupId) =>
                            <button
                                key={groupId}
                                className={"edit-button" + (groupId === formMetaData.editSkillGroup ? " highlight" : "") + (resumeData.skills[groupId].hidden ? " strike-through" : "")}
                                onClick={() => setFormMetaData({ ...formMetaData, editSkillGroup: (formMetaData.editSkillGroup === groupId ? undefined : groupId) })}
                                style={{ alignItems: "flex-start" }}
                            >
                                <div>{(resumeData.skills[groupId].title || "(Empty)") + ":"}</div>
                                <div>
                                    <ul className="horizontal-list">
                                        {resumeData.skills[groupId].childIds.map((childId) =>
                                            <li key={childId} className={resumeData.skills[childId].hidden ? "strike-through" : ""}>{resumeData.skills[childId].title}</li>
                                        )}
                                    </ul>
                                </div>
                                <Icon src={editIcon} />
                            </button>
                        )
                        }
                    
                        {resumeData.skills[formMetaData.editSkillGroup] && <div className={"form-editor"}>
                            <div className="form-editor-content">
                                <label>
                                    <strong>Skill Group:</strong>
                                    <input
                                        type="text"
                                        name={formMetaData.editSkillGroup}
                                        placeholder="Group Title"
                                        value={resumeData.skills[formMetaData.editSkillGroup].title || ""}
                                        onChange={(e) => handleSubSectionInputChange("skills", e)} />
                                </label>
                                <div className="list-container">
                                    <strong>Skills:</strong>
                                    {resumeData.skills[formMetaData.editSkillGroup].childIds.map((skillId) =>
                                        <div className={"flex-apart" + (resumeData.skills[skillId].hidden ? " strike-through" : "")} key={skillId}>
                                            <input type="text" name={skillId} placeholder="Skill" value={resumeData.skills[skillId].title} onChange={e => handleSubSectionInputChange("skills", e)} />
                                            <button title="Toggle Visibility" onClick={() => toggleResumeSubSectionVisibility("skills", skillId)}><Icon src={resumeData.skills[skillId].hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} /></button>
                                            <button title="Delete Skill" className="red-on-hover" onClick={() => deleteSkill(formMetaData.editSkillGroup, skillId)}>
                                                <Icon src={deleteIcon} type={"svg"} />
                                            </button>
                                        </div>
                                    )}
                                    <button type="button" title="Add Skill" onClick={() => addNewSkill(formMetaData.editSkillGroup)}>+ Add</button>
                                </div>
                            </div>
                            <div className="primary-buttons">
                                <button className="red-on-hover" onClick={() => {
                                    if (confirm("Are you sure you want to delete: " + resumeData.skills[formMetaData.editSkillGroup].title + "?")) {
                                        setFormMetaData({ ...formMetaData, editSkillGroup: undefined })
                                        deleteSkill("root", formMetaData.editSkillGroup);
                                    }
                                }}>Delete</button>
                                <button onClick={() => toggleResumeSubSectionVisibility("skills", formMetaData.editSkillGroup)}>
                                    {resumeData.skills[formMetaData.editSkillGroup].hidden ? "Show" : "Hide"}
                                </button>
                                <button onClick={() => {
                                    setFormMetaData({ ...formMetaData, editSkillGroup: undefined })
                                }}>Close</button>
                            </div>
                        </div>}
                    </>
                }

            </FormSection>

            <FormSection
                formMetaData={formMetaData} setFormMetaData={setFormMetaData}
                showFormSection={"showEducation"} id={"education-form"} title={"Education"} strikeThrough={resumeData.education.hidden}
                sideButtons={
                    <>
                        <button title="Add Education" onClick={() => addNewEducation()}>+ Add</button>
                        <button
                            title={formMetaData.sortEducation ? "Done Sorting" : "Sort Education"}
                            onClick={() => setFormMetaData({ ...formMetaData, sortEducation: !formMetaData.sortEducation })}
                        >
                            <Icon src={formMetaData.sortEducation ? sortEndIcon : sortBeginIcon} type={"svg"} />
                        </button>
                        <button title="Toggle Visibility" onClick={() => toggleResumeSectionVisibility("education")}>
                            <Icon src={resumeData.education.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} />
                        </button>
                    </>
                }
            >
                {formMetaData.sortEducation ?
                    <SortableList
                        onSortEnd={onSortEndEducation}
                        className="sortable-list"
                        draggedItemClassName="sortable-dragged"
                    >
                        {resumeData.education.root.childIds.map((educationId) =>
                            <SortableItem key={educationId}>
                                <div className="sortable-item">
                                    {"⋮ "}{resumeData.education[educationId].institution}
                                </div>
                            </SortableItem>)}
                    </SortableList>
                    :
                    <>
                        {resumeData.education.root.childIds.map((educationId) =>
                            <button
                                key={educationId}
                                className={"edit-button" + (educationId === formMetaData.editEducation ? " highlight" : "") + (resumeData.education[educationId].hidden ? " strike-through" : "")}
                                onClick={() => setFormMetaData({ ...formMetaData, editEducation: (formMetaData.editEducation === educationId ? undefined : educationId) })}
                            >
                                {resumeData.education[educationId].institution || "(Empty)"}
                                <Icon src={editIcon} />
                            </button>
                        )}

                        {resumeData.education[formMetaData.editEducation] &&
                            <div className="form-editor">
                                <div className="form-editor-content">
                                    <label>
                                        <strong>Institution:</strong>
                                        <input
                                            type="text" name={formMetaData.editEducation}
                                            placeholder="Name of Institution"
                                            value={resumeData.education[formMetaData.editEducation].institution || ""}
                                            onChange={(e) => handleSubSectionInputChange("education", e, "institution")}
                                        />
                                    </label>
                                    <label>
                                        <strong>Degree:</strong>
                                        <input
                                            type="text" name={formMetaData.editEducation}
                                            placeholder="Type of Degree"
                                            value={resumeData.education[formMetaData.editEducation].degree || ""}
                                            onChange={(e) => handleSubSectionInputChange("education", e, "degree")}
                                        />
                                    </label>
                                    <label>
                                        <strong>Major:</strong>
                                        <input
                                            type="text" name={formMetaData.editEducation}
                                            placeholder="Subject Major"
                                            value={resumeData.education[formMetaData.editEducation].subject || ""}
                                            onChange={(e) => handleSubSectionInputChange("education", e, "subject")}
                                        />
                                    </label>
                                    <div className="flex-apart">
                                        <label>
                                            <strong>Start Date:</strong>
                                            <input
                                                type="text" name={formMetaData.editEducation}
                                                placeholder="Enrollment Date"
                                                value={resumeData.education[formMetaData.editEducation].startDate || ""}
                                                onChange={(e) => handleSubSectionInputChange("education", e, "startDate")}
                                            />
                                        </label>
                                        <label>
                                            <strong>End Date:</strong>
                                            <input
                                                type="text" name={formMetaData.editEducation}
                                                placeholder="Graduation Date"
                                                value={resumeData.education[formMetaData.editEducation].endDate || ""}
                                                onChange={(e) => handleSubSectionInputChange("education", e, "endDate")}
                                            />
                                        </label>
                                    </div>
                                    <label>
                                        <strong>GPA:</strong>
                                        <input
                                            type="text" name={formMetaData.editEducation}
                                            placeholder="GPA Score"
                                            value={resumeData.education[formMetaData.editEducation].gpa || ""}
                                            onChange={(e) => handleSubSectionInputChange("education", e, "gpa")}
                                        />
                                    </label>
                                    <label>
                                        <strong>Address:</strong>
                                        <input
                                            type="text" name={formMetaData.editEducation}
                                            placeholder="Address of Institution"
                                            value={resumeData.education[formMetaData.editEducation].address || ""}
                                            onChange={(e) => handleSubSectionInputChange("education", e, "address")}
                                        />
                                    </label>
                                    <div className="list-container">
                                        <strong>Coursework:</strong>
                                        {
                                            resumeData.education[formMetaData.editEducation].coursework &&
                                            Object.values(resumeData.education[formMetaData.editEducation].coursework).map((courseObj) =>
                                                <div className={"flex-apart" + (courseObj.hidden ? " strike-through" : "")} key={courseObj.id}>
                                                    <input
                                                        type="text"
                                                        name={courseObj.id}
                                                        placeholder="Course Title"
                                                        value={courseObj.title}
                                                        onChange={(e) => handleCourseworkInputChange(e, formMetaData.editEducation)}
                                                    />
                                                    <button
                                                        title="Toggle Visibility"
                                                        onClick={() => toggleResumeForthLayerVisibility("education", formMetaData.editEducation, "coursework", courseObj.id)}
                                                    >
                                                        <Icon src={courseObj.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} />
                                                    </button>
                                                    <button
                                                        title="Delete Coursework"
                                                        onClick={() => deleteResumeForthLayer("education", formMetaData.editEducation, "coursework", courseObj.id)}
                                                        className="red-on-hover"
                                                    >
                                                        <Icon src={deleteIcon} type={"svg"} />
                                                    </button>
                                                </div>)
                                        }
                                        <button title="Add Coursework" onClick={() => addNewCoursework(formMetaData.editEducation)}>+ Add</button>
                                    </div>
                                    <div className="list-container">
                                        <strong>Extra Remarks:</strong>
                                        {
                                            resumeData.education[formMetaData.editEducation].extras &&
                                            Object.values(resumeData.education[formMetaData.editEducation].extras).map((extraObj) =>
                                                <div className={"flex-apart" + (extraObj.hidden ? " strike-through" : "")} key={extraObj.id}>
                                                    <input
                                                        type="text"
                                                        name={extraObj.id}
                                                        placeholder="Remark"
                                                        value={extraObj.title}
                                                        onChange={(e) => handleRemarksInputChange(e, formMetaData.editEducation)}
                                                    />
                                                    <button
                                                        title="Toggle Visibility"
                                                        onClick={() => toggleResumeForthLayerVisibility("education", formMetaData.editEducation, "extras", extraObj.id)}
                                                    >
                                                        <Icon src={extraObj.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} />
                                                    </button>
                                                    <button
                                                        title="Delete Remark"
                                                        onClick={() => deleteResumeForthLayer("education", formMetaData.editEducation, "extras", extraObj.id)}
                                                        className="red-on-hover"
                                                    >
                                                        <Icon src={deleteIcon} type={"svg"} />
                                                    </button>
                                                </div>)
                                        }
                                        <button title="Add Remark" onClick={() => addNewRemark(formMetaData.editEducation)}>+ Add</button>
                                    </div>
                                </div>
                                <div className="primary-buttons">
                                    <button className="red-on-hover" onClick={() => {
                                        if (confirm("Are you sure you want to delete: " + resumeData.education[formMetaData.editEducation].institution + "?")) {
                                            setFormMetaData({ ...formMetaData, editEducation: undefined });
                                            deleteEducation(formMetaData.editEducation);
                                        }
                                    }}>Delete</button>
                                    <button onClick={() => toggleResumeSubSectionVisibility("education", formMetaData.editEducation)}>
                                        {resumeData.education[formMetaData.editEducation].hidden ? "Show" : "Hide"}
                                    </button>
                                    <button onClick={() => {
                                        setFormMetaData({ ...formMetaData, editEducation: undefined })
                                    }}>Close</button>
                                </div>
                            </div>
                        }
                    </>
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
                        <button title="Add Project" onClick={() => addNewProject()}>+ Add</button>
                        <button
                            title={formMetaData.sortProjects ? "Done Sorting" : "Sort Projects"}
                            onClick={() => setFormMetaData({ ...formMetaData, sortProjects: !formMetaData.sortProjects })}
                        >
                            <Icon src={formMetaData.sortProjects ? sortEndIcon : sortBeginIcon} type={"svg"} />
                        </button>
                        <button title="Toggle Visibility" onClick={() => toggleResumeSectionVisibility("projects")}>
                            <Icon src={resumeData.projects.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} />
                        </button>
                    </>
                }
            >
                {formMetaData.sortProjects ?
                    <SortableList
                        onSortEnd={onSortEndProjects}
                        className="sortable-list"
                        draggedItemClassName="sortable-dragged"
                    >
                        {resumeData.projects.root.childIds.map((projectId) =>
                            <SortableItem key={projectId}>
                                <div className="sortable-item">
                                    {"⋮ "}{resumeData.projects[projectId].title}
                                </div>
                            </SortableItem>)}
                    </SortableList>
                    :
                    <>
                        {resumeData.projects.root.childIds.map((projectId) =>
                            <button
                                key={projectId}
                                className={"edit-button" + (projectId === formMetaData.editProject ? " highlight" : "") + (resumeData.projects[projectId].hidden ? " strike-through" : "")}
                                onClick={() => setFormMetaData({ ...formMetaData, editProject: (formMetaData.editProject === projectId ? undefined : projectId) })}
                            >
                                {resumeData.projects[projectId].title || "(Empty)"}
                                <Icon src={editIcon} />
                            </button>
                        )}
                    
                        {resumeData.projects[formMetaData.editProject] &&
                            <div className="form-editor">
                                <div className="form-editor-content">
                                    <label>
                                        <strong>Project Title:</strong>
                                        <input
                                            type="text" name={formMetaData.editProject}
                                            placeholder="Project Title"
                                            value={resumeData.projects[formMetaData.editProject].title || ""}
                                            onChange={(e) => handleSubSectionInputChange("projects", e, "title")}
                                        />
                                    </label>
                                    <label>
                                        <strong>Date:</strong>
                                        <input
                                            type="text" name={formMetaData.editProject}
                                            placeholder="Completion Date"
                                            value={resumeData.projects[formMetaData.editProject].endDate || ""}
                                            onChange={(e) => handleSubSectionInputChange("projects", e, "endDate")}
                                        />
                                    </label>
                                    <label>
                                        <strong>Reference Link:</strong>
                                        <input
                                            type="url" name={formMetaData.editProject}
                                            placeholder="Link"
                                            value={resumeData.projects[formMetaData.editProject].link || ""}
                                            onChange={(e) => handleSubSectionInputChange("projects", e, "link")}
                                        />
                                    </label>
                                
                                    <div className="list-container">
                                        <strong>Accomplishments:</strong>
                                        {
                                            resumeData.projects[formMetaData.editProject].accomplishments &&
                                            Object.values(resumeData.projects[formMetaData.editProject].accomplishments).map((accomplishmentObj) =>
                                                <div className={"flex-apart" + (accomplishmentObj.hidden ? " strike-through" : "")} key={accomplishmentObj.id}>
                                                    <textarea
                                                        name={accomplishmentObj.id}
                                                        rows="3"
                                                        placeholder="Description"
                                                        value={accomplishmentObj.title}
                                                        onChange={(e) => handleProjectAccomplishmentInputChange(e, formMetaData.editProject)}
                                                        style={{ flex: "auto" }}
                                                    />

                                                    <button
                                                        title="Toggle Visibility"
                                                        onClick={() => toggleResumeForthLayerVisibility("projects", formMetaData.editProject, "accomplishments", accomplishmentObj.id)}
                                                    >
                                                        <Icon src={accomplishmentObj.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} />
                                                    </button>
                                                    <button
                                                        title="Delete Accomplishment Description"
                                                        onClick={() => deleteResumeForthLayer("projects", formMetaData.editProject, "accomplishments", accomplishmentObj.id)}
                                                        className="red-on-hover"
                                                    >
                                                        <Icon src={deleteIcon} type={"svg"} />
                                                    </button>
                                                </div>)
                                        }
                                        <button title="Add Accomplishment" onClick={() => addNewProjectAccomplishment(formMetaData.editProject)}>+ Add</button>
                                    </div>
                                </div>
                                <div className="primary-buttons">
                                    <button className="red-on-hover" onClick={() => {
                                        if (confirm("Are you sure you want to delete: " + resumeData.projects[formMetaData.editProject].title + "?")) {
                                            setFormMetaData({ ...formMetaData, editProject: undefined });
                                            deleteProject(formMetaData.editProject);
                                        }
                                    }}>Delete</button>
                                    <button onClick={() => toggleResumeSubSectionVisibility("projects", formMetaData.editProject)}>
                                        {resumeData.projects[formMetaData.editProject].hidden ? "Show" : "Hide"}
                                    </button>
                                    <button onClick={() => {
                                        setFormMetaData({ ...formMetaData, editProject: undefined })
                                    }}>Close</button>
                                </div>
                            </div>
                        }
                    </>
                }
            </FormSection>

            <FormSection
                formMetaData={formMetaData} setFormMetaData={setFormMetaData}
                showFormSection={"showExperience"}
                title="Work Experience"
                id={"experience-form"}
                strikeThrough={resumeData.experience.hidden}
                sideButtons={
                    <>
                        <button title="Add Work Experience" onClick={() => addNewWorkExperience()}>+ Add</button>
                        <button
                            title={formMetaData.sortExperience ? "Done Sorting" : "Sort Work Experience"}
                            onClick={() => setFormMetaData({ ...formMetaData, sortExperience: !formMetaData.sortExperience })}
                        >
                            <Icon src={formMetaData.sortExperience ? sortEndIcon : sortBeginIcon} type={"svg"} />
                        </button>
                        <button title="Toggle Visibility" onClick={() => toggleResumeSectionVisibility("experience")}>
                            <Icon src={resumeData.experience.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} />
                        </button>
                    </>
                }
            >
                {formMetaData.sortExperience ?
                    <SortableList
                        onSortEnd={onSortEndExperience}
                        className="sortable-list"
                        draggedItemClassName="sortable-dragged"
                    >
                        {resumeData.experience.root.childIds.map((experienceId) =>
                            <SortableItem key={experienceId}>
                                <div className="sortable-item">
                                    {"⋮ "}{resumeData.experience[experienceId].company}
                                </div>
                            </SortableItem>)}
                    </SortableList>
                    :
                    <>
                        {resumeData.experience.root.childIds.map((experienceId) =>
                            <button
                                key={experienceId}
                                className={"edit-button" + (experienceId === formMetaData.editExperience ? " highlight" : "") + (resumeData.experience[experienceId].hidden ? " strike-through" : "")}
                                onClick={() => setFormMetaData({ ...formMetaData, editExperience: (formMetaData.editExperience === experienceId ? undefined : experienceId) })}
                            >
                                {resumeData.experience[experienceId].company || "(Empty)"}
                                <Icon src={editIcon} />
                            </button>
                        )}

                        {resumeData.experience[formMetaData.editExperience] &&
                            <div className="form-editor">
                                <div className="form-editor-content">
                                    <label>
                                        <strong>Company:</strong>
                                        <input
                                            type="text" name={formMetaData.editExperience}
                                            placeholder="Name of Company"
                                            value={resumeData.experience[formMetaData.editExperience].company || ""}
                                            onChange={(e) => handleSubSectionInputChange("experience", e, "company")}
                                        />
                                    </label>
                                    <label>
                                        <strong>Position:</strong>
                                        <input
                                            type="text" name={formMetaData.editExperience}
                                            placeholder="Title of Position"
                                            value={resumeData.experience[formMetaData.editExperience].title || ""}
                                            onChange={(e) => handleSubSectionInputChange("experience", e, "title")}
                                        />
                                    </label>
                                    <div className="flex-apart">
                                        <label>
                                            <strong>Start Date:</strong>
                                            <input
                                                type="text" name={formMetaData.editExperience}
                                                placeholder="Date of Employment"
                                                value={resumeData.experience[formMetaData.editExperience].startDate || ""}
                                                onChange={(e) => handleSubSectionInputChange("experience", e, "startDate")}
                                            />
                                        </label>
                                        <label>
                                            <strong>End Date:</strong>
                                            <input
                                                type="text" name={formMetaData.editExperience}
                                                placeholder="Date of Leave"
                                                value={resumeData.experience[formMetaData.editExperience].endDate || ""}
                                                onChange={(e) => handleSubSectionInputChange("experience", e, "endDate")}
                                            />
                                        </label>
                                    </div>
                                    <label>
                                        <strong>Address:</strong>
                                        <input
                                            type="text" name={formMetaData.editExperience}
                                            placeholder="Address of Company"
                                            value={resumeData.experience[formMetaData.editExperience].address || ""}
                                            onChange={(e) => handleSubSectionInputChange("experience", e, "address")}
                                        />
                                    </label>
                                
                                    <div className="list-container">
                                        <strong>Accomplishments:</strong>
                                        {
                                            resumeData.experience[formMetaData.editExperience].accomplishments &&
                                            Object.values(resumeData.experience[formMetaData.editExperience].accomplishments).map((accomplishmentObj) =>
                                                <div className={"flex-apart" + (accomplishmentObj.hidden ? " strike-through" : "")} key={accomplishmentObj.id}>
                                                    <textarea
                                                        name={accomplishmentObj.id}
                                                        rows="3"
                                                        placeholder="Description"
                                                        value={accomplishmentObj.title}
                                                        onChange={(e) => handleWorkAccomplishmentInputChange(e, formMetaData.editExperience)}
                                                        style={{ flex: "auto" }}
                                                    />

                                                    <button
                                                        title="Toggle Visibility"
                                                        onClick={() => toggleResumeForthLayerVisibility("experience", formMetaData.editExperience, "accomplishments", accomplishmentObj.id)}
                                                    >
                                                        <Icon src={accomplishmentObj.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} />
                                                    </button>
                                                    <button
                                                        title="Delete Accomplishment Description"
                                                        onClick={() => deleteResumeForthLayer("experience", formMetaData.editExperience, "accomplishments", accomplishmentObj.id)}
                                                        className="red-on-hover"
                                                    >
                                                        <Icon src={deleteIcon} type={"svg"} />
                                                    </button>
                                                </div>)
                                        }
                                        <button title="Add Accomplishment" onClick={() => addNewWorkAccomplishment(formMetaData.editExperience)}>+ Add</button>
                                    </div>
                                </div>
                                <div className="primary-buttons">
                                    <button className="red-on-hover" onClick={() => {
                                        if (confirm("Are you sure you want to delete: " + resumeData.experience[formMetaData.editExperience].company + "?")) {
                                            setFormMetaData({ ...formMetaData, editExperience: undefined });
                                            deleteExperience(formMetaData.editExperience);
                                        }
                                    }}>Delete</button>
                                    <button onClick={() => toggleResumeSubSectionVisibility("experience", formMetaData.editExperience)}>
                                        {resumeData.experience[formMetaData.editExperience].hidden ? "Show" : "Hide"}
                                    </button>
                                    <button onClick={() => {
                                        setFormMetaData({ ...formMetaData, editExperience: undefined })
                                    }}>Close</button>
                                </div>
                            </div>
                        }
                    </>
                }
            </FormSection>

            <FormSection
                formMetaData={formMetaData}
                setFormMetaData={setFormMetaData}
                showFormSection="showAdditional"
                title="Additional"
                id="additional-form"
                strikeThrough={resumeData.additional.hidden}
                sideButtons={<>
                    <button title="Add Category" onClick={() => addNewAdditionalItem("root")}>+ Add</button>
                    <button title={formMetaData.sortAdditional ? "Done Sorting" : "Sort Category"} onClick={() => setFormMetaData({ ...formMetaData, sortAdditional: !formMetaData.sortAdditional })}>
                        <Icon src={formMetaData.sortAdditional ? sortEndIcon : sortBeginIcon} type={"svg"} />
                    </button>
                    <button onClick={() => toggleResumeSectionVisibility("additional")} title="Toggle Visibility">
                        <Icon src={resumeData.additional.hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} alt={"visibility"} />
                    </button>
                </>}
            >
                {formMetaData.sortAdditional ?
                    <SortableList
                        onSortEnd={onSortEndAdditional}
                        className="sortable-list"
                        draggedItemClassName="sortable-dragged"
                    >
                        {resumeData.additional.root.childIds.map((categoryId) =>
                            <SortableItem key={categoryId}>
                                <div className="sortable-item">
                                    {"⋮ "}{resumeData.additional[categoryId].title}
                                </div>
                            </SortableItem>)}
                    </SortableList>
                    : <>
                        {resumeData.additional.root.childIds.map((categoryId) =>
                            <button
                                key={categoryId}
                                className={"edit-button" + (categoryId === formMetaData.editAdditional ? " highlight" : "") + (resumeData.additional[categoryId].hidden ? " strike-through" : "")}
                                onClick={() => setFormMetaData({ ...formMetaData, editAdditional: (formMetaData.editAdditional === categoryId ? undefined : categoryId) })}
                                style={{ alignItems: "flex-start" }}
                            >
                                <div>{(resumeData.additional[categoryId].title || "(Empty)") + ":"}</div>
                                <div>
                                    <ul className="horizontal-list">
                                        {resumeData.additional[categoryId].childIds.map((childId) =>
                                            <li key={childId} className={resumeData.additional[childId].hidden ? "strike-through" : ""}>{resumeData.additional[childId].title}</li>
                                        )}
                                    </ul>
                                </div>
                                <Icon src={editIcon} />
                            </button>
                        )
                        }
                    
                        {resumeData.additional[formMetaData.editAdditional] && <div className={"form-editor"}>
                            <div className="form-editor-content">
                                <label>
                                    <strong>Category:</strong>
                                    <input
                                        type="text"
                                        name={formMetaData.editAdditional}
                                        placeholder="Category Title"
                                        value={resumeData.additional[formMetaData.editAdditional].title || ""}
                                        onChange={(e) => handleSubSectionInputChange("additional", e)} />
                                </label>
                                <div className="list-container">
                                    <strong>Items:</strong>
                                    {resumeData.additional[formMetaData.editAdditional].childIds.map((itemId) =>
                                        <div className={"flex-apart" + (resumeData.additional[itemId].hidden ? " strike-through" : "")} key={itemId}>
                                            <input type="text" name={itemId} placeholder="Item" value={resumeData.additional[itemId].title} onChange={e => handleSubSectionInputChange("additional", e)} />
                                            <button title="Toggle Visibility" onClick={() => toggleResumeSubSectionVisibility("additional", itemId)}><Icon src={resumeData.additional[itemId].hidden ? visibilityOffIcon : visibilityOnIcon} type={"svg"} /></button>
                                            <button title="Delete Item" className="red-on-hover" onClick={() => deleteAdditionalItem(formMetaData.editAdditional, itemId)}>
                                                <Icon src={deleteIcon} type={"svg"} />
                                            </button>
                                        </div>
                                    )}
                                    <button type="button" title="Add Item" onClick={() => addNewAdditionalItem(formMetaData.editAdditional)}>+ Add</button>
                                </div>
                            </div>
                            <div className="primary-buttons">
                                <button className="red-on-hover" onClick={() => {
                                    if (confirm("Are you sure you want to delete: " + resumeData.additional[formMetaData.editAdditional].title + "?")) {
                                        setFormMetaData({ ...formMetaData, editAdditional: undefined })
                                        deleteAdditionalItem("root", formMetaData.editAdditional);
                                    }
                                }}>Delete</button>
                                <button onClick={() => toggleResumeSubSectionVisibility("additional", formMetaData.editAdditional)}>
                                    {resumeData.additional[formMetaData.editAdditional].hidden ? "Show" : "Hide"}
                                </button>
                                <button onClick={() => {
                                    setFormMetaData({ ...formMetaData, editAdditional: undefined })
                                }}>Close</button>
                            </div>
                        </div>}
                    </>
                }

            </FormSection>
        </form>
    );
}