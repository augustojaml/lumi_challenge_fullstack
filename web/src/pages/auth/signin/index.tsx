import { Button } from '@components/forms/button'
import { Input } from '@components/forms/input'
import { useSessions } from '@global/api/mutation/use-sessions'
import { useAuthStore } from '@global/useStores/useAuth'
import { Lock, Mail } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const IFormSessionsData = {
  email: '',
  password: '',
}

const formSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

// type IFormSessionsData = z.infer<typeof formSchema>

export const SignInPage = () => {
  const { mutateAsync: sessions, error, isPending } = useSessions()
  const [form, setForm] = useState(IFormSessionsData)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  )




  const navigate = useNavigate()

  const { sessions: sessionsToken, signIn } = useAuthStore((store) => store)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validErrors = () => {
    const result = formSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      })
      return false
    }
    setErrors({})
    return true
  }

  const handleSignIn = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validErrors()) {
      return false
    }

    const response = await sessions(form)
    if (response.token) {
      signIn(response.token)
    }
  }

  useEffect(() => {
    if (sessionsToken) {
      navigate('/')
    }
  }, [navigate, sessionsToken])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-2 text-2xl font-semibold text-textPrimary">
          Bem-vindo de volta!
        </h2>
        <p className="mb-6 text-center text-textSecondary">
          Acesse sua conta para continuar aproveitando nossos serviços.
        </p>

        {error && (
          <div className="flex w-full justify-center rounded-md border border-errorPrimary bg-errorLight p-2">
            <span className="text-center text-[12px] text-red-500">
              {`Acesso não autorizado`}
            </span>
          </div>
        )}
        <form className="mt-8 w-full space-y-4" onSubmit={handleSignIn}>
          <Input
            icon={Mail}
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            icon={Lock}
            placeholder="Senha"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button label="Entrar" type="submit" isLoading={isPending} />
        </form>

        <p className="mt-8 text-sm text-textSecondary">
          Não tem acesso?{' '}
          <span className="font-semibold text-textPrimary">
            Contate o administrador.
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignInPage
