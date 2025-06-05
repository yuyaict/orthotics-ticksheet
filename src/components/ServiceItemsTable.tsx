
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
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">ลำดับ</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">รหัสรายการ</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">ชื่อรายการ</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">สิทธิธงฟ้า</th>
                  <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700">จำนวน</th>
                  <th className="border border-gray-200 px-4 py-3 text-right text-sm font-medium text-gray-700">ราคาต่อหน่วย</th>
                  <th className="border border-gray-200 px-4 py-3 text-right text-sm font-medium text-gray-700">ราคารวม</th>
                  <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 px-4 py-3 text-center text-sm">{index + 1}</td>
                    <td className="border border-gray-200 px-4 py-3 text-sm font-medium">{item.code}</td>
                    <td className="border border-gray-200 px-4 py-3 text-sm">{item.name}</td>
                    <td className="border border-gray-200 px-4 py-3 text-sm">{item.blueFlagRights || '-'}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-20 mx-auto text-center border-gray-300"
                      />
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-right text-sm">
                      {item.unitPrice.toLocaleString()} บาท
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-right text-sm font-medium text-blue-600">
                      {item.totalPrice.toLocaleString()} บาท
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
          <div className="mt-6 flex justify-end">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 min-w-64">
              <div className="text-right">
                <div className="text-lg font-semibold text-blue-800">
                  รวมทั้งสิ้น: {totalAmount.toLocaleString()} บาท
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  ({items.length} รายการ)
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
