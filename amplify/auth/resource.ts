import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Digital Apps Tivit Latam - Verifica tu correo", 
      verificationEmailBody: (createCode) => `Usa este código para verificar tu cuenta: ${createCode()}`,
    },
  },
});