import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import SpaceBackground from "./components/SpaceBackground";
//import outputs from "@/amplify_outputs.json";

//Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {


  return (
    <main className="absolute">
      <SpaceBackground/>
    </main>
  );
}
