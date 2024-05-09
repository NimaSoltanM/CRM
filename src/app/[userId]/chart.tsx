'use client';

import { CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const chartData = [
  { date: '2024-05-09', visitCount: 15 },
  { date: '2024-05-08', visitCount: 12 },
  { date: '2024-05-07', visitCount: 18 },
  { date: '2024-05-06', visitCount: 10 },
  { date: '2024-05-05', visitCount: 20 },
];

export default function Chart() {
  return (
    <div className='hidden lg:block'>
      <CardContent>
        <LineChart data={chartData} height={450} width={700}>
          <Line type='monotone' dataKey='visitCount' stroke='#737373' />
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </CardContent>
    </div>
  );
}
