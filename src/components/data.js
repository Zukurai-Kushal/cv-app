export const Clear_State = {
  objective: {},

  skills: {
    showGrouping: true,
    root: {
      id: "root",
      title: "(Root)",
      childIds: [],
    },
  },

  education: {
    root: {
      id: "root",
      title: "(Root)",
      childIds: [],
    },
  },

  projects: {
    root: {
      id: "root",
      title: "(root)",
      childIds: [],
    },
  },

  experience: {
    root: {
      id: "root",
      title: "(root)",
      childIds: [],
    },
  },

  additional: {
    root: {
      id: "root",
      title: "(root)",
      childIds: [],
    },
  },
};

export const Dwight_Schrute = {
  fullName: "Dwight Schrute",
  email: "dwight_schrute@dundermifflin.com",
  phone: "1-800-984-3672",
  linkedIn: "https://www.linkedin.com/in/dwight-schrute-42534844/",
  address: "Scranton, Pennsylvania, USA",
  link: "https://theoffice.fandom.com/wiki/Dwight_Schrute",

  objective: {
    value:
      "Dedicated and results-oriented Assistant to the Regional Manager at Dunder Mifflin with extensive experience in sales, customer service, and unconventional leadership. Passionate about maximizing productivity and efficiency through innovative strategies.",
  },

  skills: {
    showGrouping: true,
    root: {
      id: "root",
      title: "(Root)",
      childIds: [8, 1, 2],
    },
    1: {
      id: 1,
      title: "Soft Skills",
      hidden: false,
      childIds: [3, 4],
    },
    2: {
      id: 2,
      title: "Others",
      childIds: [5, 6, 7],
    },
    3: {
      id: 3,
      title: "Leadership",
      childIds: [],
    },
    4: {
      id: 4,
      title: "Sales",
      childIds: [],
    },
    5: {
      id: 5,
      title: "Beet Farming",
      childIds: [],
    },
    6: {
      id: 6,
      title: "Martial Arts",
      childIds: [],
    },
    7: {
      id: 7,
      title: "Expert RuneScape Player",
      childIds: [],
    },
    8: {
      id: 8,
      title: "Technical Skills",
      childIds: [9, 10],
    },
    9: {
      id: 9,
      title: "Office Software",
      childIds: [],
    },

    10: {
      id: 10,
      title: "Surveillance",
      childIds: [],
    },
  },

  education: {
    root: {
      id: "root",
      title: "(Root)",
      childIds: [1, 2],
    },
    1: {
      id: 1,
      institution: "Pennsylvania State University",
      startDate: "1993",
      endDate: "1997",
      degree: "Bachelor of Business Administration",
      subject: "Major in Marketing",
      address: "University Park, PA, US",
      gpa: "3.01",
      extras: [],
      coursework: {
        1: { id: 1, title: "Farming 101" },
        2: { id: 2, title: "Intro to Business Management" },
      },
    },
    2: {
      id: 2,
      institution: "Scranton High School",
      endDate: "1993",
      degree: "High School Diploma",
      address: "63 Mike Munchak Way, Scranton, PA, US",
      extras: {
        1: { id: 1, title: "Assistant to the class teacher" },
        2: {
          id: 2,
          title: "Consecutively won the best hall monitor from 1991-1993",
        },
      },
    },
  },

  projects: {
    root: {
      id: "root",
      title: "(root)",
      childIds: [1, 2],
    },
    1: {
      title: "Automated Guest Announcer",
      endDate: "April 2020",
      link: "https://github.com/serengil/deepface",
      accomplishments: {
        1: {
          id: 1,
          title:
            "Built an image recognition model to recognize and announce guests as they enter a venue.",
        },
      },
    },
    2: {
      title: "Jello Detector",
      endDate: "2008",
      accomplishments: {
        1: {
          id: 1,
          title:
            "Build a device to detect the presence of jello, which has reduced the frequency of office pranks by 20%.",
        },
      },
    },
  },

  experience: {
    root: {
      id: "root",
      title: "(root)",
      childIds: [1, 2],
    },

    1: {
      startDate: "2005",
      endDate: "Present",
      company: "Dunder Mifflin Paper Co.",
      address: "1725 Slough Avenue in Scranton, PA, US",
      title: "Assistant to the Regional Manager",
      accomplishments: {
        1: {
          id: 1,
          title:
            "Managed regional sales for a leading paper supply company, achieving top sales in multiple quarters.",
        },
        2: {
          id: 2,
          title:
            "Implemented unique sales strategies, including 'Schrute Bucks' and beet-themed promotions, increasing customer engagement.",
        },
        3: {
          id: 3,
          title:
            "Oversaw daily operations and provided administrative support to the Regional Manager.",
        },
        4: {
          id: 4,
          title:
            "Mediated office conflicts with diplomacy and karate techniques.",
        },
      },
    },

    2: {
      startDate: "2002",
      endDate: "Present",
      company: "Schrute Farms",
      address: "Rural Rt. 6, Honesdale, PA, US",
      title: "Owner",
      accomplishments: {
        1: {
          id: 1,
          title:
            "Operated a successful beet farm, specializing in organic produce and agritourism.",
        },
        2: {
          id: 2,
          title:
            "Developed a unique business model combining farming with bed-and-breakfast services.",
        },
        3: {
          id: 3,
          title:
            "Hosted educational tours, promoting sustainable farming practices.",
        },
      },
    },
  },

  additional: {
    root: {
      id: "root",
      title: "(root)",
      childIds: [1, 2],
    },

    1: {
      id: "1",
      title: "Languages",
      childIds: [3, 4, 5],
    },

    2: {
      id: "2",
      title: "Hobbies",
      childIds: [6],
    },

    3: {
      id: "3",
      title: "Fluent in English",
      childIds: [],
    },

    4: {
      id: "4",
      title: "Conversational in Germen",
      childIds: [],
    },

    5: {
      id: "5",
      title: "Fluent in Klingon",
      childIds: [],
    },

    6: {
      id: "6",
      title: "Bear Watching",
      childIds: [],
    },
  },
};

export const Kushal = {
  fullName: "Kushal Thapa",
  email: "kushal2486@yahoo.com",
  github: "https://github.com/Zukurai-Kushal",
  linkedIn: "https://www.linkedin.com/in/kushal-thapa-935261207/",

  objective: {
    value:
      "Computer Engineering graduate with a year-long internship experience actively seeking a software engineering position. Passionate towards roles involving problem solving, hungry to grow my skill set and eager to make an impact.",
  },

  skills: {
    showGrouping: true,
    root: {
      id: "root",
      title: "(root)",
      childIds: [1, 2, 3],
    },
    1: {
      id: "1",
      title: "Technologies",
      childIds: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    2: {
      id: "2",
      title: "Tools",
      childIds: [14, 15, 16],
    },
    3: {
      id: "3",
      title: "Soft Skills",
      childIds: [17, 18, 19],
    },
    4: {
      id: "4",
      title: "Python",
      childIds: [],
    },
    5: {
      id: "5",
      title: "C",
      childIds: [],
    },
    6: {
      id: "6",
      title: "Javascript",
      childIds: [],
    },
    7: {
      id: "7",
      title: "HTML/CSS",
      childIds: [],
    },
    8: {
      id: "8",
      title: "C++",
      childIds: [],
    },
    9: {
      id: "9",
      title: "C#",
      childIds: [],
    },
    10: {
      id: "10",
      title: "Java",
      childIds: [],
    },
    11: {
      id: "11",
      title: "SQL",
      childIds: [],
    },
    12: {
      id: "12",
      title: "VHDL",
      childIds: [],
    },
    13: {
      id: "13",
      title: "Verilog",
      childIds: [],
    },
    14: {
      id: "14",
      title: "Git",
      childIds: [],
    },
    15: {
      id: "15",
      title: "Bash",
      childIds: [],
    },
    16: {
      id: "16",
      title: "MySQL",
      childIds: [],
    },
    17: {
      id: "17",
      title: "Detail oriented",
      childIds: [],
    },
    18: {
      id: "18",
      title: "Active communicator",
      childIds: [],
    },
    19: {
      id: "19",
      title: "Team player",
      childIds: [],
    },
  },

  education: {
    root: {
      id: "root",
      title: "(Root)",
      childIds: [1, 2],
    },
    1: {
      institution: "The University of Hong Kong",
      endDate: "June 2023",
      degree: "Bachelor of Engineering",
      subject: "Major in Computer Engineering",
      address: "Pok Fu Lam, Hong Kong",
      gpa: "3.14 (𝜋)",
      coursework: {
        1: { id: "1", title: "Algorithms" },
        2: { id: "2", title: "Artificial Intelligence" },
        3: { id: "3", title: "Cyber Security" },
        4: { id: "4", title: "Database Management" },
        5: { id: "5", title: "Software Engineering" },
        6: { id: "6", title: "Operating Systems" },
      },
    },
    2: {
      institution: "The University of Cambridge",
      startDate: "July 2019",
      endDate: "August 2019",
      degree: "International Summer Programme in Cryptography",
      address: "Cambridge, United Kingdom",
    },
  },

  projects: {
    root: {
      id: "root",
      title: "(Root)",
      childIds: [1, 2, 3],
    },
    1: {
      title: "AIoT System for Smart Water Auditing",
      endDate: "April 2023",
      link: "https://github.com/Zukurai-Kushal/Water_Audit_Project_Full",
      accomplishments: {
        1: {
          id: "1",
          title:
            "Designed and deployed a non-intrusive, vibration based IoT system capable of collecting and uploading the water use data of a household to a cloud - based database through Wi - Fi.",
        },
        2: {
          id: "2",
          title:
            "Performed data analysis by conducting data cleaning and feature extraction on the water use data and then trained an SVM model to classify the water flow events, the results have shown a classification accuracy of around 73%.",
        },
      },
    },
    2: {
      title: "Flower Classification CNN Model",
      endDate: "November 2022",
      accomplishments: {
        1: {
          id: "1",
          title:
            "Designed and implemented several CNN models to categorize different types of flower images, achieved a validation accuracy of 86%.",
        },
      },
    },
    3: {
      title: "Self Navigating Robotic Miniature Car",
      endDate: "April 2020",
      accomplishments: {
        1: {
          id: "1",
          title:
            "Constructed a robotic miniature car capable of navigating and avoiding obstacles in a 5x5 grid by using a series of micro-controllers, motors, and sensors.",
        },
      },
    },
  },

  experience: {
    root: {
      id: "root",
      title: "(Root)",
      childIds: [1],
    },
    1: {
      startDate: "June 2021",
      endDate: "May 2022",
      company: "High Tech Technology LTD. (IC Development Company)",
      address: "Hong Kong Science Park, Hong Kong",
      title: "Assistant Engineer (Intern)",
      accomplishments: {
        1: {
          id: "1",
          title:
            "Developed firmware for an embedded system by designing its core kernel architecture using SDCC (Small Device C Compiler) on a 8051-microcontroller architecture, which links the digital and analog components and enables the IC to operate as intended.",
        },
        2: {
          id: "2",
          title:
            "Designed and conducted testing phases for multiple projects by writing and simulating test cases for different scenarios, ensuring a thorough and robust product for the end user.",
        },
        3: {
          id: "3",
          title:
            "Led the design process for the digital component of an RGB LED IC driver by planning the RTL digital circuit designs using Verilog. The product is now being used for the ambient lighting inside electric cars.",
        },
      },
    },
  },

  additional: {
    root: {
      id: "root",
      title: "(Root)",
      childIds: [1, 2, 3],
    },
    1: {
      id: "1",
      title: "Languages",
      childIds: [4, 5],
    },
    2: {
      id: "2",
      title: "Certifications",
      childIds: [6],
    },
    3: {
      id: "3",
      title: "Hobbies",
      childIds: [7, 8, 9],
    },
    4: {
      id: "4",
      title: "Fluent in English",
      childIds: [],
    },
    5: {
      id: "5",
      title: "Conversational Proficiency in Cantonese",
      childIds: [],
    },
    6: {
      id: "6",
      title: "IELTS overall score: 8/9",
      childIds: [],
    },
    7: {
      id: "7",
      title: "Game development",
      childIds: [],
    },
    8: {
      id: "8",
      title: "Rock Climbing",
      childIds: [],
    },
    9: {
      id: "9",
      title: "Photography",
      childIds: [],
    },
  },
};
