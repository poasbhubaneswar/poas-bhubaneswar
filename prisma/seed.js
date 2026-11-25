const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding POAS – Paschim Odisha Agrani Sangathana database...");

  // 1. Create Default Super Admin Accounts
  const hashedPassword = await bcrypt.hash("POAS@2026!Admin", 10);
  const adminEmails = [
    "admin@poasbhubaneswar.org",
    "poasbhubaneswar@gmail.com",
    "admin@nuakhaivetaghat.org",
  ];

  for (const email of adminEmails) {
    await prisma.user.upsert({
      where: { email },
      update: { passwordHash: hashedPassword },
      create: {
        email,
        name: "POAS Super Administrator",
        passwordHash: hashedPassword,
        role: "SUPER_ADMIN",
      },
    });
    console.log("Admin account synchronized:", email);
  }

  // 2. Seed Official POAS Leadership, Advisors & Governing Body
  await prisma.officeBearer.deleteMany({});

  const officeBearersData = [
    // =========================================================================
    // 1. BOARD OF ADVISORS / LEADERSHIP (According to POAS LH.pdf)
    // =========================================================================
    {
      name: "Dr. Prabhash Ku. Singh",
      nameOdia: "ଡ଼ ପ୍ରଭାସ କୁମାର ସିଂହ",
      designation: "Advisor (Ex-MP)",
      category: "ADVISORY_COUNCIL",
      phone: null,
      imageUrl: "/images/leadership/dr-prabhash-kumar-singh.jpeg",
      bio: "Advisor to Paschim Odisha Agrani Sangathan. Former Member of Parliament (Ex-MP), providing strategic vision, legislative counsel, and patron guidance.",
      displayOrder: 1,
      isPublished: true,
    },
    {
      name: "Shri Bijaya Kumar Joshi",
      nameOdia: "ଶ୍ରୀ ବିଜୟ କୁମାର ଯୋଶୀ",
      designation: "Advisor (Retd. IRTS)",
      category: "ADVISORY_COUNCIL",
      phone: null,
      imageUrl: "/images/leadership/bijaya-kumar-joshi.jpeg",
      bio: "Advisor to Paschim Odisha Agrani Sangathan. Retired Indian Railway Traffic Service (IRTS) officer, guiding organizational governance and administrative outreach.",
      displayOrder: 2,
      isPublished: true,
    },
    {
      name: "Shri Amiya Mohanty",
      nameOdia: "ଶ୍ରୀ ଅମିୟ ମହାନ୍ତି",
      designation: "Advisor (Retd. Banker)",
      category: "ADVISORY_COUNCIL",
      phone: null,
      imageUrl: "/images/leadership/amiya-mohanty.jpeg",
      bio: "Advisor to Paschim Odisha Agrani Sangathan. Retired senior banking executive, providing expert oversight on financial integrity and fiscal governance.",
      displayOrder: 3,
      isPublished: true,
    },
    {
      name: "Shri Suresh Ku. Mahapatra",
      nameOdia: "ଶ୍ରୀ ସୁରେଶ କୁମାର ମହାପାତ୍ର",
      designation: "Advisor (Retd. Banker)",
      category: "ADVISORY_COUNCIL",
      phone: null,
      imageUrl: "/images/leadership/suresh-kumar-mahapatra.jpeg",
      bio: "Advisor to Paschim Odisha Agrani Sangathan. Retired banker, counseling the Sangathan on institutional endowments and capital execution for the Maa Samalei Mandir Project.",
      displayOrder: 4,
      isPublished: true,
    },
    {
      name: "Shri Mihir Ku. Meher",
      nameOdia: "ଶ୍ରୀ ମିହିର କୁମାର ମେହେର",
      designation: "Advisor (Theater Artist)",
      category: "ADVISORY_COUNCIL",
      phone: null,
      imageUrl: "/images/leadership/mihir-kumar-meher.jpeg",
      bio: "Cultural Advisor to Paschim Odisha Agrani Sangathan. Acclaimed Sambalpuri theater exponent and performing artist, stewarding folk arts, drama, and heritage promotion.",
      displayOrder: 5,
      isPublished: true,
    },

    // =========================================================================
    // 2. GOVERNING BODY (According to NEWLY ELECTED GOVERNING BODY.docx & POAS LH.pdf)
    // =========================================================================
    {
      name: "Shri Sanjeeb Mishra",
      nameOdia: "ଶ୍ରୀ ସଞ୍ଜୀବ କୁମାର ମିଶ୍ର",
      designation: "President (Advocate)",
      category: "GOVERNING_BODY",
      phone: "9439011880",
      imageUrl: "/images/leadership/sanjeeb-kumar-mishra.jpeg",
      bio: "President of Paschim Odisha Agrani Sangathan (POAS). Advocate leading legal governance, constitutional administration, and spearheading the landmark Maa Samalei Mandir Project in Bhubaneswar.",
      displayOrder: 6,
      isPublished: true,
    },
    {
      name: "Shri Ashutosh Hota",
      nameOdia: "ଶ୍ରୀ ଆଶୁତୋଷ ହୋତା",
      designation: "Working President / Vice-President (Advocate)",
      category: "GOVERNING_BODY",
      phone: "9776016210",
      imageUrl: "/images/leadership/ashutosh-hota.jpeg",
      bio: "Working President & Vice-President of Paschim Odisha Agrani Sangathan. Eminent Advocate guiding operational leadership, executive deliberations, and strategic alliance building.",
      displayOrder: 7,
      isPublished: true,
    },
    {
      name: "Shri Dukhi Shyam Bhanja",
      nameOdia: "ଶ୍ରୀ ଦୁଃଖୀଶ୍ୟାମ ଭଞ୍ଜ",
      designation: "Secretary General (Social Worker)",
      category: "GOVERNING_BODY",
      phone: "9437150112",
      imageUrl: "/images/leadership/dukhishyam-bhanja.jpeg",
      bio: "Secretary General of Paschim Odisha Agrani Sangathan. Dedicated Social Worker directing secretariat affairs, statewide member coordination, and executive council deliberations.",
      displayOrder: 8,
      isPublished: true,
    },
    {
      name: "Shri Anil Kumar Mahapatra",
      nameOdia: "ଅନିଲ କୁମାର ମହାପାତ୍ର",
      designation: "Secretary (Corporate Leader)",
      category: "GOVERNING_BODY",
      phone: "9004830541",
      imageUrl: "/images/leadership/anil-mohapatra.jpeg",
      bio: "Secretary of Paschim Odisha Agrani Sangathan. Corporate Leader stewarding operational planning, corporate outreach, and youth mentorship.",
      displayOrder: 9,
      isPublished: true,
    },
    {
      name: "Shri Simanchal Patnaik",
      nameOdia: "ସୀମାଞ୍ଚଳ ପଟ୍ଟନାୟକ",
      designation: "Secretary (Sr. Journalist)",
      category: "GOVERNING_BODY",
      phone: "7008264805",
      imageUrl: "/images/leadership/simanchal-patnaik.jpeg",
      bio: "Secretary of Paschim Odisha Agrani Sangathan. Senior Journalist directing press relations, publications, cultural documentation, and diaspora outreach.",
      displayOrder: 10,
      isPublished: true,
    },
    {
      name: "Smt. Srutakirti Tripathy",
      nameOdia: "ଶ୍ରୁତକୀର୍ତ୍ତି ତ୍ରିପାଠୀ",
      designation: "Secretary (Writer)",
      category: "GOVERNING_BODY",
      phone: "6370516478",
      imageUrl: "/images/leadership/srutakirti-tripathy.jpeg",
      bio: "Secretary of Paschim Odisha Agrani Sangathan. Acclaimed Writer spearheading Sambalpuri literature, handloom heritage, and cultural programming.",
      displayOrder: 11,
      isPublished: true,
    },
    {
      name: "Er. Nitin Anand",
      nameOdia: "ଶ୍ରୀ ନିତିନ ଆନନ୍ଦ",
      designation: "Secretary (Consultant)",
      category: "GOVERNING_BODY",
      phone: "7008806969",
      imageUrl: "/images/leadership/nitin-ananda.jpeg",
      bio: "Secretary of Paschim Odisha Agrani Sangathan. Professional Engineering Consultant directing media architecture, institutional documentation, and digital outreach.",
      displayOrder: 12,
      isPublished: true,
    },
    {
      name: "Shri Lokanath Jagat",
      nameOdia: "ଲୋକନାଥ ଜଗତ",
      designation: "Treasurer (Ph.D Scholar)",
      category: "GOVERNING_BODY",
      phone: "7609050398",
      imageUrl: "/images/leadership/lokesh-kumar-jagat.jpeg",
      bio: "Treasurer of Paschim Odisha Agrani Sangathan. Ph.D Research Scholar ensuring strict financial transparency, audited compliance, and budgetary control.",
      displayOrder: 13,
      isPublished: true,
    },
    {
      name: "Er. Rajkumar Dash",
      nameOdia: "ରାଜ କୁମାର ଦାଶ",
      designation: "Secretary (Coordinator)",
      category: "GOVERNING_BODY",
      phone: "7008609014",
      imageUrl: "/images/leadership/raj-kumar-dash.jpeg",
      bio: "",
      displayOrder: 14,
      isPublished: true,
    },

    // =========================================================================
    // 3. EXECUTIVE BODY (According to NEWLY ELECTED GOVERNING BODY.docx Table 2)
    // =========================================================================
    {
      name: "Sri Sadananda Bhoi",
      nameOdia: "ଶ୍ରୀ ସଦାନନ୍ଦ ଭୋଇ",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "9040434347",
      imageUrl: "/images/leadership/sadananda-bhoi.jpeg",
      bio: "Elected Executive Member contributing to organizational initiatives and Western Odisha student welfare in Bhubaneswar.",
      displayOrder: 15,
      isPublished: true,
    },
    {
      name: "Smt Brajeswari Behera",
      nameOdia: "ଶ୍ରୀମତୀ ବ୍ରଜେଶ୍ୱରୀ ବେହେରା",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "8895179419",
      imageUrl: "/images/leadership/brajeswari-behera.jpeg",
      bio: "Elected Executive Member championing women empowerment and Western Odia artisanal preservation.",
      displayOrder: 16,
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
      displayOrder: 17,
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
      displayOrder: 18,
      isPublished: true,
    },
    {
      name: "Sri Santosh Kumbhar",
      nameOdia: "ଶ୍ରୀ ସନ୍ତୋଷ କୁମ୍ଭାର",
      designation: "Executive Member",
      category: "EXECUTIVE_BODY",
      phone: "6370714880",
      imageUrl: "/images/leadership/santosh-kumbhar.png",
      bio: "Elected Executive Member assisting with ground events, volunteer groups, and community outreach.",
      displayOrder: 19,
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
      displayOrder: 20,
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
      displayOrder: 21,
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
      displayOrder: 22,
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
      displayOrder: 23,
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
      displayOrder: 24,
      isPublished: true,
    },
  ];

  for (const person of officeBearersData) {
    await prisma.officeBearer.create({ data: person });
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
      eventDate: new Date("2026-11-29T10:30:00Z"),
      startTime: "10:30 AM onwards",
      endTime: "08:30 PM",
      venue: "Adivasi Ground, Unit-1, Bhubaneswar",
      location: "Bhubaneswar, Odisha",
      bannerImage: "/images/events/nuakhai-bhetghat-29-november-poster.jpeg",
      images: JSON.stringify([
        "/images/events/nuakhai-bhetghat-29-november-poster.jpeg",
        "/images/hero/nuakhai-ceremony-hero.jpeg",
        "/images/events/samalei-fellowship-hall.jpeg",
        "/images/events/poas-committee-review.jpeg",
      ]),
    },
    create: {
      title: "POAS Nuakhai Bhetghat 2026",
      slug: "nuakhai-vetaghat-bhubaneswar-2026",
      description: "The grand annual celebration of Western Odisha's sacred harvest festival by Paschim Odisha Agrani Sangathan, bringing together families and diaspora in Bhubaneswar for Nabanna, cultural performances, and traditional greetings.",
      fullDetails: "Nuakhai is more than a harvest festival; it is a sacred social covenant of gratitude, reconciliation, and togetherness. Nuakhai Bhetghat 2026 organized by Paschim Odisha Agrani Sangathan features traditional Sambalpuri Panchabadya, devotional prayers to Maa Samaleswari, ceremonial Nabanna offering, Sambalpuri folk music and dance performances, and community feast.",
      venue: "Adivasi Ground, Unit-1, Bhubaneswar",
      location: "Bhubaneswar, Odisha",
      eventDate: new Date("2026-11-29T10:30:00Z"),
      startTime: "10:30 AM onwards",
      endTime: "08:30 PM",
      bannerImage: "/images/events/nuakhai-bhetghat-29-november-poster.jpeg",
      images: JSON.stringify([
        "/images/events/nuakhai-bhetghat-29-november-poster.jpeg",
        "/images/hero/nuakhai-ceremony-hero.jpeg",
        "/images/events/samalei-fellowship-hall.jpeg",
        "/images/events/poas-committee-review.jpeg",
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
    { key: "contact_email", value: "poasbhubaneswar@gmail.com", description: "Official Secretariat Email" },
    { key: "contact_phone", value: "+91 94390 11880", description: "Primary Phone Number (President)" },
    { key: "contact_phones_additional", value: "+91 94371 50112, 97760 16210, 90048 30541, 76090 50398", description: "Additional Helpline Numbers" },
    { key: "contact_whatsapp", value: "+919439011880", description: "Official WhatsApp Number" },
    { key: "social_youtube", value: "https://youtube.com/@paschimodishaagranisangathan?si=pTMx3VsSYCetqLVy", description: "Official YouTube Channel" },
    { key: "social_instagram", value: "https://www.instagram.com/poasbhubaneswar?utm_source=ig_web_button_share_sheet&avpt=ZDNlZDc0MzIxNw==", description: "Official Instagram Handle" },
    { key: "social_facebook", value: "https://www.facebook.com/share/1Hmnao1fAj/", description: "Official Facebook Page" },
    { key: "headquarters_address", value: "Plot No.: 71, Satabdi Nagar, Bhubaneswar, PIN-751003, Dist.: Khordha, Odisha", description: "Official Registered Secretariat Address (POAS LH.pdf)" },
    { key: "registration_number", value: "REGD. NO.: KRD 6761-443, 95-96", description: "Official Registration Number (POAS LH.pdf)" },
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
