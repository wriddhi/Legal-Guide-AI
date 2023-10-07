export type Message = {
  role: "user" | "system";
  message: string;
  timestamp: number;
};

export type Chat = {
  user: string;
  id: string;
  created_at: number;
  history: Message[];
  title: string;
  file: URL | null;
};

export type LegalDocumentType = {
  title: string;
  children: string[];
};

export const categories: LegalDocumentType[] = [
  {
    title: "Contracts",
    children: [
      "Employment Contracts",
      "Lease Agreements",
      "Purchase Contracts",
      "Service Agreements",
      "Consulting Agreements",
    ],
  },
  {
    title: "Estate Planning",
    children: [
      "Wills and Testaments",
      "Trusts",
      "Living Wills",
      "Power of Attorney for Finances and Healthcare",
    ],
  },
  {
    title: "Real Estate",
    children: [
      "Deeds",
      "Rental Agreements",
      "Property Sale Contracts",
      "Mortgage Documents",
    ],
  },
  {
    title: "Business and Corporate",
    children: [
      "Articles of Incorporation",
      "Bylaws",
      "Shareholder Agreements",
      "Operating Agreements",
      "Partnership Agreements",
      "Memorandum of Understanding",
    ],
  },
  {
    title: "Family and Personal",
    children: [
      "Divorce Papers",
      "Prenuptial Agreements",
      "Adoption Papers",
      "Name Change Forms",
      "Guardianship Forms",
    ],
  },
  {
    title: "Intellectual Property",
    children: [
      "Patents",
      "Trademarks",
      "Copyrights",
      "Licensing Agreements",
      "Non-Disclosure Agreements",
    ],
  },
  {
    title: "Employment",
    children: [
      "Employment Contracts",
      "Employee Handbooks",
      "Non-Compete Agreements",
      "Severance Agreements",
    ],
  },
  {
    title: "Immigration",
    children: [
      "Visa Applications",
      "Green Card Forms",
      "Citizenship Applications",
      "Work Permits",
    ],
  },
  {
    title: "Criminal",
    children: [
      "Criminal Complaints",
      "Indictments",
      "Plea Agreements",
      "Bail Applications",
    ],
  },
  {
    title: "Civil",
    children: [
      "Lawsuits and Complaints",
      "Settlement Agreements",
      "Civil Court Forms",
      "Small Claims Forms",
    ],
  },
  {
    title: "Financial and Banking",
    children: [
      "Loan Agreements",
      "Promissory Notes",
      "Financial Affidavits",
      "Banking Contracts",
    ],
  },
  {
    title: "Healthcare and Medical",
    children: [
      "Medical Consent Forms",
      "Advance Directives",
      "Healthcare Proxy Forms",
      "HIPAA Authorization Forms",
    ],
  },
  {
    title: "Government and Administrative",
    children: [
      "Government Contracts",
      "Regulatory Compliance Documents",
      "FOIA Requests",
      "Administrative Appeals",
    ],
  },
  {
    title: "Environmental",
    children: [
      "Environmental Impact Assessments",
      "Environmental Compliance Reports",
      "Pollution Control Permits",
    ],
  },
  {
    title: "Education",
    children: [
      "Student Enrollment Forms",
      "Education Contracts",
      "Student Loan Agreements",
      "School Policies",
    ],
  },
  {
    title: "Non-Profit and Charitable",
    children: [
      "Non-Profit Bylaws",
      "501(c)(3) Applications",
      "Donation Agreements",
      "Grant Proposals",
    ],
  },
  {
    title: "Other Legal Documents",
    children: ["Miscellaneous Legal Forms and Templates"],
  },
];