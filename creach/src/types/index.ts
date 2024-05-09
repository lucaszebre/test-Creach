import z from 'zod';

export const SchemaRegister = z.object({
    email: z.string().email().min(1, { message: 'Need an email' }),
    name: z.string().min(1, { message: 'Need a first name' }),
    password: z.string().min(8, { message: 'At least 8 characters long' })
      .regex(/[A-Za-z]/, { message: 'Must contain at least one letter' })
      .regex(/[0-9]/, { message: 'Must contain at least one digit' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'At least one special character' }),
  });

  export const SchemaLogin = z.object({
    email: z.string().min(1, { message: 'Need a username' }),
    password: z.string().min(8, { message: 'At least 8 characters long' })
      .regex(/[A-Za-z]/, { message: 'Must contain at least one letter' })
      .regex(/[0-9]/, { message: 'Must contain at least one digit' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'At least one special character' }),
  }); 
  
 


export const getQuestionsSchema = z.object({
  topic: z.string(),
  amount: z.coerce.number().int().positive().min(1).max(10),
  type: z.enum(["mcq", "open_ended"]),
});

export const checkAnswerSchema = z.object({
  userInput: z.string(),
  questionId: z.string(),
});

export const endGameSchema = z.object({
  gameId: z.string(),
});



const questionSchema = z.object({
  title: z.string(),
  value:z.coerce.string().min(1, { message: 'Need a answer' }),
  description: z.string(),
  inputType: z.enum(["string", "number", "radio", "rating","textarea","select"]),
  options: z.array(z.string()).optional(),
  possibilities: z.array(z.coerce.string()).optional(),
  correctAnswer: z.coerce.string().optional(),
});


const questionSchema2 = z.object({
  title: z.string().min(1,{message:'Need a question'}),
  value:z.coerce.string().nullable(),
  description: z.string().min(1,{message:'Need a description for the question'}),
  inputType: z.enum(["string", "number", "radio", "rating","textarea","select"]),
  possibilities1: z.coerce.string().min(1,{message:'Need a 1s possibilities'}),
  possibilities2: z.coerce.string().min(1,{message:'Need a 2nd possibilities'}),
  correctAnswer: z.coerce.string().min(1,{message:'Need the correct answer'}),
});

export const quizSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  questions: z.array(questionSchema),
});

export const resultSchema = z.object({
  id: z.string(),
  score: z.number(),
  time: z.date(),
  answer: z.record(z.any()), 
  quizzId: z.string(),
  userId: z.string(),
  Quizz: quizSchema.nullable(),
  user: z.any(),
});


const HistorySchema = z.object({
  id: z.string(),
  score: z.number(),
  time: z.date(),
  answer: z.array(questionSchema),
  quizz_id: z.string(),
  user_id: z.string(),
  Quizz: quizSchema.nullable(),
});

export const newQuizzSchema = z.object({
  title: z.string().min(1,{message:'Need a title for the quizz'}),
  description: z.string().min(1,{message:'Need a description for the quizz'}),
  questions: z.array(questionSchema2).min(1,"Need at least one question"),
});


export const questionTemplate = {
  title: "Sample Question",
  description: "Description of the sample question",
  value: "", 
  inputType: "string" as "string" | "number" | "radio" | "select" | "textarea" | "rating", 
  possibilities1: "", 
  possibilities2: "", 
  correctAnswer: "" 
};




export const answerSchema = z.array(z.coerce.string());


export type quizzType = z.infer<typeof quizSchema>;
export type resultType = z.infer<typeof resultSchema>;
export type answerType = z.infer<typeof answerSchema>;
export type questionType = z.infer<typeof questionSchema>;
export type historyType = z.infer<typeof HistorySchema>;
export type newQuizzType = z.infer<typeof newQuizzSchema>;
