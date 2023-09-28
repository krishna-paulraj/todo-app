import { conn } from "@/db/conn";
import { NextRequest, NextResponse } from "next/server";

conn();

export const getDataFromToken = (request: NextRequest) => {
  try {
  } catch (error: any) {
    throw new Error(error.message);
  }
};
