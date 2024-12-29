/** @format */

export type TcreateProgramEntry = {
  title: string;
  description: string;
  edition: string;
  programCategory: string;
  location: string;
  thumbnail: File | null;
  price?: number;
  date_from: string;
  date_to: string;
};

export type TprogramType = {
  id?: number;
  title: string;
  description: string;
  edition: string;
  images?: string[];
  thumbnail: string;
  price?: number;
  date_from: string;
  isLaunched: boolean;
  date_to: string;
  ProgramTranslation: Array<TProgramTranslation>;
};

export type TprogramState = {
  programs: Array<TprogramType> | null;
};

export type TprogramReponse = {
  status: string;
  message: string;
  data: Array<TprogramType>;
};

export type TsponsorInput = {
  sponsorId: number;
  userId: number;
};

export type TCreateProgramTranslation = {
  programId: number;
  title: string;
  description: string;
};

export type TUpdateProgramTranslation = {
  programId: number;
  title: string;
  description: string;
};

export type TProgramTranslation = {
  id: number;
  programId: number;
  title: string;
  description: string;
  language: string;
};

export type TsponsorState = {
  sponsor: any;
};

export type TtutorInput = {
  programId: number;
  instructorId: number;
};

export type TtutorResponse = {
  status: string;
  message: string;
  data: Array<{
    programId: number;
    instructor: {
      firstname: string;
      lastname: string;
    };
    program: {
      title: string;
      description: string;
      id: number;
      thumbnail: string;
    };
  }>;
};
