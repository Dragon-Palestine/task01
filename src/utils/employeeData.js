// Employee data generation utility
const firstNames = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Charles",
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "Barbara",
  "Susan",
  "Margaret",
  "Dorothy",
  "Lisa",
  "Christopher",
  "Daniel",
  "Matthew",
  "Anthony",
  "Mark",
  "Donald",
  "Steven",
  "Paul",
  "Andrew",
  "Joshua",
  "Jessica",
  "Sarah",
  "Karen",
  "Nancy",
  "Betty",
  "Helen",
  "Sandra",
  "Donna",
  "Carol",
  "Ruth",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
];

const departments = [
  "IT",
  "HR",
  "Sales",
  "Design",
  "Marketing",
  "Finance",
  "Operations",
  "Legal",
  "Research",
  "Quality",
];

const roles = {
  IT: [
    "Developer",
    "DevOps Engineer",
    "System Administrator",
    "Database Administrator",
    "Security Analyst",
    "Network Engineer",
    "Software Architect",
    "QA Engineer",
    "Technical Support",
    "IT Manager",
  ],
  HR: [
    "Recruiter",
    "People Operations",
    "HR Manager",
    "Talent Acquisition",
    "Employee Relations",
    "Training Coordinator",
    "HR Analyst",
    "Compensation Specialist",
    "HR Assistant",
    "Organizational Development",
  ],
  Sales: [
    "Account Manager",
    "Sales Executive",
    "Sales Manager",
    "Business Development",
    "Account Executive",
    "Sales Representative",
    "Key Account Manager",
    "Sales Director",
    "Channel Manager",
    "Customer Success",
  ],
  Design: [
    "UI/UX Designer",
    "Product Designer",
    "Graphic Designer",
    "Design Manager",
    "Visual Designer",
    "Interaction Designer",
    "Brand Designer",
    "Motion Designer",
    "Design System Lead",
    "Creative Director",
  ],
  Marketing: [
    "Marketing Manager",
    "Content Creator",
    "Digital Marketing",
    "Brand Manager",
    "SEO Specialist",
    "Social Media Manager",
    "Marketing Analyst",
    "Campaign Manager",
    "PR Specialist",
    "Growth Hacker",
  ],
  Finance: [
    "Financial Analyst",
    "Accountant",
    "Finance Manager",
    "Budget Analyst",
    "Financial Controller",
    "Treasury Manager",
    "Investment Analyst",
    "Audit Manager",
    "Tax Specialist",
    "CFO",
  ],
  Operations: [
    "Operations Manager",
    "Project Manager",
    "Process Analyst",
    "Supply Chain Manager",
    "Logistics Coordinator",
    "Operations Analyst",
    "Quality Manager",
    "Facility Manager",
    "Vendor Manager",
    "Operations Director",
  ],
  Legal: [
    "Legal Counsel",
    "Compliance Officer",
    "Contract Manager",
    "Legal Assistant",
    "Corporate Lawyer",
    "Intellectual Property",
    "Legal Analyst",
    "Risk Manager",
    "Regulatory Affairs",
    "General Counsel",
  ],
  Research: [
    "Research Analyst",
    "Data Scientist",
    "Research Manager",
    "Market Researcher",
    "Product Researcher",
    "UX Researcher",
    "Research Coordinator",
    "Analytics Manager",
    "Research Director",
    "Data Analyst",
  ],
  Quality: [
    "Quality Assurance",
    "Quality Control",
    "Quality Manager",
    "Process Improvement",
    "Quality Analyst",
    "Compliance Manager",
    "Quality Engineer",
    "Audit Coordinator",
    "Quality Director",
    "Continuous Improvement",
  ],
};

const domains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "company.com",
  "enterprise.org",
];

function generateRandomName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function generateRandomEmail(name) {
  const cleanName = name.replace(/\s+/g, "").toLowerCase();
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const randomNum = Math.floor(Math.random() * 999) + 1;
  return `${cleanName}${randomNum}@${domain}`;
}

function generateEmployees(count = 1000) {
  const employees = [];

  for (let i = 1; i <= count; i++) {
    const name = generateRandomName();
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    const role =
      roles[department][Math.floor(Math.random() * roles[department].length)];
    const email = generateRandomEmail(name);

    employees.push({
      id: i,
      name,
      email,
      department,
      role,
    });
  }

  return employees;
}

export const generatedEmployees = generateEmployees(1000);
export { generateEmployees };
