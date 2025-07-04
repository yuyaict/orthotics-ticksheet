
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PatientInfoProps {
  hn: string;
  setHn: (hn: string) => void;
  insuranceType: string;
  setInsuranceType: (type: string) => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ hn, setHn, insuranceType, setInsuranceType }) => {
  const insuranceOptions = [
    { value: 'civil_servant', label: 'กรมบัญชีกลาง', group: 'cg' },
    { value: 'universal', label: 'บัตรทอง', group: 'uc' },
    { value: 'universal_disability', label: 'บัตรทอง (คนพิการ)', group: 'uc' },
    { value: 'social_security', label: 'ประกันสังคม', group: 'ss' },
    { value: 'social_security_disability', label: 'ประกันสังคม (ทุพลภาพ)', group: 'ss' },
  ];

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-blue-800 flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-600 rounded"></div>
          ข้อมูลผู้ป่วย
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hn" className="text-sm font-medium text-gray-700">
              หมายเลข HN (Hospital Number)
            </Label>
            <Input
              id="hn"
              placeholder="กรอกหมายเลข HN"
              value={hn}
              onChange={(e) => setHn(e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance" className="text-sm font-medium text-gray-700">
              สิทธิการรักษา
            </Label>
            <Select value={insuranceType} onValueChange={setInsuranceType}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="เลือกสิทธิการรักษา" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {insuranceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientInfo;
