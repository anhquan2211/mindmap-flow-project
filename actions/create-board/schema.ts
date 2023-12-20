import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "Vui lòng nhập tiêu đề!",
      invalid_type_error: "Vui lòng nhập tiêu đề!",
    })
    .min(3, {
      message: "Tiêu đề phải chứa ít nhất 3 ký tự!",
    }),
  image: z.string({
    required_error: "Image is required!",
    invalid_type_error: "Image is required!",
  }),
});
