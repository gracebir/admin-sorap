export type CareerStates = {
  careers: Array<TCareer> | null;
};

export type TCareer = {
  id: number;
  slug: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  desirable: string;
  benefits: string;
  salaryRange: string;
  location: string;
  jobType: string;
  company: string;
  experienceLevel: string;
  postedAt: string;
  deadline: string;
  departmentId: number;
  teamId: number;
  createdBy: number;
  department: {
    id: number;
    name: string;
  };
  team: {
    id: number;
    name: string;
  };
  JobTranslation: Array<{
    id;
    title: string;
    description: string;
    requirements: string;
    responsibilities: string;
    desirable: string;
    benefits: string;
    salaryRange: string;
    location: string;
  }>;
};

export type TcreateJob = {
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  desirable: string;
  benefits: string;
  salaryRange: string;
  location: string;
  jobType: string;
  company: string;
  experienceLevel: string;
  deadline: string;
  departmentId: number;
  teamId: number;
};

export type TcreateJobTransLang = {
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  desirable: string;
  benefits: string;
  jobId: number;
};

export type TupdateJobTransLang = {
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  desirable: string;
  benefits: string;
  jobId: number;
};

export type TJobTransLang = {
  id: number;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  desirable: string;
  benefits: string;
  jobId: number;
};
