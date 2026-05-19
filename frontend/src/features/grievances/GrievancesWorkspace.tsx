import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquareWarning, Paperclip, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InputField, SelectField, TextareaField } from '@/components/ui/FormField';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorState, LoadingState } from '@/components/ui/QueryStates';
import { VoiceInputButton } from '@/components/ui/VoiceInputButton';
import { useGrievanceCenter, useSubmitGrievance } from '@/features/grievances/useGrievanceCenter';
import { useI18n } from '@/hooks/useI18n';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { grievanceSchema, type GrievanceFormValues } from '@/schemas/grievance';
import { formatDateTime } from '@/lib/utils/format';
import { getLocalizedText } from '@/lib/utils/localization';

const statusTone = {
  open: 'warning',
  in_review: 'info',
  resolved: 'success',
  escalated: 'danger',
} as const;

export function GrievancesWorkspace() {
  const { t, language } = useI18n();
  const { data, isLoading, isError } = useGrievanceCenter();
  const submitMutation = useSubmitGrievance();
  const voice = useVoiceInput(language === 'hi' ? 'hi-IN' : 'en-IN');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GrievanceFormValues>({
    resolver: zodResolver(grievanceSchema),
    defaultValues: {
      category: 'payout',
      title: '',
      note: '',
    },
  });

  useEffect(() => {
    if (submitMutation.isSuccess) {
      setValue('title', '');
      setValue('note', '');
    }
  }, [setValue, submitMutation.isSuccess]);

  if (isLoading) return <LoadingState label={t('common.loading')} />;
  if (isError || !data) return <ErrorState title={t('common.error')} description="Support center could not be loaded." />;

  const onSubmit = handleSubmit(async (values) => {
    await submitMutation.mutateAsync(values);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Worker support"
        title={t('grievances.title')}
        description={t('grievances.subtitle')}
        action={<Badge tone="info">Voice + ticket timeline ready</Badge>}
      />

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Complaint submission</p>
              <h2 className="mt-2 text-2xl font-bold text-ink">Raise a new issue</h2>
            </div>
            <MessageSquareWarning className="h-6 w-6 text-brand-700" />
          </div>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <SelectField label="Category" error={errors.category?.message} {...register('category')}>
              {data.categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {getLocalizedText(category.label, language)}
                </option>
              ))}
            </SelectField>
            <InputField label="Title" placeholder="Missing incentive on Friday block" error={errors.title?.message} {...register('title')} />
            <TextareaField
              label="Issue details"
              placeholder="Add settlement details, location, order count, or any safety context..."
              error={errors.note?.message}
              {...register('note')}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <VoiceInputButton
                supported={voice.supported}
                listening={voice.isListening}
                onClick={() =>
                  voice.startListening((transcript) => {
                    setValue('note', transcript, { shouldValidate: true });
                  })
                }
              />
              <Button type="submit" loading={submitMutation.isPending}>
                {t('common.submit')}
              </Button>
            </div>
            {voice.error ? <p className="text-xs text-slate-500">{voice.error}</p> : null}
            <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-4 text-sm text-slate-500">
              <div className="flex items-center gap-2 font-semibold text-slate-600">
                <Paperclip className="h-4 w-4" />
                Attachments UI placeholder
              </div>
              <p className="mt-2">Designed for screenshots, settlement PDFs, photos, and voice-note transcripts once backend upload APIs are added.</p>
            </div>
            {submitMutation.isSuccess ? (
              <div className="rounded-2xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800">
                Ticket created successfully. Reference: {submitMutation.data.referenceId}
              </div>
            ) : null}
          </form>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="mb-5">
              <p className="text-sm font-semibold text-slate-500">Ticket tracking</p>
              <h2 className="mt-2 text-2xl font-bold text-ink">Current and resolved cases</h2>
            </div>
            <div className="space-y-4">
              {data.tickets.map((ticket) => (
                <div key={ticket.id} className="rounded-3xl border border-slate-100 bg-white p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-ink">{ticket.title}</p>
                        <Badge tone={statusTone[ticket.status]}>{ticket.status.replace('_', ' ')}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {ticket.id} · {ticket.category}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400">{formatDateTime(ticket.createdAt)}</p>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{getLocalizedText(ticket.summary, language)}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ticket.attachments.map((attachment) => (
                      <Badge key={attachment} tone="neutral">
                        {attachment}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-5 space-y-3 border-l border-slate-200 pl-4">
                    {ticket.timeline.map((event) => (
                      <div key={event.id}>
                        <p className="text-sm font-semibold text-ink">{getLocalizedText(event.label, language)}</p>
                        <p className="text-xs text-slate-400">{formatDateTime(event.date)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-sky-50 to-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sky-700" />
              <h2 className="text-2xl font-bold text-ink">Help and guidance</h2>
            </div>
            <div className="mt-5 space-y-3">
              {data.faqs.map((faq) => (
                <details key={faq.id} className="rounded-2xl border border-slate-100 bg-white p-4">
                  <summary className="cursor-pointer list-none font-semibold text-ink">{getLocalizedText(faq.question, language)}</summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{getLocalizedText(faq.answer, language)}</p>
                </details>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
