
import React, { useState, useEffect } from 'react';
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

  // Function to get the appropriate billing code based on insurance type
  const getBillingCode = (service: { cg_code: string; uc_code: string; ss_code: string }) => {
    const insuranceOptions = [
      { value: 'civil_servant', label: 'กรมบัญชีกลาง', group: 'cg' },
      { value: 'pay_yourself', label: 'จ่ายเอง', group: 'cg' },
      { value: 'foreigners', label: 'ชาวต่างชาติ', group: 'cg' },
      { value: 'bank_of_thailand', label: 'ธนาคารแห่งประเทศไทย', group: 'cg' },
      { value: 'universal', label: 'บัตรทอง', group: 'uc' },
      { value: 'universal_disability', label: 'บัตรทอง (คนพิการ)', group: 'uc' },
      { value: 'social_security', label: 'ประกันสังคม', group: 'ss' },
      { value: 'social_security_disability', label: 'ประกันสังคม (ทุพลภาพ)', group: 'ss' },
    ];

    const selectedInsurance = insuranceOptions.find(option => option.value === insuranceType);
    const group = selectedInsurance?.group || 'cg';

    switch (group) {
      case 'uc':
        return service.uc_code || 'ไม่มี';
      case 'ss':
        return service.ss_code || 'ไม่มี';
      default:
        return service.cg_code || 'ไม่มี';
    }
  };

  // Function to get the appropriate credit ceiling based on insurance type
  const getCreditCeiling = (service: { cg_credit: number; uc_credit: number; ucx_credit: number; ss_credit: number; ssx_credit: number; price: number }) => {
    switch (insuranceType) {
      case 'civil_servant':
        return service.cg_credit;
      case 'pay_yourself':
        return 0;
      case 'foreigners':
        return 0;
      case 'bank_of_thailand':
        return service.price;
      case 'universal':
        return service.uc_credit;
      case 'universal_disability':
        return service.ucx_credit;
      case 'social_security':
        return service.ss_credit;
      case 'social_security_disability':
        return service.ssx_credit;
      default:
        return service.cg_credit;
    }
  };

  // Function to get the display price based on insurance type
  const getDisplayPrice = (service: { price: number }) => {
    if (insuranceType === 'foreigners') {
      return service.price * 1.25; // 25% increase for foreigners
    }
    return service.price;
  };

  // Function to get blue flag rights based on insurance type
  const getBlueFlagRights = (service: { blue_flag_right: string }) => {
    if (insuranceType === 'universal_disability' || insuranceType === 'social_security_disability') {
      return service.blue_flag_right || 'ไม่มี';
    }
    return 'ไม่มี';
  };

  // Update service items when insurance type changes
  useEffect(() => {
    if (insuranceType && serviceItems.length > 0) {
      const updatedItems = serviceItems.map(item => {
        // Find the service in database to get updated values
        const serviceData = serviceDatabase.find(service => service.code === item.code);
        if (serviceData) {
          const newCredit = getCreditCeiling(serviceData);
          const newPrice = getDisplayPrice(serviceData);
          return {
            ...item,
            blueFlagRights: getBlueFlagRights(serviceData),
            cgcode: getBillingCode(serviceData),
            credit: newCredit,
            unitPrice: newPrice,
            totalPrice: newPrice * item.quantity,
            totalCredit: newCredit * item.quantity
          };
        }
        return item;
      });
      setServiceItems(updatedItems);
    }
  }, [insuranceType]);

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
      unit: item.unit || '',
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
            insuranceType={insuranceType}
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
