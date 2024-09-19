//app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import SpaceBackground from "../components/SpaceBackground";
import NavbarPublic from "../components/NavbarPublic";
import { TypeAnimation } from "react-type-animation";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import { getCurrentUser } from "aws-amplify/auth";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const signedUser = await getCurrentUser();
        if (signedUser) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        if ((error as Error).name === "UserUnAuthenticatedException") {
          setIsAuthenticated(false);
        } else {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <NavbarPublic isAuthenticated={isAuthenticated} />
      <main className="relative flex min-h-[calc(100vh-57px)] w-full items-center justify-center overflow-hidden">
        <section className="absolute inset-0" style={{ marginTop: "-60px" }}>
          <SpaceBackground />
          <div className="absolute inset-0 z-10 m-8 flex flex-col items-center justify-center">
            <h1 className="text-center text-5xl font-medium text-accent-foreground">
              Bienvenid@ al Centro de Innovación de{" "}
              <span className="text-red-600">TIVIT</span> Latam
            </h1>
            <div className="mt-8"></div>
            <p className="text-center text-xl text-accent-foreground">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed once, initially
                  "Hagámoslo realidad con Tivit 🚀",
                  500,
                  "Hagámoslo realidad con AI 🤖",
                  1000,
                  "Hagámoslo realidad con ML 🧠",
                  1000,
                  "Hagámoslo realidad con IoT 🌐",
                  1000,
                  "Hagámoslo realidad con RPA 🤖",
                  1000,
                  "Hagámoslo realidad con DevOps 🛠️",
                  1000,
                  "Hagámoslo realidad con Cloud ☁️",
                  1000,
                  "Hagámoslo realidad con BI 📊",
                  1000,
                ]}
                speed={30}
                repeat={Infinity}
              />
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
