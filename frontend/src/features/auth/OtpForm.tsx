import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/FormField';
import { AuthShell, AuthFooterLink } from '@/features/auth/AuthShell';
import { useVerifyOtp } from '@/features/auth/useAuthActions';
import { useI18n } from '@/hooks/useI18n';
import { otpSchema, type OtpFormValues } from '@/schemas/auth';
import { useAppStore } from '@/store/app-store';

export function OtpForm() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const signIn = useAppStore((state) => state.signIn);
  const verifyOtp = useVerifyOtp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '458921',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await verifyOtp.mutateAsync(values);
    signIn(response.workerId);
    navigate(response.next);
  });

  return (
    <AuthShell
      title={t('auth.verify')}
      subtitle="We are simulating an OTP verification flow so the frontend is ready for SMS or WhatsApp verification later."
      footer={<AuthFooterLink label="Need to edit your number?" cta={t('auth.signIn')} to="/auth/sign-in" />}
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <InputField
          label={t('auth.otp')}
          inputMode="numeric"
          maxLength={6}
          error={errors.otp?.message}
          {...register('otp')}
        />
        <Button type="submit" className="w-full" loading={verifyOtp.isPending}>
          {t('auth.verifyCta')}
        </Button>
      </form>
    </AuthShell>
  );
}
