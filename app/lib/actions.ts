"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { supabase } from "./supabase";
export type State = {
  errors?: {
    customerName?: string[];
    customerEmail?: string[];
    customerPhone?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
  dbError?: string | null;
};

const schema = z.object({
  customerName: z.string().min(3).max(50),
  customerEmail: z.string().email(),
  customerPhone: z.string().length(10, { message: "Invalid phone number" }),
  amount: z
    .string()
    .min(1, { message: "Amount should be greater 0" })
    .max(999999, { message: "Invalid amount, max is 999999" }),
  status: z.enum(["pending", "paid"], { message: "Invalid status" }),
});

export async function updateInvoice(
  id: string,
  prevState: State | undefined,
  formData: FormData
) {
  const customerName = formData.get("CustomerName");
  const customerEmail = formData.get("CustomerEmail");
  const customerPhone = formData.get("CustomerPhone");
  const amount = formData.get("Amount");
  const status = formData.get("status");

  let validInputs = schema.safeParse({
    customerName,
    customerEmail,
    customerPhone,
    amount,
    status,
  });

  if (!validInputs.success) {
    return {
      errors: validInputs.error.flatten().fieldErrors,
      message: null,
      dbError: null,
    };
  }
  try {
    const { data, error } = await supabase
      .from("invoices")
      .update({
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        amount: amount,
        status: status,
      })
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/");
    // redirect("/");
    return {
      errors: {},
      message: "Invoice updated successfully",
      dbError: null,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: null,
      errors: {},
      dbError: error.message,
    };
  }
  //this is giving error solve this
}

export async function createInvoice(prevState: State, formData: FormData) {
  const customerName = formData.get("CustomerName");
  const customerEmail = formData.get("CustomerEmail");
  const customerPhone = formData.get("CustomerPhone");
  const amount = formData.get("Amount");
  const status = formData.get("status");

  let validInputs = schema.safeParse({
    customerName,
    customerEmail,
    customerPhone,
    amount,
    status,
  });

  if (!validInputs.success) {
    return {
      errors: validInputs.error.flatten().fieldErrors,
      message: null,
      dbError: null,
    };
  }

  try {
    const { data, error } = await supabase.from("invoices").insert({
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      amount: amount,
      status: status,
    });

    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/");
    return {
      errors: {},
      message: "Invoice created successfully",
      dbError: null,
    };
    // redirect("/");
  } catch (error: any) {
    return {
      message: null,
      errors: {},
      dbError: error.message,
    };
  }
}

export async function getInvoiceById(id: string) {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id);
  return {
    data: { ...data },
  };
}

export async function deleteInvoice(id: string) {
  const { data, error } = await supabase.from("invoices").delete().eq("id", id);
  if (error) {
    return {
      message: error.message,
    };
  }
  revalidatePath("/");
  return {
    message: "Invoice deleted successfully",
  };
}
