"use client";

import { Input } from "@/components/ui/input";
import { RegisterData } from "@/types/register";
import { Step1Values } from "@/schemas/register";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { PasswordInput } from "@/components/input/password-input";

interface Step1Props {
  formData: RegisterData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step1Form: UseFormReturn<Step1Values>;
}

export function Step1({ formData, handleInputChange, step1Form }: Step1Props) {
  return (
    <div className="grid gap-5">
      <FormField
        control={step1Form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                value={formData.email}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(e);
                }}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={step1Form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <PasswordInput
                {...field}
                value={formData.password}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(e);
                }}
                placeholder="Create a password"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={step1Form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <PasswordInput
                {...field}
                value={formData.confirmPassword}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(e);
                }}
                placeholder="Confirm your password"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
