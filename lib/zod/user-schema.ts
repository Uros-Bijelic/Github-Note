import z from 'zod';

export const learningGoalsSchema = z.object({
  isChecked: z.boolean(),
  goal: z.string().trim().min(1, 'Please enter your goal!'),
});

export const techStackSchema = z.object({
  label: z.string().trim().min(2, 'Label must be at least 2 characters long.'),
  value: z.string().trim().min(2, 'Value must be at least 2 characters long.'),
});

export const userDataBaseSchema = z.object({
  fullName: z.string().min(3, 'Please enter your Name!'),
  portfolioUrl: z.union([z.string().url().nullish(), z.literal('')]),
  avatarImg: z.string().trim().optional(),
  learningGoals: z
    .array(learningGoalsSchema)
    .min(1, 'Please add at lease one goal!'),
  knowledgeLevel: z
    .array(z.string().min(3, 'Experise must contain at least 3 characters!'))
    .min(1, 'Please add your expertise level!'),
  techStack: z
    .array(techStackSchema)
    .min(1, 'Please add at least 1 stack item!'),
  isAvailable: z.boolean().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export const updateUserSchema = userDataBaseSchema.extend({
  email: z.string().trim().email('Please provide a valid email address.'),
});

export type IUpdateUserData = z.infer<typeof updateUserSchema>;

// **************************************************** LOGIN AND ONBOARDING *******************************************************/

export const signUpFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: 'Full Name must be at least 3 characters long!' }),
  email: z.string().trim().email('Please enter valdi email address!'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long!'),
});

export type ISignUpFormData = z.infer<typeof signUpFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().trim().email('Please enter valid email address!'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long!'),
});

export type ILoginFormData = z.infer<typeof loginFormSchema>;

export const userOnboardingSchema = userDataBaseSchema.extend({
  onboardingStep: z.number().min(1).max(5),
});

export type IUserOnboarding = z.infer<typeof userOnboardingSchema>;

// **************************************************** LOGIN AND ONBOARDING *******************************************************/

// **************************************************** SOCIAL MEDIA LINKS *******************************************************/

export const socialMediaLinksSchema = z.object({
  githubName: z
    .string()
    .trim()
    .min(2, 'Github username must be at least 2 characters long.')
    .optional(),
  githubLink: z
    .string()
    .trim()
    .url('Please provide valid Github link.')
    .optional(),
  linkedinName: z
    .string()
    .trim()
    .min(2, 'Linkedin username must be at least 2 characters long.')
    .optional(),
  linkedinLink: z
    .string()
    .trim()
    .url('Please provide valid Linkedin link.')
    .optional(),
  twitterName: z
    .string()
    .trim()
    .min(2, 'Twitter username must be at least 2 characters long.')
    .optional(),
  twitterLink: z
    .string()
    .trim()
    .url('Please provide valid Twitter link.')
    .optional(),
  instagramName: z
    .string()
    .trim()
    .min(2, 'Instagram username must be at least 2 characters long.')
    .optional(),
  instagramLink: z
    .string()
    .trim()
    .url('Please provide valid Instagram link.')
    .optional(),
  facebookName: z
    .string()
    .trim()
    .min(2, 'Facebook username must be at least 2 characters long.')
    .optional(),
  facebookLink: z
    .string()
    .trim()
    .url('Please provide valid Facebook linkl.')
    .optional(),
  dribbbleName: z
    .string()
    .trim()
    .min(2, 'Dribbbler username must be at least 2 characters long.')
    .optional(),
  dribbbleLink: z
    .string()
    .trim()
    .url('Please provide valid Dribbler linkl.')
    .optional(),
});

export type ISocialMediaLinks = z.infer<typeof socialMediaLinksSchema>;
