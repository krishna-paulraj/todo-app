"use strict";
import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/db/conn";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";

conn();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, notes, date, label } = body;

    const { userId }: { userId: string | null } = auth();

    console.log(body, userId);

    const user = await User.findOne({ user_id: userId });

    if (!user) {
      console.log("user not found");
      const newTodo = new User({
        user_id: userId,
        todos: {
          title,
          notes,
          date,
          label,
        },
      });

      await newTodo.save();
    } else {
      console.log("creating new todo");
      const newTodos = [
        {
          title,
          notes,
          date,
          label,
        },
      ];

      user.todos.push(...newTodos);
      await user.save();
    }

    return NextResponse.json({
      message: "User Successfully Created",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
