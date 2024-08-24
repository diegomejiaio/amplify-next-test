import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { getCurrentUser } from "@aws-amplify/auth/server";
import outputs from "@/amplify_outputs.json";
import { cookies } from "next/headers";

export const {runWithAmplifyServerContext} = createServerRunner({
    config: outputs,
})

export async function GetAuthCurrentUser() {
    try {
        const currentUser = await runWithAmplifyServerContext({
            nextServerContext: { cookies },
            operation: (context) => {
                return getCurrentUser(context);
            }
        });
        return currentUser;
    }
    catch (error) {
        console.log(error);
    }
}