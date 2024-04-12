"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import MultiSelectFormField from "@/components/ui/multi-select";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

const frameworksList = [
  {
    value: "next.js",
    label: "Next.js",
    icon: Icons.dog,
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
    icon: Icons.cat,
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
    icon: Icons.turtle,
  },
  {
    value: "remix",
    label: "Remix",
    icon: Icons.rabbit,
  },
  {
    value: "astro",
    label: "Astro",
    icon: Icons.fish,
  },
];

const FormSchema = z.object({
  frameworks: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one framework."),
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      frameworks: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(
      `You have selected following frameworks: ${data.frameworks.join(", ")}.`
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start space-y-3 p-3">
      <PageHeader>
        <PageHeaderHeading>Multi select component</PageHeaderHeading>
        <PageHeaderDescription>assembled with shadcn/ui</PageHeaderDescription>
        <PageActions>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://github.com/sersavan/shadcn-multi-select-component"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </PageActions>
      </PageHeader>
      <Card className="w-full max-w-2xl p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="frameworks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frameworks</FormLabel>
                  <FormControl>
                    <MultiSelectFormField
                      options={frameworksList}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select options"
                    />
                  </FormControl>
                  <FormDescription>
                    Choose the frameworks you are interested in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="outline" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </main>
  );
}
