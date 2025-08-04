
'use server';

import { z } from 'zod';

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
