import twilio from "twilio"

export async function twilioSMS(body: string) {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

  return client.messages
    .create({
      body,
      from: process.env.TWILIO_SANDBOX_NUMBER,
      to: "+61421000554",
    })
    .then(console.log)
}
