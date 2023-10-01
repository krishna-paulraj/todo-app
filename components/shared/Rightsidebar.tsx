import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "../ui/use-toast";

export default function Rightsidebar() {
  type Todo = {
    title: string;
    notes: string;
    date: Date | undefined;
    label: string;
  };

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<Todo>({
    title: "",
    notes: "",
    date: undefined,
    label: "",
  });
  const { toast } = useToast();

  const toaster = () => {
    toast({
      title: data.title,
      description: data.date?.toDateString(),
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post("/api/todo", data);
      if (res.data.error) {
        toast({
          title: "Somthing went wrong",
        });
      }
      toaster();
    } catch (error) {
      toast({
        title: "Error occured",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="h-[80vh] w-[30vw] rounded-lg md:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="fixed left-6 bottom-5 p-5">
              Add 🎯
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a todo 🎯</DialogTitle>
              <DialogDescription>
                Add your task and get reminders.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    name="title"
                    placeholder="Whats the todo ?"
                    className="w-[80vw]"
                    onChange={(e) => {
                      setData({ ...data, title: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="notes">Reminder Notes</Label>
                  <Textarea
                    placeholder="Type your message here."
                    className="w-[80vw]"
                    name="notes"
                    onChange={(e) => {
                      setData({ ...data, notes: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="schedule">Schedule: </Label>
                  <div className="w-[80vw] flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[250px] justify-start text-left font-normal",
                            !data.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {data.date ? (
                            format(data.date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={data.date}
                          onSelect={(selectedDate) => {
                            setData({ ...data, date: selectedDate });
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Input type="time" className="md:w-1/3"></Input>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="framework">Label: </Label>

                  <Select
                    onValueChange={() => {
                      setData({
                        ...data,
                        label: "Important",
                      });
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Mark as" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Label</SelectLabel>
                        <SelectItem value="Important">Important</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button disabled={loading} className="w-full mt-3" type="submit">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Add"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </section>
      <section className="hidden h-[65vh] w-[30vw] shadow-md rounded-lg md:mt-12 md:block">
        <Card className="h-[65vh] w-full">
          <CardHeader>
            <CardTitle>Create a todo 🎯</CardTitle>
            <CardDescription>Add your task and get reminders.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    placeholder="Whats the todo ?"
                    onChange={(e) => {
                      setData({ ...data, title: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Reminder Notes</Label>
                  <Textarea placeholder="Type your message here." />
                </div>
                <div>
                  <Label htmlFor="framework">Schedule: </Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !data.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {data.date ? (
                            format(data.date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={data.date}
                          onSelect={(selectedDate) => {
                            setData({ ...data, date: selectedDate });
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Input type="time" className="w-1/3"></Input>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="framework">Label: </Label>

                  <Select
                    onValueChange={() => {
                      setData({
                        ...data,
                        label: "Important",
                      });
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Mark as" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Label</SelectLabel>
                        <SelectItem value="Important">Important</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button disabled={loading} className="w-full mt-3" type="submit">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Add"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="hiddem md:block h-[10vh] mt-2">
          <CardHeader>
            <CardDescription>Tip: Check out this app on Github</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </>
  );
}
