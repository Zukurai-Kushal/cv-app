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
    {startDate ? <div>{startDate + " - " + endDate}</div>: <div>{endDate}</div>}
    {address ? <div><address>{address}</address></div> : null}
    {link ? <div><a href={link} target="_blank" title="link">{link}</a></div>:null}
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

function EducationSegment({ institution, startDate, endDate, degree, subject, address, gpa, extras, coursework }) {
  return <div className="sub-segment">
    <div className="flex-apart">
      <div className="left-segment">
        <h3>{institution}</h3>
        <div>
          <strong>{degree}</strong>
          <em>{subject? " ("+subject+")" : null}</em>
        </div>
      </div>
      <div className="right-segment">
        <RightSideSegment startDate={startDate} endDate={endDate} address={address}/>
      </div>
    </div>
    <div>{gpa ? "GPA: " + gpa : null}</div>
    {extras ? extras.map((extra) => <div key={extra}><i>{"* "+extra}</i></div>) : null}

    <div className="two-col-grid">
      {coursework && coursework.length > 0 ? <><label>Relevant Coursework:</label><ul className="horizontal-list">{coursework.map((course) => <li key={course}>{course}</li>)}</ul></>:null}
    </div>
    </div>;
}

function ProjectSegment({ project, endDate, tasks ,link }) {
  return <div className="sub-segment">
    <div className="flex-apart">
      <div className="left-segment">
        <h3>{project}</h3>
      </div>
      <div className="right-segment">
        <RightSideSegment endDate={endDate} link={link}/>
      </div>
    </div>
    <ul>
      {tasks.map((task) => <li key={task}>{task}</li>)}
    </ul>
  </div>
}

function Skills({ skills }) {

  return (skills.showGrouping ?
    <div className="two-col-grid">
      {Object.values(skills.groups).map((groupObj) => <Fragment key={groupObj.group}>
        <label>{groupObj.group}</label>
        <ul className="horizontal-list">
          {groupObj.skillList.filter((skill) => !skill.hidden).map((skill) => <li key={skill.id}>{skill.value}</li>)}
        </ul>
      </Fragment>)}
    </div>
    : <ul className="horizontal-list">
      {Object.values(skills.groups).map((groupObj) => <Fragment key={groupObj.group}>
          {groupObj.skillList.filter((skill) => !skill.hidden).map((skill) => <li key={skill.id}>{skill.value}</li>)}
      </Fragment>)}
    </ul>);
}

export default function Resume({ fullName, email, phone, address, github, linkedIn, link, objective, skills, education, projects, experience, additional }) {

  return (
    <div className="resume">
      <div className="flex-apart">
        <h1>{fullName}</h1>
        <div className="links">
          {email ? <a href={"mailto:" + email} title="Email" className="link-container"><Icon src={emailIcon}/>{email}</a> : null}
          {phone ? <a href={"tel:" + phone} title="Phone Number" className="link-container"><Icon src={phoneIcon} />{phone}</a> : null}
          {address ? <address className="link-container"><Icon src={addressIcon}/> {address}</address>:null}
          {github ? <a href={github} target="_blank" title="Github Profile" className="link-container"><Icon src={githubLogo}/>{github.replace(/(^\w+:|^)\/\//, '')}</a> : null}
          {linkedIn ? <a href={linkedIn} target="_blank" title="LinkedIn Profile" className="link-container"><Icon src={linkedInLogo}/>{linkedIn.replace(/(^\w+:|^)\/\/www./, '')}</a> : null}
          {link ? <a href={link} target="_blank" title="Personal Website" className="link-container"><Icon src={linkIcon} />{link}</a> : null}
        </div>
      </div>

      {objective && !objective.hidden ?
        <section>
          <h2>Objective</h2>
          <hr />
          <p>{objective.value}</p>
        </section>
        : null}
      
      {skills && !skills.hidden ? <section>
        <h2>Skills</h2>
        <hr />
        <Skills skills={skills} />
      </section> : null}
  
      {education && !education.hidden ? <section>
        <h2>Education</h2>
        <hr />
        {education.map((educationSegment) => <EducationSegment {...educationSegment} key={educationSegment.institution}/>)}
      </section> : null}
      
      {projects && !projects.hidden ? <section>
        <h2>Projects</h2>
        <hr />
        {projects.map((project) => <ProjectSegment {...project} key={project.project}/>)}
      </section> : null}
    
      {experience && !experience.hidden ? <section>
        <h2>Work Experience</h2>
        <hr />
        {experience.map((experienceSegment) => <ExperienceSegment {...experienceSegment} key={experienceSegment.company}/>)}
      </section> : null}
      
      {additional && !additional.hidden ? <section>
        <h2>Additional</h2>
        <hr />
        <div className="two-col-grid">
          {additional.languages && additional.languages.length > 0 ? <>
            <label>Languages:</label>
            <ul className="horizontal-list">
              {additional.languages.map((language) => <li key={language}>{language}</li>)}
            </ul>
          </> : null}
          {additional.certifications && additional.certifications.length > 0 ? <>
            <label>Certifications:</label>
            <ul className="horizontal-list">
              {additional.certifications.map((certification) => <li key={certification}>{certification}</li>)}
            </ul>
          </> : null}
          {additional.hobbies && additional.hobbies.length > 0 ? <>
            <label>Hobbies:</label>
            <ul className="horizontal-list">
              {additional.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
            </ul>
          </> : null}
        </div>
      </section>:null}
    </div>
  );
}