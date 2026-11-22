# Nuakhai Vetaghat — Administrator Guide

Welcome to the administrative portal for **Nuakhai Vetaghat** and **Paschim Odisha Agrani Sangathan (POAS)**.

This guide explains how to govern content, events, photo galleries, news releases, member enrolments, and donations through the dashboard with zero delay and instant live propagation.

---

## 1. Accessing the Dashboard

1. Navigate to: `http://localhost:3000/admin` (or your production domain `/admin`).
2. Enter the authorized credentials:
   - **Administrator Email**: `admin@nuakhaivetaghat.org`
   - **Security Key / Password**: `NuakhaiAdmin2026!#`
3. Click **Access Control Center**.

---

## 2. Dashboard Sections & How to Use Them

### 2.1 Overview & Metrics (`/admin`)
- Displays real-time counts of:
  - Enrolled ₹1 members
  - Donation pledges
  - Direct citizen inquiries
  - Published photos and articles
- Shows recent activity feeds for rapid review.

### 2.2 Site Content CMS (`/admin/content`)
Allows authorized administrators to modify live public copy in real time:
- **Hero Odia Headline**: Edit the Odia script heading (`ପୁଣି ଥରେ — ଆମେ ଏକାଠି`).
- **Hero English Subtitle**: Event subtitle under the main Odia header (`Nuakhai Vetaghat 2026`).
- **Hero Description**: Update the introductory description narrative.
- **Symbolic Membership Fee**: Modify the enrolment amount (e.g. `₹1`).
- **Contact Details**: Update the primary helpline number, secondary numbers, official email address, WhatsApp number, and secretariat city.
- Click **Save Changes** next to any field to instantly save to SQLite and purge server cache.
- Click **Open Live Main Page** to preview changes immediately.

### 2.3 Events & Timeline Management (`/admin/events`)
- **Create New Event**: Click **"New Event"** to publish a future gathering with title, celebration date, venue, and time slot.
- **Edit Event Details**: Modify the gathering title, date, venue, start time, end time, and theme description.
- **Delete an Event**:
  - Click **"Delete Event"** on the upper right of any event card.
  - Confirm the prompt: Next.js will cascade-delete the event and all of its associated timeline milestones.
- **Manage Timeline Milestones**:
  - **Add Milestone**: Click **"Add Milestone"**, input the ceremony time slot (e.g. `04:30 PM - 06:00 PM`), title, and description, and click **"Add to Timeline"**.
  - **Delete Milestone**: Click the red **Trash icon** on any individual milestone to remove it from the timeline.
- Changes propagate instantly to the homepage countdown timer and the `/events` schedule page.

### 2.4 Gallery Management (`/admin/gallery`)
- **Add a Photograph**:
  - Enter photo Title and Category (Celebrations, Dignitaries, Maa Samalei, Cultural Performances).
  - Provide image path (e.g. `/images/events/nuakhai-gathering-stage.jpeg`).
  - Enter description caption.
  - Click **Upload to Gallery**.
- **Delete an Image**: Click the **Delete** button under any photo card.

### 2.5 Articles & Press Releases (`/admin/articles`)
- **Compose an Article**:
  - Enter headline, category, summary excerpt, and full markdown/text body.
  - Set cover image path (e.g. `/images/news/lokasamachar-press-coverage.jpeg`).
  - Click **Publish Article**.
- The new article will immediately appear on `/news` and receive a canonical URL at `/news/[slug]`.

### 2.6 Dignitaries & Committee Governance (`/admin/dignitaries`)
- Manage public representatives, MLAs, and executive patrons.
- Add profiles with name, designation, constituency, and photograph path.
- Controls the 4 featured leaders on the homepage and the complete roster on `/dignitaries`.

### 2.7 Membership Enrolments (`/admin/membership`)
- Review all ₹1 membership submissions from citizens.
- Filter by status: `PENDING`, `APPROVED`, `REJECTED`.
- Update review status with one click.

### 2.8 Donation Pledges (`/admin/donations`)
- Track financial and material pledges towards the Maa Samalei Mandir Project and Nuakhai celebrations.
- Review donor names, pan/aadhaar identifiers, phone numbers, and pledge amounts.
- Update status to `VERIFIED` or `PLEDGED`.

### 2.9 Citizen Messages & Inquiries (`/admin/messages`)
- Direct contact inbox for community queries received through `/contact`.
- Mark messages as read once replied to.

---

## 3. Real-Time Propagation Architecture

Every public page (`/`, `/about`, `/events`, `/gallery`, `/dignitaries`, `/news`, `/contact`) is configured with:
```ts
export const dynamic = "force-dynamic";
export const revalidate = 0;
```
When an administrator saves changes in the CMS, Next.js revalidates the entire layout and route tree via `revalidatePath("/", "layout")`. Changes appear immediately on refresh with zero lag.
