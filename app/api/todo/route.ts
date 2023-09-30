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

export async function PATCH(request: NextRequest) {
  try {
    const { id, title, notes, date, label, completed } = await request.json();

    const { userId }: { userId: string | null } = auth();

    const user = await User.findOne({ user_id: userId });

    if (!id) {
      return NextResponse.json(
        { error: "To-do 'id' is required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { user_id: userId, "todos._id": id },
      {
        $set: {
          "todos.$.title": title,
          "todos.$.notes": notes,
          "todos.$.date": date,
          "todos.$.label": label,
          "todos.$.completed": completed,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "To-do item updated successfully",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
