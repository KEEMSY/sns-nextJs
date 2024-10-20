import React from 'react';
import { dummyMarketItems, MarketItem } from '../lib/dummyData';
import Image from 'next/image';

interface ClubMarketProps {
  clubId: string;
}

const ClubMarket: React.FC<ClubMarketProps> = ({ clubId }) => {
  const marketItems = dummyMarketItems.filter(item => item.clubId === clubId);

  return (
    <div className="space-y-4">
      {marketItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {marketItems.map((item: MarketItem) => (
            <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow">
              <Image src={item.image} alt={item.name} width={300} height={160} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{item.description}</p>
              <p className="text-lg font-bold text-white">{item.price.toLocaleString()}원</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">현재 등록된 마켓 아이템이 없습니다.</p>
      )}
    </div>
  );
};

export default ClubMarket;
