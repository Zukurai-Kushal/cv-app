export const Clear_State = {
  fullName: "",
  email: "",
  phone: "",
  linkedIn: "",
  github: "",
  address: "",
  link: "",
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
