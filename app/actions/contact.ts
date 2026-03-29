'use server'

import { Resend } from 'resend'
import { contactSchema } from '@/lib/schemas/contact'

export type ActionResult = {
  success: boolean
  error?: string
}

export async function sendContactEmail(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // Honeypot check — bots fill hidden fields; silently return success without sending email
  const honeypot = formData.get('website')
  if (honeypot) {
    return { success: true }
  }

  // Env var guard — fail gracefully if Resend key is not configured
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: 'Configuration error' }
  }

  // Parse and validate form data
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  const result = contactSchema.safeParse(raw)
  if (!result.success) {
    return { success: false, error: 'Please check your form fields' }
  }

  const { name, email, message } = result.data

  // Instantiate Resend inside the function body — NOT at module scope
  // (module-scope instantiation would fail at build time without the env var)
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: ['danieljcatan@gmail.com'],
    replyTo: email,
    subject: `New portfolio contact from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  })

  if (error) {
    return {
      success: false,
      error: 'Something went wrong. Please try emailing directly.',
    }
  }

  return { success: true }
}
