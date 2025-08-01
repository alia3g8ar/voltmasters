import { useState } from 'react';

interface ProductSpecsProps {
  specs: {
    [category: string]: { [key: string]: string };
  };
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  const [activeTab, setActiveTab] = useState(Object.keys(specs)[0]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">مشخصات فنی</h3>
      
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-8 space-x-reverse">
          {Object.keys(specs).map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === category
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-3">
        {Object.entries(specs[activeTab] || {}).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">{key}</span>
            <span className="text-gray-600">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}