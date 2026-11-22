"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Membership Enrolment Schema (Lifetime ₹1000 or Yearly ₹100)
const MembershipSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Please enter a valid 10-digit mobile number").max(15),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  city: z.string().default("Bhubaneswar"),
  nativeDistrict: z.string().min(2, "Please select or enter your native district"),
  membershipTier: z.enum(["LIFETIME", "YEARLY"]).default("LIFETIME"),
});

export type ActionState = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function submitMembership(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = MembershipSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    city: formData.get("city") || "Bhubaneswar",
    nativeDistrict: formData.get("nativeDistrict"),
    membershipTier: formData.get("membershipTier") || "LIFETIME",
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Validation failed",
    };
  }

  const tier = parsed.data.membershipTier;
  const fee = tier === "LIFETIME" ? 1000 : 100;
  const tierLabel = tier === "LIFETIME" ? "Lifetime Membership (₹1,000)" : "Yearly Membership (₹100)";

  try {
    const record = await prisma.memberInquiry.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        city: parsed.data.city,
        nativeDistrict: parsed.data.nativeDistrict,
        membershipTier: tier,
        membershipFee: fee,
        paymentStatus: "PENDING",
        status: "PENDING",
      },
    });

    revalidatePath("/admin/membership");
    return {
      success: true,
      message: `Namaskar ${record.name}, your registration for POAS ${tierLabel} has been successfully recorded! Our secretariat team will reach out with payment confirmation and your official membership kit.`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to record membership registration.",
    };
  }
}

// 2. Donation Pledge Schema
const DonationSchema = z.object({
  name: z.string().min(2, "Name required").max(100),
  phone: z.string().optional().or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  amount: z.coerce.number().min(10, "Donation amount must be at least ₹10"),
  purpose: z.string().default("Maa Samalei Mandir Project"),
});

export async function submitDonationPledge(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = DonationSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    amount: formData.get("amount"),
    purpose: formData.get("purpose") || "Maa Samalei Mandir Project",
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Validation failed",
    };
  }

  try {
    const record = await prisma.donationPledge.create({
      data: parsed.data,
    });
    revalidatePath("/admin/donations");
    return {
      success: true,
      message: `Thank you, ${record.name}! Your pledge of ₹${record.amount} for "${record.purpose}" has been recorded. Our treasury coordinator will contact you with bank receipt and 80G tax exemption details.`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to process pledge.",
    };
  }
}

// 3. Contact Message Schema
const ContactSchema = z.object({
  name: z.string().min(2, "Name required").max(100),
  email: z.string().email("Valid email required"),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().optional().or(z.literal("General Inquiry")),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000),
});

export async function submitContactMessage(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject") || "General Inquiry",
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Validation failed",
    };
  }

  try {
    await prisma.contactMessage.create({
      data: parsed.data,
    });
    revalidatePath("/admin/messages");
    return {
      success: true,
      message: "Thank you for reaching out to POAS! Your message has been delivered to our secretariat in Bhubaneswar.",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to send message.",
    };
  }
}
