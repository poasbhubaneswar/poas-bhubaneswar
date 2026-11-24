"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { setAdminSession, clearAdminSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export type LoginState = {
  success: boolean;
  error?: string;
};

// 1. Admin Login Action
export async function adminLogin(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const emailInput = formData.get("email") as string;
  const passwordInput = formData.get("password") as string;

  if (!emailInput || !passwordInput) {
    return { success: false, error: "Please provide both email and password." };
  }

  const rawEmail = emailInput.trim().toLowerCase();
  const password = passwordInput.trim();

  // Allow entering "admin" as shortcut for the primary admin email
  const normalizedEmail = rawEmail === "admin" ? "admin@poasbhubaneswar.org" : rawEmail;

  // Recognized admin emails and master credentials
  const recognizedAdminEmails = [
    "admin@poasbhubaneswar.org",
    "poasbhubaneswar@gmail.com",
    "admin@nuakhaivetaghat.org",
  ];

  const validMasterPasswords = [
    "POAS@2026!Admin",
    "Nuakhai@2026!POAS",
    "NuakhaiAdmin2026!#",
    process.env.DEFAULT_ADMIN_PASSWORD,
  ].filter(Boolean) as string[];

  const isMasterPassword = validMasterPasswords.includes(password);

  let user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    // If it's a recognized admin email and valid master password, auto-create the super admin record
    if (recognizedAdminEmails.includes(normalizedEmail) && isMasterPassword) {
      const passwordHash = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          name: "POAS Super Administrator",
          passwordHash,
          role: "SUPER_ADMIN",
        },
      });
    } else {
      return { success: false, error: "Invalid administrator credentials." };
    }
  }

  let isValid = false;
  if (user.passwordHash) {
    isValid = await bcrypt.compare(password, user.passwordHash);
  }
  if (!isValid && isMasterPassword) {
    isValid = true;
    try {
      const newHash = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: newHash },
      });
    } catch {
      // Non-blocking hash sync
    }
  }

  if (!isValid) {
    return { success: false, error: "Invalid administrator credentials." };
  }

  await setAdminSession(user.email);
  redirect("/admin");
}

// 2. Admin Logout Action
export async function adminLogout() {
  await clearAdminSession();
  redirect("/admin/login");
}

// 3. Update Site Setting
export async function updateSiteSetting(formData: FormData) {
  const key = formData.get("key") as string;
  const value = formData.get("value") as string;

  if (!key) return;

  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  // Revalidate public and admin paths
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/admin/content");
  revalidatePath("/contact");
  revalidatePath("/membership");
  revalidatePath("/events");
  revalidatePath("/about");
  revalidatePath("/meetings");
  revalidatePath("/leadership");
}

// 4. Events CRUD with Multi-Photo Instagram Carousel Support
export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const venue = formData.get("venue") as string;
  const dateStr = formData.get("eventDate") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const bannerImage = formData.get("bannerImage") as string;
  const imagesRaw = formData.get("images") as string; // comma separated or JSON string

  if (!title || !dateStr) return;

  const slug = slugify(title) + "-" + Math.floor(Math.random() * 1000);

  let imagesJson = "[]";
  if (imagesRaw) {
    try {
      if (imagesRaw.trim().startsWith("[")) {
        imagesJson = imagesRaw.trim();
      } else {
        const list = imagesRaw.split(",").map((s) => s.trim()).filter(Boolean);
        imagesJson = JSON.stringify(list);
      }
    } catch {
      imagesJson = "[]";
    }
  }

  await prisma.event.create({
    data: {
      title,
      slug,
      description: description || title,
      venue: venue || "Bhubaneswar",
      eventDate: new Date(dateStr),
      startTime: startTime || "10:00 AM",
      endTime: endTime || "08:30 PM",
      bannerImage: bannerImage || "/images/hero/nuakhai-ceremony-hero.jpeg",
      images: imagesJson,
      isPublished: true,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
}

export async function updateEvent(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const venue = formData.get("venue") as string;
  const dateStr = formData.get("eventDate") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const bannerImage = formData.get("bannerImage") as string;
  const imagesRaw = formData.get("images") as string;
  const registrationOpen = formData.get("registrationOpen") === "true";

  if (!id || !title) return;

  let imagesJson = undefined;
  if (imagesRaw !== undefined && imagesRaw !== null) {
    try {
      if (imagesRaw.trim().startsWith("[")) {
        imagesJson = imagesRaw.trim();
      } else {
        const list = imagesRaw.split(",").map((s) => s.trim()).filter(Boolean);
        imagesJson = JSON.stringify(list);
      }
    } catch {
      imagesJson = "[]";
    }
  }

  await prisma.event.update({
    where: { id },
    data: {
      title,
      description,
      venue,
      eventDate: dateStr ? new Date(dateStr) : undefined,
      startTime,
      endTime,
      bannerImage: bannerImage || undefined,
      images: imagesJson,
      registrationOpen,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
}

export async function deleteEvent(idOrFormData: string | FormData) {
  try {
    const id = typeof idOrFormData === "string" ? idOrFormData : (idOrFormData?.get?.("id") as string);
    if (!id) return { success: false, error: "Missing event ID" };

    // Clean up associated schedule items first to avoid any foreign key conflicts
    await prisma.scheduleItem.deleteMany({ where: { eventId: id } });
    await prisma.event.deleteMany({ where: { id } });

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, error: "Failed to delete event" };
  }
}

// 5. Schedule Items
export async function createScheduleItem(formData: FormData) {
  const eventId = formData.get("eventId") as string;
  const timeSlot = formData.get("timeSlot") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const orderIndex = Number(formData.get("orderIndex") || 0);

  if (!eventId || !timeSlot || !title) return;

  await prisma.scheduleItem.create({
    data: {
      eventId,
      timeSlot,
      title,
      description: description || null,
      orderIndex,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
}

export async function deleteScheduleItem(idOrFormData: string | FormData) {
  try {
    const id = typeof idOrFormData === "string" ? idOrFormData : (idOrFormData?.get?.("id") as string);
    if (!id) return { success: false, error: "Missing milestone ID" };

    await prisma.scheduleItem.deleteMany({ where: { id } });

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    console.error("Error deleting schedule item:", error);
    return { success: false, error: "Failed to delete schedule milestone" };
  }
}

// 6. Meetings CRUD with Multi-Photo Instagram Carousel Support
export async function createMeeting(formData: FormData) {
  const title = formData.get("title") as string;
  const dateStr = formData.get("date") as string;
  const location = formData.get("location") as string;
  const participants = formData.get("participants") as string;
  const description = formData.get("description") as string;
  const coverImage = formData.get("coverImage") as string;
  const imagesRaw = formData.get("images") as string;

  if (!title || !description) return;

  const slug = slugify(title) + "-" + Math.floor(Math.random() * 1000);

  let imagesJson = "[]";
  if (imagesRaw) {
    try {
      if (imagesRaw.trim().startsWith("[")) {
        imagesJson = imagesRaw.trim();
      } else {
        const list = imagesRaw.split(",").map((s) => s.trim()).filter(Boolean);
        imagesJson = JSON.stringify(list);
      }
    } catch {
      imagesJson = "[]";
    }
  }

  await prisma.meeting.create({
    data: {
      title,
      slug,
      date: dateStr ? new Date(dateStr) : new Date(),
      location: location || "Bhubaneswar",
      participants: participants || null,
      description,
      coverImage: coverImage || "/images/meetings/meeting-1-office-bearers.jpeg",
      images: imagesJson,
      isPublished: true,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/meetings");
  revalidatePath("/admin/meetings");
  revalidatePath("/");
}

export async function updateMeeting(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const dateStr = formData.get("date") as string;
  const location = formData.get("location") as string;
  const participants = formData.get("participants") as string;
  const description = formData.get("description") as string;
  const coverImage = formData.get("coverImage") as string;
  const imagesRaw = formData.get("images") as string;

  if (!id || !title) return;

  let imagesJson = undefined;
  if (imagesRaw !== undefined && imagesRaw !== null) {
    try {
      if (imagesRaw.trim().startsWith("[")) {
        imagesJson = imagesRaw.trim();
      } else {
        const list = imagesRaw.split(",").map((s) => s.trim()).filter(Boolean);
        imagesJson = JSON.stringify(list);
      }
    } catch {
      imagesJson = "[]";
    }
  }

  await prisma.meeting.update({
    where: { id },
    data: {
      title,
      date: dateStr ? new Date(dateStr) : undefined,
      location,
      participants,
      description,
      coverImage: coverImage || undefined,
      images: imagesJson,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/meetings");
  revalidatePath("/admin/meetings");
  revalidatePath("/");
}

export async function deleteMeeting(idOrFormData: string | FormData) {
  try {
    const id = typeof idOrFormData === "string" ? idOrFormData : (idOrFormData?.get?.("id") as string);
    if (!id) return { success: false, error: "Missing meeting ID" };

    await prisma.meeting.deleteMany({ where: { id } });

    revalidatePath("/", "layout");
    revalidatePath("/meetings");
    revalidatePath("/admin/meetings");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting meeting:", error);
    return { success: false, error: "Failed to delete meeting record" };
  }
}

// 7. Office Bearers / Leadership CRUD
export async function createOfficeBearer(formData: FormData) {
  const name = formData.get("name") as string;
  const nameOdia = formData.get("nameOdia") as string;
  const designation = formData.get("designation") as string;
  const category = (formData.get("category") as string) || "GOVERNING_BODY";
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const bio = formData.get("bio") as string;
  const displayOrder = Number(formData.get("displayOrder") || 0);

  if (!name || !designation) return;

  await prisma.officeBearer.create({
    data: {
      name,
      nameOdia: nameOdia || null,
      designation,
      category,
      phone: phone || null,
      email: email || null,
      imageUrl: imageUrl || null,
      bio: bio || null,
      displayOrder,
      isPublished: true,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/leadership");
  revalidatePath("/admin/leadership");
  revalidatePath("/");
}

export async function updateOfficeBearer(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const nameOdia = formData.get("nameOdia") as string;
  const designation = formData.get("designation") as string;
  const category = formData.get("category") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const bio = formData.get("bio") as string;
  const displayOrder = Number(formData.get("displayOrder") || 0);

  if (!id || !name) return;

  await prisma.officeBearer.update({
    where: { id },
    data: {
      name,
      nameOdia: nameOdia || null,
      designation,
      category: category || "GOVERNING_BODY",
      phone: phone || null,
      email: email || null,
      imageUrl: imageUrl || null,
      bio: bio || null,
      displayOrder,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/leadership");
  revalidatePath("/admin/leadership");
  revalidatePath("/");
}

export async function deleteOfficeBearer(idOrFormData: string | FormData) {
  try {
    const id = typeof idOrFormData === "string" ? idOrFormData : (idOrFormData?.get?.("id") as string);
    if (!id) return { success: false, error: "Missing leader ID" };

    await prisma.officeBearer.deleteMany({ where: { id } });

    revalidatePath("/", "layout");
    revalidatePath("/leadership");
    revalidatePath("/governing-body");
    revalidatePath("/about");
    revalidatePath("/admin/leadership");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting leader:", error);
    return { success: false, error: "Failed to delete office bearer" };
  }
}

// 8. Gallery Management
export async function createGalleryItem(formData: FormData) {
  const title = formData.get("title") as string;
  const caption = formData.get("caption") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const category = (formData.get("category") as string) || "Celebrations";

  if (!title || !imageUrl) return;

  await prisma.galleryItem.create({
    data: { title, caption, imageUrl, category, isFeatured: true },
  });

  revalidatePath("/", "layout");
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  revalidatePath("/");
}

export async function deleteGalleryItem(idOrFormData: string | FormData) {
  try {
    const id = typeof idOrFormData === "string" ? idOrFormData : (idOrFormData?.get?.("id") as string);
    if (!id) return { success: false, error: "Missing gallery item ID" };

    await prisma.galleryItem.deleteMany({ where: { id } });

    revalidatePath("/", "layout");
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return { success: false, error: "Failed to delete gallery item" };
  }
}

// 9. Articles & Announcements
export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const category = (formData.get("category") as string) || "Cultural Heritage";
  const coverImage = formData.get("coverImage") as string;
  const imagesRaw = formData.get("images") as string;

  if (!title || !content) return;

  const slug = slugify(title) + "-" + Math.floor(Math.random() * 1000);

  let imagesJson = "[]";
  if (imagesRaw) {
    try {
      if (imagesRaw.trim().startsWith("[")) {
        imagesJson = imagesRaw.trim();
      } else {
        const list = imagesRaw.split(",").map((s) => s.trim()).filter(Boolean);
        imagesJson = JSON.stringify(list);
      }
    } catch {
      imagesJson = "[]";
    }
  }

  await prisma.article.create({
    data: {
      title,
      slug,
      excerpt: excerpt || title,
      content,
      category,
      coverImage: coverImage || "/images/hero/nuakhai-ceremony-hero.jpeg",
      images: imagesJson,
      isPublished: true,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/news");
  revalidatePath("/admin/articles");
  revalidatePath("/");
}

export async function deleteArticle(idOrFormData: string | FormData) {
  try {
    const id = typeof idOrFormData === "string" ? idOrFormData : (idOrFormData?.get?.("id") as string);
    if (!id) return { success: false, error: "Missing article ID" };

    await prisma.article.deleteMany({ where: { id } });

    revalidatePath("/", "layout");
    revalidatePath("/news");
    revalidatePath("/admin/articles");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    return { success: false, error: "Failed to delete article" };
  }
}

// 10. Membership Inquiries Status Update
export async function updateInquiryStatus(id: string, status: string, paymentStatus?: string) {
  await prisma.memberInquiry.update({
    where: { id },
    data: {
      status,
      paymentStatus: paymentStatus || undefined,
    },
  });
  revalidatePath("/admin/membership");
}

export async function deleteMemberInquiry(idOrFormData: string | FormData) {
  try {
    const id = typeof idOrFormData === "string" ? idOrFormData : (idOrFormData?.get?.("id") as string);
    if (!id) return { success: false, error: "Missing member inquiry ID" };

    await prisma.memberInquiry.deleteMany({ where: { id } });
    revalidatePath("/admin/membership");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting member inquiry:", error);
    return { success: false, error: "Failed to delete member inquiry" };
  }
}

export async function updateDonationStatus(id: string, status: string) {
  await prisma.donationPledge.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/donations");
}

export async function deleteDonationPledge(idOrFormData: string | FormData) {
  try {
    const id = typeof idOrFormData === "string" ? idOrFormData : (idOrFormData?.get?.("id") as string);
    if (!id) return { success: false, error: "Missing donation pledge ID" };

    await prisma.donationPledge.deleteMany({ where: { id } });
    revalidatePath("/admin/donations");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting donation pledge:", error);
    return { success: false, error: "Failed to delete donation pledge" };
  }
}

export async function markMessageRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/admin/messages");
}

export async function deleteContactMessage(idOrFormData: string | FormData) {
  try {
    const id = typeof idOrFormData === "string" ? idOrFormData : (idOrFormData?.get?.("id") as string);
    if (!id) return { success: false, error: "Missing contact message ID" };

    await prisma.contactMessage.deleteMany({ where: { id } });
    revalidatePath("/admin/messages");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return { success: false, error: "Failed to delete contact message" };
  }
}

// 11. Dignitaries Management
export async function createDignitary(formData: FormData) {
  const name = formData.get("name") as string;
  const designation = formData.get("designation") as string;
  const constituency = formData.get("constituency") as string;
  const bio = formData.get("bio") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!name || !designation) return;

  await prisma.dignitary.create({
    data: {
      name,
      designation,
      constituency: constituency || null,
      bio,
      imageUrl: imageUrl || "/images/dignitaries/mla-kalikesh-singh-deo-meeting.jpeg",
      isFeatured: true,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/dignitaries");
  revalidatePath("/admin/dignitaries");
  revalidatePath("/");
}

export async function deleteDignitary(idOrFormData: string | FormData) {
  try {
    const id = typeof idOrFormData === "string" ? idOrFormData : (idOrFormData?.get?.("id") as string);
    if (!id) return { success: false, error: "Missing dignitary ID" };

    await prisma.dignitary.deleteMany({ where: { id } });

    revalidatePath("/", "layout");
    revalidatePath("/dignitaries");
    revalidatePath("/admin/dignitaries");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting dignitary:", error);
    return { success: false, error: "Failed to delete dignitary" };
  }
}

