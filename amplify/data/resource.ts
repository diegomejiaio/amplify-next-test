import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import type { CloudProviders, ApplicationStatus } from "../../utils/enums"

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Demo: a.model({
    name: a.string().required(),
    cloud: a.enum(['aws', 'gcp', 'azure']),
    status: a.enum(['running', 'launching', 'stopping', 'down']),
    repositoryUrl: a.url()	,
    applicationUrl: a.url(),
    version: a.string(),
    description: a.string(),
    createdAt: a.datetime().required(),
    ownerId: a.string(), // Relación con el usuario creador
    tags: a.string().array(),
  })
  .identifier(['name','createdAt']) // Identificador compuesto
  .secondaryIndexes((index) => [index("status")]) // Índice secundario
  .authorization((allow) => [allow.authenticated()]), // Todos los usuarios autenticados
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
