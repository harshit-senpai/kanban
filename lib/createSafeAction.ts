// this is an abstraction over serverAction which is made up of

// 1. types.ts -> containing the types of Input and Output
// 2. schema.ts -> containing the zod schema of the action , zod validations
// 3. index.ts -> containing the server action handler itself

// we can use it in the following way :

// const {
//     execute,
//     data,
//     error,
//     fieldErrors
// } = useAction(safeAction, {
//     onSuccess: (data: Output) => {},
//     onError: (error: Error) => {},
//     onComplete : () => {}
// })

import { z } from "zod";

// generic errors that we can get from zod validation
export type FieldErrors<T> = {
  [K in keyof T]?: string[] | undefined;
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null; //optional error like if something went wrong with dB
  data?: TOutput; //data returned from server
};
// with this we have created generics which will work with any type of action that we have in which we can input the input we want to pass and the output that we expect which can be a success like data or an error
//fieldErrors will be a object with a specific keys and array of errors inside

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(validationResult.data);
  };
};
