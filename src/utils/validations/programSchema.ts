import * as yup from "yup";

export const programTranslationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});
