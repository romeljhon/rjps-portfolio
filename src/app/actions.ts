
'use server';

import { generateProjectDescription } from '@/ai/flows/generate-project-description';
import { z } from 'zod';

const generateDescriptionSchema = z.object({
  projectUrl: z.string().url({ message: 'Please enter a valid URL.' }),
});

export async function generateDescriptionAction(
  prevState: { message: string; summary?: string; errors?: any },
  formData: FormData
) {
  const validatedFields = generateDescriptionSchema.safeParse({
    projectUrl: formData.get('projectUrl'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid URL submitted.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateProjectDescription({ projectUrl: validatedFields.data.projectUrl });
    if (result.summary) {
        return { message: 'success', summary: result.summary };
    } else {
        return { message: 'Could not generate a summary. The URL might be inaccessible or invalid.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function submitContactFormAction(
  prevState: { message: string; errors?: any; success?: boolean },
  formData: FormData
) {
    const validatedFields = contactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Failed to send message.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        }
    }

    // Here you would typically send an email or save to a database.
    // For this example, we'll just log it to the console.
    console.log('New contact form submission:');
    console.log(validatedFields.data);

    return { message: 'Your message has been sent successfully!', success: true };
}
