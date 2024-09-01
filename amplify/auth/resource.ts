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
  userAttributes: {
    email: {
      required: true,
      mutable: false,
    },
    givenName: {
      required: false,
      mutable: true,
    },
    profilePicture: {
      required: false,
      mutable: true,
    },
    "custom:is_new_user": {
      dataType: "Boolean",
      mutable: true,
    },
    "custom:position": {
      dataType: "String",
      mutable: true,
    },
    }
    
});

