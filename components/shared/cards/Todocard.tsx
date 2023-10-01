"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Todo = {
  _id: string;
  title: string;
  notes: string;
  label: string;
  date: Date;
};

export default function Todocard() {
  const [date, setDate] = useState<Date | undefined>();

  const [data, setData] = useState<Todo[]>([
    {
      _id: "9399hah83",
      title: "Get Started",
      notes:
        "Let Alertify to amplify your productivity. Add your first task by filling your own todo to your right-side bar 😉.Click Add button if you are on mobile. This project is open-sourced if you want to contibute for adding new features or to solve bugs, you are most welcomed.",
      label: "🙏🏻",
      date: new Date("2023-09-30"),
    },
  ]);

  const [compData, setCompData] = useState<Todo[]>([
    {
      _id: "9399hah83",
      title: "Alertify",
      notes:
        "Alertify offer a way to increase productivity, stopping you from forgetting things, helps prioritise tasks, manage tasks effectively, use time wisely and improve time management as well as workflow.",
      label: "🎯",
      date: new Date("2023-09-30"),
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);
  const [undoLoading, setUndoLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const submitHandler = async () => {
    if (date) {
      console.log(date.toISOString(), "date");

      setError(null);

      try {
        setLoading(true);
        const res = await axios.get("/api/getTodo");
        const filteredData = res.data.todo.filter((todo: any) => {
          const todoDate = todo.date;
          return todoDate === date.toISOString() && todo.completed === false;
        });
        setData(filteredData);

        const filteredCompData = res.data.todo.filter((todo: any) => {
          const todoDate = todo.date;
          return todoDate === date.toISOString() && todo.completed === true;
        });
        setCompData(filteredCompData);
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select a date");
    }
  };

  const finishedTask = async (todoId: string) => {
    try {
      setFinishLoading(true);
      console.log(todoId);
      await axios.patch("/api/todo", {
        id: todoId,
        completed: true,
      });

      await submitHandler();
    } catch (error) {
      console.log(error);
    } finally {
      setFinishLoading(false);
    }
  };

  const undoTask = async (todoId: string) => {
    try {
      setUndoLoading(true);
      console.log(todoId);
      await axios.patch("/api/todo", {
        id: todoId,
        completed: false,
      });
      await submitHandler();
    } catch (error) {
      console.log(error);
    } finally {
      setUndoLoading(false);
    }
  };

  const editTask = async (
    todoId: string,
    title: string,
    notes: string,
    label: string,
    date: Date
  ) => {
    try {
      setUndoLoading(true);
      console.log(todoId);
      await axios.patch("/api/todo", {
        title: "Todo 1",
        notes:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cum unde eos, quas nemo aperiam, fugit ducimus culpa rem expedita accusantium consectetur quia. Eligendi pariatur accusamus architecto facere praesentium amet!",
        label: "Important",
        date: new Date("2023-09-30"),
      });
      await submitHandler();
    } catch (error) {
      console.log(error);
    } finally {
      setUndoLoading(false);
    }
  };

  const deleteTask = async (todoId: string) => {
    try {
      setDeleteLoading(true);

      console.log(todoId);
      await axios.delete(`/api/todo?id=${todoId}`);
      await submitHandler();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2.5">
      <div className="flex justify-center items-center gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button className="h-8" onClick={submitHandler}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Check"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <Card className="w-[370px]">
          <CardHeader className="space-y-2">
            <CardTitle>Todo</CardTitle>
            <CardDescription>
              &quot;Believe you can, and you&apos;re halfway there.&quot; <br />{" "}
              - Theodore Roosevelt
            </CardDescription>
          </CardHeader>
          <ScrollArea className="h-[60vh] w-[350px] rounded-md">
            <CardContent>
              <div>
                {data.map((todo) => {
                  return (
                    <div key={todo._id}>
                      <Card className="w-[320px] mb-3 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            {todo.title}
                            <Badge>{todo.label}</Badge>
                          </CardTitle>
                          <CardDescription>{todo.notes}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </CardContent>
                        <CardFooter className="flex justify-center items-center">
                          <Button
                            className="w-full"
                            disabled={finishLoading}
                            onClick={() => finishedTask(todo._id)}
                          >
                            {finishLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              </>
                            ) : (
                              "Finished"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
        <Card className="w-[370px]">
          <CardHeader className="space-y-2">
            <CardTitle>Completed</CardTitle>
            <CardDescription>
              &apos;You can only lose what you cling to..&apos; <br /> - Buddha
            </CardDescription>
          </CardHeader>
          <ScrollArea className="h-[60vh] w-[350px] rounded-md">
            <CardContent>
              <div>
                {compData.map((todo) => {
                  return (
                    <div key={todo._id}>
                      <Card className="w-[320px] mb-3 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            {todo.title}
                            <Badge>{todo.label}</Badge>
                          </CardTitle>
                          <CardDescription>{todo.notes}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            disabled={undoLoading}
                            onClick={() => undoTask(todo._id)}
                          >
                            {undoLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              </>
                            ) : (
                              "Undo"
                            )}
                          </Button>
                          <Button
                            variant="destructive"
                            disabled={deleteLoading}
                            onClick={() => deleteTask(todo._id)}
                          >
                            {deleteLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              </>
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
