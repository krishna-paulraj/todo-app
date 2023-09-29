import { TwitterIcon, LinkedinIcon, GithubIcon } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <Card className="h-[25vh] w-auto m-3">
      <CardHeader>
        <CardTitle>Connect with me 🎯</CardTitle>
        <CardDescription>My social links:</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <Button variant="link" className="flex items-center space-x-1">
            <TwitterIcon className="h-5 w-5" />
            <Link href="https://twitter.com/KrishnaPaulraj4">Twiter</Link>
          </Button>

          <Button variant="link" className="flex items-center space-x-1">
            <GithubIcon className="h-5 w-5" />
            <Link href="https://github.com/krishna-paulraj">Github</Link>
          </Button>

          <Button variant="link" className="flex items-center space-x-1">
            <LinkedinIcon className="h-5 w-5" />
            <Link href="https://twitter.com/KrishnaPaulraj4">Linkedin</Link>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-xs flex justify-end">
        Website made by Suresh Krishna
      </CardFooter>
    </Card>
  );
}
