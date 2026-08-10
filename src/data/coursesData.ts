import { Course, VocabularyItem, QuizQuestion } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: "law-sbp",
    title: "กฎหมายที่ใช้ในพื้นที่จังหวัดชายแดนภาคใต้",
    code: "OCSC-SBP-001",
    category: "กฎหมายและระเบียบ",
    color: "amber",
    icon: "Scale",
    searchKeywords: ["กฎหมาย", "ชายแดนภาคใต้", "พ.ร.ก.ฉุกเฉิน", "กฎอัยการศึก", "กอ.รมน.", "อำนาจเจ้าหน้าที่"],
    description: "ศึกษาและเข้าใจโครงสร้างกฎหมายพิเศษ ได้แก่ พ.ร.ก.การบริหารราชการในสถานการณ์ฉุกเฉิน พ.ศ. 2548, พ.ร.บ.ความมั่นคงฯ พ.ศ. 2551 และกฎอัยการศึก เพื่อการปฏิบัติหน้าที่อย่างถูกต้องและชอบด้วยหลักนิติธรรม",
    duration: "6 ชั่วโมง",
    totalChapters: 5,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    progressPercent: 20,
    chapters: [
      {
        id: "law-c1",
        title: "บทที่ 1: ภาพรวมกฎหมายพิเศษในพื้นที่จังหวัดชายแดนภาคใต้",
        durationMinutes: 45,
        content: `
          <h2 class="text-xl font-bold text-amber-900 dark:text-amber-200 mb-3">1. เจตนารมณ์ของการใช้กฎหมายพิเศษ</h2>
          <p class="leading-relaxed mb-4">การบังคับใช้กฎหมายพิเศษในพื้นที่จังหวัดชายแดนภาคใต้ (ครอบคลุมพื้นที่จังหวัดปัตตานี ยะลา นราธิวาส และ 4 อำเภอของจังหวัดสงขลา ได้แก่ จะนะ เทพา นาทวี และสะบ้าย้อย) มีวัตถุประสงค์หลักเพื่อรักษาความสงบเรียบร้อย คุ้มครองความปลอดภัยในชีวิตและทรัพย์สินของประชาชน</p>
          
          <div class="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-200 dark:border-amber-800 my-4 shadow-sm">
            <h3 class="font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
              📌 กฎหมายพิเศษสำคัญ 3 ฉบับที่ต้องรู้
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="bg-white dark:bg-amber-900/30 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                <strong class="text-amber-900 dark:text-amber-100 block mb-1">1. พระราชกำหนดการบริหารราชการในสถานการณ์ฉุกเฉิน พ.ศ. 2548 (พ.ร.ก.ฉุกเฉิน)</strong>
                ใช้บังคับในเขตพื้นที่ที่ประกาศสถานการณ์ฉุกเฉินที่มีความร้ายแรง นายกรัฐมนตรีโดยความเห็นชอบของคณะรัฐมนตรีเป็นผู้ประกาศ
              </li>
              <li class="bg-white dark:bg-amber-900/30 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                <strong class="text-amber-900 dark:text-amber-100 block mb-1">2. พระราชบัญญัติการรักษาความมั่นคงภายในราชอาณาจักร พ.ศ. 2551 (พ.ร.บ.ความมั่นคง)</strong>
                ใช้บังคับในพื้นที่ที่สถานการณ์เริ่มผ่อนคลาย โดยให้อำนาจ กอ.รมน. ในการบริหารจัดการและมีมาตรา 21 สำหรับผู้กลับใจ
              </li>
              <li class="bg-white dark:bg-amber-900/30 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                <strong class="text-amber-900 dark:text-amber-100 block mb-1">3. พระราชบัญญัติกฎอัยการศึก พ.ศ. 2457</strong>
                เป็นอำนาจของฝ่ายทหารในการตรวจค้น ควบคุมตัว และจัดตั้งด่านตรวจในสถานการณ์ความมั่นคงขั้นสูงสุด
              </li>
            </ul>
          </div>
        `
      },
      {
        id: "law-c2",
        title: "บทที่ 2: พ.ร.ก. การบริหารราชการในสถานการณ์ฉุกเฉิน พ.ศ. 2548",
        durationMinutes: 60,
        content: `
          <h2 class="text-xl font-bold text-amber-900 dark:text-amber-200 mb-3">2. อำนาจและขอบเขตตาม พ.ร.ก.ฉุกเฉิน</h2>
          <p class="leading-relaxed mb-4">การใช้อำนาจของเจ้าพนักงานตาม พ.ร.ก.ฉุกเฉิน มีกรอบขั้นตอนที่ต้องปฏิบัติตามกฎหมายเพื่อป้องกันการละเมิดสิทธิมนุษยชน:</p>
          
          <div class="space-y-3 text-sm my-4">
            <div class="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <strong class="text-amber-700 dark:text-amber-400">⏱️ ระยะเวลาการควบคุมตัว:</strong> เจ้าพนักงานสามารถเชิญตัวผู้ต้องสงสัยไว้สอบถามได้ไม่เกิน 7 วัน และหากจำเป็นต้องควบคุมตัวต่อ ต้องขออนุมัติจากศาลเป็นครั้งๆ ครั้งละไม่เกิน 7 วัน รวมแล้วต้องไม่เกิน 30 วัน
            </div>
            <div class="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <strong class="text-amber-700 dark:text-amber-400">🏫 สถานที่ควบคุมตัว:</strong> ต้องไม่ใช่สถานีตำรวจ หรือเรือนจำ โดยจัดให้มีสถานที่ซักถามเฉพาะ เช่น ศูนย์ซักถามประจำหน่วย
            </div>
          </div>
        `
      },
      {
        id: "law-c3",
        title: "บทที่ 3: พ.ร.บ. การรักษาความมั่นคงภายในราชอาณาจักร พ.ศ. 2551",
        durationMinutes: 50,
        content: `
          <h2 class="text-xl font-bold text-amber-900 dark:text-amber-200 mb-3">3. บทบาทของ กอ.รมน. และกระบวนการมาตรา 21</h2>
          <p class="leading-relaxed mb-3">พ.ร.บ.ความมั่นคงฯ มุ่งเน้นการใช้มาตรการทางสังคมและการพัฒนามากกว่าการใช้กำลังทางทหาร โดยมี กองอำนวยการรักษาความมั่นคงภายในราชอาณาจักร (กอ.รมน.) เป็นหน่วยงานหลักในการบูรณาการ</p>
          <div class="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-sm">
            <strong class="text-emerald-800 dark:text-emerald-300 block mb-1">💡 มาตรา 21 (การปรับเปลี่ยนพฤติกรรม):</strong>
            ผู้ต้องหาคดีความมั่นคงที่กลับใจและเข้ามอบตัว ศาลอาจสั่งให้เข้ารับการอบรมตามระยะเวลาที่กำหนดแทนการฟ้องร้องคดีอาญา เพื่อเปิดโอกาสให้กลับมาใช้ชีวิตในสังคมตามปกติ
          </div>
        `
      },
      {
        id: "law-c4",
        title: "บทที่ 4: สิทธิมนุษยชนและการกระบวนการยุติธรรมทางอาญา",
        durationMinutes: 55,
        content: `
          <h2 class="text-xl font-bold text-amber-900 dark:text-amber-200 mb-3">4. การคุ้มครองสิทธิมนุษยชนของประชาชน</h2>
          <p class="leading-relaxed mb-3">เจ้าหน้าที่รัฐต้องตระหนักถึงศักดิ์ศรีความเป็นมนุษย์ โดยปฏิบัติตามมาตรฐานสากล เช่น สิทธิในการแจ้งญาติให้ทราบสถานที่ควบคุมตัว สิทธิได้รับการตรวจร่างกายโดยแพทย์ และสิทธิในการเข้าพบทนายความ</p>
        `
      },
      {
        id: "law-c5",
        title: "บทที่ 5: สรุปและแนวทางการปฏิบัติตามกฎหมายอย่างเคร่งครัด",
        durationMinutes: 40,
        content: `
          <h2 class="text-xl font-bold text-amber-900 dark:text-amber-200 mb-3">5. ข้อควรระวังและแนวทางปฏิบัติ</h2>
          <p class="leading-relaxed">การดำเนินคดีอาญาและการรวบรวมพยานหลักฐานนิติวิทยาศาสตร์ต้องมีความโปร่งใส ตรวจสอบได้ เพื่อสร้างความเชื่อมั่นในระบบยุติธรรมของรัฐ</p>
        `
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
    searchKeywords: ["ภาษามลายู", "มลายูถิ่น", "คำศัพท์", "ยาวี", "การสื่อสาร", "สำเนียงตานี"],
    description: "เรียนรู้คำศัพท์ วลี และบทสนทนาภาษามลายูถิ่น (สำเนียงปัตตานี/ยาวี) ที่จำเป็นสำหรับการสื่อสาร สร้างมิตรภาพ และอำนวยความสะดวกประชาชนของเจ้าหน้าที่รัฐ",
    duration: "8 ชั่วโมง",
    totalChapters: 6,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    progressPercent: 45,
    chapters: [
      {
        id: "malay-c1",
        title: "บทที่ 1: คำทักทายและการแนะนำตัว (Salam & Sapaan)",
        durationMinutes: 50,
        content: `
          <h2 class="text-xl font-bold text-emerald-900 dark:text-emerald-200 mb-3">1. การทักทายสร้างความคุ้นเคย</h2>
          <p class="leading-relaxed mb-3">ภาษามลายูถิ่นชายแดนใต้ (Bahasa Melayu Patani) มีความสำคัญอย่างยิ่งในการทลายกำแพงความระแวงและสร้างความไว้วางใจระหว่างเจ้าหน้าที่กับชาวบ้าน</p>

          <div class="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 my-4 shadow-sm">
            <h3 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">🗣️ บทสนทนาตัวอย่าง:</h3>
            <div class="space-y-2 text-sm">
              <p><strong>เจ้าหน้าที่:</strong> Salamat Pagi (ซาลามัต ปากี) - สวัสดีตอนเช้าครับ</p>
              <p><strong>ชาวบ้าน:</strong> Salamat Pagi... Sehat ko? (ซาลามัต ปากี... ซีฮัต โกะ?) - สวัสดีครับ... สบายดีไหมครับ?</p>
              <p><strong>เจ้าหน้าที่:</strong> Alhamdulillah, Sehat (อัลฮัมดุลิลละฮ์, ซีฮัต) - ขอบคุณพระเจ้า สบายดีครับ</p>
            </div>
          </div>
        `
      },
      {
        id: "malay-c2",
        title: "บทที่ 2: คำศัพท์สำหรับการบริการประชาชนและการติดต่อราชการ",
        durationMinutes: 60,
        content: `
          <h2 class="text-xl font-bold text-emerald-900 dark:text-emerald-200 mb-3">2. ประโยคใช้บ่อย ณ จุดบริการ</h2>
          <ul class="space-y-3 text-sm my-3">
            <li class="p-3 bg-white dark:bg-emerald-900/30 rounded-xl border border-emerald-100 dark:border-emerald-800">
              <strong class="text-emerald-800 dark:text-emerald-300 block">Nak Buat Apa Hari Ni? (นัก บูอัต อาโป ฮารี นี?)</strong>
              แปลว่า: วันนี้ต้องการมาติดต่อทำเรื่องอะไรครับ/ค่ะ?
            </li>
            <li class="p-3 bg-white dark:bg-emerald-900/30 rounded-xl border border-emerald-100 dark:border-emerald-800">
              <strong class="text-emerald-800 dark:text-emerald-300 block">Minta Tengok Kad (มินตอ เตโงะห์ กัด)</strong>
              แปลว่า: ขออนุญาตดูบัตรประชาชนหน่อยครับ
            </li>
            <li class="p-3 bg-white dark:bg-emerald-900/30 rounded-xl border border-emerald-100 dark:border-emerald-800">
              <strong class="text-emerald-800 dark:text-emerald-300 block">Tunggu Sat Na (ตังโกะ ซัต นา)</strong>
              แปลว่า: รอสักครู่นะครับ
            </li>
          </ul>
        `
      },
      {
        id: "malay-c3",
        title: "บทที่ 3: หมวดตัวเลข วัน เวลา และการสอบถามราคา",
        durationMinutes: 45,
        content: `
          <h2 class="text-xl font-bold text-emerald-900 dark:text-emerald-200 mb-3">3. ตัวเลขและการบอกเวลา</h2>
          <p class="text-sm leading-relaxed mb-3">การรู้ตัวเลขช่วยในการสอบถามอายุ วันที่ ยอดเงิน หรือการประสานงาน:</p>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-medium">
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">1 = ซาตู (Satu)</div>
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">2 = ดัว (Dua)</div>
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">3 = ตีกอ (Tiga)</div>
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">4 = อัมปัต (Empat)</div>
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">5 = ลีมอ (Lima)</div>
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">6 = เออนัม (Enam)</div>
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">7 = ตูโจะห์ (Tujuh)</div>
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">8 = ลาปัน (Lapan)</div>
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">9 = ซัมบีลัน (Sembilan)</div>
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">10 = เซอปูลูห์ (Sepuluh)</div>
          </div>
        `
      },
      {
        id: "malay-c4",
        title: "บทที่ 4: คำศัพท์เกี่ยวกับสุขภาพ ความเจ็บป่วย และอุบัติเหตุ",
        durationMinutes: 50,
        content: `
          <h2 class="text-xl font-bold text-emerald-900 dark:text-emerald-200 mb-3">4. คำศัพท์การเจ็บป่วย</h2>
          <p class="text-sm mb-3">Sakit (ซากิต = ปวด/ป่วย), Demam (เดอมัม = เป็นไข้), Ubat (อูบัต = ยา), Rumah Sakit (รูเมาะห์ ซากิต = โรงพยาบาล)</p>
        `
      },
      {
        id: "malay-c5",
        title: "บทที่ 5: การถามทิศทาง และสถานที่ในชุมชน",
        durationMinutes: 40,
        content: `
          <h2 class="text-xl font-bold text-emerald-900 dark:text-emerald-200 mb-3">5. การถามเส้นทาง</h2>
          <p class="text-sm mb-3">Mana (มานอ = ที่ไหน), Kanan (กานัน = ขวา), Kiri (กีรี = ซ้าย), Depan (เดอปัน = ข้างหน้า), Belakang (เบอลากัง = ข้างหลัง)</p>
        `
      },
      {
        id: "malay-c6",
        title: "บทที่ 6: การประยุกต์ใช้ในภารกิจและการสร้างความร่วมมือ",
        durationMinutes: 45,
        content: `
          <h2 class="text-xl font-bold text-emerald-900 dark:text-emerald-200 mb-3">6. การสร้างความมิตรภาพยั่งยืน</h2>
          <p class="text-sm">ใช้คำขอบคุณ "Terima Kasih" และรอยยิ้มเสมอเมื่อปฏิบัติหน้าที่เสร็จสิ้น</p>
        `
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
    searchKeywords: ["พหุวัฒนธรรม", "สังคม", "มุสลิม", "วิถีชีวิต", "อัตลักษณ์", "ฮาลาล", "มัสยิด"],
    description: "สร้างความเข้าใจในความหลากหลายทางวัฒนธรรม วิถีชีวิตอิสลาม ประเพณีท้องถิ่น และข้อควรปฏิบัติ/ข้อห้าม เพื่อการเคารพซึ่งกันและกันและการอยู่ร่วมกันอย่างสันติสุข",
    duration: "5 ชั่วโมง",
    totalChapters: 4,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    progressPercent: 0,
    chapters: [
      {
        id: "mc-c1",
        title: "บทที่ 1: โครงสร้างสังคมพหุวัฒนธรรมชายแดนใต้",
        durationMinutes: 45,
        content: `
          <h2 class="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-3">1. สังคมพหุวัฒนธรรมและการผสมผสาน</h2>
          <p class="leading-relaxed mb-3">จังหวัดชายแดนภาคใต้เป็นพื้นที่พหุวัฒนธรรมที่มีความหลากหลายทางเชื้อชาติ ศาสนา และภาษา ทั้งชาวไทยมุสลิม ไทยพุทธ และไทยเชื้อสายจีน ซึ่งอยู่ร่วมกันอย่างสันติมายาวนาน</p>
        `
      },
      {
        id: "mc-c2",
        title: "บทที่ 2: วิถีชีวิตอิสลามและข้อควรปฏิบัติสำหรับเจ้าหน้าที่รัฐ",
        durationMinutes: 60,
        content: `
          <h2 class="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-3">2. ข้อควรปฏิบัติและข้อห้ามที่สำคัญ</h2>
          
          <div class="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 my-4 shadow-sm text-sm space-y-3">
            <div>
              <strong class="text-indigo-800 dark:text-indigo-300 block mb-1">🍲 1. เรื่องอาหารฮาลาล (Halal):</strong>
              เจ้าหน้าที่ควรจัดอาหารที่มีตราฮาลาลจากสถาบันที่น่าเชื่อถือ และแยกภาชนะในการปรุง/จัดเสิร์ฟอย่างถูกต้อง
            </div>
            <div>
              <strong class="text-indigo-800 dark:text-indigo-300 block mb-1">🕌 2. เวลาละหมาด (Solat) 5 เวลา:</strong>
              ควรหลีกเลี่ยงการจัดประชุมหรือทำกิจกรรมตรงกับเวลาละหมาด โดยเฉพาะเวลาละหมาดวันศุกร์ (ช่วงเวลา 12.00 - 13.30 น.)
            </div>
            <div>
              <strong class="text-indigo-800 dark:text-indigo-300 block mb-1">🤝 3. การปฏิสัมพันธ์และการสัมผัสมือ:</strong>
              การสลามระหว่างชายหญิงที่ไม่ใช่ญาติใกล้ชิดไม่นิยมสัมผัสมือ เจ้าหน้าที่ชายไม่ควรมือโดนตัวสตรีมุสลิม ให้ใช้วิธีโค้งคำนับหรือยกมือทักทายอย่างสุภาพ
            </div>
          </div>
        `
      },
      {
        id: "mc-c3",
        title: "บทที่ 3: ประเพณี วันสำคัญทางศาสนา และพิธีกรรมท้องถิ่น",
        durationMinutes: 45,
        content: `
          <h2 class="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-3">3. ประเพณีและวันสำคัญ</h2>
          <p class="text-sm leading-relaxed mb-2">วันตรุษอีดิลฟิฏรี (วันรายอปอซอ), วันตรุษอีดิลอัฎฮา (วันรายอฮัจญี), เดือนรอมฎอน (เดือนถือศีลอด) และงานชักพระของไทยพุทธ</p>
        `
      },
      {
        id: "mc-c4",
        title: "บทที่ 4: การสื่อสารต่างวัฒนธรรมอย่างสร้างสรรค์",
        durationMinutes: 40,
        content: `
          <h2 class="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-3">4. การสื่อสารด้วยความจริงใจและให้เกียรติ</h2>
          <p class="text-sm">การเปิดใจรับฟัง ปราศจากการอคติ และการเรียนรู้ภาษากันและกันคือหัวใจของความเข้าใจ</p>
        `
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
    searchKeywords: ["ประวัติศาสตร์", "ปัตตานี", "มรดกวัฒนธรรม", "ภูมิปัญญา", "ลังกาสุกะ"],
    description: "เรียนรู้ความเป็นมาทางประวัติศาสตร์ มรดกทางวัฒนธรรม เส้นทางการค้าโบราณ และพัฒนาการทางสังคมของพื้นที่เพื่อสร้างฐานความเข้าใจอันดีในการปฏิบัติราชการ",
    duration: "4 ชั่วโมง",
    totalChapters: 4,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    progressPercent: 10,
    chapters: [
      {
        id: "his-c1",
        title: "บทที่ 1: ยุคอาณาจักรโบราณลังกาสุกะและปัตตานี",
        durationMinutes: 45,
        content: `
          <h2 class="text-xl font-bold text-rose-900 dark:text-rose-200 mb-3">1. ประวัติศาสตร์เมืองลังกาสุกะ</h2>
          <p class="leading-relaxed mb-3">ลังกาสุกะและปัตตานีเดิมเป็นศูนย์กลางการค้าทางทะเลที่เจริญรุ่งเรืองบนคาบสมุทรมลายู มีปฏิสัมพันธ์ทางการค้ากับจีน อินเดีย และอาหรับมาหลายศตวรรษ</p>
        `
      },
      {
        id: "his-c2",
        title: "บทที่ 2: พัฒนาการทางสังคมและการปกครองในอดีต",
        durationMinutes: 50,
        content: `
          <h2 class="text-xl font-bold text-rose-900 dark:text-rose-200 mb-3">2. พัฒนาการระบบการปกครอง</h2>
          <p class="text-sm leading-relaxed mb-3">การเปลี่ยนแปลงการปกครองในอดีต ระบบ 7 หัวเมือง และการปฏิรูปการปกครองในสมัยรัชกาลที่ 5 เพื่อสร้างความเป็นอันหนึ่งอันเดียวกันของประเทศ</p>
        `
      },
      {
        id: "his-c3",
        title: "บทที่ 3: สถาปัตยกรรมและมรดกทางปัญญา (กริช, ผ้าบาติก, เรือกอและ)",
        durationMinutes: 45,
        content: `
          <h2 class="text-xl font-bold text-rose-900 dark:text-rose-200 mb-3">3. ภูมิปัญญาท้องถิ่นอันล้ำค่า</h2>
          <p class="text-sm">มัสยิดวาดีอัลฮุสเซน (มัสยิด 300 ปี), ศิลปะการแกะสลักเรือกอและ, ภูมิปัญญาการทำกริชรามัน และการพิมพ์ผ้าปาเต๊ะ/บาติก</p>
        `
      },
      {
        id: "his-c4",
        title: "บทที่ 4: การถอดบทเรียนประวัติศาสตร์สู่งานพัฒนาปัจจุบัน",
        durationMinutes: 40,
        content: `
          <h2 class="text-xl font-bold text-rose-900 dark:text-rose-200 mb-3">4. ประวัติศาสตร์เพื่อความเข้าใจร่วมกัน</h2>
          <p class="text-sm">การศึกษาประวัติศาสตร์อย่างรอบด้านและเปิดกว้าง เพื่อต่อยอดการพัฒนาและแก้ไขปัญหาอย่างยั่งยืน</p>
        `
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
    searchKeywords: ["แนวปฏิบัติ", "เจ้าหน้าที่รัฐ", "ธรรมมาภิบาล", "การบริการ", "จริยธรรม", "เข้าใจเข้าถึงพัฒนา"],
    description: "กรอบแนวทาง จริยธรรม และหลักธรรมมาภิบาลในการให้บริการประชาชน การยึดมั่นผูกพันกับชุมชน และการอำนวยความยุติธรรมอย่างเป็นธรรมและเสมอภาค",
    duration: "6 ชั่วโมง",
    totalChapters: 5,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    progressPercent: 0,
    chapters: [
      {
        id: "guide-c1",
        title: "บทที่ 1: นโยบายการบริหารและการพัฒนาจังหวัดชายแดนภาคใต้",
        durationMinutes: 50,
        content: `
          <h2 class="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3">1. ยุทธศาสตร์และแนวทางพระราชทาน</h2>
          <p class="leading-relaxed mb-3">เจ้าหน้าที่รัฐต้องน้อมนำยุทธศาสตร์พระราชทาน "เข้าใจ เข้าถึง พัฒนา" และ "ปรัชญาเศรษฐกิจพอเพียง" มาเป็นหลักคิดและหลักปฏิบัติในการทำงานทุกระดับ</p>
        `
      },
      {
        id: "guide-c2",
        title: "บทที่ 2: จรรยาบรรณและจริยธรรมของข้าราชการในพื้นที่พิเศษ",
        durationMinutes: 60,
        content: `
          <h2 class="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3">2. มาตรฐานจริยธรรมและค่านิยมหลัก</h2>
          <div class="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-800 my-3 text-sm space-y-2">
            <div><strong>1. ซื่อสัตย์ สุจริต โปร่งใส:</strong> ปราศจากการทุจริต และการแสวงหาผลประโยชน์โดยมิชอบ</div>
            <div><strong>2. เป็นธรรม ไม่เลือกปฏิบัติ:</strong> ให้บริการประชาชนทุกกลุ่มอย่างเสมอภาค ไม่เลือกอคติทางศาสนาหรือชาติพันธุ์</div>
            <div><strong>3. เป็นมิตร อ่อนน้อมถ่อมตน:</strong> สื่อสารด้วยความสุภาพ ให้เกียรติผู้นำศาสนาและผู้นำท้องถิ่น</div>
          </div>
        `
      },
      {
        id: "guide-c3",
        title: "บทที่ 3: เทคนิคการทำงานร่วมกับผู้นำท้องที่ ผู้นำศาสนา และชุมชน",
        durationMinutes: 45,
        content: `
          <h2 class="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3">3. การสร้างเครือข่ายความร่วมมือ</h2>
          <p class="text-sm">พบปะพูดคุยกับกำนัน ผู้ใหญ่บ้าน โต๊ะอิหม่าม คณะกรรมการมัสยิด และครูสอนศาสนา (โต๊ะครู/ดะโต๊ะ) อย่างสม่ำเสมอ</p>
        `
      },
      {
        id: "guide-c4",
        title: "บทที่ 4: การระงับข้อขัดแย้งและการเจรจาไกล่เกลี่ยขั้นต้น",
        durationMinutes: 55,
        content: `
          <h2 class="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3">4. การไกล่เกลี่ยตามวิถีชุมชน</h2>
          <p class="text-sm">ส่งเสริมการใช้กระบวนการยุติธรรมทางเลือกและการปรับเข้าใจตามหลักศาสนาและประเพณีท้องถิ่น</p>
        `
      },
      {
        id: "guide-c5",
        title: "บทที่ 5: การประเมินผลและการพัฒนาการให้บริการประชาชน",
        durationMinutes: 30,
        content: `
          <h2 class="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3">5. การรับฟังเสียงประชาชน</h2>
          <p class="text-sm">ประเมินความพึงพอใจและปรับปรุงกระบวนการทำงานให้รวดเร็ว โปร่งใส และอำนวยความสะดวกสูงสุด</p>
        `
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
    searchKeywords: ["สิทธิประโยชน์", "เงินตอบแทน", "พ.ศ.บ.", "สวัสดิการ", "บำเหน็จบำนาญ", "เสี่ยงภัย", "เลื่อนขั้นเงินเดือน"],
    description: "รวบรวมระเบียบ เงินตอบแทนพิเศษเสี่ยงภัย (พ.ศ.บ.) โควตาเลื่อนขั้นเงินเดือนพิเศษ สิทธิวันลา สิทธิบำเหน็จบำนาญ และสวัสดิการคุ้มครองเจ้าหน้าที่ปฏิบัติงานในพื้นที่",
    duration: "5 ชั่วโมง",
    totalChapters: 5,
    officialUrl: "https://learningportal.ocsc.go.th/learningportal",
    progressPercent: 30,
    chapters: [
      {
        id: "ben-c1",
        title: "บทที่ 1: เงินเพิ่มสำหรับการปฏิบัติงานในพื้นที่เสี่ยงภัย (พ.ศ.บ.)",
        durationMinutes: 50,
        content: `
          <h2 class="text-xl font-bold text-purple-900 dark:text-purple-200 mb-3">1. สิทธิเงินตอบแทนพิเศษประจำตำแหน่งและพื้นที่</h2>
          <p class="leading-relaxed mb-3">เงินเพิ่มพิเศษสำหรับการปฏิบัติงานประจำในพื้นที่จังหวัดชายแดนภาคใต้ (พ.ศ.บ.) เป็นสวัสดิการที่จัดสรรให้ตามระเบียบกระทรวงการคลัง</p>
          
          <div class="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border border-purple-200 dark:border-purple-800 my-4 shadow-sm text-sm space-y-2">
            <strong class="text-purple-900 dark:text-purple-200 block mb-2">📋 สรุปสิทธิประโยชน์หลัก:</strong>
            <ul class="list-disc pl-5 space-y-1.5">
              <td><strong>เงินตอบแทนพิเศษ (พ.ศ.บ.):</strong> อัตราเดือนละ 2,500 - 5,000 บาท ตามพื้นที่และประเภทตำแหน่งงาน</td>
              <td><strong>โควตาการเลื่อนขั้นเงินเดือนกรณีพิเศษ:</strong> พิจารณาการเลื่อนขั้นเป็นกรณีพิเศษตามสัดส่วนพื้นที่เสี่ยงภัย</td>
              <td><strong>สิทธิการยกเว้นภาษีเงินได้:</strong> เงินเสี่ยงภัย/ค่าตอบแทนพิเศษบางประเภทได้รับการยกเว้นภาษีตามกฎหมาย</td>
              <td><strong>สิทธิวันลาพักผ่อนสะสม:</strong> สามารถสะสมวันลาพักผ่อนประจำปีเพิ่มเติมได้สูงสุดตามระเบียบพฤติการณ์พิเศษ</td>
            </ul>
          </div>
        `
      },
      {
        id: "ben-c2",
        title: "บทที่ 2: โควตาการเลื่อนขั้นเงินเดือนและก้าวหน้าทางวิชาการ",
        durationMinutes: 45,
        content: `
          <h2 class="text-xl font-bold text-purple-900 dark:text-purple-200 mb-3">2. สิทธิความก้าวหน้าในสายงาน</h2>
          <p class="text-sm leading-relaxed mb-3">หลักเกณฑ์การนับเวลาการปฏิบัติราชการทวีคูณ และโควตาพิเศษในการขอปรับระดับตำแหน่งทางวิชาการ/เชี่ยวชาญ</p>
        `
      },
      {
        id: "ben-c3",
        title: "บทที่ 3: ประกันชีวิต ประกันอุบัติเหตุ และการรักษาพยาบาลพิเศษ",
        durationMinutes: 55,
        content: `
          <h2 class="text-xl font-bold text-purple-900 dark:text-purple-200 mb-3">3. สวัสดิการการคุ้มครองชีวิต</h2>
          <p class="text-sm mb-3">สิทธิประโยชน์ประกันกลุ่มการเสียชีวิตและบาดเจ็บจากเหตุการณ์ความไม่สงบ การเบิกจ่ายค่ารักษาพยาบาลส่วนเกิน และทุนการศึกษาบุตร</p>
        `
      },
      {
        id: "ben-c4",
        title: "บทที่ 4: บำเหน็จบำนาญพิเศษและการช่วยเหลือทายาท",
        durationMinutes: 40,
        content: `
          <h2 class="text-xl font-bold text-purple-900 dark:text-purple-200 mb-3">4. การดูแลครอบครัวและทายาท</h2>
          <p class="text-sm">การคำนวณบำเหน็จบำนาญพิเศษกรณีทุพพลภาพหรือเสียชีวิตเนื่องจากการปฏิบัติหน้าที่ราชการ</p>
        `
      },
      {
        id: "ben-c5",
        title: "บทที่ 5: ขั้นตอนการยื่นขอรับสิทธิและการประสานงานหน่วยงานสวัสดิการ",
        durationMinutes: 30,
        content: `
          <h2 class="text-xl font-bold text-purple-900 dark:text-purple-200 mb-3">5. วิธีการยื่นเรื่องเบิกจ่าย</h2>
          <p class="text-sm">คู่มือการเตรียมเอกสารและติดต่อเจ้าหน้าที่ฝ่ายการเงิน/เจ้าหน้าที่บุคลากรประจำสังกัด</p>
        `
      }
    ]
  }
];

export const MALAY_VOCABULARY: VocabularyItem[] = [
  {
    id: "v1",
    malayWord: "Salamat Pagi",
    thaiPhonetic: "ซาลามัต ปากี",
    thaiMeaning: "สวัสดีตอนเช้า",
    category: "คำทักทาย",
    exampleSentence: "Salamat Pagi, nak buat apa hari ni?",
    audioText: "ซาลามัต ปากี"
  },
  {
    id: "v2",
    malayWord: "Salamat Petang",
    thaiPhonetic: "ซาลามัต เปอตัง",
    thaiMeaning: "สวัสดีตอนบ่าย/เย็น",
    category: "คำทักทาย",
    exampleSentence: "Salamat Petang, jemput duduk dulu",
    audioText: "ซาลามัต เปอตัง"
  },
  {
    id: "v3",
    malayWord: "Sapa Nama?",
    thaiPhonetic: "ซาโป นามอ?",
    thaiMeaning: "คุณชื่ออะไร?",
    category: "การสอบถาม",
    exampleSentence: "Sapa nama pok cik?",
    audioText: "ซาโป นามอ"
  },
  {
    id: "v4",
    malayWord: "Nama Saya...",
    thaiPhonetic: "นามอ ซาโย...",
    thaiMeaning: "ฉัน/ผม ชื่อ...",
    category: "แนะนำตัว",
    exampleSentence: "Nama saya Somchai, pegawa kor-or-ro-mon",
    audioText: "นามอ ซาโย"
  },
  {
    id: "v5",
    malayWord: "Terima Kasih",
    thaiPhonetic: "ตรีมอ กาเซะห์",
    thaiMeaning: "ขอบคุณ",
    category: "มารยาท",
    exampleSentence: "Terima kasih banyak-banyak",
    audioText: "ตรีมอ กาเซะห์"
  },
  {
    id: "v6",
    malayWord: "Sama-Sama",
    thaiPhonetic: "ซามอ-ซามอ",
    thaiMeaning: "ยินดีครับ / ไม่เป็นไร",
    category: "มารยาท",
    exampleSentence: "Sama-sama, tidak apa-apa",
    audioText: "ซามอ ซามอ"
  },
  {
    id: "v7",
    malayWord: "Nak Buat Apa?",
    thaiPhonetic: "นัก บูอัต อาโป?",
    thaiMeaning: "ต้องการมาติดต่อทำอะไรครับ/ค่ะ?",
    category: "การบริการ",
    exampleSentence: "Mak cik nak buat apa hari ni?",
    audioText: "นัก บูอัต อาโป"
  },
  {
    id: "v8",
    malayWord: "Minta Tengok Kad",
    thaiPhonetic: "มินตอ เตโงะห์ กัด",
    thaiMeaning: "ขอดูบัตรประชาชนหน่อยครับ",
    category: "การบริการ",
    exampleSentence: "Boleh minta tengok kad?",
    audioText: "มินตอ เตโงะห์ กัด"
  },
  {
    id: "v9",
    malayWord: "Tunggu Sat",
    thaiPhonetic: "ตังโกะ ซัต",
    thaiMeaning: "รอสักครู่",
    category: "การบริการ",
    exampleSentence: "Tunggu sat, saya pergi panggil pegawai",
    audioText: "ตังโกะ ซัต"
  },
  {
    id: "v10",
    malayWord: "Minta Tolong",
    thaiPhonetic: "มินตอ โตลง",
    thaiMeaning: "ขอความช่วยเหลือ",
    category: "การบริการ",
    exampleSentence: "Tolong tulis nama di sini",
    audioText: "มินตอ โตลง"
  },
  {
    id: "v11",
    malayWord: "Sehat Ko?",
    thaiPhonetic: "ซีฮัต โกะ?",
    thaiMeaning: "สบายดีไหม?",
    category: "การทักทาย",
    exampleSentence: "Abe, sehat ko hari ni?",
    audioText: "ซีฮัต โกะ"
  },
  {
    id: "v12",
    malayWord: "Rumah Sakit",
    thaiPhonetic: "รูเมาะห์ ซากิต",
    thaiMeaning: "โรงพยาบาล",
    category: "สถานที่",
    exampleSentence: "Kereta polis hantar ke rumah sakit",
    audioText: "รูเมาะห์ ซากิต"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    courseId: "law-sbp",
    courseTitle: "กฎหมายที่ใช้ในพื้นที่จังหวัดชายแดนภาคใต้",
    question: "เจ้าพนักงานตาม พ.ร.ก.การบริหารราชการในสถานการณ์ฉุกเฉิน พ.ศ. 2548 สามารถเชิญตัวผู้ต้องสงสัยไว้เพื่อสอบถามได้ครั้งแรกไม่เกินกี่วัน?",
    options: [
      "ไม่เกิน 3 วัน",
      "ไม่เกิน 7 วัน",
      "ไม่เกิน 15 วัน",
      "ไม่เกิน 30 วัน"
    ],
    correctOptionIndex: 1,
    explanation: "ตาม พ.ร.ก.ฉุกเฉินฯ เจ้าพนักงานสามารถควบคุมตัวได้ไม่เกิน 7 วัน และหากจำเป็นต้องควบคุมตัวต่อ ต้องขออนุมัติศาลรวมกันแล้วไม่เกิน 30 วัน"
  },
  {
    id: "q2",
    courseId: "law-sbp",
    courseTitle: "กฎหมายที่ใช้ในพื้นที่จังหวัดชายแดนภาคใต้",
    question: "มาตรา 21 แห่ง พ.ร.บ.การรักษาความมั่นคงภายในราชอาณาจักร พ.ศ. 2551 มีวัตถุประสงค์เพื่อเรื่องใด?",
    options: [
      "เพิ่มโทษผู้กระทำผิดคดีความมั่นคง",
      "ให้อำนาจทหารยึดทรัพย์สินทันที",
      "เปิดโอกาสให้ผู้ต้องหาที่กลับใจเข้ารับการอบรมแทนการฟ้องคดีอาญา",
      "ยกเลิกกระบวนการของศาลยุติธรรม"
    ],
    correctOptionIndex: 2,
    explanation: "มาตรา 21 เปิดโอกาสให้ผู้หลงผิดที่กลับตัวกลับใจ เข้ารับการอบรมตามระยะเวลาที่กำหนด เมื่อสำเร็จการอบรม ศาลอาจสั่งให้สิทธิในการฟ้องคดีอาญาเป็นอันระงับไป"
  },
  {
    id: "q3",
    courseId: "malay-basic",
    courseTitle: "ภาษามลายูถิ่นเบื้องต้น",
    question: "คำว่า 'มินตอ เตโงะห์ กัด' (Minta Tengok Kad) ในภาษามลายูถิ่น หมายความว่าอย่างไร?",
    options: [
      "ขอเชิญนั่งรับประทานอาหาร",
      "ขอดูบัตรประชาชนหน่อยครับ/ค่ะ",
      "ขอความช่วยเหลือเร่งด่วน",
      "โปรดลงชื่อในเอกสาร"
    ],
    correctOptionIndex: 1,
    explanation: "มินตอ (ขอ) + เตโงะห์ (ดู) + กัด (บัตร) รวมหมายถึง ขอดูบัตรประชาชน"
  },
  {
    id: "q4",
    courseId: "multiculture",
    courseTitle: "พหุวัฒนธรรมและสังคมจังหวัดชายแดนภาคใต้",
    question: "ช่วงเวลาใดในวันศุกร์ที่เจ้าหน้าที่รัฐควรหลีกเลี่ยงการจัดประชุมหรือกิจกรรมรบกวนประชาชนไทยมุสลิม?",
    options: [
      "ช่วงเช้า 08.00 - 09.00 น.",
      "ช่วงกลางวัน 12.00 - 13.30 น. (เวลาละหมาดวันศุกร์/จุฮ์รี)",
      "ช่วงเย็น 17.00 - 18.00 น.",
      "ช่วงค่ำ 21.00 - 22.00 น."
    ],
    correctOptionIndex: 1,
    explanation: "วันศุกร์ช่วงกลางวันเป็นเวลาละหมาดใหญ่ประจำสัปดาห์ (ละหมาดวันศุกร์) ที่มุสลิมชายจะไปร่วมกันที่มัสยิด เจ้าหน้าที่จึงควรอำนวยความสะดวกและหลีกเลี่ยงนัดหมายช่วงนี้"
  },
  {
    id: "q5",
    courseId: "benefits-officers",
    courseTitle: "สิทธิประโยชน์สำหรับเจ้าหน้าที่ของรัฐในจังหวัดชายแดนภาคใต้",
    question: "เงินตอบแทนพิเศษสำหรับการปฏิบัติงานประจำในพื้นที่จังหวัดชายแดนภาคใต้เรียกสั้นๆ ว่าอะไร?",
    options: [
      "เงิน พ.ศ.บ.",
      "เงิน พ.ร.บ.",
      "เงิน ก.พ.ช.",
      "เงิน พ.ร.ก."
    ],
    correctOptionIndex: 0,
    explanation: "เงิน พ.ศ.บ. คือเงินเพิ่มสำหรับการปฏิบัติงานประจำในพื้นที่จังหวัดชายแดนภาคใต้เพื่อเยียวยาและสร้างขวัญกำลังใจแก่เจ้าหน้าที่"
  }
];
