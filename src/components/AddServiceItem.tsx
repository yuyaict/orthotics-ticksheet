import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { ServiceItem } from '@/types/medical';

interface AddServiceItemProps {
  onAddItem: (item: ServiceItem) => void;
  serviceDatabase: { code: string; name: string; price: number; credit: number; cgcode: string; blue_flag_right: string }[];
}

const AddServiceItem: React.FC<AddServiceItemProps> = ({ onAddItem, serviceDatabase }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<{ code: string; name: string; price: number; credit: number; cgcode: string; blue_flag_right: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [filteredServices, setFilteredServices] = useState<{ code: string; name: string; price: number; credit: number; cgcode: string; blue_flag_right: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = serviceDatabase.filter(
        service => 
          service.code.toLowerCase().includes(value.toLowerCase()) ||
          service.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredServices(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredServices([]);
      setShowSuggestions(false);
    }
  };

  const selectService = (service: { code: string; name: string; price: number; credit: number; cgcode: string; blue_flag_right: string }) => {
    setSelectedService(service);
    setSearchTerm(`${service.code} - ${service.name}`);
    setShowSuggestions(false);
  };

  const handleAddItem = () => {
    if (selectedService && quantity > 0) {
      const newItem: ServiceItem = {
        id: Date.now().toString(),
        code: selectedService.code,
        name: selectedService.name,
        blueFlagRights: selectedService.blue_flag_right || 'ไม่มี',
        quantity,
        unitPrice: selectedService.price,
        totalPrice: selectedService.price * quantity,
      };
      onAddItem(newItem);
      setSearchTerm('');
      setSelectedService(null);
      setQuantity(1);
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
          <div className="md:col-span-2 relative">
            <Label htmlFor="service-search" className="text-sm font-medium text-gray-700">
              ค้นหารายการ (รหัสหรือชื่อ)
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="service-search"
                placeholder="พิมพ์รหัสหรือชื่อรายการ..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {showSuggestions && filteredServices.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredServices.slice(0, 10).map((service) => (
                  <div
                    key={service.code}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => selectService(service)}
                  >
                    <div className="font-medium text-sm">{service.code}</div>
                    <div className="text-gray-600 text-sm">{service.name}</div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-blue-600 text-sm font-medium">{service.price.toLocaleString()} บาท</div>
                      <div className="text-green-600 text-sm font-medium">
                        Credit: {service.credit.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-purple-600 text-xs">
                        รหัสเบิก: {service.cgcode || 'ไม่มี'}
                      </div>
                      <div className="text-orange-600 text-xs">
                        สิทธิธงฟ้า: {service.blue_flag_right || 'ไม่มี'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
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
          </div>
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
              <strong>รายการที่เลือก:</strong> {selectedService.code} - {selectedService.name}
            </div>
            <div className="text-sm text-blue-600 font-medium">
              ราคาต่อหน่วย: {selectedService.price.toLocaleString()} บาท | 
              ราคารวม: {(selectedService.price * quantity).toLocaleString()} บาท
            </div>
            <div className="text-sm text-green-600 font-medium">
              Credit: {selectedService.credit.toLocaleString()}
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-purple-600">
                <strong>รหัสเบิก:</strong> {selectedService.cgcode || 'ไม่มี'}
              </div>
              <div className="text-sm text-orange-600">
                <strong>สิทธิธงฟ้า:</strong> {selectedService.blue_flag_right || 'ไม่มี'}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddServiceItem;
