import emailIcon from "../assets/email.svg"
import phoneIcon from "../assets/phone.svg"
import githubLogo from "../assets/github.svg"
import linkedInLogo from "../assets/linkedin.svg"
import linkIcon from "../assets/link.svg"
import addressIcon from "../assets/pin.svg"
import Icon from "./Icon"

import "../styles/Resume.css"
import { Fragment } from "react"

function RightSideSegment({ startDate, endDate, address, link}) {
  return <>
    {startDate ? <div>{startDate + " - " + (endDate ? endDate:"Present")}</div>: <div>{endDate}</div>}
    {address && <div><address>{address}</address></div>}
    {link && <div><a href={link} target="_blank" title="link">{link}</a></div>}
  </>
}

function ExperienceSegment({company, startDate, endDate, title, address, tasks}) {
  return <div className="sub-segment">
    <div className="flex-apart">
      <div className="left-segment">
        <h3>{company}</h3>
        <strong>{title}</strong>
      </div>
      <div className="right-segment">
        <RightSideSegment startDate={startDate} endDate={endDate} address={address}/>
      </div>
    </div>
    <ul>
      {tasks.map((task)=><li key={task}>{task}</li>)}
    </ul>
  </div>;
}

function EducationSegment({ institution, startDate, endDate, degree, subject, address, gpa, extras, coursework, hidden }) {
  if (hidden) {
    return;
  }
  let relevantCoursework = [];
  if (coursework) {
    relevantCoursework = Object.values(coursework).filter((courseworkObj) => !courseworkObj.hidden);
  }
  return <div className="sub-segment">
    <div className="flex-apart">
      <div className="left-segment">
        <h3>{institution}</h3>
        <div>
          <strong>{degree}</strong>
          <em>{subject && " ("+subject+")"}</em>
        </div>
      </div>
      <div className="right-segment">
        <RightSideSegment startDate={startDate} endDate={endDate} address={address}/>
      </div>
    </div>
    <div>{gpa && "GPA: " + gpa}</div>
    
    {extras && Object.values(extras).map((extraObj) => !extraObj.hidden && <div key={extraObj.id}><i>{"* " + extraObj.title}</i></div>)}

    <div className="two-col-grid">
      {relevantCoursework.length > 0 && 
        <>
          <label>Relevant Coursework:</label>
          <ul className="horizontal-list">
            {relevantCoursework.map((courseObj) => <li key={courseObj.id}>{courseObj.title}</li>)}
          </ul>
        </>
      }
    </div>
  </div>;
}

function ProjectSegment({ title, endDate, accomplishments ,link }) {
  return <div className="sub-segment">
    <div className="flex-apart">
      <div className="left-segment">
        <h3>{title}</h3>
      </div>
      <div className="right-segment">
        <RightSideSegment endDate={endDate} link={link}/>
      </div>
    </div>
    <ul>
      {Object.values(accomplishments).map((accomplishmentObj) => <li key={accomplishmentObj.id}>{accomplishmentObj.title}</li>)}
    </ul>
  </div>
}

function Skills({ skills }) {
  return (skills.showGrouping ? <div className="two-col-grid">
    {skills.root.childIds.map((groupId) => !skills[groupId].hidden && <Fragment key={groupId}>
      <label>{skills[groupId].title}</label>
      <ul className="horizontal-list">
        {skills[groupId].childIds.map((skillId) => (!skills[skillId].hidden && <li key={skillId}>{skills[skillId].title}</li>))}
      </ul>
    </Fragment>)}
  </div>
    : <ul className="horizontal-list" style={{paddingLeft:"3ch"}}>
      {skills.root.childIds.map((groupId) => !skills[groupId].hidden && skills[groupId].childIds.map((skillId) =>
        !skills[skillId].hidden && <li key={skillId}>{skills[skillId].title}</li>
      ))}
    </ul>
  )
}

export default function Resume({ fullName, email, phone, address, github, linkedIn, link, objective, skills, education, projects, experience, additional }) {

  return (
    <div className="resume">
      <div className="flex-apart">
        <h1>{fullName}</h1>
        <div className="links">
          {email && <a href={"mailto:" + email} title="Email" className="link-container"><Icon src={emailIcon}/>{email}</a>}
          {phone && <a href={"tel:" + phone} title="Phone Number" className="link-container"><Icon src={phoneIcon} />{phone}</a>}
          {address && <address className="link-container"><Icon src={addressIcon}/> {address}</address>}
          {github && <a href={github} target="_blank" title="Github Profile" className="link-container"><Icon src={githubLogo}/>{github.replace(/(^\w+:|^)\/\//, '')}</a>}
          {linkedIn && <a href={linkedIn} target="_blank" title="LinkedIn Profile" className="link-container"><Icon src={linkedInLogo}/>{linkedIn.replace(/(^\w+:|^)\/\/www./, '')}</a>}
          {link && <a href={link} target="_blank" title="Personal Website" className="link-container"><Icon src={linkIcon} />{link}</a>}
        </div>
      </div>

      {objective && !objective.hidden &&
        <section>
          <h2>Objective</h2>
          <hr />
          <p>{objective.value}</p>
        </section>
      }
      
      {skills && !skills.hidden && <section>
        <h2>Skills</h2>
        <hr />
        <Skills skills={skills} />
      </section>}
  
      {education && !education.hidden && <section>
        <h2>Education</h2>
        <hr />
        {education.root.childIds.map((educationId) => <EducationSegment {...education[educationId]} key={educationId}/>)}
      </section>}
      
      {projects && !projects.hidden && <section>
        <h2>Projects</h2>
        <hr />
        {projects.root.childIds.map((projectId) => <ProjectSegment {...projects[projectId]} key={projectId} />)}
      </section>}
    
      {experience && !experience.hidden && <section>
        <h2>Work Experience</h2>
        <hr />
        {experience.map((experienceSegment) => <ExperienceSegment {...experienceSegment} key={experienceSegment.company}/>)}
      </section>}
      
      {additional && !additional.hidden && <section>
        <h2>Additional</h2>
        <hr />
        <div className="two-col-grid">
          {additional.languages && additional.languages.length > 0 && <>
            <label>Languages:</label>
            <ul className="horizontal-list">
              {additional.languages.map((language) => <li key={language}>{language}</li>)}
            </ul>
          </>}
          {additional.certifications && additional.certifications.length > 0 && <>
            <label>Certifications:</label>
            <ul className="horizontal-list">
              {additional.certifications.map((certification) => <li key={certification}>{certification}</li>)}
            </ul>
          </>}
          {additional.hobbies && additional.hobbies.length > 0 && <>
            <label>Hobbies:</label>
            <ul className="horizontal-list">
              {additional.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
            </ul>
          </>}
        </div>
      </section>}
    </div>
  );
}