const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding POAS – Paschim Odisha Agrani Sangathana database...");

  // 1. Create Default Super Admin
  const hashedPassword = await bcrypt.hash("NuakhaiAdmin2026!#", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@nuakhaivetaghat.org" },
    update: {},
    create: {
      email: "admin@nuakhaivetaghat.org",
      name: "POAS Super Administrator",
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log("Admin account created:", admin.email);

  // 2. Seed Official POAS Office Bearers (From Official Word Document)
  const officeBearersData = [
    // --- GOVERNING BODY ---
    {
      name: "Sri Sanjeeb Kumar Mishra",
      nameOdia: "ଶ୍ରୀ ସଞ୍ଜୀବ କୁମାର ମିଶ୍ର",
      designation: "President",
      category: "GOVERNING_BODY",
      phone: "9439011880",
      imageUrl: "/images/leadership/sanjeeb-kumar-mishra.jpeg",
      bio: "President of Paschim Odisha Agrani Sangathan (POAS). Visionary leader driving organizational governance, cultural solidarity, and the Maa Samalei Mandir Project in Bhubaneswar.",
      displayOrder: 1,
      isPublished: true,
    },
    {
      name: "Sri Dukhishyam Bhanja",
      nameOdia: "ଶ୍ରୀ ଦୁଃଖୀଶ୍ୟାମ ଭଞ୍ଜ",
      designation: "Secretary General",
      category: "GOVERNING_BODY",
      phone: "9437150112",
      imageUrl: "/images/leadership/dukhishyam-bhanja.jpeg",
      bio: "Secretary General of Paschim Odisha Agrani Sangathan. Directing secretariat affairs, statewide member coordination, and executive deliberations.",
      displayOrder: 2,
      isPublished: true,
    },
    {
      name: "Sri Ashutosh Hota",
      nameOdia: "ଶ୍ରୀ ଆଶୁତୋଷ ହୋତା",
      designation: "Vice-President",
      category: "GOVERNING_BODY",
      phone: "9776016210",
      imageUrl: null, // flagged for manual verification / photo update via admin
      bio: "Vice-President of Paschim Odisha Agrani Sangathan. Guiding strategic outreach, patron relations, and institutional growth in the capital.",
      displayOrder: 3,
      isPublished: true,
    },
    {
      name: "Anil Mohapatra",
      nameOdia: "ଅନିଲ କୁମାର ମହାପାତ୍ର",
      designation: "Secretary",
      category: "GOVERNING_BODY",
      phone: "9004830541",
      imageUrl: "/images/leadership/anil-mohapatra.jpeg",
      bio: "Secretary of Paschim Odisha Agrani Sangathan. Leading community mobilization, youth engagement, and public communications.",
      displayOrder: 4,
      isPublished: true,
    },
    {
      name: "Simanchal Patnaik",
      nameOdia: "ସୀମାଞ୍ଚଳ ପଟ୍ଟନାୟକ",
      designation: "Secretary",
      category: "GOVERNING_BODY",
      phone: "7008264805",
      imageUrl: null,
      bio: "Secretary of Paschim Odisha Agrani Sangathan. Facilitating cultural coordination and event planning across Western Odisha diaspora.",
      displayOrder: 5,
      isPublished: true,
    },
    {
      name: "Srutakirti Tripathy",
      nameOdia: "ଶ୍ରୁତକୀର୍ତ୍ତି ତ୍ରିପାଠୀ",
      designation: "Secretary",
      category: "GOVERNING_BODY",
      phone: "6370516478",
      imageUrl: "/images/leadership/srutakirti-tripathy.jpeg",
      bio: "Secretary of Paschim Odisha Agrani Sangathan. Spearheading cultural programs, Sambalpuri handloom exhibitions, and literature initiatives.",
      displayOrder: 6,
      isPublished: true,
    },
    {
      name: "Sri Nitin Ananda",
      nameOdia: "ଶ୍ରୀ ନିତିନ ଆନନ୍ଦ",
      designation: "Secretary",
      category: "GOVERNING_BODY",
      phone: "7008806969",
      imageUrl: "/images/leadership/nitin-ananda.jpeg",
      bio: "Secretary of Paschim Odisha Agrani Sangathan. Managing media relations, documentation, and stakeholder outreach.",
      displayOrder: 7,
      isPublished: true,
    },
    {
      name: "Lokesh Kumar Jagat",
      nameOdia: "ଲୋକନାଥ ଜଗତ",
      designation: "Treasurer",
      category: "GOVERNING_BODY",
      phone: "7609050398",
      imageUrl: "/images/leadership/lokesh-kumar-jagat.jpeg",
      bio: "Treasurer of Paschim Odisha Agrani Sangathan. Maintaining institutional financial transparency, audited statements, and statutory compliance.",
      displayOrder: 8,
      isPublished: true,
    },
    {
      name: "Raj Kumar Das",
      nameOdia: "ରାଜ କୁମାର ଦାସ",
      designation: "Project Coordinator",
      category: "GOVERNING_BODY",
      phone: "7008609014",
      imageUrl: "/images/leadership/raj-kumar-dash.jpeg",
      bio: "Project Coordinator of Paschim Odisha Agrani Sangathan. Overseeing execution of the Maa Samalei Mandir Project blueprint and volunteer logistics.",
      displayOrder: 9,
      isPublished: true,
    },

    // --- EXECUTIVE BODY ---
    {
      name: "Sri Sadananda Bhoi",
      nameOdia: "ଶ୍ରୀ ସଦାନନ୍ଦ ଭୋଇ",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "9040434347",
      imageUrl: "/images/leadership/sadananda-bhoi.jpeg",
      bio: "Elected Executive Member contributing to organizational initiatives and Western Odisha student welfare in Bhubaneswar.",
      displayOrder: 10,
      isPublished: true,
    },
    {
      name: "Smt Brajeswari Behera",
      nameOdia: "ଶ୍ରୀମତୀ ବ୍ରଜେଶ୍ୱରୀ ବେହେରା",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "8895179419",
      imageUrl: null,
      bio: "Elected Executive Member championing women empowerment and Western Odia artisanal preservation.",
      displayOrder: 11,
      isPublished: true,
    },
    {
      name: "Smt. Srutishikha Mahapatra",
      nameOdia: "ଶ୍ରୀମତୀ ଶ୍ରୁତିଶିଖା ମହାପାତ୍ର",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "9438337890",
      imageUrl: "/images/leadership/srutishikha-mahapatra.jpeg",
      bio: "Elected Executive Member representing cultural education and social service programs.",
      displayOrder: 12,
      isPublished: true,
    },
    {
      name: "Smt. Suryasnata Bohidar",
      nameOdia: "ଶ୍ରୀମତୀ ସୂର୍ଯ୍ୟସ୍ନାତା ବହିଦାର",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "8908774862",
      imageUrl: "/images/leadership/suryasnata-bohidar.jpeg",
      bio: "Elected Executive Member active in community gatherings, festive organizing, and social solidarity.",
      displayOrder: 13,
      isPublished: true,
    },
    {
      name: "Sri Santosh Kumbhar",
      nameOdia: "ଶ୍ରୀ ସନ୍ତୋଷ କୁମ୍ଭାର",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "6370714880",
      imageUrl: null,
      bio: "Elected Executive Member assisting with ground events, volunteer groups, and community outreach.",
      displayOrder: 14,
      isPublished: true,
    },
    {
      name: "Sri Chandra Sekhar Sahoo",
      nameOdia: "ଶ୍ରୀ ଚନ୍ଦ୍ରଶେଖର ସାହୁ",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "9439600005",
      imageUrl: "/images/leadership/chandra-sekhar-sahoo.jpeg",
      bio: "Elected Executive Member engaged in membership campaigns and community relations across the capital.",
      displayOrder: 15,
      isPublished: true,
    },
    {
      name: "Sri Samir Patel",
      nameOdia: "ଶ୍ରୀ ସମୀର କୁମାର ପଟେଲ",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "7978284334",
      imageUrl: "/images/leadership/samir-patel.jpeg",
      bio: "Elected Executive Member coordinating logistics and diaspora network programs.",
      displayOrder: 16,
      isPublished: true,
    },
    {
      name: "Sri Hrusikesh Pradhan",
      nameOdia: "ଶ୍ରୀ ହୃଷୀକେଶ ପ୍ରଧାନ",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "8658430326",
      imageUrl: "/images/leadership/hrusikesh-pradhan.jpeg",
      bio: "Elected Executive Member dedicated to organizational strengthening and community support.",
      displayOrder: 17,
      isPublished: true,
    },
    {
      name: "Sri Bamadev Baghar",
      nameOdia: "ଶ୍ରୀ ବାମଦେବ ବଘାର",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "9938137175",
      imageUrl: "/images/leadership/bamadev-baghar.jpeg",
      bio: "Elected Executive Member participating in executive meetings and community advocacy.",
      displayOrder: 18,
      isPublished: true,
    },
    {
      name: "Sri Chirag Rath",
      nameOdia: "ଶ୍ରୀ ଚିରାଗ ଚନ୍ଦ୍ର ରଥ",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "8895394188",
      imageUrl: "/images/leadership/chirag-rath.jpeg",
      bio: "Elected Executive Member supporting digital communication, youth chapters, and volunteer teams.",
      displayOrder: 19,
      isPublished: true,
    },
  ];

  for (const person of officeBearersData) {
    const existing = await prisma.officeBearer.findFirst({ where: { name: person.name } });
    if (!existing) {
      await prisma.officeBearer.create({ data: person });
    } else {
      await prisma.officeBearer.update({ where: { id: existing.id }, data: person });
    }
  }
  console.log("Official POAS Office Bearers seeded:", officeBearersData.length);

  // 3. Seed Meetings and Activities
  const meetingsData = [
    {
      title: "Consultative Deliberation with Hon'ble MLA Sri Prasanna Acharya",
      slug: "meeting-with-mla-prasanna-acharya",
      date: new Date("2026-10-18T11:00:00Z"),
      location: "Bhubaneswar, Odisha",
      participants: "Hon'ble MLA Sri Prasanna Acharya, POAS Governing Body & Senior Cultural Advisors",
      description: "A meeting was held with the Hon’ble MLA, Sri Prasanna Acharya, during which detailed discussions took place regarding the forthcoming Nuakhai Bhetghat of Paschim Odisha Agrani Sangathan and the proposed construction of Maa Samaleswari Temple in Bhubaneswar, including possible ways and initiatives to take the temple project forward.",
      coverImage: "/images/meetings/meeting-prasanna-acharya.jpeg",
      images: JSON.stringify([
        "/images/meetings/meeting-prasanna-acharya.jpeg",
        "/images/events/samalei-fellowship-hall.jpeg",
        "/images/events/poas-committee-review.jpeg"
      ]),
      isPublished: true,
      displayOrder: 1,
    },
    {
      title: "Strategic Session with Hon'ble Minister Shri Suresh Pujari",
      slug: "meeting-with-minister-suresh-pujari",
      date: new Date("2026-10-24T10:15:00Z"),
      location: "Official Residence / Secretariat, Bhubaneswar",
      participants: "Hon'ble Minister Shri Suresh Pujari, Newly Elected Representatives of POAS",
      description: "Hon'ble Minister Shri Suresh Pujari invited the newly elected representatives of Paschim Odisha Agrani Sangathan for an important deliberation on institutional growth, community service programs, and advancing welfare projects for the Western Odisha diaspora residing in the state capital.",
      coverImage: "/images/meetings/meeting-suresh-pujari.jpeg",
      images: JSON.stringify([
        "/images/meetings/meeting-suresh-pujari.jpeg",
        "/images/events/cultural-mandap-gathering.jpeg"
      ]),
      isPublished: true,
      displayOrder: 2,
    },
    {
      title: "Consultative Dialogue with Shri Sarat Pattnayak, Ex PCC President",
      slug: "meeting-with-sarat-pattnayak",
      date: new Date("2026-11-02T16:00:00Z"),
      location: "Bhubaneswar, Odisha",
      participants: "Shri Sarat Pattnayak (Ex PCC President, Odisha), POAS Secretariat Delegation",
      description: "High-level interactive dialogue with respected public leader Shri Sarat Pattnayak on expanding socio-cultural infrastructure, fostering community solidarity among families from Western Odisha, and enlisting broad civic support for the Maa Samalei Cultural Complex.",
      coverImage: "/images/meetings/meeting-sarat-pattnayak.jpeg",
      images: JSON.stringify([
        "/images/meetings/meeting-sarat-pattnayak.jpeg"
      ]),
      isPublished: true,
      displayOrder: 3,
    },
    {
      title: "Legislative Outreach with Shri Saroj Kumar Pradhan, Hon'ble MLA, Boudh",
      slug: "meeting-with-mla-saroj-pradhan-boudh",
      date: new Date("2026-10-10T14:30:00Z"),
      location: "Bhubaneswar, Odisha",
      participants: "Shri Saroj Kumar Pradhan (Hon'ble MLA, Boudh), POAS Office Bearers",
      description: "Meaningful consultative meeting with Hon'ble MLA of Boudh Shri Saroj Kumar Pradhan on grassroots cultural representation, ensuring active participation from Boudh district residents, and ratifying community developmental agendas.",
      coverImage: "/images/meetings/meeting-saroj-pradhan.jpeg",
      images: JSON.stringify([
        "/images/meetings/meeting-saroj-pradhan.jpeg"
      ]),
      isPublished: true,
      displayOrder: 4,
    },
    {
      title: "High-Level Mandir Consultation with Shri Kalikesh Singh Deo, Hon'ble MLA, Balangir",
      slug: "meeting-with-mla-kalikesh-singh-deo-balangir",
      date: new Date("2026-09-28T12:00:00Z"),
      location: "Bhubaneswar, Odisha",
      participants: "Shri Kalikesh Narayan Singhdeo (Hon'ble MLA, Balangir), POAS Governing Body",
      description: "A meeting of great significance held with the Hon’ble MLA of Balangir, Shri Kalikesh Singh Deo. Detailed matters were discussed, particularly the proposed construction of Maa Samalei Temple in Bhubaneswar, the growth and institutional development of POAS, and the grand annual Nuakhai Bhetghat celebration.",
      coverImage: "/images/meetings/meeting-kalikesh-singh-deo.jpeg",
      images: JSON.stringify([
        "/images/meetings/meeting-kalikesh-singh-deo.jpeg",
        "/images/events/samalei-fellowship-hall.jpeg"
      ]),
      isPublished: true,
      displayOrder: 5,
    },
    {
      title: "Cultural Heritage Review with Shri Jaynarayan Mishra, Hon'ble MLA, Sambalpur",
      slug: "meeting-with-mla-jaynarayan-mishra-sambalpur",
      date: new Date("2026-09-20T17:00:00Z"),
      location: "Bhubaneswar, Odisha",
      participants: "Shri Jaynarayan Mishra (Hon'ble MLA, Sambalpur), POAS Working Committee",
      description: "Comprehensive review session with senior leader and patron Shri Jaynarayan Mishra on preserving authentic Sambalpuri folk traditions, Panchabadya performances, and coordinating logistical arrangements with municipal authorities for large-scale community gatherings in the capital.",
      coverImage: "/images/meetings/meeting-jaynarayan-mishra.jpeg",
      images: JSON.stringify([
        "/images/meetings/meeting-jaynarayan-mishra.jpeg"
      ]),
      isPublished: true,
      displayOrder: 6,
    },
  ];

  for (const m of meetingsData) {
    const existing = await prisma.meeting.findUnique({ where: { slug: m.slug } });
    if (!existing) {
      await prisma.meeting.create({ data: m });
    } else {
      await prisma.meeting.update({ where: { slug: m.slug }, data: m });
    }
  }
  console.log("Documented POAS Meetings seeded:", meetingsData.length);

  // 4. Seed Multi-Image Event for Instagram-style Carousel
  const event = await prisma.event.upsert({
    where: { slug: "nuakhai-vetaghat-bhubaneswar-2026" },
    update: {
      title: "POAS Nuakhai Bhetghat 2026",
      images: JSON.stringify([
        "/images/hero/nuakhai-ceremony-hero.jpeg",
        "/images/events/samalei-fellowship-hall.jpeg",
        "/images/events/poas-committee-review.jpeg",
        "/images/events/cultural-mandap-gathering.jpeg",
        "/images/meetings/meeting-prasanna-acharya.jpeg",
        "/images/meetings/meeting-kalikesh-singh-deo.jpeg",
        "/images/posters/nuakhai-event-poster-2026.jpeg"
      ]),
    },
    create: {
      title: "POAS Nuakhai Bhetghat 2026",
      slug: "nuakhai-vetaghat-bhubaneswar-2026",
      description: "The grand annual celebration of Western Odisha's sacred harvest festival by Paschim Odisha Agrani Sangathan, bringing together families and diaspora in Bhubaneswar for Nabanna, cultural performances, and traditional greetings.",
      fullDetails: "Nuakhai is more than a harvest festival; it is a sacred social covenant of gratitude, reconciliation, and togetherness. Nuakhai Bhetghat 2026 organized by Paschim Odisha Agrani Sangathan features traditional Sambalpuri Panchabadya, devotional prayers to Maa Samaleswari, ceremonial Nabanna offering, Sambalpuri folk music and dance performances, and community feast.",
      venue: "POAS Cultural Grounds, Bhubaneswar, Odisha",
      location: "Bhubaneswar, Odisha",
      eventDate: new Date("2026-09-26T10:00:00Z"),
      startTime: "10:00 AM",
      endTime: "08:30 PM",
      bannerImage: "/images/hero/nuakhai-ceremony-hero.jpeg",
      images: JSON.stringify([
        "/images/hero/nuakhai-ceremony-hero.jpeg",
        "/images/events/samalei-fellowship-hall.jpeg",
        "/images/events/poas-committee-review.jpeg",
        "/images/events/cultural-mandap-gathering.jpeg",
        "/images/meetings/meeting-prasanna-acharya.jpeg",
        "/images/meetings/meeting-kalikesh-singh-deo.jpeg",
        "/images/posters/nuakhai-event-poster-2026.jpeg"
      ]),
      isPublished: true,
      registrationOpen: true,
      maxAttendees: 2500,
    },
  });
  console.log("Event seeded with multi-image gallery:", event.title);

  // 5. Seed Site Settings (Complete POAS Rebranding & 10+ Districts & Two-Tier Membership)
  const settingsData = [
    { key: "site_name", value: "POAS – Paschim Odisha Agrani Sangathana", description: "Official Website Name" },
    { key: "hero_odia_title", value: "ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନ, ଭୁବନେଶ୍ୱର", description: "Odia Hero Headline" },
    { key: "hero_english_title", value: "POAS – Paschim Odisha Agrani Sangathana", description: "English Hero Title" },
    { key: "hero_tagline", value: "ସଂସ୍କୃତି · ସମାଜ · ସେବା — Culture · Community · Service", description: "Hero Eyebrow Tagline" },
    { key: "hero_description", value: "Over 30 years of cultural heritage, community solidarity, and social service. Paschim Odisha Agrani Sangathan brings together the people and diaspora of Western Odisha living in Bhubaneswar to preserve our identity and build a shared future.", description: "Hero Subhead Description" },
    { key: "districts_stat", value: "10+ Districts", description: "District Representation Statistic" },
    { key: "members_stat", value: "10,000+", description: "Enrolled Community Members" },
    { key: "years_stat", value: "30+", description: "Years of Cultural Heritage" },
    { key: "membership_lifetime_fee", value: "₹1,000", description: "Lifetime Membership Fee" },
    { key: "membership_yearly_fee", value: "₹100", description: "Yearly Membership Fee" },
    { key: "contact_email", value: "poasbhubaneswar@gmail.com", description: "Official Secretariat Email" },
    { key: "contact_phone", value: "+91 94390 11880", description: "Primary Phone Number (President)" },
    { key: "contact_phones_additional", value: "+91 94371 50112, 97760 16210, 90048 30541, 76090 50398", description: "Additional Helpline Numbers" },
    { key: "contact_whatsapp", value: "+919439011880", description: "Official WhatsApp Number" },
    { key: "headquarters_address", value: "Plot No. A-31, Kharabela Nagar, Bhubaneswar, Odisha", description: "Secretariat Headquarters" },
    { key: "venue_city", value: "Bhubaneswar, Odisha, India", description: "Headquarters City" },
    { key: "maa_samalei_visible", value: "true", description: "Show Maa Samalei Darshan on Homepage" },
  ];

  for (const s of settingsData) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("Site settings seeded with official POAS branding & fees.");

  console.log("All POAS database seed operations completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
