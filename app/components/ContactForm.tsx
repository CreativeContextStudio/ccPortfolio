'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Panel, Button, Input, Textarea } from './ui';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message is too short'),
});

type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Submission failed'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Panel
      variant="bordered"
      headerVariant="primary"
      title="CONTACT FORM"
      className={className}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 sm:space-y-6"
        aria-label="Contact form"
        noValidate
      >
        <Input
          label="NAME"
          type="text"
          placeholder="Enter your name"
          error={errors.name?.message}
          aria-required="true"
          aria-invalid={!!errors.name}
          autoComplete="name"
          {...register('name')}
          disabled={isSubmitting}
        />

        <Input
          label="EMAIL"
          type="email"
          placeholder="your.email@example.com"
          error={errors.email?.message}
          aria-required="true"
          aria-invalid={!!errors.email}
          autoComplete="email"
          {...register('email')}
          disabled={isSubmitting}
        />

        <Textarea
          label="MESSAGE"
          placeholder="Enter your message..."
          rows={6}
          error={errors.message?.message}
          aria-required="true"
          aria-invalid={!!errors.message}
          autoComplete="off"
          {...register('message')}
          disabled={isSubmitting}
        />

        {/* Status Messages */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {submitStatus === 'success' && 'Form submitted successfully'}
          {submitStatus === 'error' && `Form submission error: ${errorMessage}`}
          {isSubmitting && 'Submitting form...'}
        </div>

        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-success text-background border-2 border-success"
              role="alert"
              aria-live="assertive"
            >
              <p className="text-sm font-mono uppercase tracking-wider font-bold">
                MESSAGE SENT
              </p>
              <p className="text-xs mt-1">
                Thank you for your message. I'll respond within 24-48 hours.
              </p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-warning text-background border-2 border-warning"
              role="alert"
              aria-live="assertive"
            >
              <p className="text-sm font-mono uppercase tracking-wider font-bold">
                SUBMISSION FAILED
              </p>
              <p className="text-xs mt-1">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  ⟳
                </motion.span>
                SENDING...
              </span>
            ) : (
              'SEND MESSAGE'
            )}
          </Button>
        </div>
      </form>
    </Panel>
  );
}

