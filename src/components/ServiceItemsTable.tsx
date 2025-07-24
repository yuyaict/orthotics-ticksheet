
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit3 } from 'lucide-react';
import { ServiceItem } from '@/types/medical';

interface ServiceItemsTableProps {
  items: ServiceItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const ServiceItemsTable: React.FC<ServiceItemsTableProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
  
  // Calculate total credit with condition: if totalCredit > totalPrice, use totalPrice instead
  const totalCredit = items.reduce((sum, item) => {
    const creditToUse = item.totalCredit > item.totalPrice ? item.totalPrice : item.totalCredit;
    return sum + creditToUse;
  }, 0);

  // Calculate total deduction for items with blue flag rights
  const totalDeduction = items.reduce((sum, item) => {
    if (item.blueFlagRights && item.blueFlagRights !== 'ไม่มี' && item.blueFlagRights !== '-') {
      const deduction = item.totalPrice - item.totalCredit;
      return sum + (deduction > 0 ? deduction : 0);
    }
    return sum;
  }, 0);

  // Calculate excess payment (total amount - total credit - total deduction)
  const excessPayment = totalAmount - totalCredit - totalDeduction;

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-blue-800 flex items-center gap-2">
          <div className="w-2 h-6 bg-purple-600 rounded"></div>
          รายการบริการทั้งหมด
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            ยังไม่มีรายการบริการ กรุณาเพิ่มรายการใหม่
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {/* <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">ลำดับ</th> */}
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">รหัสรายการ</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">รหัสเบิก</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">ชื่อรายการ</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">หน่วย</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">สิทธิธงฟ้า</th>
                  <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700">จำนวน</th>
                  <th className="border border-gray-200 px-4 py-3 text-right text-sm font-medium text-gray-700">ราคาต่อหน่วย</th>
                  <th className="border border-gray-200 px-4 py-3 text-right text-sm font-medium text-gray-700">เบิกได้</th>
                  <th className="border border-gray-200 px-4 py-3 text-right text-sm font-medium text-gray-700">ราคารวม</th>
                  <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    {/* <td className="border border-gray-200 px-4 py-3 text-center text-sm">{index + 1}</td> */}
                    <td className="border border-gray-200 px-4 py-3 text-sm font-medium">{item.code}</td>
                    <td className="border border-gray-200 px-4 py-3 text-sm">{item.cgcode || '-'}</td>
                    <td className="border border-gray-200 px-4 py-3 text-sm">{item.name}</td>
                    <td className="border border-gray-200 px-4 py-3 text-sm">{item.unit}</td>
                    <td className="border border-gray-200 px-4 py-3 text-sm">{item.blueFlagRights || '-'}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      <Input
                        type="number"
                        value={item.quantity}
                        min="0.1"
                        max="100"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          
                          // หากเป็นค่าว่างให้ตั้งเป็น 0
                          if (inputValue === '' || inputValue === '00' || inputValue === '000') {
                            onUpdateQuantity(item.id, 1);
                            return;
                          }
                          
                          const value = parseFloat(inputValue);
                          
                          // หากไม่ใช่ตัวเลขหรือเป็นค่าติดลบ ไม่ให้อัพเดต
                          //if (isNaN(value) || value < 0) return;
                          if (isNaN(value) || value < 0) {
                            onUpdateQuantity(item.id, 1);
                            return;
                          } 
                          
                          // ปัดเศษให้เหลือทศนิยม 1 ตำแหน่ง
                          const roundedValue = Math.round(value * 10) / 10;
                          onUpdateQuantity(item.id, roundedValue);
                        }}
                        onWheel={(e) => e.currentTarget.blur()} // ปิดการ scroll mouse
                        onKeyDown={(e) => {
                          // ปิดการใช้ลูกศรขึ้นลงในการเปลี่ยนค่า
                          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                            e.preventDefault();
                          }
                        }}
                        className="w-20 mx-auto text-center border-gray-300"
                      />
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-right text-sm">
                      {item.unitPrice.toLocaleString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-right text-sm text-green-600 font-medium">
                      {item.totalCredit.toLocaleString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-right text-sm font-medium text-blue-600">
                      {item.totalPrice.toLocaleString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {items.length > 0 && (
          <div className="mt-6">
            {/* Desktop and Tablet Layout */}
            <div className="hidden md:flex justify-end gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
                <div className="text-right">
                  <div className="text-lg font-semibold text-blue-800">
                    รวมทั้งสิ้น: {totalAmount.toLocaleString()} บาท
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    ({items.length} รายการ)
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full">
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-800">
                    รวมเบิกได้: {totalCredit.toLocaleString()} บาท
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    (เพดานเบิกที่ใช้ได้จริง)
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 w-full">
                <div className="text-right">
                  <div className="text-lg font-semibold text-purple-800">
                    รวมลดหย่อนได้: {totalDeduction.toLocaleString()} บาท
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    (สำหรับรายการที่มีสิทธิธงฟ้า)
                  </div>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full">
                <div className="text-right">
                  <div className="text-lg font-semibold text-red-800">
                    รวมส่วนเกินสิทธิ: {excessPayment.toLocaleString()} บาท
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    (ยอดที่ต้องชำระจริง)
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-800">
                    รวมทั้งสิ้น: {totalAmount.toLocaleString()} บาท
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    ({items.length} รายการ)
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-800">
                    รวมเบิกได้: {totalCredit.toLocaleString()} บาท
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    (เพดานเบิกที่ใช้ได้จริง)
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-800">
                    รวมลดหย่อนได้: {totalDeduction.toLocaleString()} บาท
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    (สำหรับรายการที่มีสิทธิธงฟ้า)
                  </div>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-800">
                    รวมส่วนเกินสิทธิ: {excessPayment.toLocaleString()} บาท
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    (ยอดที่ต้องชำระจริง)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceItemsTable;
