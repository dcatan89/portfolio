'use client'

import { useRef, useState, useTransition, useEffect } from 'react'
import { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormValues } from '@/lib/schemas/contact'
import { sendContactEmail } from '@/app/actions/contact'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useActionState(sendContactEmail, { success: false })
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  })

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true)
    }
  }, [state.success])

  const onSubmit = handleSubmit(() => {
    startTransition(() => {
      formAction(new FormData(formRef.current!))
    })
  })

  const handleSendAnother = () => {
    reset()
    setShowSuccess(false)
  }

  if (showSuccess) {
    return (
      <div className="py-8">
        <h3 className="font-display text-2xl font-bold text-foreground">
          Message sent!
        </h3>
        <p className="mt-2 text-muted-foreground">
          Thanks &mdash; I&apos;ll get back to you soon.
        </p>
        <button
          onClick={handleSendAnother}
          className="mt-6 text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <div>
      {state.error && !showSuccess && (
        <div className="mb-6 rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          Something went wrong. Please try emailing directly at{' '}
          <a
            href="mailto:danieljcatan@gmail.com"
            className="text-primary underline underline-offset-4"
          >
            danieljcatan@gmail.com
          </a>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="space-y-6"
        noValidate
      >
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              placeholder="e.g. Alex Chen"
              aria-describedby={errors.name ? 'name-error' : undefined}
              {...register('name')}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Your email</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. alex@example.com"
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Your message</Label>
            <Textarea
              id="message"
              placeholder="Tell me about your project or just say hi..."
              className="min-h-[120px]"
              aria-describedby={errors.message ? 'message-error' : undefined}
              {...register('message')}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        {/* Honeypot — invisible to sighted users and screen readers */}
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
