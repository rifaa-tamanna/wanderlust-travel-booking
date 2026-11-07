"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignUpPage() {
    const handleEmailSignUp = async (e: React.SubmitEvent<HTMLElement>) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const user = Object.fromEntries(formData.entries()) as { name:string, email:string, password:string, confirmPassword:string }

      console.log("user", user);

      const { data, error } = await authClient.signUp.email({
          ...user
      });

      if(data) {
          redirect('/')
      }
      if(error) {
          console.log(error)
      }
    };

  

  return (
    <div className="min-h-screen bg-[#f4f4f4] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#222222]">
            Create Account
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Start your adventure with Wanderlust
          </p>
        </div>

        <Card className="rounded-none border border-gray-200 bg-white shadow-md">
          <CardHeader className="space-y-2 px-6 pt-7 sm:px-7">
            <CardTitle className="sr-only">Create an account</CardTitle>
            <CardDescription className="sr-only">
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-7 sm:px-7 sm:pt-0">
            <form onSubmit={handleEmailSignUp}>
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="h-11 rounded-none border-gray-200 bg-[#f8f9fa] focus-visible:ring-[#16a1ba]"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="name">Image URL</FieldLabel>
                  <Input
                    id="name"
                    name="imageURL"
                    type="text"
                    placeholder="image URL"
                    required
                    className="h-11 rounded-none border-gray-200 bg-[#f8f9fa] focus-visible:ring-[#16a1ba]"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="h-11 rounded-none border-gray-200 bg-[#f8f9fa] focus-visible:ring-[#16a1ba]"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    minLength={8}
                    required
                    className="h-11 rounded-none border-gray-200 bg-[#f8f9fa] focus-visible:ring-[#16a1ba]"
                  />
                </Field>

                <FieldGroup className="gap-4 pt-1">
                  <Field>
                    <Button
                      type="submit"
                      className="h-11 w-full rounded-none bg-[#16a1ba] text-white hover:bg-[#128da3]"
                    >
                      Create Account
                    </Button>

                    <div className="flex items-center gap-3 py-1">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="text-sm text-gray-500">
                        Or sign up with
                      </span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <Button
                      variant="outline"
                      type="button"
                      className="h-11 w-full rounded-none border-gray-200 bg-white hover:bg-gray-50"
                    >
                      Sign Up With Google
                    </Button>

                    <FieldDescription className="pt-3 text-center text-sm">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="font-medium text-[#16a1ba] hover:underline"
                      >
                        Login
                      </Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
