import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/FormField';
import { AuthFooterLink, AuthShell } from '@/features/auth/AuthShell';
import { useSignIn } from '@/features/auth/useAuthActions';
import { useI18n } from '@/hooks/useI18n';
import { signInSchema, type SignInFormValues } from '@/schemas/auth';

export function SignInForm() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phone: '9876543210',
      password: '1234',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await signIn.mutateAsync(values);
    navigate('/auth/verify');
  });

  return (
    <AuthShell
      title={t('auth.signIn')}
      subtitle={t('auth.accountPrompt')}
      footer={<AuthFooterLink label="New here?" cta={t('auth.signUp')} to="/auth/sign-up" />}
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <InputField label={t('auth.phone')} error={errors.phone?.message} {...register('phone')} />
        <InputField
          label={t('auth.password')}
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" className="w-full" loading={signIn.isPending}>
          {t('auth.continue')}
        </Button>
      </form>
    </AuthShell>
  );
}
