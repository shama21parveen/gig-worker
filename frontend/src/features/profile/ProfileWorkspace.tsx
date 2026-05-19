import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bike, Languages, Smartphone } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InputField, SelectField } from '@/components/ui/FormField';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorState, LoadingState } from '@/components/ui/QueryStates';
import { useI18n } from '@/hooks/useI18n';
import { profileSchema, type ProfileFormValues } from '@/schemas/profile';
import { useUpdateProfile, useWorkerProfile } from '@/features/profile/useWorkerProfile';
import { useAppStore } from '@/store/app-store';

export function ProfileWorkspace() {
  const { t } = useI18n();
  const setStoreLanguage = useAppStore((state) => state.setLanguage);
  const { data, isLoading, isError } = useWorkerProfile();
  const updateProfile = useUpdateProfile();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });
  const preferredLanguage = watch('preferredLanguage');

  useEffect(() => {
    if (data) {
      reset({
        preferredLanguage: data.preferredLanguage,
        quietHours: data.notificationSettings.quietHours,
        emergencyContactName: data.safetyPreferences.emergencyContactName,
        emergencyContactPhone: data.safetyPreferences.emergencyContactPhone,
      });
    }
  }, [data, reset]);

  useEffect(() => {
    if (preferredLanguage) {
      setStoreLanguage(preferredLanguage);
    }
  }, [preferredLanguage, setStoreLanguage]);

  if (isLoading) return <LoadingState label={t('common.loading')} />;
  if (isError || !data) return <ErrorState title={t('common.error')} description="Profile details are unavailable right now." />;

  const onSubmit = handleSubmit(async (values) => {
    setStoreLanguage(values.preferredLanguage);
    await updateProfile.mutateAsync(values);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Worker profile"
        title={t('profile.title')}
        description={t('profile.subtitle')}
        action={<Badge tone="success">Role-ready worker profile</Badge>}
      />

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <Card className="bg-ink text-white">
            <p className="text-sm font-semibold text-brand-200">Personal details</p>
            <h2 className="mt-3 text-3xl font-bold">{data.name}</h2>
            <p className="mt-1 text-slate-300">{data.phone}</p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">City and zone</p>
                <p className="mt-2 font-semibold text-white">
                  {data.city} · {data.zone}
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Platforms</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.platforms.map((platform) => (
                    <Badge key={platform} tone="info" className="bg-white/10 text-white">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2">
              <Bike className="h-5 w-5 text-brand-700" />
              <h2 className="text-2xl font-bold text-ink">Vehicle details</h2>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="font-semibold text-ink">{data.vehicle.model}</p>
                <p>{data.vehicle.type} · {data.vehicle.fuelType}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="font-semibold text-ink">Registration</p>
                <p>{data.vehicle.registration}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="mb-6 flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-brand-700" />
            <h2 className="text-2xl font-bold text-ink">Preferences and notifications</h2>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <SelectField label="Preferred language" error={errors.preferredLanguage?.message} {...register('preferredLanguage')}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </SelectField>
            <InputField label="Quiet hours" error={errors.quietHours?.message} {...register('quietHours')} />
            <InputField
              label="Emergency contact name"
              error={errors.emergencyContactName?.message}
              {...register('emergencyContactName')}
            />
            <InputField
              label="Emergency contact phone"
              error={errors.emergencyContactPhone?.message}
              {...register('emergencyContactPhone')}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <span className="text-sm font-medium text-slate-700">Payout alerts</span>
                <input defaultChecked={data.notificationSettings.payoutAlerts} type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <span className="text-sm font-medium text-slate-700">Shift reminders</span>
                <input defaultChecked={data.notificationSettings.shiftReminders} type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <span className="text-sm font-medium text-slate-700">Safety broadcasts</span>
                <input defaultChecked={data.notificationSettings.safetyBroadcasts} type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <span className="text-sm font-medium text-slate-700">Share live location</span>
                <input defaultChecked={data.safetyPreferences.shareLiveLocation} type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600" />
              </label>
            </div>

            <div className="rounded-2xl bg-brand-50 px-4 py-4">
              <div className="flex items-center gap-2 text-brand-800">
                <Languages className="h-4 w-4" />
                <p className="text-sm font-semibold">i18n-ready UI</p>
              </div>
              <p className="mt-2 text-sm text-brand-700">
                Shared translation dictionaries power navigation, auth, headers, and reusable UI text.
              </p>
            </div>

            <Button type="submit" loading={updateProfile.isPending}>
              {t('common.save')}
            </Button>
            {updateProfile.isSuccess ? (
              <p className="text-sm font-medium text-brand-700">Profile preferences saved in mock mode.</p>
            ) : null}
          </form>
        </Card>
      </section>
    </div>
  );
}
