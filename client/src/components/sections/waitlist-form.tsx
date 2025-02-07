import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function WaitlistForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      name: "",
      email: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      await apiRequest("POST", "/api/waitlist", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Success!",
        description: "You've been added to the waitlist.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <section id="waitlist" className="py-24">
      <motion.div
        className="container mx-auto px-4 max-w-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Card>
          <CardContent className="pt-6">
            {submitted ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                <p className="text-muted-foreground">
                  We'll notify you when we launch.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">
                  Join the Waitlist
                </h2>
                <Form {...form}>
                  <form onSubmit={onSubmit} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Joining..." : "Join Waitlist"}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
