export default function Form({ resumeData, setResumeData }) {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResumeData({ ...resumeData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Personal Detail;</h1>
            <label><strong>Full Name: </strong> <input type="text" name="fullName" placeholder="Full Name" value={resumeData.fullName} onChange={handleInputChange} /></label>
            <label><strong>Email: </strong> <input type="email" name="email" placeholder="Email" value={resumeData.email} onChange={handleInputChange} /></label>
            <label><strong>Phone Number: </strong> <input type="tel" name="phone" placeholder="Phone Number" value={resumeData.phone} onChange={handleInputChange} /></label>
            <label><strong>LinkedIn: </strong> <input type="url" name="linkedIn" placeholder="LinkedIn" value={resumeData.linkedIn} onChange={handleInputChange} /></label>
            <label><strong>GitHub: </strong> <input type="url" name="github" placeholder="GitHub" value={resumeData.github} onChange={handleInputChange} /></label>
            {/* {resumeData.links.map((link)=><label key={link}><strong>Link: </strong> <input type="url" name="github" placeholder="Link" value={link} /></label>)} */}
        </form>
    );
}