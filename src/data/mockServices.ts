
export const serviceDatabase = [
  // การตรวจวินิจฉัย
  { code: 'DX001', name: 'การตรวจร่างกายทั่วไป', price: 300, credit: 100, cgcode: '1234', blue_flag_right: 'มี' },
  { code: 'DX002', name: 'การตรวจเลือดทั่วไป (CBC)', price: 250, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'DX003', name: 'การตรวจปัสสาวะ', price: 100, credit: 50, cgcode: '1111', blue_flag_right: '' },
  { code: 'DX004', name: 'การตรวจเอกซเรย์ทรวงอก', price: 400, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'DX005', name: 'การตรวจอุลตราซาวด์', price: 800, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'DX006', name: 'การตรวจ CT Scan', price: 3500, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'DX007', name: 'การตรวจ MRI', price: 8000, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'DX008', name: 'การตรวจ ECG (คลื่นไฟฟ้าหัวใจ)', price: 200, credit: 100, cgcode: '1111', blue_flag_right: 'มี' },
  
  // การรักษา
  { code: 'TX001', name: 'การให้น้ำเกลือ', price: 150, credit: 50, cgcode: '2222', blue_flag_right: 'มี' },
  { code: 'TX002', name: 'การฉีดยาเข้าเส้น', price: 100, credit: 30, cgcode: '8543', blue_flag_right: 'มี' },
  { code: 'TX003', name: 'การเย็บแผล', price: 500, credit: 150, cgcode: '8500', blue_flag_right: 'มี' },
  { code: 'TX004', name: 'การทำแผล', price: 200, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'TX005', name: 'การผ่าตัดเล็ก', price: 2000, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'TX006', name: 'การผ่าตัดใหญ่', price: 15000, credit: 1500, cgcode: '5543', blue_flag_right: 'มี' },
  { code: 'TX007', name: 'การนวดคลื่นกระแทก', price: 300, credit: 80, cgcode: '4685', blue_flag_right: 'มี' },
  
  // ยา
  { code: 'MD001', name: 'พาราเซตามอล 500mg', price: 2, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'MD002', name: 'แอสไพริน 300mg', price: 3, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'MD003', name: 'แอโมซิซิลลิน 500mg', price: 8, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'MD004', name: 'โอเมพราโซล 20mg', price: 12, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'MD005', name: 'เมทโฟร์มิน 500mg', price: 5, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'MD006', name: 'ลิซิโนพริล 10mg', price: 15, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'MD007', name: 'ยาแก้ไอ', price: 45, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'MD008', name: 'วิตามินรวม', price: 25, credit: 0, cgcode: '', blue_flag_right: '' },
  
  // เวชภัณฑ์
  { code: 'SU001', name: 'ผ้าก๊อซ', price: 10, credit: 4, cgcode: '', blue_flag_right: '' },
  { code: 'SU002', name: 'พลาสเตอร์', price: 5, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'SU003', name: 'เข็มฉีดยา', price: 3, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'SU004', name: 'ถุงมือยาง', price: 8, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'SU005', name: 'หน้ากากอนามัย', price: 2, credit: 0, cgcode: '', blue_flag_right: '' },
  { code: 'SU006', name: 'เครื่องวัดความดัน', price: 50, credit: 10, cgcode: '', blue_flag_right: '' },
  { code: 'SU007', name: 'เทอร์โมมิเตอร์', price: 15, credit: 5, cgcode: '', blue_flag_right: '' },
  
  // ค่าบริการ
  { code: 'SV001', name: 'ค่าห้องพักผู้ป่วยใน (วัน)', price: 1200, credit: 1000, cgcode: '5555', blue_flag_right: '' },
  { code: 'SV002', name: 'ค่าห้องพิเศษ (วัน)', price: 2500, credit: 1500, cgcode: '4444', blue_flag_right: 'มี' },
  { code: 'SV003', name: 'ค่าห้องผ่าตัด', price: 5000, credit: 2500, cgcode: '5656', blue_flag_right: '' },
  { code: 'SV004', name: 'ค่าบริการพยาบาล', price: 300, credit: 0, cgcode: '6666', blue_flag_right: '' },
  { code: 'SV005', name: 'ค่าอาหารผู้ป่วย', price: 80, credit: 20, cgcode: '3333', blue_flag_right: 'มี' },

  //กายอุปกรณ์
  { code: 'A0001', name: 'ถุงมือยางสำหรับมือขาดบางส่วน', price: 7470, credit: 5000, cgcode: '8005', blue_flag_right: '' }, 
  { code: 'A0002', name: 'นิ้วเทียม(นิ้วหัวแม่มือ/นิ้วชี้/นิ้วกลาง/นิ้วนาง/นิ้วก้อย)', price: 7520, credit: 5000, cgcode: '8005', blue_flag_right: '' }, 
  { code: 'A0003', name: 'ถุงมือยาง (มากกว่า 2 นิ้ว หรือสำหรับมือขาดบางส่วน)', price: 7640, credit: 5000, cgcode: '8005', blue_flag_right: '' }, 
  { code: 'A0004', name: 'แขนเทียมระดับข้อมือ (เบ้าแขนเทียมและถุงมือยาง) อายุการใช้งาน : ไม่น้อยกว่า 2 ปี', price: 9470, credit: 17200, cgcode: '8005', blue_flag_right: '' }, 
  { code: 'B0001', name: 'แขนเทียมต่ำกว่าระดับศอกส่วนปลายชนิดห้านิ้ว มีระบบการใช้งาน อายุการใช้งาน : ไม่น้อยกว่า 2 ปี', price: 51000, credit: 36500, cgcode: '8101', blue_flag_right: 'มี' }, 
  { code: 'B0002', name: 'แขนเทียมต่ำกว่าระดับศอกส่วนปลายชนิดห้านิ้วไม่มีระบบการใช้งาน อายุการใช้งาน : ไม่น้อยกว่า 2 ปี', price: 26900, credit: 17200, cgcode: '8102', blue_flag_right: '' }, 
  { code: 'B0003', name: 'แขนเทียมต่ำกว่าระดับศอกส่วนปลายชนิดห้านิ้วไม่มีระบบการใช้งาน (เบ้าแขนเทียม ข้อมือและมือสวยงาม) อายุการใช้งาน : ไม่น้อยกว่า 2 ปี', price: 26900, credit: 17200, cgcode: '8102', blue_flag_right: '' }, 
  { code: 'B0004', name: 'แขนเทียมต่ำกว่าระดับศอกชนิดสวยงาม(เบ้าแขนเทียมและถุงมือยาง) อายุการใช้งาน : ไม่น้อยกว่า 2 ปี', price: 9680, credit: 17200, cgcode: '8102', blue_flag_right: 'มี' }, 
  { code: 'B0005', name: 'แขนเทียมต่ำกว่าระดับศอกส่วนปลายชนิดตะขอโลหะ อายุการใช้งาน : ไม่น้อยกว่า 2 ปี', price: 53650, credit: 28500, cgcode: '8103', blue_flag_right: '' }, 

];
