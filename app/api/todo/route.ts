import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/db/conn";
import User from "@/models/user";

conn();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, title, notes, date, label } = body;

    console.log(body);

    const user = await User.findOne({ username });

    if (!user) {
      const newTodo = new User({
        username,
        todos: {
          title,
          notes,
          date: Date.now(),
          label,
        },
      });

      await newTodo.save();
    } else {
      const newTodos = [
        {
          title,
          notes,
          date: Date.now(),
          label,
        },
      ];

      user.todos.push(...newTodos);
      const todo = await user.save();
    }

    return NextResponse.json({
      message: "User Successfully Created",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function GET(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    console.log(username);

    const user = await User.findOne({ username });

    const todos = user.todos;
    console.log(todos);
    return NextResponse.json({
      message: "Todos fetched",
      todos,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, title } = body;

    const user = await User.findOne({ username });
    if (!user) return NextResponse.json({ message: "user not found" });

    return NextResponse.json({ message: "User Updates" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
