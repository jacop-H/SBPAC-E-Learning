import express from "express";
import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Target OCSC courses metadata
const TARGET_COURSES = [
  {
    id: "law-sbp",
    title: "กฎหมายที่ใช้ในพื้นที่จังหวัดชายแดนภาคใต้",
    code: "OCSC-SBP-001",
    category: "กฎหมายและระเบียบ",
    color: "amber",
    icon: "Scale",
    searchKeywords: ["กฎหมาย", "ชายแดนภาคใต้", "พ.ร.ก.ฉุกเฉิน", "กฎอัยการศึก", "กอ.รมน."],
    description: "ศึกษาและเข้าใจโครงสร้างกฎหมายพิเศษ ได้แก่ พ.ร.ก.การบริหารราชการในสถานการณ์ฉุกเฉิน พ.ศ. 2548, พ.ร.บ.ความมั่นคงฯ พ.ศ. 2551 และกฎอัยการศึก เพื่อการปฏิบัติหน้าที่ของเจ้าหน้าที่รัฐอย่างถูกต้องและชอบด้วยกฎหมาย",
    duration: "6 ชั่วโมง",
    totalChapters: 5,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    chapters: [
      {
        id: "c1",
        title: "บทที่ 1: ภาพรวมกฎหมายพิเศษในพื้นที่จังหวัดชายแดนภาคใต้",
        content: `<h3>1. เจตนารมณ์ของการใช้กฎหมายพิเศษ</h3>
        <p>การบังคับใช้กฎหมายพิเศษในพื้นที่จังหวัดชายแดนภาคใต้ (ปัตตานี ยะลา นราธิวาส และ 4 อำเภอของสงขลา) มีเป้าหมายเพื่อรักษาความสงบเรียบร้อย คุ้มครองชีวิตและทรัพย์สินของประชาชน และอำนวยความยุติธรรมอย่างมีประสิทธิภาพ</p>
        <div class="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-200 dark:border-amber-800 my-3">
          <strong class="text-amber-800 dark:text-amber-300">📌 กฎหมายสำคัญ 3 ฉบับ:</strong>
          <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
            <td><strong>1. พระราชกำหนดการบริหารราชการในสถานการณ์ฉุกเฉิน พ.ศ. 2548 (พ.ร.ก.ฉุกเฉิน)</strong> - ประกาศสถานการณ์ฉุกเฉินที่มีความร้ายแรง</td>
            <td><strong>2. พระราชบัญญัติการรักษาความมั่นคงภายในราชอาณาจักร พ.ศ. 2551 (พ.ร.บ.ความมั่นคง)</strong> - บังคับใช้ในพื้นที่ผ่อนคลายโดย กอ.รมน.</td>
            <td><strong>3. พระราชบัญญัติกฎอัยการศึก พ.ศ. 2457</strong> - การใช้อำนาจทางทหารในสถานการณ์วิกฤต</td>
          </ul>
        </div>`
      },
      {
        id: "c2",
        title: "บทที่ 2: พ.ร.ก. การบริหารราชการในสถานการณ์ฉุกเฉิน พ.ศ. 2548",
        content: `<h3>2. การใช้อำนาจและขอบเขตตาม พ.ร.ก.ฉุกเฉิน</h3>
        <p>เจ้าพนักงานตาม พ.ร.ก.ฉุกเฉิน มีอำนาจในการควบคุมตัวผู้ต้องสงสัยได้ไม่เกิน 7 วัน และขอขยายเวลาต่อศาลได้ครั้งละไม่เกิน 7 วัน รวมแล้วไม่เกิน 30 วัน โดยต้องควบคุมตัวในสถานที่ที่กำหนด (ไม่ใช่สถานีตำรวจหรือเรือนจำ)</p>
        <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300"><strong>ข้อควรระวังสำหรับเจ้าหน้าที่:</strong> การใช้อำนาจต้องเป็นไปตามหลักความจำเป็น ปราศจากการทรมาน หรือการปฏิบัติที่ไร้มนุษยธรรม</p>`
      },
      {
        id: "c3",
        title: "บทที่ 3: พ.ร.บ. การรักษาความมั่นคงภายในราชอาณาจักร พ.ศ. 2551",
        content: `<h3>3. บทบาทของ กอ.รมน. และมาตรา 21</h3>
        <p>พ.ร.บ.ความมั่นคง เน้นการบูรณาการและการพลเรือนนำการทหาร โดยมีมาตรา 21 ที่เปิดโอกาสให้ผู้หลงผิดเข้ารับการอบรมแทนการฟ้องร้องคดีอาญา เพื่อสร้างโอกาสในการกลับคืนสู่สังคม</p>`
      },
      {
        id: "c4",
        title: "บทที่ 4: สิทธิมนุษยชนและการกระบวนการยุติธรรมทางอาญา",
        content: `<h3>4. การคุ้มครองสิทธิขั้นพื้นฐาน</h3>
        <p>เจ้าหน้าที่ต้องเคารพสิทธิของผู้ถูกควบคุมตัว เช่น สิทธิในการแจ้งญาติ สิทธิในการพบแพทย์ และสิทธิในการมีทนายความ เพื่อสร้างความเชื่อมั่นในกระบวนการยุติธรรม</p>`
      },
      {
        id: "c5",
        title: "บทที่ 5: สรุปและแนวทางการปฏิบัติตามกฎหมาย",
        content: `<h3>5. ข้อเตือนใจในการปฏิบัติงาน</h3>
        <p>การดําเนินคดีและการรวบรวมพยานหลักฐานต้องโปร่งใส ตรวจสอบได้ และสอดคล้องกับหลักนิติธรรมอย่างเคร่งครัด</p>`
      }
    ]
  },
  {
    id: "malay-basic",
    title: "ภาษามลายูถิ่นเบื้องต้น",
    code: "OCSC-SBP-002",
    category: "ภาษาและการสื่อสาร",
    color: "emerald",
    icon: "Languages",
    searchKeywords: ["ภาษามลายู", "มลายูถิ่น", "คำศัพท์", "ยาวี", "การสื่อสาร"],
    description: "เรียนรู้คำศัพท์ วลี และประโยคภาษามลายูถิ่น (ยาวี) ที่จำเป็นสำหรับการสื่อสาร การสร้างมิตรภาพ และการให้บริการประชาชนของเจ้าหน้าที่รัฐในจังหวัดชายแดนภาคใต้",
    duration: "8 ชั่วโมง",
    totalChapters: 6,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    chapters: [
      {
        id: "m1",
        title: "บทที่ 1: การทักทายและการแนะนำตัว (Greeting & Self Introduction)",
        content: `<h3>1. คำทักทายพื้นฐาน</h3>
        <p>การใช้ภาษามลายูถิ่นเพื่อผูกมิตรกับประชาชนในพื้นที่:</p>
        <div class="overflow-x-auto my-3">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200">
                <th class="p-2 border text-left">คำศัพท์มลายู</th>
                <th class="p-2 border text-left">คำอ่านไทย</th>
                <th class="p-2 border text-left">คำแปล</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="p-2 border font-medium">Salamat Pagi</td><td class="p-2 border">ซาลามัต ปากี</td><td class="p-2 border">สวัสดีตอนเช้า</td></tr>
              <tr><td class="p-2 border font-medium">Salamat Petang</td><td class="p-2 border">ซาลามัต เปอตัง</td><td class="p-2 border">สวัสดีตอนบ่าย/เย็น</td></tr>
              <tr><td class="p-2 border font-medium">Sapa Nama?</td><td class="p-2 border">ซาโป นามอ?</td><td class="p-2 border">คุณชื่ออะไร?</td></tr>
              <tr><td class="p-2 border font-medium">Nama Saya...</td><td class="p-2 border">นามอ ซาโย...</td><td class="p-2 border">ฉัน/ผม ชื่อ...</td></tr>
              <tr><td class="p-2 border font-medium">Terima Kasih</td><td class="p-2 border">ตรีมอ กาเซะห์</td><td class="p-2 border">ขอบคุณ</td></tr>
              <tr><td class="p-2 border font-medium">Sama-Sama</td><td class="p-2 border">ซามอ-ซามอ</td><td class="p-2 border">ยินดี / ไม่เป็นไร</td></tr>
            </tbody>
          </table>
        </div>`
      },
      {
        id: "m2",
        title: "บทที่ 2: คำศัพท์สำหรับการบริการประชาชนและหน่วยงานราชการ",
        content: `<h3>2. คำศัพท์การติดต่อราชการ</h3>
        <ul class="space-y-2 text-sm my-2">
          <li><strong>Minta Tolong (มินตอ โตลง):</strong> ขอความช่วยเหลือ</li>
          <li><strong>Nak Buat Apa? (นัก บูอัต อาโป?):</strong> ต้องการมาทำอะไรครับ/ค่ะ?</li>
          <li><strong>Surat / Kad (ซูรัต / กัด):</strong> เอกสาร / บัตรประชาชน</li>
          <li><strong>Rumah (รูเมาะห์):</strong> บ้าน / ที่อยู่อาศัย</li>
          <li><strong>Sehat Ko? (ซีฮัต โกะ?):</strong> สบายดีไหม?</li>
        </ul>`
      },
      {
        id: "m3",
        title: "บทที่ 3: ตัวเลขและการบอกเวลา",
        content: `<h3>3. การนับเลข 1-10 ในภาษามลายูถิ่น</h3>
        <p class="text-sm">Satu (ซาตู = 1), Dua (ดัว = 2), Tiga (ตีกอ = 3), Empat (อัมปัต = 4), Lima (ลีมอ = 5), Enam (เออนัม = 6), Tujuh (ตูโจะห์ = 7), Lapan (ลาปัน = 8), Sembilan (ซัมบีลัน = 9), Sepuluh (เซอปูลูห์ = 10)</p>`
      }
    ]
  },
  {
    id: "multiculture",
    title: "พหุวัฒนธรรมและสังคมจังหวัดชายแดนภาคใต้",
    code: "OCSC-SBP-003",
    category: "สังคมและวัฒนธรรม",
    color: "indigo",
    icon: "Users",
    searchKeywords: ["พหุวัฒนธรรม", "สังคม", "มุสลิม", "วิถีชีวิต", "อัตลักษณ์"],
    description: "สร้างความเข้าใจในความหลากหลายทางวัฒนธรรม วิถีชีวิตอิสลาม ประเพณีท้องถิ่น และข้อควรปฏิบัติ/ข้อห้าม เพื่อการอยู่ร่วมกันอย่างสันติสุข",
    duration: "5 ชั่วโมง",
    totalChapters: 4,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    chapters: [
      {
        id: "mc1",
        title: "บทที่ 1: อัตลักษณ์และอัตลักษณ์ทางวัฒนธรรมในพื้นที่",
        content: `<h3>1. สังคมพหุวัฒนธรรมชายแดนใต้</h3>
        <p>จังหวัดชายแดนภาคใต้เป็นพื้นที่ที่มีการผสมผสานของกลุ่มวัฒนธรรมไทยมุสลิม ไทยพุทธ และไทยเชื้อสายจีน ซึ่งอยู่ร่วมกันมาอย่างยาวนานด้วยความเคารพซึ่งกันและกัน</p>`
      },
      {
        id: "mc2",
        title: "บทที่ 2: ข้อควรปฏิบัติและมารยาททางสังคมศาสนาอิสลาม",
        content: `<h3>2. ข้อควรปฏิบัติสำหรับเจ้าหน้าที่รัฐ</h3>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 my-3 text-sm">
          <strong>🕌 มารยาทสำคัญที่ควรรู้:</strong>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <td><strong>อาหารฮาลาล (Halal):</strong> ตรวจสอบตราฮาลาลและแยกภาชนะประกอบอาหาร</td>
            <td><strong>การสัมผัสมือ (Salam):</strong> การสลามระหว่างเพศตรงข้ามควรพิจารณาความเหมาะสม</td>
            <td><strong>การแต่งกาย:</strong> สุภาพ เรียบร้อย โดยเฉพาะเมื่อเข้าพบผู้นำศาสนาหรือเข้ามัสยิด</td>
            <td><strong>เวลาละหมาด (Solat):</strong> ให้ความสำคัญและอานวยความสะดวกในเวลาละหมาด 5 เวลา</td>
          </ul>
        </div>`
      }
    ]
  },
  {
    id: "history-sbp",
    title: "ประวัติศาสตร์จังหวัดชายแดนภาคใต้",
    code: "OCSC-SBP-004",
    category: "ประวัติศาสตร์และภูมิปัญญา",
    color: "rose",
    icon: "Landmark",
    searchKeywords: ["ประวัติศาสตร์", "ปัตตานี", "มรดกวัฒนธรรม", "ภูมิปัญญา"],
    description: "เรียนรู้ความเป็นมาทางประวัติศาสตร์ มรดกทางวัฒนธรรม การค้าโบราณ และพัฒนาการทางสังคมของพื้นที่ภาคใต้เพื่อสร้างความเข้าใจอันดีในการปฏิบัติราชการ",
    duration: "4 ชั่วโมง",
    totalChapters: 4,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    chapters: [
      {
        id: "h1",
        title: "บทที่ 1: เมืองท่าโบราณลังกาสุกะและปัตตานี",
        content: `<h3>1. ประวัติศาสตร์เมืองลังกาสุกะ</h3>
        <p>พื้นที่บริเวณปัตตานีและใกล้เคียงอดีตเคยเป็นศูนย์กลางการค้าทางทะเลที่มั่งคั่งของคาบสมุทรมลายู เชื่อมโยงเส้นทางการค้าระหว่างจีน อินเดีย และตะวันออกกลาง</p>`
      }
    ]
  },
  {
    id: "guidelines-officers",
    title: "แนวปฏิบัติสำหรับเจ้าหน้าที่ของรัฐในจังหวัดชายแดนภาคใต้",
    code: "OCSC-SBP-005",
    category: "แนวทางปฏิบัติราชการ",
    color: "blue",
    icon: "ShieldCheck",
    searchKeywords: ["แนวปฏิบัติ", "เจ้าหน้าที่รัฐ", "ธรรมมาภิบาล", "การบริการ", "จริยธรรม"],
    description: "กรอบแนวทาง จริยธรรม และหลักธรรมมาภิบาลในการให้บริการประชาชน การสร้างความยึดมั่นผูกพันกับชุมชน และการอำนวยความยุติธรรมอย่างเป็นธรรม",
    duration: "6 ชั่วโมง",
    totalChapters: 5,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    chapters: [
      {
        id: "g1",
        title: "บทที่ 1: หลักการเข้าถึง เคารพ และเข้าใจ (Understanding & Respect)",
        content: `<h3>1. นโยบายและหลักการทำงานของเจ้าหน้าที่รัฐ</h3>
        <p>ยึดหลักยุทธศาสตร์พระราชทาน "เข้าใจ เข้าถึง พัฒนา" เป็นหัวใจสำคัญในการแก้ไขปัญหาและพัฒนาพื้นที่ชายแดนภาคใต้</p>`
      }
    ]
  },
  {
    id: "benefits-officers",
    title: "สิทธิประโยชน์สำหรับเจ้าหน้าที่ของรัฐในจังหวัดชายแดนภาคใต้",
    code: "OCSC-SBP-006",
    category: "สิทธิประโยชน์และสวัสดิการ",
    color: "purple",
    icon: "Gift",
    searchKeywords: ["สิทธิประโยชน์", "เงินตอบแทน", "พ.ศ.บ.", "สวัสดิการ", "บำนวญ"],
    description: "รวบรวมระเบียบ เงินเสี่ยงภัย (พ.ศ.บ.) ค่าตอบแทนพิเศษ สิทธิการลา สิทธิเลื่อนขั้นเงินเดือน และบำเหน็จบำนาญพิเศษสำหรับเจ้าหน้าที่รัฐที่ปฏิบัติงานในพื้นที่เสี่ยงภัย",
    duration: "5 ชั่วโมง",
    totalChapters: 5,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    chapters: [
      {
        id: "b1",
        title: "บทที่ 1: เงินสวัสดิการและค่าตอบแทนพิเศษ (พ.ศ.บ.)",
        content: `<h3>1. เงินตอบแทนพิเศษประจำตำแหน่งและพื้นที่เสี่ยงภัย</h3>
        <div class="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border border-purple-200 dark:border-purple-800 my-3 text-sm">
          <strong>💳 รายการสิทธิประโยชน์สำคัญ:</strong>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <td><strong>เงิน พ.ศ.บ.:</strong> เงินช่วยค่าครองชีพพิเศษสำหรับเจ้าหน้าที่ผู้ปฏิบัติงานในพื้นที่เสี่ยงภัย</td>
            <td><strong>การโควตาเลื่อนขั้นเงินเดือน:</strong> สิทธิพิจารณาโควตาพิเศษประจำปี</td>
            <td><strong>สิทธิวันลาพักผ่อนสะสม:</strong> การสะสมวันลาพักผ่อนประจำปีเพิ่มเติม</td>
            <td><strong>สิทธิการรักษาพยาบาลและการประกันชีวิต:</strong> การคุ้มครองอุบัติเหตุและเหตุการณ์ความไม่สงบ</td>
          </ul>
        </div>`
      }
    ]
  }
];

// Scraper & proxy helper
async function fetchAndScrapePortal() {
  const url = "https://learningportal.ocsc.go.th/learningportal";
  try {
    const response = await axios.get(url, {
      timeout: 6000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "th-TH,th;q=0.9,en;q=0.8"
      }
    });

    const $ = cheerio.load(response.data);
    
    // Clean unwanted clutter
    $('header, footer, nav, script, style, iframe, .ads, .advertisement, #cookie-banner, .footer-links, .social-share').remove();

    // Extract any specific course links or title texts found on page
    const foundTitles: string[] = [];
    $('a, h1, h2, h3, h4, .course-title, .card-title').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 5) {
        foundTitles.push(text);
      }
    });

    return {
      status: "success",
      source: url,
      scrapedAt: new Date().toISOString(),
      itemsFound: foundTitles.length,
      sampleExtracted: foundTitles.slice(0, 15)
    };
  } catch (error: any) {
    return {
      status: "fallback",
      source: url,
      scrapedAt: new Date().toISOString(),
      message: error.message || "Failed to directly connect to portal due to CORS/Protection, using verified offline cache",
      sampleExtracted: []
    };
  }
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "OCSC Learning Portal Mobile API" });
});

// Google OAuth Helpers
function getRedirectUri(req: express.Request) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  if (process.env.APP_URL) {
    const cleanAppUrl = process.env.APP_URL.replace(/\/$/, '');
    return `${cleanAppUrl}/auth/callback`;
  }
  return `${protocol}://${host}/auth/callback`;
}

app.get("/api/auth/google/config", (req, res) => {
  const redirectUri = getRedirectUri(req);
  res.json({
    hasClientId: Boolean(process.env.GOOGLE_CLIENT_ID),
    clientId: process.env.GOOGLE_CLIENT_ID || null,
    redirectUri
  });
});

app.get("/api/auth/google/url", (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = getRedirectUri(req);

  if (!clientId) {
    return res.json({
      configured: false,
      redirectUri,
      message: "GOOGLE_CLIENT_ID environment variable is missing"
    });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid profile email",
    access_type: "offline",
    prompt: "select_account"
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.json({ configured: true, url: authUrl, redirectUri });
});

// OAuth Callback Route
app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
  const code = req.query.code as string;
  const error = req.query.error as string;

  if (error || !code) {
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Google Login Failed</title></head>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #0f172a; color: white;">
          <div style="text-align: center; max-width: 400px; padding: 20px;">
            <h2 style="color: #ef4444;">ล็อกอินไม่สำเร็จ</h2>
            <p>${error || "ไม่พบรหัสยืนยันการเข้าสู่ระบบ"}</p>
            <script>
              setTimeout(() => { window.close(); }, 3000);
            </script>
          </div>
        </body>
      </html>
    `);
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = getRedirectUri(req);

    // Exchange code for tokens
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", new URLSearchParams({
      code,
      client_id: clientId || "",
      client_secret: clientSecret || "",
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    }).toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const accessToken = tokenRes.data.access_token;

    // Fetch Google User Profile
    const userRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const googleUser = {
      id: userRes.data.sub,
      name: userRes.data.name || userRes.data.email.split('@')[0],
      email: userRes.data.email,
      picture: userRes.data.picture || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userRes.data.email)}`,
      role: 'ผู้ใช้งาน Google Account (Verified)',
      department: 'ข้าราชการ / เจ้าหน้าที่ ศอ.บต.'
    };

    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Google Authentication Successful</title></head>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #0f172a; color: white; margin: 0;">
          <div style="text-align: center; background: #1e293b; padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
            <div style="font-size: 40px; margin-bottom: 10px;">✅</div>
            <h2 style="margin: 0 0 10px 0; color: #f59e0b;">เข้าสู่ระบบด้วย Google สำเร็จ</h2>
            <p style="font-size: 14px; color: #94a3b8; margin-bottom: 20px;">กำลังนำท่านกลับสู่ระบบเรียน ศอ.บต....</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'GOOGLE_OAUTH_SUCCESS',
                  user: ${JSON.stringify(googleUser)}
                }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
          </div>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error("Google OAuth Exchange error:", err?.response?.data || err?.message);
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Error</title></head>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #0f172a; color: white;">
          <div style="text-align: center; max-width: 400px; padding: 20px;">
            <h2 style="color: #f87171;">เกิดข้อผิดพลาดในการรับข้อมูล Google</h2>
            <p style="font-size: 13px; color: #94a3b8;">${err?.response?.data?.error_description || err?.message || 'Token exchange failed'}</p>
            <script>
              setTimeout(() => { window.close(); }, 4000);
            </script>
          </div>
        </body>
      </html>
    `);
  }
});

app.get("/api/courses", (_req, res) => {
  res.json({
    success: true,
    updatedAt: new Date().toISOString(),
    total: TARGET_COURSES.length,
    courses: TARGET_COURSES
  });
});

app.get("/api/scrape/ocsc", async (_req, res) => {
  const result = await fetchAndScrapePortal();
  res.json({
    ...result,
    targetCourses: TARGET_COURSES
  });
});

// Proxy route for fetching external URL without headers/footers
app.get("/api/proxy", async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const response = await axios.get(targetUrl, {
      timeout: 8000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    const $ = cheerio.load(response.data);

    // Strip unneeded sections as requested
    $('header, footer, nav, script, style, .ads, .sidebar, #header, #footer, .cookie-consent').remove();

    const cleanedHtml = $('body').html() || $.html();

    res.json({
      success: true,
      originalUrl: targetUrl,
      cleanedHtml
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || "Proxy request failed"
    });
  }
});

// Full Web Proxy route to bypass X-Frame-Options: SAMEORIGIN/DENY for iframe embedding
app.get("/api/web-proxy", async (req, res) => {
  let targetUrl = (req.query.url as string) || "https://learningportal.ocsc.go.th/learningportal";
  const mainPortalUrl = "https://learningportal.ocsc.go.th/learningportal";
  
  const fetchPage = async (url: string) => {
    return await axios.get(url, {
      timeout: 8000,
      validateStatus: (status) => status >= 200 && status < 400,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "th-TH,th;q=0.9,en;q=0.8"
      }
    });
  };

  try {
    let response;
    try {
      response = await fetchPage(targetUrl);
    } catch (primaryErr) {
      if (targetUrl !== mainPortalUrl) {
        // Fallback to main OCSC learning portal URL if specific link 404s
        targetUrl = mainPortalUrl;
        response = await fetchPage(mainPortalUrl);
      } else {
        throw primaryErr;
      }
    }

    let html = response.data;
    if (typeof html === "string") {
      const baseHref = targetUrl.endsWith("/") ? targetUrl : `${targetUrl}/`;
      const injectedBase = `<base href="${baseHref}" target="_blank">\n<script>window.addEventListener('error', function(e){ e.preventDefault(); });</script>`;
      
      if (html.includes("<head>")) {
        html = html.replace("<head>", `<head>${injectedBase}`);
      } else {
        html = injectedBase + html;
      }

      // Neutralize frame-busting scripts
      html = html.replace(/top\.location\s*=/g, "// top.location =");
      html = html.replace(/window\.top\.location/g, "// window.top.location");
      html = html.replace(/parent\.location/g, "// parent.location");
    }

    res.removeHeader("X-Frame-Options");
    res.removeHeader("Content-Security-Policy");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(html);
  } catch (err: any) {
    // High-fidelity fallback portal HTML
    res.removeHeader("X-Frame-Options");
    res.removeHeader("Content-Security-Policy");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OCSC Learning Portal - ศอ.บต.</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Sarabun', sans-serif; }</style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen">
  <header class="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="https://img1.pic.in.th/images/logo-sbpac_436x436.png" class="w-10 h-10 object-contain" alt="SBPAC">
        <div>
          <h1 class="text-base font-extrabold text-amber-400 leading-tight">ศูนย์เรียนรู้อิเล็กทรอนิกส์ ก.พ. / ศอ.บต.</h1>
          <p class="text-xs text-slate-300">OCSC Learning Portal (Southern Border Provinces)</p>
        </div>
      </div>
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1">
        เข้าสู่เว็บไซต์หลัก ↗
      </a>
    </div>
  </header>

  <div class="p-3 bg-amber-500 text-slate-950 text-xs font-semibold text-center border-b border-amber-600">
    ⚡ แสดงผลผ่าน OCSC Interactive Portal Mode (ระบบจำลองการเรียนรู้ออนไลน์ ศอ.บต.)
  </div>

  <main class="max-w-5xl mx-auto p-6 space-y-6">
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
      <div class="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mb-2">
        หลักสูตรเฉพาะจังหวัดชายแดนภาคใต้
      </div>
      <h2 class="text-2xl font-black text-slate-900 mb-2">ระบบพัฒนาข้าราชการและเจ้าหน้าที่ของรัฐในจังหวัดชายแดนภาคใต้</h2>
      <p class="text-sm text-slate-600 leading-relaxed mb-6">
        สำนักงานคณะกรรมการข้าราชการพลเรือน (สำนักงาน ก.พ.) ร่วมกับ ศูนย์อำนวยการบริหารจังหวัดชายแดนภาคใต้ (ศอ.บต.) เปิดให้บริการระบบการเรียนรู้อิเล็กทรอนิกส์ เพื่อเพิ่มพูนความรู้ ความเข้าใจกฎหมาย ภาษามลายูถิ่น พหุวัฒนธรรม และแนวทางการปฏิบัติราชการในพื้นที่
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition">
          <div class="text-xs font-bold text-amber-600 mb-1">OCSC-SBP-001</div>
          <h3 class="font-bold text-base text-slate-800">กฎหมายที่ใช้ในพื้นที่จังหวัดชายแดนภาคใต้</h3>
          <p class="text-xs text-slate-500 mt-1">พ.ร.ก.ฉุกเฉิน, พ.ร.บ.ความมั่นคงฯ และกฎอัยการศึก</p>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition">
          <div class="text-xs font-bold text-emerald-600 mb-1">OCSC-SBP-002</div>
          <h3 class="font-bold text-base text-slate-800">ภาษามลายูถิ่นเบื้องต้น</h3>
          <p class="text-xs text-slate-500 mt-1">คำศัพท์ วลี และประโยคสำหรับบริการประชาชน</p>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition">
          <div class="text-xs font-bold text-indigo-600 mb-1">OCSC-SBP-003</div>
          <h3 class="font-bold text-base text-slate-800">พหุวัฒนธรรมและสังคมจังหวัดชายแดนภาคใต้</h3>
          <p class="text-xs text-slate-500 mt-1">มารยาททางสังคม วิถีชีวิตอิสลาม และอาหารฮาลาล</p>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition">
          <div class="text-xs font-bold text-rose-600 mb-1">OCSC-SBP-004</div>
          <h3 class="font-bold text-base text-slate-800">ประวัติศาสตร์จังหวัดชายแดนภาคใต้</h3>
          <p class="text-xs text-slate-500 mt-1">ประวัติศาสตร์ลังกาสุกะ และมรดกวัฒนธรรมท้องถิ่น</p>
        </div>
      </div>
    </div>

    <div class="text-center pt-4">
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg transition">
        เข้าสู่ระบบเรียน OCSC Portal อย่างเป็นทางการ (Digital ID / ThaID) ↗
      </a>
    </div>
  </main>
</body>
</html>`);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
