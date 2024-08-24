import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  
  loginWith: {
    email: true,
  },
  
  userAttributes: {
    email: {
      required: true,
      mutable: false,
    },
    fullname: {
      required: false,
      mutable: true,
    },
    profilePicture: {
      required: false,
      mutable: true,
    },
    "custom:company_area": {
      dataType: "String",
      mutable: true,
      maxLen: 16,
      minLen: 1,
    },
    "custom:is_admin": {
      dataType: "Boolean",
      mutable: true,
    },
  },
});
