"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import { Button } from "@/components/ui/button"

//import outputs from "@/amplify_outputs.json";

//Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function home() {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    function listTodos() {
        setTodos(
            // hard coded for now
            [
                {
                    id: "1",
                    content: "todo 1",
                    createdAt: "2022-01-01", // Add createdAt property
                    updatedAt: "2022-01-01", // Add updatedAt property
                },
                {
                    id: "2",
                    content: "todo 2",
                    createdAt: "2022-01-01", // Add createdAt property
                    updatedAt: "2022-01-01", // Add updatedAt property
                },
            ]
        )
    }

    useEffect(() => {
        listTodos();
    }, []);

    function createTodo() {
        const content = window.prompt("Todo content");
        if (content) {
            setTodos([
                ...todos,
                {
                    id: Math.random().toString(), // Add id property
                    content: content,
                    createdAt: "2022-01-01", // Add createdAt property
                    updatedAt: "2022-01-01", // Add updatedAt property
                },
            ]);
        }
    }

    return (
        <section>
            <h1>My todos</h1>
            <Button variant="outline" onClick={createTodo}>+ new</Button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.content}</li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br />
            </div>
        </section>
    );
}
