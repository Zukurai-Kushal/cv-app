export const Dwight_Schrute = {
  fullName: "Dwight Schrute",
  email: "dwight_schrute@dundermifflin.com",
  phone: "1-800-984-3672",
  linkedIn: "https://www.linkedin.com/in/dwight-schrute-42534844/",
  address: "Scranton, Pennsylvania, USA",
  link: "https://theoffice.fandom.com/wiki/Dwight_Schrute",

  objective: {
    value:
      "I am a dedicated and hardworking Assistant to the Regional Manager at Dunder Mifflin. With a strong background in sales and a passion for beet farming, I strive to achieve excellence in all my endeavors. My goal is to become the Regional Manager and lead the Scranton branch to new heights.",
  },

  skills: {
    showGrouping: true,
    groups: {
      1: {
        group: "Soft Skills",
        skillList: [
          { id: "0", value: "Leadership", hidden: false },
          { id: "1", value: "Sales", hidden: false },
        ],
      },
      2: {
        group: "Others",
        skillList: [
          { id: "2", value: "Beet Farming", hidden: false },
          { id: "3", value: "Martial Arts", hidden: false },
          { id: "4", value: "Expert RuneScape Player", hidden: false },
        ],
      },
    },
  },

  education: [
    {
      institution: "Pennsylvania State University",
      startDate: "1993",
      endDate: "1997",
      degree: "Bachelor of Business Administration",
      subject: "Major in Marketing",
      address: "University Park, PA, US",
      gpa: "3.0",
      extras: [],
      coursework: ["Farming 101", "Intro to Business Management"],
    },
    {
      institution: "Scranton High School",

      endDate: "1993",
      degree: "High School Diploma",
      address: "63 Mike Munchak Way, Scranton, PA, US",
      extras: [
        "Assistant to the class teacher",
        "Consecutively won the best hall monitor from 1991-1993",
      ],
    },
  ],

  projects: [
    {
      project: "Automated Guest Announcer",
      endDate: "April 2020",
      tasks: [
        "Built an image recognition model to recognize and announce guests as they entrance a venue.",
      ],
    },
    {
      project: "Jello Detector",
      endDate: "2008",
      tasks: [
        "Build a device to detect the presence of jello, which has reduced the frequency of office pranks by 20%.",
      ],
    },
  ],

  experience: [
    {
      startDate: "2001",
      endDate: "Present",
      company: "Dunder Mifflin",
      address: "1725 Slough Avenue in Scranton, PA, US",
      title: "Assistant to the Regional Manager",
      tasks: [
        "Consistently ranked as the top salesman in the Scranton branch, achieving the highest sales numbers for multiple consecutive years.",
        "Awarded Employee of the Month several times for outstanding performance and dedication to the company.",
        "Successfully managed office operations and supported the Regional Manager in various administrative tasks, contributing to the overall efficiency of the branch.",
      ],
    },
    {
      startDate: "1997",
      endDate: "Present",
      company: "Schrute Farms",
      address: "Rural Rt. 6, Honesdale, PA, US",
      title: "Owner",
      tasks: [
        "Implemented sustainable and organic farming practices, resulting in high-quality beet production and increased farm profitability.",
        "Developed and promoted Schrute Farms as a successful agrotourism destination, attracting visitors for farm tours, bed and breakfast stays, and beet-related activities.",
      ],
    },
  ],

  additional: {
    languages: [
      "Fluent in English",
      "Conversational in Germen",
      "Fluent in Klingon",
    ],
    hobbies: ["Bear Watching"],
  },
};

export const Kushal = {
  fullName: "Kushal Thapa",
  email: "kushal2486@yahoo.com",
  github: "https://github.com/Zukurai-Kushal",
  linkedIn: "https://www.linkedin.com/in/kushal-thapa-935261207/",

  objective:
    "Computer Engineering graduate with a year-long internship experience actively seeking a software engineering position. Passionate towards roles involving problem solving, hungry to grow my skill set and eager to make an impact.",

  skills: {
    technologies: [
      "Python",
      "C",
      "JavaScript",
      "HTML/CSS",
      "C++",
      "C#",
      "Java",
      "SQL",
      "VHDL",
      "Verilog",
    ],
    tools: ["Git", "Bash", "MySQL"],
    softSkills: ["Detail oriented", "Active communicator", "Team player"],
    others: [],
  },

  education: [
    {
      institution: "The University of Hong Kong",
      endDate: "June 2023",
      degree: "Bachelor of Engineering",
      subject: "Major in Computer Engineering",
      address: "Pok Fu Lam, Hong Kong",
      gpa: "3.14 (𝜋)",
      coursework: [
        "Algorithms",
        "Artificial Intelligence",
        "Cyber Security",
        "Database Management",
        "Software Engineering",
        "Operating Systems",
      ],
    },
    {
      institution: "The University of Cambridge",
      startDate: "July 2019",
      endDate: "August 2019",
      degree: "International Summer Programme in Cryptography",
      address: "Cambridge, United Kingdom",
    },
  ],

  projects: [
    {
      project: "AIoT System for Smart Water Auditing",
      endDate: "April 2023",
      tasks: [
        "Designed and deployed a non-intrusive, vibration based IoT system capable of collecting and uploading the water use data of a household to a cloud - based database through Wi - Fi.",
        "Performed data analysis by conducting data cleaning and feature extraction on the water use data and then trained an SVM model to classify the water flow events, the results have shown a classification accuracy of around 73%.",
      ],
      link: "https://github.com/Zukurai-Kushal/Water_Audit_Project_Full",
    },
    {
      project: "Flower Classification CNN Model",
      endDate: "November 2022",
      tasks: [
        "Designed and implemented several CNN models to categorize different types of flower images, achieved a validation accuracy of 86%.",
      ],
    },
    {
      project: "Self Navigating Robotic Miniature Car",
      endDate: "April 2020",
      tasks: [
        "Constructed a robotic miniature car capable of navigating and avoiding obstacles in a 5x5 grid by using a series of micro-controllers, motors, and sensors.",
      ],
    },
  ],

  experience: [
    {
      startDate: "June 2021",
      endDate: "May 2022",
      company: "High Tech Technology LTD. (IC Development Company)",
      address: "Hong Kong Science Park, Hong Kong",
      title: "Assistant Engineer (Intern)",
      tasks: [
        "Developed firmware for an embedded system by designing its core kernel architecture using SDCC (Small Device C Compiler) on a 8051-microcontroller architecture, which links the digital and analog components and enables the IC to operate as intended.",
        "Designed and conducted testing phases for multiple projects by writing and simulating test cases for different scenarios, ensuring a thorough and robust product for the end user.",
        "Led the design process for the digital component of an RGB LED IC driver by planning the RTL digital circuit designs using Verilog. The product is now being used for the ambient lighting inside electric cars.",
      ],
    },
  ],

  additional: {
    languages: ["Fluent in English", "Conversational Proficiency in Cantonese"],
    certifications: ["IELTS overall score: 8/9"],
    hobbies: ["Game development", "Rock Climbing", "Photography"],
  },
};
