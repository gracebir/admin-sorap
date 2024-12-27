/** @format */

import { TcreateBlog } from "@/types/blog";
import { TCreateEventInput, TModerator } from "@/types/event";
import { TcreateInstructorType } from "@/types/instructor";
import { TcreatePartnerType } from "@/types/partner";
import { TcreateProgramEntry } from "@/types/program";

export function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
  }
  return num.toString();
}

export function formatRate(rate: number) {
  return (rate * 100).toFixed(0) + "%";
}

export const createEventFormData = (input: TCreateEventInput): FormData => {
  const formData = new FormData();

  // Append each field from TCreateEventInput to the FormData
  formData.append("theme", input.theme);
  formData.append("description", input.description);
  formData.append("start_date", input.start_date); // Convert Date to string
  formData.append("end_date", input.end_date); // Convert Date to string
  formData.append("location", input.location);
  formData.append("price", input.price.toString()); // Convert number to string
  formData.append("thumbnail", input.thumbnail!); // Blob (File)
  formData.append("eventType", input.eventType);

  return formData;
};

export const createProgramFormData = (input: TcreateProgramEntry): FormData => {
  const formData = new FormData();

  // Append each field from TCreateEventInput to the FormData
  formData.append("title", input.title);
  formData.append("programCategory", input.programCategory);
  formData.append("location", input.location);
  formData.append("description", input.description);
  formData.append("date_from", input.date_from); // Convert Date to string
  formData.append("date_to", input.date_to); // Convert Date to string
  formData.append("edition", input.edition);
  formData.append("price", input.price!.toString()); // Convert number to string
  formData.append("thumbnail", input.thumbnail!); // Blob (File)
  return formData;
};

export const createInstructorFormData = (
  input: TcreateInstructorType
): FormData => {
  const formData = new FormData();
  formData.append("firstname", input.firstname);
  formData.append("lastname", input.lastname);
  formData.append("bio", input.bio);
  formData.append("avatar", input.avatar!);
  formData.append("phone", input.phone);
  formData.append("email", input.email);
  return formData;
};

export const createPartnerFormData = (input: TcreatePartnerType): FormData => {
  const formData = new FormData();
  formData.append("firstname", input.firstname!);
  formData.append("lastname", input.lastname!);
  formData.append("company", input.company);
  formData.append("avatar", input.avatar!);
  formData.append("phone", input.phone);
  formData.append("email", input.email);
  return formData;
};

export const createModeratorFormData = (input: TModerator): FormData => {
  const formData = new FormData();

  // Append each field from TCreateEventInput to the FormData
  formData.append("firstname", input.firstname);
  formData.append("lastname", input.lastname);
  formData.append("bio", input.bio); // Convert Date to string
  formData.append("eventId", input.eventId?.toString()!); // Convert Date to string
  formData.append("avatar", input.avatar!);
  formData.append("phone", input.phone); // Convert number to string
  formData.append("email", input.email); // Blob (File)

  return formData;
};

export function formatDateTimeToFrench(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = dateFormatter.format(date);
  const formattedTime = timeFormatter.format(date);

  return `${formattedDate} - ${formattedTime}`;
}

export const createBlogFormData = (input: TcreateBlog): FormData => {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("content", input.content);
  formData.append("categoryId", input.categoryId.toString()!);
  formData.append("thumbnail", input.thumbnail!);
  return formData;
};
