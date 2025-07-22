// validation/userSchema.ts
import * as yup from "yup";

// Helper type guard to check if value is a File
function isFile(value: unknown): value is File {
  return (
    typeof File !== "undefined" &&
    value instanceof File &&
    typeof value.size === "number" &&
    typeof value.type === "string"
  );
}

export const baseUserSchema = {
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  image: yup
    .mixed()
    .test("fileSize", "Image too large", (file) => {
      if (!file) return true; // allow no file for edit
      if (!isFile(file)) return true;
      return file.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (file) => {
      if (!file) return true;
      if (!isFile(file)) return true;
      return ["image/jpeg", "image/png"].includes(file.type);
    }),
  gender: yup.string().oneOf(["male", "female"]).required("Gender is required"),
  phonenumber: yup
    .string()
    .matches(/^\d+$/, "Phone number must be numeric")
    .optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),
};

export const createUserSchema = yup.object().shape({
  ...baseUserSchema,
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "Image too large", (file) => {
      if (!file) return false;
      if (!isFile(file)) return false;
      return file.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (file) => {
      if (!file) return false;
      if (!isFile(file)) return false;
      return ["image/jpeg", "image/png"].includes(file.type);
    }),
});

export const editUserSchema = yup.object().shape({
  ...baseUserSchema,
});

export type CreateSchemaType = yup.InferType<typeof createUserSchema>;
export type EditSchemaType = yup.InferType<typeof editUserSchema>


