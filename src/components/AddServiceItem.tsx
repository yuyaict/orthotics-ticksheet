import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { ServiceItem } from '@/types/medical';

interface AddServiceItemProps {
  onAddItem: (item: ServiceItem) => void;
  serviceDatabase: { code: string; name: string; price: number; cg_credit: number; uc_credit: number; ucx_credit: number; ss_credit: number; ssx_credit: number; cg_code: string; uc_code: string; ss_code: string; blue_flag_right: string; name_eng: string; unit: string; item_group: string; terms_of_use: string }[];
  insuranceType: string;
}

const AddServiceItem: React.FC<AddServiceItemProps> = ({ onAddItem, serviceDatabase, insuranceType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<{ code: string; name: string; price: number; cg_credit: number; uc_credit: number; ucx_credit: number; ss_credit: number; ssx_credit: number; cg_code: string; uc_code: string; ss_code: string; blue_flag_right: string; name_eng: string; unit: string; item_group: string; terms_of_use: string } | null>(null);
  const [quantity, setQuantity] = useState(1.0);
  const [filteredServices, setFilteredServices] = useState<{ code: string; name: string; price: number; cg_credit: number; uc_credit: number; ucx_credit: number; ss_credit: number; ssx_credit: number; cg_code: string; uc_code: string; ss_code: string; blue_flag_right: string; name_eng: string; unit: string; item_group: string; terms_of_use: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Update selected service display when insurance type changes
  useEffect(() => {
    if (selectedService) {
      // Force a re-render by updating the search term to reflect new insurance type
      setSearchTerm(`${selectedService.code} - ${selectedService.name}`);
    }
  }, [insuranceType, selectedService]);

  // Function to get the appropriate billing code based on insurance type
  const getBillingCode = (service: { cg_code: string; uc_code: string; ss_code: string }) => {
    const insuranceOptions = [
      { value: 'civil_servant', label: 'กรมบัญชีกลาง', group: 'cg' },
      { value: 'universal', label: 'บัตรทอง', group: 'uc' },
      { value: 'universal_disability', label: 'บัตรทอง (คนพิการ)', group: 'uc' },
      { value: 'social_security', label: 'ประกันสังคม', group: 'ss' },
      { value: 'social_security_disability', label: 'ประกันสังคม (ทุพลภาพ)', group: 'ss' },
    ];

    const selectedInsurance = insuranceOptions.find(option => option.value === insuranceType);
    const group = selectedInsurance?.group || 'cg'; // Default to 'cg' if no insurance selected

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
        return service.cg_credit === 0 ? 0 : service.price;
      case 'universal':
        return service.uc_credit;
      case 'universal_disability':
        return service.ucx_credit;
      case 'social_security':
        return service.ss_credit;
      case 'social_security_disability':
        return service.ssx_credit;
      default:
        return service.cg_credit; // Default to cg_credit if no insurance selected
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
    // Only show blue flag rights for disability insurance types
    if (insuranceType === 'universal_disability' || insuranceType === 'social_security_disability') {
      return service.blue_flag_right || 'ไม่มี';
    }
    return 'ไม่มี';
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = serviceDatabase.filter(
        service => {
          const searchValue = value.toLowerCase();
          
          // Get the appropriate billing code based on insurance type
          const billingCode = getBillingCode(service).toLowerCase();
          
          return service.code.toLowerCase().includes(searchValue) ||
                 service.name.toLowerCase().includes(searchValue) ||
                 service.name_eng.toLowerCase().includes(searchValue) ||
                 billingCode.includes(searchValue);
        }
      );
      setFilteredServices(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredServices([]);
      setShowSuggestions(false);
    }
  };

  const selectService = (service: { code: string; name: string; price: number; cg_credit: number; uc_credit: number; ucx_credit: number; ss_credit: number; ssx_credit: number; cg_code: string; uc_code: string; ss_code: string; blue_flag_right: string; name_eng: string; unit: string; item_group: string; terms_of_use: string }) => {
    setSelectedService(service);
    setSearchTerm(`${service.code} - ${service.name}`);
    setShowSuggestions(false);
  };

  const handleAddItem = () => {
    if (selectedService && quantity > 0) {
      const creditCeiling = getCreditCeiling(selectedService);
      const displayPrice = getDisplayPrice(selectedService);
      const newItem: ServiceItem = {
        id: Date.now().toString(),
        code: selectedService.code,
        name: selectedService.name,
        unit: selectedService.unit,
        blueFlagRights: getBlueFlagRights(selectedService),
        cgcode: getBillingCode(selectedService),
        credit: creditCeiling,
        quantity,
        unitPrice: displayPrice,
        totalPrice: displayPrice * quantity,
        totalCredit: creditCeiling * quantity,
      };
      onAddItem(newItem);
      setSearchTerm('');
      setSelectedService(null);
      setQuantity(1.0);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-blue-800 flex items-center gap-2">
          <div className="w-2 h-6 bg-green-600 rounded"></div>
          เพิ่มรายการบริการ / เวชภัณฑ์
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-3 relative">
            <Label htmlFor="service-search" className="text-sm font-medium text-gray-700">
              ค้นหารายการจาก (รหัส / ชื่อ / ชื่อภาษาอังกฤษ / รหัสเบิก)
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="service-search"
                placeholder="พิมพ์คำค้น..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {showSuggestions && filteredServices.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredServices.slice(0, 50).map((service) => (
                  <div
                    key={service.code}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => selectService(service)}
                  >
                    <div className="font-medium text-sm">{service.code}</div>
                    <div className="text-gray-600 text-sm">{service.name}</div>
                    <div className="text-gray-500 text-xs italic">{service.name_eng}</div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-blue-600 text-sm font-medium">{getDisplayPrice(service).toLocaleString()} บาท</div>
                      <div className="text-green-600 text-sm font-medium">
                        เบิกได้: {getCreditCeiling(service).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-purple-600 text-xs">
                        รหัสเบิก: {getBillingCode(service)}
                      </div>
                      <div className="text-orange-600 text-xs">
                        หน่วย: {service.unit}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-pink-600 mt-1">
                      <div><strong>ประเภท:</strong> {service.item_group}</div>
                      <div><strong>อายุการใช้งาน:</strong> {service.terms_of_use || 'ไม่มี'}</div>
                    </div>
                    <div className="text-center text-xs text-gray-500 mt-1">
                      สิทธิธงฟ้า: {getBlueFlagRights(service)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          { /*<div>
            <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              จำนวน
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div> */}
          <div>
            <Button 
              onClick={handleAddItem}
              disabled={!selectedService || quantity <= 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มรายการ
            </Button>
          </div>
        </div>
        {selectedService && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-700">
              รายการที่เลือก: <strong> {selectedService.code} </strong> - <strong> {selectedService.name} </strong>
            </div>
            <div className="text-sm text-gray-500 italic mt-1">
              {/* <strong>ชื่อภาษาอังกฤษ:</strong> */}
              {selectedService.name_eng}
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-sm text-gray-500">
                ประเภท: <strong> {selectedService.item_group} </strong>
              </div>
              <div className="text-sm text-pink-600 font-medium">
                {/* <strong>อายุการใช้งาน:</strong> {selectedService.terms_of_use || 'ไม่มี'} */}
                { selectedService.terms_of_use }
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-blue-600 mt-1 font-medium">
                ราคา: <strong> {getDisplayPrice(selectedService).toLocaleString()} </strong> บาท
                {/* | ราคารวม: {(getDisplayPrice(selectedService) * quantity).toLocaleString()} บาท */}
              </div>
              <div className="text-sm text-green-600 mt-1 font-medium">
                เบิกได้: <strong> {getCreditCeiling(selectedService).toLocaleString()} </strong> บาท
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-purple-600">
                รหัสเบิก: <strong> {getBillingCode(selectedService)} </strong>
              </div>
              <div className="text-sm text-orange-600">
                หน่วย: <strong> {selectedService.unit} </strong>
              </div>
            </div>            
            <div className="text-sm text-red-800 text-center mt-2">
              สิทธิธงฟ้า: <strong> {getBlueFlagRights(selectedService)} </strong>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddServiceItem;
