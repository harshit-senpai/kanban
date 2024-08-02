"use client";

import { createBoard, State } from "@/actions/createBoard/createBoard";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { FormInput } from "./Input";
import { FormButton } from "./Button";

export const Form = () => {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBoard, initialState);
  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>
      <FormButton />
    </form>
  );
};
