import emailLogo from "../assets/email.svg"
import phoneLogo from "../assets/phone.svg"
import githubLogo from "../assets/github.svg"
import linkedInLogo from "../assets/linkedin.svg"
import linkLogo from "../assets/link.svg"
import Icon from "./Icon"

import "../styles/Resume.css"

function RightSideSegment({ startDate, endDate, address, link}) {
  return <>
    {startDate ? <div>{startDate + " - " + endDate}</div>: <div>{endDate}</div>}
    {address ? <div><i>{address}</i></div> : null}
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
    {extras? extras.map((extra) => <li key={extra} style={{listStyleType: "circle"}}><i>{extra}</i></li>) : null}
    <div className="horizontal-list-container">
      {coursework && coursework.length > 0 ? <><label>Relevant Coursework:</label><ul>{coursework.map((course) => <li key={course}>{course}</li>)}</ul></>:null}
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

export default function Resume({ fullName, email, phone, github, linkedIn, links, objective, skills, education, projects, experience, additional }) {

  return (
    <div className="resume">
      <div className="flex-apart">
        <h1>{fullName}</h1>
        <div className="links">
          {email ? <a href={"mailto:" + email} title="Email" className="link-container"><Icon src={emailLogo}/>{email}</a> : null}
          {phone ? <a href={"tel:" + phone} title="Phone Number" className="link-container"><Icon src={phoneLogo}/>{phone}</a> : null}
          {github ? <a href={github} target="_blank" title="Github Profile" className="link-container"><Icon src={githubLogo}/>{github.replace(/(^\w+:|^)\/\//, '')}</a> : null}
          {linkedIn ? <a href={linkedIn} target="_blank" title="LinkedIn Profile" className="link-container"><Icon src={linkedInLogo}/>{linkedIn.replace(/(^\w+:|^)\/\/www./, '')}</a> : null}
          {links ? links.map((link) => <a href={link.value} target="_blank" title="Link" key={link.id} className="link-container"><Icon src={linkLogo} />{link.value}</a>) : null}
        </div>
      </div>

      {objective ?
        <section>
          <h2>Objective</h2>
          <hr />
          <p>{objective}</p>
        </section>
        : null}
      
      {skills ? <section>
        <h2>Skills</h2>
        <hr />
        <div className="horizontal-list-container">
          {skills.technologies && skills.technologies.length > 0 ? <><label>Technologies:</label> <ul>{skills.technologies.map((skill) => <li key={skill}>{skill}</li>)}</ul></> : null}
          {skills.tools && skills.tools.length > 0 ? <><label>Tools:</label> <ul>{skills.tools.map((skill) => <li key={skill}>{skill}</li>)}</ul></> : null}
          {skills.softSkills && skills.softSkills.length > 0 ? <><label>Soft Skills:</label> <ul>{skills.softSkills.map((skill) => <li key={skill}>{skill}</li>)}</ul></> : null}
          {skills.others && skills.others.length > 0 ? <><label>Others:</label> <ul>{skills.others.map((skill) => <li key={skill}>{skill}</li>)}</ul></> : null}
        </div>
      </section> : null}
  
      {education ? <section>
        <h2>Education</h2>
        <hr />
        {education.map((educationSegment) => <EducationSegment {...educationSegment} key={educationSegment.institution}/>)}
      </section> : null}
      
      {projects ? <section>
        <h2>Projects</h2>
        <hr />
        {projects.map((project) => <ProjectSegment {...project} key={project.project}/>)}
      </section> : null}
    
      {experience ? <section>
        <h2>Work Experience</h2>
        <hr />
        {experience.map((experienceSegment) => <ExperienceSegment {...experienceSegment} key={experienceSegment.company}/>)}
      </section> : null}
      
      {additional ? <section>
        <h2>Additional</h2>
        <hr />
        <div className="horizontal-list-container">
          {additional.languages && additional.languages.length > 0 ? <>
            <label>Languages:</label>
            <ul>
              {additional.languages.map((language) => <li key={language}>{language}</li>)}
            </ul>
          </> : null}
          {additional.certifications && additional.certifications.length > 0 ? <>
            <label>Certifications:</label>
            <ul>
              {additional.certifications.map((certification) => <li key={certification}>{certification}</li>)}
            </ul>
          </> : null}
          {additional.hobbies && additional.hobbies.length > 0 ? <>
            <label>Hobbies:</label>
            <ul>
              {additional.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
            </ul>
          </> : null}
        </div>
      </section>:null}
    </div>
  );
}