import { Camera, FileCheck2, ScanSearch } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorState, LoadingState } from '@/components/ui/QueryStates';
import { useDocumentsVault } from '@/features/documents/useDocumentsVault';
import { useI18n } from '@/hooks/useI18n';
import { formatDate } from '@/lib/utils/format';
import { getLocalizedText } from '@/lib/utils/localization';

const toneByStatus = {
  verified: 'success',
  expiring: 'warning',
  review: 'info',
  missing: 'danger',
} as const;

export function DocumentsVaultWorkspace() {
  const { t, language } = useI18n();
  const { data, isLoading, isError } = useDocumentsVault();

  if (isLoading) return <LoadingState label={t('common.loading')} />;
  if (isError || !data) return <ErrorState title={t('common.error')} description="Document status could not be loaded." />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Compliance readiness"
        title={t('documents.title')}
        description={t('documents.subtitle')}
        action={<Button variant="secondary">Upload placeholder</Button>}
      />

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Document inventory</p>
              <h2 className="mt-2 text-2xl font-bold text-ink">All worker and vehicle records</h2>
            </div>
            <FileCheck2 className="h-6 w-6 text-brand-700" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {data.documents.map((document) => (
              <div key={document.id} className="rounded-3xl border border-slate-100 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{getLocalizedText(document.label, language)}</p>
                    <p className="mt-1 text-sm text-slate-500">{document.documentNumber}</p>
                  </div>
                  <Badge tone={toneByStatus[document.status]}>{t(`common.${document.status}`)}</Badge>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>Expires {formatDate(document.expiresOn)}</p>
                  <p>Issued by {document.issuedBy}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-brand-900 to-ink text-white">
            <Badge tone="success" className="bg-white/10 text-brand-100">
              Future AI / OCR ready
            </Badge>
            <h2 className="mt-4 text-2xl font-bold">Document parsing placeholder</h2>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              This upload lane is ready for backend OCR, expiry extraction, and compliance rule checks later.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Camera className="h-5 w-5 text-accent-200" />
                <p className="mt-3 font-semibold">Mobile scan capture</p>
                <p className="mt-1 text-sm text-slate-300">Use phone camera or upload existing files.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <ScanSearch className="h-5 w-5 text-brand-200" />
                <p className="mt-3 font-semibold">OCR verification queue</p>
                <p className="mt-1 text-sm text-slate-300">Future backend can auto-tag fields and expiry warnings.</p>
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold text-slate-500">Reminders</p>
            <div className="mt-4 space-y-3">
              {data.reminders.map((reminder, index) => (
                <div key={index} className="rounded-2xl bg-accent-50 px-4 py-4 text-sm font-medium text-accent-900">
                  {getLocalizedText(reminder, language)}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
