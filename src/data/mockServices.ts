
export const serviceDatabase = [
  // การตรวจวินิจฉัย
  { code: 'DX001', name: 'การตรวจร่างกายทั่วไป', price: 300, credit:100 },
  { code: 'DX002', name: 'การตรวจเลือดทั่วไป (CBC)', price: 250, credit:0 },
  { code: 'DX003', name: 'การตรวจปัสสาวะ', price: 100, credit:50 },
  { code: 'DX004', name: 'การตรวจเอกซเรย์ทรวงอก', price: 400, credit:0 },
  { code: 'DX005', name: 'การตรวจอุลตราซาวด์', price: 800, credit:0 },
  { code: 'DX006', name: 'การตรวจ CT Scan', price: 3500, credit:0 },
  { code: 'DX007', name: 'การตรวจ MRI', price: 8000, credit:0 },
  { code: 'DX008', name: 'การตรวจ ECG (คลื่นไฟฟ้าหัวใจ)', price: 200, credit:100 },
  
  // การรักษา
  { code: 'TX001', name: 'การให้น้ำเกลือ', price: 150, credit:50 },
  { code: 'TX002', name: 'การฉีดยาเข้าเส้น', price: 100, credit:30 },
  { code: 'TX003', name: 'การเย็บแผล', price: 500, credit:150 },
  { code: 'TX004', name: 'การทำแผล', price: 200, credit:0 },
  { code: 'TX005', name: 'การผ่าตัดเล็ก', price: 2000, credit:0 },
  { code: 'TX006', name: 'การผ่าตัดใหญ่', price: 15000, credit:1500 },
  { code: 'TX007', name: 'การนวดคลื่นกระแทก', price: 300, credit:80 },
  
  // ยา
  { code: 'MD001', name: 'พาราเซตามอล 500mg', price: 2, credit:0 },
  { code: 'MD002', name: 'แอสไพริน 300mg', price: 3, credit:0 },
  { code: 'MD003', name: 'แอโมซิซิลลิน 500mg', price: 8, credit:0 },
  { code: 'MD004', name: 'โอเมพราโซล 20mg', price: 12, credit:0 },
  { code: 'MD005', name: 'เมทโฟร์มิน 500mg', price: 5, credit:0 },
  { code: 'MD006', name: 'ลิซิโนพริล 10mg', price: 15, credit:0 },
  { code: 'MD007', name: 'ยาแก้ไอ', price: 45, credit:0 },
  { code: 'MD008', name: 'วิตามินรวม', price: 25, credit:0 },
  
  // เวชภัณฑ์
  { code: 'SU001', name: 'ผ้าก๊อซ', price: 10, credit:4 },
  { code: 'SU002', name: 'พลาสเตอร์', price: 5, credit:0 },
  { code: 'SU003', name: 'เข็มฉีดยา', price: 3, credit:0 },
  { code: 'SU004', name: 'ถุงมือยาง', price: 8, credit:0 },
  { code: 'SU005', name: 'หน้ากากอนามัย', price: 2, credit:0 },
  { code: 'SU006', name: 'เครื่องวัดความดัน', price: 50, credit:10 },
  { code: 'SU007', name: 'เทอร์โมมิเตอร์', price: 15, credit:5 },
  
  // ค่าบริการ
  { code: 'SV001', name: 'ค่าห้องพักผู้ป่วยใน (วัน)', price: 1200, credit:1000 },
  { code: 'SV002', name: 'ค่าห้องพิเศษ (วัน)', price: 2500, credit:1500 },
  { code: 'SV003', name: 'ค่าห้องผ่าตัด', price: 5000, credit:2500 },
  { code: 'SV004', name: 'ค่าบริการพยาบาล', price: 300, credit:0 },
  { code: 'SV005', name: 'ค่าอาหารผู้ป่วย', price: 80, credit:20 },
];
