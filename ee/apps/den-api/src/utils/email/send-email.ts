import { EmailSendError, sendEmail as sendSharedEmail, type EmailTemplate, type SendEmailInput } from "@openwork/email"
import { env } from "../../env.js"

export { EmailSendError as DenEmailSendError }

export function sendEmail<Template extends EmailTemplate>(
  input: Omit<SendEmailInput<Template>, "config">,
) {
  console.info(
    `[email] sending template=${input.template} to=${input.to} hasFrom=${Boolean(env.email.from)} hasResend=${Boolean(env.resend.apiKey)} hasSmtp=${Boolean(env.smtp.host)}`,
  )

  return sendSharedEmail({
    ...input,
    config: {
      devMode: env.devMode,
      from: env.email.from,
      resendApiKey: env.resend.apiKey,
      smtp: env.smtp,
    },
  })
    .then(() => {
      console.info(`[email] sent template=${input.template} to=${input.to}`)
    })
    .catch((error) => {
      console.error(`[email] failed template=${input.template} to=${input.to}`, error)
      throw error
    })
}
