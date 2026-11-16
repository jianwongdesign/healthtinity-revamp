// =====================================================================
// Healthtinity: site content
// All copy below is taken from the current healthtinity.com (Nov 2026).
// English only. Chinese lives in zh.mjs; schedule names carry both (split at build).
// Edit here, then run `npm run build`.
// =====================================================================

// Booking engine (Rezerv). If booking moves to a subdomain at launch
// (e.g. https://book.healthtinity.com), change it here only.
export const BOOK = 'https://healthtinity.com';

// Public address of this website, used for share links (Open Graph) and canonical URLs.
// Build with SITE_URL=https://healthtinity.com/ at launch.
export const SITE_URL = (process.env.SITE_URL || 'https://jianwongdesign.github.io/healthtinity-revamp/').replace(/\/?$/, '/');

export const site = {
  name: 'Healthtinity',
  legalName: 'Healthtinity Adventures Pte Ltd',
  reg: '202222312D',
  tagline: "Singapore's First Boutique Yoga, Pilates & Rehab Therapy Studio",
  phone: '+65 8282 9515',
  phoneHref: 'tel:+6582829515',
  email: 'ask@healthtinity.com',
  address: ['246J Upper Thomson Road', 'Singapore 574370'],
  room: 'Courage Studio',
  whatsapp: 'https://wa.me/6582829515',
  social: {
    instagram: 'https://www.instagram.com/healthtinity/',
    facebook: 'https://www.facebook.com/healthtinity',
    tiktok: 'https://www.tiktok.com/@healthtinity',
  },
  apps: {
    ios: 'https://apps.apple.com/sg/app/ht-life/id6797768622',
    android: 'https://play.google.com/store/apps/details?id=com.rezerv.branded.healthtinity',
  },
  links: {
    packages: `${BOOK}/package`,
    memberships: `${BOOK}/membership`,
    schedule: `${BOOK}/timetable`,
  },
  getting: [
    ['🚆', '1 min walk from Upper Thomson MRT (Exit 3)'],
    ['🚌', 'Bus services 52, 130, 132, 162, 163, 165, 166, 167, 410G, 855 & 980 stop nearby'],
    ['🚗', 'Free roadside parking along Upper Thomson Road (subject to availability)'],
  ],
};

export const wa = (text) => `${site.whatsapp}?text=${encodeURIComponent(text)}`;

// ---------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------
export const packages = [
  {
    name: 'Starter Pack',
    sub: 'Trial: 5 Group Classes',
    price: 60,
    credits: '5 class credits',
    validity: 'Valid for 30 days from date of purchase',
    perks: ['Perfect first step for new members', 'Bonus $22 HT Wallet credit when you buy in the HT Life app'],
    badge: 'New members',
  },
  {
    name: '15 Class Pack',
    sub: '2026 Year End Holiday Promotion',
    price: 420,
    credits: '15 class credits',
    validity: 'Valid for 4 months from date of purchase',
    perks: ['Holiday promotion'],
    badge: 'Holiday promo',
  },
  {
    name: '20 + 6 Class Pack',
    price: 650,
    credits: '26 class credits',
    validity: 'Valid for 6 months from date of first booking',
    perks: ['6 bonus classes', 'Shareable'],
  },
  {
    name: '35 + 10 Class Pack',
    price: 990,
    credits: '45 class credits',
    validity: 'Valid for 8 months from date of first booking',
    perks: ['10 bonus classes', 'Shareable'],
    featured: true,
    badge: 'Most popular',
  },
  {
    name: '60 + 20 Class Pack',
    price: 1328,
    credits: '80 class credits',
    validity: 'Valid for 12 months from date of first booking',
    perks: ['20 bonus classes', 'Shareable', 'Best value per class'],
  },
];

export const membershipsUpfront = [
  {
    name: '3 Months Unlimited',
    sub: 'Holiday Promo: $198 / month',
    price: 594,
    billing: 'One-time payment',
    validity: 'Valid for 3 months',
    perks: ['Unlimited group classes'],
    featured: true,
    badge: 'Holiday promo',
  },
  {
    name: '6 + 1 Months Unlimited',
    sub: 'Non-shareable',
    price: 1260,
    billing: 'One-time payment',
    validity: 'Valid for 7 months',
    perks: ['Unlimited group classes', '1 bonus month'],
  },
];

export const membershipsRecurring = [
  {
    name: 'Weekly Unlimited',
    price: 138,
    per: '2 weeks',
    billing: 'Auto-renews every 2 weeks',
    validity: 'Valid till cancelled',
    perks: ['Unlimited group classes', 'No long-term commitment'],
  },
  {
    name: '6 Months Unlimited',
    price: 228,
    per: 'month',
    billing: 'Auto-renews monthly',
    validity: '6-month minimum commitment',
    perks: ['Unlimited group classes'],
    note: 'S$350 cancellation fee before minimum commitment ends',
  },
  {
    name: '12 Months Unlimited',
    price: 198,
    per: 'month',
    billing: 'Auto-renews monthly',
    validity: '12-month minimum commitment',
    perks: ['Unlimited group classes'],
    note: 'S$350 cancellation fee before minimum commitment ends',
    featured: true,
    badge: 'Great value',
  },
  {
    name: '18 Months Unlimited',
    price: 162,
    per: 'month',
    billing: 'Auto-renews monthly',
    validity: '18-month minimum commitment',
    perks: ['Unlimited group classes', 'Lowest monthly rate'],
    note: 'S$350 cancellation fee before minimum commitment ends',
  },
];

export const topups = [
  { pay: 90, bonus: 10 },
  { pay: 200, bonus: 20 },
  { pay: 500, bonus: 50 },
];

// ---------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------
export const team = [
  {
    slug: 'kai',
    name: 'Dr Kai',
    role: 'Founder · Master Therapist & Lead Coach',
    skills: "Founder of Singapore's First Yoga Rehab Therapy Studio | Doctor of Osteopathy | Master Therapist | Lead Coach",
    photo: 'kai.jpg',
    lead: true,
    bio: [
      'With over a decade of experience in movement rehabilitation and holistic health, Kai is the Master Therapist and Lead Coach at Healthtinity. As a Doctor of Osteopathy, he combines evidence-informed osteopathic principles with Yoga Therapy, Pilates, functional movement, and manual therapy to help clients restore movement, reduce pain, and optimise physical performance.',
      'Kai specialises in treating chronic neck and back pain, scoliosis, sciatica, sports injuries, postural dysfunction, joint mobility restrictions, and post-surgical rehabilitation. His approach focuses on identifying the root cause rather than simply managing symptoms, creating personalised treatment plans that empower clients to move with confidence and live pain-free.',
      "As the pioneer behind Healthtinity's signature Yoga Rehab Therapy methodology, Kai has helped thousands of individuals—from office professionals and athletes to seniors and stroke survivors—regain strength, mobility, and quality of life. His sessions seamlessly blend clinical expertise with compassionate coaching, making rehabilitation both effective and sustainable.",
      "Whether you're recovering from an injury, managing chronic pain, or striving to perform at your best, Kai is dedicated to helping you unlock your body's full potential.",
    ],
  },
  {
    slug: 'mary-low',
    name: 'Mary Low',
    role: 'Manager & Senior Coach',
    skills: 'Yoga, Therapy, Stretch, Private 1:1',
    photo: 'mary-low.jpg',
    lead: true,
    headline: 'Senior Yoga Teacher | Strength & Conditioning Coach | Rehab Therapist',
    bio: [
      'With over 5 years at Healthtinity, Mary has become one of our most trusted and experienced instructors. Known for her patient, encouraging and supportive teaching style, she is passionate about helping every individual move with confidence and reach their personal goals.',
      'Mary teaches a wide range of Yoga, Strength & Conditioning, and Rehab-inspired group classes, creating sessions that are suitable for beginners, regular practitioners and those looking to build strength, improve mobility or recover from injury.',
      'Beyond the group class setting, Mary is also a skilled Rehab Therapist, working closely with clients in private 1:1 sessions to manage pain, improve movement quality and restore function. She has experience supporting individuals with a variety of conditions, including back pain, neck and shoulder tension, hip and knee discomfort, posture-related issues, and mobility limitations.',
      "Whether you're joining her in a group class or seeking personalised therapy, Mary's goal is simple—to help you move better, feel stronger and live with less pain through safe, effective and sustainable movement.",
    ],
    specialties: [
      'Yoga (Beginner to Intermediate)',
      'Strength & Conditioning',
      'Rehab Therapy & Pain Management',
      'Mobility & Functional Movement',
      'Back, Neck & Shoulder Pain',
      'Hip & Knee Pain',
      'Postural Correction',
      'Private 1:1 Coaching & Therapy',
    ],
    quote: "Movement is medicine when it's guided with care, purpose and consistency.",
  },
  {
    slug: 'zenn-lim',
    name: 'Zenn Lim',
    role: 'Yoga Instructor',
    skills: 'Yoga',
    photo: 'zenn-lim.jpg',
    headline: 'Yoga Teacher | Hot Yoga Specialist | Vinyasa & Hatha Instructor',
    bio: [
      "Zenn is an energetic and passionate yoga teacher who brings positivity, enthusiasm and inspiration to every class she leads. Her vibrant teaching style, encouraging personality and infectious energy have made her one of Healthtinity's most loved instructors.",
      "She is experienced in teaching a wide variety of yoga styles, including Hot Yoga, Vinyasa, Hatha and Stretch & Mobility classes. Whether you're looking to build strength, improve flexibility, increase endurance or simply enjoy an uplifting practice, Zenn creates classes that leave you feeling stronger, refreshed and empowered.",
      'Her Hot Yoga classes are especially popular among members, known for their dynamic sequencing, motivating atmosphere and the perfect balance of challenge and enjoyment. Zenn encourages students to move with confidence, explore their potential and celebrate every step of their journey.',
      "Whether you're new to yoga or an experienced practitioner, Zenn's classes are designed to inspire you to push your limits while always moving with awareness and intention.",
    ],
  },
  {
    slug: 'pei-qing-yeo',
    name: 'Pei Qing Yeo',
    role: 'Yoga & Mat Pilates Instructor',
    skills: 'Yoga & Mat Pilates Teacher',
    photo: 'pei-qing-yeo.jpg',
    bio: [
      'Pei Qing is a dedicated Yoga and Mat Pilates instructor who believes movement should be accessible, enjoyable, and empowering for everyone. Fluent in both English and Mandarin, she creates a warm and welcoming environment where students of all backgrounds can practise with confidence.',
      "Her classes focus on building strength, flexibility, balance, posture, and body awareness through mindful movement and proper alignment. Whether you're stepping onto the mat for the first time or looking to deepen your practice, Pei Qing provides clear guidance and thoughtful modifications to help every student progress safely at their own pace.",
      'In addition to group classes, Pei Qing also offers personalised 1-to-1 sessions tailored to individual goals, including improving flexibility, building strength, enhancing mobility, refining technique, and supporting overall wellness. Her patient and encouraging teaching style makes her a favourite among beginners and experienced practitioners alike.',
      'With a passion for helping others move and feel better, Pei Qing is committed to inspiring every student to build confidence, develop healthy movement habits, and enjoy a lifelong journey of wellness.',
    ],
  },
  {
    slug: 'pin-yi-chiang',
    name: 'Pin Yi Chiang',
    role: 'Yoga Instructor',
    skills: 'Yoga Instructor',
    photo: 'pin-yi-chiang.jpg',
    bio: [
      'Pin Yi is a passionate Yoga Coach dedicated to helping students build strength, flexibility, and confidence through mindful movement. Fluent in both English and Mandarin, she creates an encouraging and inclusive environment where students of all levels can feel comfortable and supported throughout their practice.',
      'Her classes focus on proper alignment, breath awareness, mobility, balance, and functional movement, helping students develop a strong foundation while improving posture, flexibility, and overall well-being. With a calm and attentive teaching style, Pin Yi provides clear guidance and personalised modifications, ensuring every student can progress safely and effectively.',
      "In addition to group classes, Pin Yi also offers personalised 1-to-1 private yoga sessions tailored to individual goals. Whether you're looking to improve flexibility, build strength, deepen your yoga practice, enhance mobility, or simply move with greater confidence, she will create a programme designed specifically for your needs.",
      'Pin Yi believes yoga is a lifelong journey of self-discovery and wellness, and she is committed to helping every student move better, feel stronger, and live healthier.',
    ],
  },
  {
    slug: 'hasita-j',
    name: 'Hasita J',
    role: 'Yoga, Mat Pilates & Barre Instructor',
    skills: 'Yoga, Mat Pilates & Barre',
    photo: 'hasita-j.jpg',
    bio: [
      'Hasita is an energetic and passionate instructor specialising in Yoga, Mat Pilates, and Barre. She believes that movement should be both effective and enjoyable, creating classes that help students build strength, flexibility, balance, and confidence while having fun.',
      "Her teaching combines mindful movement with functional training, focusing on proper alignment, core stability, posture, and body awareness. Whether it's the graceful flow of yoga, the precision of Mat Pilates, or the dynamic energy of Barre, Hasita encourages every student to challenge themselves safely and progress at their own pace.",
      'Suitable for students of all fitness levels, her classes are welcoming, motivating, and thoughtfully designed with modifications for beginners and progressions for more experienced practitioners. With her positive energy and supportive coaching style, Hasita inspires students to move better, feel stronger, and enjoy every step of their wellness journey.',
    ],
  },
  {
    slug: 'daniel-ding',
    name: 'Daniel Ding',
    role: 'Yoga & Mat Pilates Instructor',
    skills: 'Yoga & Mat Pilates',
    photo: 'daniel-ding.jpg',
    bio: [
      'Daniel is a dedicated Yoga and Mat Pilates instructor who is passionate about helping students build strength, mobility, and confidence through purposeful movement. With a calm, encouraging teaching style, he creates a supportive environment where students of all experience levels can learn safely and progress with confidence.',
      'His classes focus on proper alignment, core strength, flexibility, balance, and functional movement, helping students improve posture, body awareness, and overall physical well-being. Daniel believes that consistent practice and mindful movement are the foundation of a healthy and active lifestyle, and he encourages every student to move with control, intention, and confidence.',
      "In addition to group classes, Daniel also offers personalised 1-to-1 private sessions tailored to individual goals. Whether you're looking to improve flexibility, build strength, recover from an injury, refine your technique, or deepen your yoga or Pilates practice, he will develop a programme that supports your unique needs and helps you achieve lasting results.",
    ],
  },
  {
    slug: 'ben-ting',
    name: 'Ben Ting',
    role: 'Yoga Instructor · YTT Assistant Trainer',
    skills: 'Yoga',
    photo: 'ben-ting.jpg',
    bio: [
      'Ben is a passionate Yoga Instructor dedicated to helping students build strength, mobility, and confidence through mindful movement. Known for his energetic yet approachable teaching style, he creates an encouraging environment where students of all levels can challenge themselves safely while enjoying their practice.',
      "His classes focus on proper alignment, flexibility, balance, functional strength, and breath awareness, helping students develop a strong foundation while improving overall movement quality and physical well-being. Whether you're new to yoga or looking to deepen your practice, Ben provides clear guidance and personalised modifications to support your progress.",
      "In addition to leading group classes, Ben also offers personalised 1-to-1 private yoga sessions tailored to individual goals, including improving flexibility, building strength, enhancing mobility, and refining yoga techniques. As an Assistant Trainer in Healthtinity's Yoga Teacher Training (YTT) Programme, he also mentors aspiring yoga teachers, sharing his knowledge, practical experience, and passion for teaching. Ben believes that yoga is a lifelong journey of growth, and he is committed to helping every student move with confidence and purpose.",
    ],
  },
  {
    slug: 'jade-lim',
    name: 'Jade Lim',
    role: 'Yoga Instructor',
    skills: 'Yoga & Mat Pilates',
    photo: 'jade-lim.jpg',
    bio: [
      "Jade Lim is a veteran yoga instructor with over 10 years of teaching experience, bringing a wealth of knowledge, passion, and expertise to every class. Throughout her career, she has taught at some of Singapore's most established yoga studios, including Pure Yoga and True Yoga, where she guided students of all levels in developing strength, mobility, mindfulness, and confidence in their practice.",
      'Beyond regular classes, Jade is also experienced in leading specialized yoga workshops, helping practitioners deepen their understanding of alignment, technique, and movement. Her teaching style is approachable, encouraging, and detail-oriented, making every session both safe and rewarding.',
      "Whether you're new to yoga or an experienced practitioner, Jade creates a supportive environment that empowers you to move better, feel stronger, and build a sustainable lifelong practice.",
    ],
  },
  {
    slug: 'stacey-wong',
    name: 'Stacey Wong',
    role: 'Mat Pilates Instructor',
    skills: 'Mat Pilates',
    photo: 'stacey-wong.jpg',
    bio: [
      'Stacey is a dedicated Mat Pilates instructor who is passionate about helping individuals build strength, improve posture, and move with greater confidence. Her classes focus on developing core stability, body awareness, flexibility, and functional movement through precise, controlled exercises.',
      'With a warm and encouraging teaching style, Stacey creates an inclusive environment where students of all fitness levels feel supported and challenged. She places strong emphasis on proper alignment and technique, ensuring each participant moves safely while achieving maximum benefit from every session.',
      "Whether your goal is to enhance your overall fitness, improve mobility, prevent injuries, or complement your yoga practice, Stacey's classes will leave you feeling stronger, more balanced, and energized.",
    ],
  },
  {
    slug: 'zi-wei-ng',
    name: 'Zi Wei Ng',
    role: 'Yoga Instructor',
    skills: 'Yoga',
    photo: 'zi-wei-ng.jpg',
    bio: ['A recent graduate, Zi Wei has been teaching at other studios to further expand her knowledge and teaching skills. She teaches foundational yoga and hatha yoga.'],
  },
  {
    slug: 'xenia-na',
    name: 'Xenia Na',
    role: 'Yoga & Mat Pilates Instructor',
    skills: 'Yoga & Mat Pilates',
    photo: null,
    bio: ['Yoga & Mat Pilates teacher.'],
  },
  {
    slug: 'ariel-swee',
    name: 'Ariel Swee',
    role: 'Yoga Instructor',
    skills: 'Yoga Instructor',
    photo: 'ariel-swee.jpg',
    bio: ['A 200-hour yoga teacher.'],
  },
  {
    slug: 'sam-chen',
    name: 'Sam Chen',
    role: 'Yoga & Barre Instructor',
    skills: 'Yoga & Barre',
    photo: 'sam-chen.jpg',
    bio: [
      'Samantha is an experienced and well-loved instructor known for her versatility, energy and engaging teaching style. Skilled across a wide range of yoga practices, she brings a dynamic and fun personality into every class while making students feel comfortable and motivated.',
      "A firm favourite among our members, Samantha's classes are always lively, enjoyable and rewarding. Join her class and experience why she is one of the hot favourites at our studio!",
    ],
  },
  {
    slug: 'angie-choo',
    name: 'Angie Choo',
    role: 'Yoga & Mat Pilates Instructor',
    skills: 'Yoga, Mat Pilates, Therapy',
    photo: 'angie-choo.jpg',
    bio: [
      'Angie Choo is an experienced Yoga and Pilates instructor who previously taught at True Fitness Singapore.',
      'Her teaching background includes Pilates, Hatha Yoga and Yoga Therapy. She is known for her clear guidance and well-rounded approach to movement, with an emphasis on alignment, mobility, strength and body awareness.',
      'With experience teaching a wide range of students, Angie brings a calm, structured and approachable style to her classes.',
    ],
  },
  {
    slug: 'jaclyn-lim',
    name: 'Jaclyn Lim',
    role: 'Yoga & Mat Pilates Instructor',
    skills: 'Yoga, Mat Pilates',
    photo: 'jaclyn-lim.jpg',
    bio: [
      'Yoga first found me when I needed a way to slow down, reconnect, and come home to myself. What began as a practice has become a steady source of strength, calm, and joy in my life.',
      'I teach because I want others to experience the strength, calm, and joy that yoga has brought into my life. I love creating a warm, welcoming space where every student can breathe, move with curiosity, and feel at ease in their own body.',
      'I practise to feel at home in myself—to return to my breath, reconnect with my body, and carry that sense of belonging into everyday life.',
    ],
  },
];

// ---------------------------------------------------------------------
// Weekly schedule (typical week, taken from the live timetable 13–19 Nov 2026)
// ---------------------------------------------------------------------
const C = (time, name, coach, mins = 60) => ({ time, name, coach, mins });
export const schedule = [
  { day: 'Mon', full: 'Monday', classes: [
    C('7:45am', 'Vinyasa Dynamic 动态流瑜伽', 'Mary Low'),
    C('9:00am', 'Therapy: Mobility 关节灵活与伸展', 'Mary Low'),
    C('11:15am', 'Hatha Yoga 哈他瑜伽 · Off Peak', 'Angie Choo'),
    C('12:30pm', 'Therapy: Myofascial Release & Stretch 筋膜放松与伸展 · Off Peak', 'Angie Choo'),
    C('4:45pm', 'Tone & Sculpt 紧致塑形 · Off Peak', 'Mary Low'),
    C('6:00pm', 'Split & Balance 劈叉与平衡', 'Mary Low'),
    C('7:15pm', 'Warm Mat Pilates 温热垫上普拉提', 'Cindy Tan'),
    C('8:30pm', 'Yin & Restore 阴瑜伽与修复', 'Cindy Tan'),
  ]},
  { day: 'Tue', full: 'Tuesday', classes: [
    C('7:45am', 'Hatha Yoga 哈他瑜伽', 'Sam Chen'),
    C('9:00am', 'Warm Tone & Sculpt 温热紧致塑形', 'Sam Chen'),
    C('11:15am', 'Yoga Foundation 瑜伽基础 · Off Peak', 'Cindy Tan'),
    C('12:30pm', 'Mat Pilates 垫上普拉提 · Off Peak', 'Cindy Tan'),
    C('4:45pm', 'Warm Hatha 温热哈达 · Off Peak', 'Daniel Ding'),
    C('6:00pm', 'Mat Pilates Foundation 基础垫上普拉提', 'Daniel Ding'),
    C('7:15pm', 'Hatha Yoga 哈他瑜伽', 'Daniel Ding'),
    C('8:30pm', 'Therapy: Upper Body Stretch 上半身舒缓伸展', 'Daniel Ding'),
  ]},
  { day: 'Wed', full: 'Wednesday', classes: [
    C('7:45am', 'Hot Detox 热排毒', 'Sam Chen'),
    C('9:00am', 'Wheel Yoga 瑜伽轮', 'Sam Chen'),
    C('11:15am', 'Mat Pilates 垫上普拉提 · Off Peak', 'Ethan Lim'),
    C('12:30pm', 'Therapy: Full Body Stretch 全身舒缓伸展 · Off Peak', 'Ethan Lim'),
    C('4:45pm', 'Yoga Foundation 瑜伽基础 · Off Peak', 'Jade Lim'),
    C('6:00pm', 'Therapy: Upper Body Stretch 上半身舒缓伸展', 'Jade Lim'),
    C('7:15pm', 'Hot Vinyasa 热流瑜伽', 'Zenn Lim'),
    C('8:30pm', 'Therapy: Mobility 关节灵活与伸展', 'Zenn Lim'),
  ]},
  { day: 'Thu', full: 'Thursday', classes: [
    C('7:45am', 'Tone & Sculpt 紧致塑形', 'Hasita J'),
    C('9:00am', 'Mat Pilates Foundation 基础垫上普拉提', 'Cindy Tan'),
    C('11:15am', 'Therapy: Full Body Stretch 全身舒缓伸展 · Off Peak', 'Cindy Tan'),
    C('12:30pm', 'Mat Pilates Foundation 基础垫上普拉提 · Off Peak', 'Cindy Tan'),
    C('4:45pm', 'Mat Pilates 垫上普拉提 · Off Peak', 'Hasita J'),
    C('6:00pm', 'Hot Core Flow 热核心流动', 'Mary Low'),
    C('7:15pm', 'Therapy: Mobility 关节灵活与伸展', 'Mary Low'),
    C('8:30pm', 'Gentle Flow 温和流瑜伽', 'Mary Low'),
  ]},
  { day: 'Fri', full: 'Friday', classes: [
    C('7:45am', 'Mat Pilates Dynamic 动态垫上普拉提', 'Ethan Lim'),
    C('9:00am', 'Therapy: Myofascial Release & Stretch 筋膜放松与伸展', 'Ethan Lim'),
    C('11:15am', 'Gentle Flow 温和流瑜伽 · Off Peak', 'Ethan Lim'),
    C('12:30pm', 'Warm Hatha 温热哈达 · Off Peak', 'Ethan Lim'),
    C('4:45pm', 'Therapy: Full Body Stretch 全身舒缓伸展 · Off Peak', 'Jade Lim'),
    C('6:00pm', 'Warm Hatha 热哈达', 'Jade Lim'),
    C('7:15pm', 'Inversion & Arm Balance 倒立手臂平衡瑜伽', 'Zenn Lim'),
    C('8:30pm', 'Therapy: Full Body Stretch 全身舒缓伸展', 'Zenn Lim'),
  ]},
  { day: 'Sat', full: 'Saturday', classes: [
    C('8:00am', 'Hot Vinyasa 热流瑜伽', 'Zenn Lim'),
    C('9:15am', 'Therapy: Mobility 关节灵活与伸展', 'Zenn Lim'),
    C('10:30am', 'Hot Core Flow 热核心流动', 'Zenn Lim'),
    C('11:45am', 'Yoga Foundation 瑜伽基础', 'Ben Ting'),
    C('1:00pm', 'Wheel Yoga 瑜伽轮', 'Ben Ting'),
    C('2:15pm', 'Ashtanga Primary Series 阿斯汤加瑜伽初级序列', 'Jade Lim', 90),
  ]},
  { day: 'Sun', full: 'Sunday', classes: [
    C('8:00am', 'Gentle Flow 温和流瑜伽', 'Sam Chen'),
    C('9:15am', 'Wheel Yoga 瑜伽轮', 'Sam Chen'),
    C('10:30am', 'Therapy: Full Body Stretch 全身舒缓伸展', 'Sam Chen'),
    C('11:45am', 'Hot Tone & Sculpt 热紧致塑形', 'Sam Chen'),
    C('1:00pm', 'Core Flow 核心流动', 'Mary Low'),
    C('2:15pm', 'Hatha Yoga 哈他瑜伽', 'Zi Wei Ng'),
    C('3:30pm', 'Gentle Flow 温和流瑜伽', 'Zi Wei Ng'),
  ]},
];

export function classCategory(name) {
  if (/^Therapy/i.test(name)) return 'therapy';
  if (/Pilates/i.test(name)) return 'pilates';
  if (/Sculpt|Barre/i.test(name)) return 'sculpt';
  return 'yoga';
}
export const categories = [
  ['all', 'All classes'],
  ['yoga', 'Yoga'],
  ['pilates', 'Mat Pilates'],
  ['therapy', 'Therapy & Stretch'],
  ['sculpt', 'Tone & Sculpt'],
];

// ---------------------------------------------------------------------
// Journal
// ---------------------------------------------------------------------
export const posts = [
  {
    slug: 'yoga-pilates-in-singapore-without-the-big-package-commitment',
    legacy: 'yoga-%26-pilates-in-singapore-without-the-big-package-commitment',
    title: 'Yoga & Pilates in Singapore Without the Big Package Commitment',
    excerpt: 'No class package? No problem. A more flexible way to enjoy Yoga & Pilates in Singapore with HT Wallet Top Up & Flow.',
    category: 'Yoga',
    author: 'Robin',
    date: '10 Sep 2026',
    iso: '2026-09-10',
    image: 'blog-package.jpg',
    body: `
<h2>No Class Package? No Problem. A More Flexible Way to Enjoy Yoga &amp; Pilates in Singapore</h2>
<p>Love taking Yoga or Pilates classes, but not ready to commit to a large class package?</p>
<p>At many fitness and wellness studios, getting a better class rate often means purchasing a package upfront. But not everyone wants to make that commitment — especially when work, travel, family and everyday life can make it difficult to know how often you'll actually attend.</p>
<p>At Healthtinity, we want to make it easier.</p>
<p>With our new <strong>Top Up &amp; Flow</strong>, you don't need to purchase a traditional class package just to continue practising with us.</p>
<p>Simply top up your HT Wallet, receive bonus store credits, and use your credits to book the classes you want. You can also use your wallet credits towards available packages when you're ready for a bigger commitment.</p>
<h2>Start Small. Commit When You're Ready.</h2>
<p>Not sure how often you'll attend? Start with $90.</p>
<p>Want a little more flexibility? Choose $200 or $500 and enjoy additional bonus credits and a longer validity period.</p>
<p>There is no need to jump straight into a large class package simply because you want to keep practising.</p>
<p>You decide how much you're comfortable committing.</p>`,
  },
  {
    slug: 'yoga-for-better-sleep-in-singapore-healthtinity-featured-in-lianhe-zaobao',
    legacy: 'yoga-for-better-sleep-in-singapore--healthtinity-featured-in-lianhe-zaobao',
    title: 'Yoga for Better Sleep in Singapore | Healthtinity Featured in Lianhe Zaobao',
    excerpt: 'Healthtinity was featured in Lianhe Zaobao on 8 September 2026, sharing gentle yoga practices for better sleep and relaxation.',
    category: 'Therapy',
    author: 'Robin',
    date: '10 Sep 2026',
    iso: '2026-09-10',
    image: 'blog-sleep.jpg',
    body: `
<p class="lead">We're delighted to share that Healthtinity Yoga &amp; Therapy was featured in <strong>Lianhe Zaobao</strong> on 8 September 2026, as part of a feature exploring ways to improve sleep and relaxation.</p>
<p>In the feature, Healthtinity shared how gentle yoga practices, mindful breathing and relaxation techniques can be incorporated into our daily routine to help the body unwind and prepare for better rest.</p>
<h2>Why Can It Be So Difficult to Wind Down?</h2>
<p>For many of us, going to bed doesn't necessarily mean our body and mind are ready to rest.</p>
<p>A busy workday, prolonged sitting, screen time, physical tension and an active mind can make it difficult to transition from "doing" to "resting".</p>
<p>This is where a gentle yoga practice can be useful.</p>
<p>Unlike a vigorous workout, yoga before bedtime can focus on slowing down, releasing tension and creating a calmer transition towards sleep.</p>
<h2>Gentle Yoga Before Bed</h2>
<p>In our Lianhe Zaobao feature, Healthtinity demonstrated several gentle yoga practices that can be performed before bedtime.</p>
<p>The intention is not to push deeply into a stretch or challenge the body. Instead, movements are performed comfortably and with awareness, allowing the body to gradually relax.</p>
<p>A simple evening yoga routine may include gentle stretches and resting positions that encourage you to slow your breathing and release some of the muscular tension accumulated throughout the day.</p>
<p>And you don't necessarily need a long practice.</p>
<p>Even setting aside a few minutes before bed to move, stretch and breathe consciously can be a practical way to establish a consistent wind-down routine.</p>
<h2>Breathing Is an Important Part of the Practice</h2>
<p>Yoga isn't only about flexibility.</p>
<p>How we breathe during practice is equally important, especially when the purpose of the session is relaxation.</p>
<p>Rather than rushing through movements, a slower practice allows us to pay attention to our breathing and become more aware of how the body feels.</p>
<p>This combination of movement, breathing and relaxation is one reason gentle yoga can fit naturally into an evening routine.</p>
<h2>You Don't Have to Be Flexible to Start Yoga</h2>
<p>One misconception we often hear is:</p>
<blockquote>"I'm not flexible enough to do yoga."</blockquote>
<p>But flexibility isn't a requirement for beginning yoga.</p>
<p>At Healthtinity, we believe movement should be adapted to the individual. A yoga pose doesn't need to look perfect, and you shouldn't have to force your body into a position simply because someone else can do it.</p>
<p>This is particularly important when practising for relaxation. The objective is to find positions that allow you to feel comfortable, breathe and gradually release tension.</p>
<h2>Consistency Matters More Than Perfection</h2>
<p>Just like exercise, mobility and strength training, the benefits of a wellness routine come from consistency rather than chasing quick results.</p>
<p>You don't need an elaborate bedtime ritual.</p>
<p>Start with something manageable. Give yourself a few minutes to slow down, move gently and breathe. If it works well for you, make it part of your regular evening routine.</p>
<p>Over time, these small habits can become an important part of looking after both your physical and mental wellbeing.</p>
<h2>Experience Yoga at Healthtinity Singapore</h2>
<p>Since 2019, Healthtinity Yoga &amp; Therapy has focused on helping people move better through a combination of yoga, Pilates, therapy and rehabilitation-focused movement.</p>
<p>Located in 246J Upper Thomson, Singapore, we offer group Yoga and Mat Pilates classes alongside private Yoga Therapy and rehabilitation-focused sessions.</p>
<p>Whether you're completely new to yoga, returning to exercise after a break, or simply looking for a more mindful way to move, our goal is to help you find a practice that is sustainable for your lifestyle.</p>
<p><strong>Move Better. Feel Stronger. Live Brighter.</strong></p>`,
  },
];

// ---------------------------------------------------------------------
// FAQ (from /faqs, plus two answers drawn from the Terms & Conditions)
// ---------------------------------------------------------------------
export const faqs = [
  ['How do I book a class?', 'All classes must be booked through the Healthtinity booking website or application. Bookings open seven days in advance and close one hour before the class begins. Your place is secured only after the booking is shown as confirmed in your account.'],
  ['How early should I arrive?', 'Please arrive at least 10 minutes before the class begins so that you have enough time to check in and prepare. Late entry may be refused for safety reasons and to avoid disrupting the class. A refused late entry will be treated as a late cancellation or no-show.'],
  ["What is Healthtinity's cancellation policy?", 'You must cancel your booking through the application at least five hours before the class begins. Cancellations made within five hours of the starting time will be considered late cancellations.'],
  ['I am a beginner. Which class should I choose?', 'Beginners are welcome at Healthtinity. Please check the class description and choose a class appropriate for your current experience and fitness level. If you are unsure, contact us before booking and our team can help you select a suitable class.'],
  ['Do I need to bring my own equipment?', 'Healthtinity provides the standard equipment needed for its regular classes unless the class description states otherwise. Please wear suitable exercise clothing and bring a towel and water bottle. Customers may bring their own mat if they prefer.'],
  ['Is there a minimum age?', 'Participants must be at least 16 years old to attend group classes. Participants under 18 must have permission from a parent or legal guardian before purchasing or attending any class.'],
  ['What happens if a class is cancelled by the studio?', 'A minimum of three participants is generally needed for a group class to proceed. Where Healthtinity cancels a class before it begins, the class credit used for that booking will ordinarily be returned to your account.'],
];
