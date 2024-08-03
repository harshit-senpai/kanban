"use client";

import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/createBoard";
import { FormInput } from "@/components/form/formInput";
import { FormSubmit } from "@/components/form/formSubmit";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS");
    },
    onError: (error) => {
      console.log(error, "ERROR");
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        {/* @ts-ignore */}
        <FormInput label="Board Title" id="title" errors={fieldErrors} />
      </div>
      <FormSubmit>Submit</FormSubmit>
    </form>
  );
};
