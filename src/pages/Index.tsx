import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import PatientInfo from '@/components/PatientInfo';
import AddServiceItem from '@/components/AddServiceItem';
import ServiceItemsTable from '@/components/ServiceItemsTable';
import { ServiceItem } from '@/types/medical';
import { serviceDatabase } from '@/data/mockServices';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [hn, setHn] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const { toast } = useToast();

  const handleAddItem = (item: ServiceItem) => {
    // ตรวจสอบรายการซ้ำ
    const isDuplicate = serviceItems.some(existingItem => existingItem.code === item.code);
    
    if (isDuplicate) {
      // แสดง popup แจ้งเตือนสีแดง
      toast({
        title: "พบรายการซ้ำ",
        description: `รายการ ${item.code} - ${item.name} มีอยู่ในตารางแล้ว`,
        variant: "destructive",
      });
      return; // ไม่เพิ่มรายการซ้ำ
    }

    // Add default blueFlagRights if not provided
    const itemWithDefaults = {
      ...item,
      blueFlagRights: item.blueFlagRights || 'ไม่มี',
      cgcode: item.cgcode || '',
      totalCredit: item.credit * item.quantity
    };
    setServiceItems(prev => [...prev, itemWithDefaults]);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setServiceItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
            totalPrice: item.unitPrice * quantity,
            totalCredit: item.credit * quantity
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setServiceItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-700 p-3 rounded-lg">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-900">
                ระบบบันทึกรายการบริการทางการแพทย์
              </h1>
              <p className="text-blue-600 mt-1">
                Medical Services Billing System
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Patient Information */}
          <PatientInfo 
            hn={hn}
            setHn={setHn}
            insuranceType={insuranceType}
            setInsuranceType={setInsuranceType}
          />

          {/* Add Service Item */}
          <AddServiceItem 
            onAddItem={handleAddItem}
            serviceDatabase={serviceDatabase}
          />

          {/* Service Items Table */}
          <ServiceItemsTable 
            items={serviceItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-900 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200">
            ระบบบันทึกรายการบริการทางการแพทย์ | Medical Billing System v1.0
          </p>
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
