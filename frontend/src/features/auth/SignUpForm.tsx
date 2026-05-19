import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { InputField, SelectField } from '@/components/ui/FormField';
import { AuthFooterLink, AuthShell } from '@/features/auth/AuthShell';
import { useSignUp } from '@/features/auth/useAuthActions';
import { useI18n } from '@/hooks/useI18n';
import { signUpSchema, type SignUpFormValues } from '@/schemas/auth';

export function SignUpForm() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const signUp = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: 'Ravi Kumar',
      phone: '9876543210',
      city: 'Bengaluru',
      language: 'en',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await signUp.mutateAsync(values);
    navigate('/auth/verify');
  });

  return (
    <AuthShell
      title={t('auth.signUp')}
      subtitle="Set up a worker account that can later connect to role-based admin and platform workflows."
      footer={<AuthFooterLink label="Already registered?" cta={t('auth.signIn')} to="/auth/sign-in" />}
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <InputField label={t('auth.fullName')} error={errors.fullName?.message} {...register('fullName')} />
        <InputField label={t('auth.phone')} error={errors.phone?.message} {...register('phone')} />
        <InputField label={t('auth.city')} error={errors.city?.message} {...register('city')} />
        <SelectField label={t('common.language')} error={errors.language?.message} {...register('language')}>
          <option value="en">{t('common.english')}</option>
          <option value="hi">{t('common.hindi')}</option>
        </SelectField>
        <Button type="submit" className="w-full" loading={signUp.isPending}>
          {t('auth.create')}
        </Button>
      </form>
    </AuthShell>
  );
}
