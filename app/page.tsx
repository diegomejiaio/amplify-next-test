import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import SpaceBackground from "./components/SpaceBackground";
import NavbarPublic from "./components/NavbarPublic";
//import outputs from "@/amplify_outputs.json";

//Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {


  return (
    <>
    <NavbarPublic />
    <main className="relative w-full h-screen flex items-center justify-center">
        <section className="absolute inset-0" style={{ marginTop: "-57px" }}>
            <SpaceBackground />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 m-8">
                <h1 className="text-4xl font-bold text-accent-foreground text-center">Bienvenid@ al Centro de Innovación de <span className="text-red-600">TIVIT</span> Latam</h1>
                <div className="mt-8"></div>
                <p className="text-accent-foreground text-center">Hagámoslo realidad 🚀</p>
            </div>
        </section>
    </main>
    </>
  );
}
