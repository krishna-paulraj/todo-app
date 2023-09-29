import { useState } from "react";
import { Button } from "../../ui/button";
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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Todo = {
  id: string;
  title: string;
  notes: string;
  badge: "Important" | "Completed";
  date: Date;
};

const data: Todo[] = [
  {
    id: "9399hah83",
    title: "Todo 1",
    notes:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cum unde eos, quas nemo aperiam, fugit ducimus culpa rem expedita accusantium consectetur quia. Eligendi pariatur accusamus architecto facere praesentium amet!",
    badge: "Important",
    date: new Date("2023-09-30"),
  },
  {
    id: "9399hah83",
    title: "Todo 2",
    notes:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cum unde eos, quas nemo aperiam, fugit ducimus culpa rem expedita accusantium consectetur quia. Eligendi pariatur accusamus architecto facere praesentium amet!",
    badge: "Important",
    date: new Date("2023-09-30"),
  },
  {
    id: "9399hah83",
    title: "Todo 3",
    notes:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cum unde eos, quas nemo aperiam, fugit ducimus culpa rem expedita accusantium consectetur quia. Eligendi pariatur accusamus architecto facere praesentium amet!",
    badge: "Important",
    date: new Date("2023-09-30"),
  },
  {
    id: "9399hah83",
    title: "Todo 4",
    notes:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cum unde eos, quas nemo aperiam, fugit ducimus culpa rem expedita accusantium consectetur quia. Eligendi pariatur accusamus architecto facere praesentium amet!",
    badge: "Important",
    date: new Date("2023-09-30"),
  },
  {
    id: "9399hah83",
    title: "Todo 5",
    notes:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cum unde eos, quas nemo aperiam, fugit ducimus culpa rem expedita accusantium consectetur quia. Eligendi pariatur accusamus architecto facere praesentium amet!",
    badge: "Important",
    date: new Date("2023-09-30"),
  },
];

export default function Todocard() {
  const [date, setDate] = useState<Date>();
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
        <Button className="h-8">Check</Button>
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
          <ScrollArea className="h-[50vh] w-[350px] rounded-md">
            <CardContent>
              <div>
                {data.map((todo) => {
                  return (
                    <div key={todo.id}>
                      <Card className="w-[320px]">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            {todo.title}
                            <Badge>{todo.badge}</Badge>
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
                            {format(todo.date, "PPP")}
                          </Button>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">Edit</Button>
                          <Button>Finished</Button>
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
              &apos;Believe you can, and you&apos;re halfway there.&apos; <br />{" "}
              - Theodore Roosevelt
            </CardDescription>
          </CardHeader>
          <ScrollArea className="h-[50vh] w-[350px] rounded-md">
            <CardContent>
              <div>
                {data.map((todo) => {
                  return (
                    <div key={todo.id}>
                      <Card className="w-[320px]">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            {todo.title}
                            <Badge>{todo.badge}</Badge>
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
                            {format(todo.date, "PPP")}
                          </Button>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">Edit</Button>
                          <Button>Finished</Button>
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
