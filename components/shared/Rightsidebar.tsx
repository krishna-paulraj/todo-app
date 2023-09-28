import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
export default function Rightsidebar() {
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();

  const toaster = () => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  return (
    <>
      <section className="h-[80vh] w-[30vw] rounded-lg md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="absolute bottom-5 p-5">
              Add 🎯
            </Button>
          </PopoverTrigger>
          <PopoverContent className="h-[80vh] w-screen">
            <section className="rounded-lg md:block">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Create a todo 🎯</CardTitle>
                  <CardDescription>
                    Add your task and get reminders.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Title</Label>
                        <Input
                          id="name"
                          placeholder="Whats the todo ?"
                          className="w-[80vw]"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="notes">Reminder Notes</Label>
                        <Textarea
                          placeholder="Type your message here."
                          className="w-[80vw]"
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
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
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
                          <Input type="time" className="md:w-1/3"></Input>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="framework">Label: </Label>

                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Mark as" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Label</SelectLabel>
                              <SelectItem value="Important">
                                Important
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={toaster}>
                    Add
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </PopoverContent>
        </Popover>
      </section>
      <section className="hidden h-[80vh] my-10 w-[30vw] rounded-lg md:block">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create a todo 🎯</CardTitle>
            <CardDescription>Add your task and get reminders.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Title</Label>
                  <Input id="name" placeholder="Whats the todo ?" />
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
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
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
                    <Input type="time" className="w-1/3"></Input>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="framework">Label: </Label>

                  <Select>
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
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={toaster}>
              Add
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
