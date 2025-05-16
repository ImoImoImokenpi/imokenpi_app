"use client";

import React, { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import KakeiboList from "../../../components/KakeiboList";
import { fetchKakeibosByMonth, addKakeibo } from "../../api/kakeiboApi/fetch";
import Link from "next/link";

const KakeiboPage = () => {
  const [kakeibo, setKakeibo] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isIncome, setIsIncome] = useState(false);


  const getKakeibos = async (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const kakeibo = await fetchKakeibosByMonth(year, month);
    setKakeibo(kakeibo); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseInt(amount);
    if (!title || isNaN(parsedAmount)){
      alert("正しい値を入力してください")
      return;
    };

    const added = await addKakeibo(title, isIncome, date, parsedAmount);
    if (added) {
      setKakeibo([...kakeibo, ...added]);
      setTitle("");
      setAmount("");
      setDate(new Date().toISOString().slice(0, 10));
      setIsIncome(false);
    }
  };

  // 前月と翌月の表示
  const [currentMonth, setCurrentMonth] = useState(() => {
      const today =new Date();
      return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };  

  useEffect(() => {
    getKakeibos(currentMonth);
  }, [currentMonth]);

  // 日付入力のカレンダー表示
  const getMonthStartAndEnd = (date: Date) => {
      const start = new Date(date.getFullYear(), date.getMonth(), 2);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 1); // 末日
      return {
      min: start.toISOString().slice(0, 10),
      max: end.toISOString().slice(0, 10),
      };
  };
  const { min, max } = getMonthStartAndEnd(currentMonth);

  const filteredKakeibo = kakeibo.filter((item: any) => {
    return item.date >= min && item.date <= max;
  });

  const total = filteredKakeibo
    .filter((item: any) => !item.isIncome)
    .reduce((sum: number, item: any) => sum + item.amount, 0)

  return (
    <>
      <Header />
      <section className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">家計簿</h3>
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={handlePrevMonth}
            className="text-2xl w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full shadow flex items-center justify-center"
          >
            ⬅
          </button>
          <span className="text-lg font-medium">
            {currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月
          </span>
          <button 
            onClick={handleNextMonth}
            className="text-2xl w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full shadow flex items-center justify-center"
          >
            ➡
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4 px-2">
            <input
              placeholder="タイトルを入力"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <input
              placeholder="金額を入力"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={min}
              max={max}
            />
            {/* <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isIncome}
                onChange={() => setIsIncome(!isIncome)}
                className="w-4 h-4"
              />
              <span>入金</span>
            </label> */}
            <button
              type="submit"
              className="w-full py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              追加
            </button>
          </form>
        </div>
        <br />
        <KakeiboList kakeibo={kakeibo} onDelete={() => getKakeibos(currentMonth)} />
        <section className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">今月の合計</h4>
          <p>支出：<span className="font-bold">{total.toLocaleString()}円</span></p>
        </section>
      </section>
      <br />
      <div className="flex justify-end">
        <Link href="/" className="bg-gray-100 text-teal-500 px-4 py-2 rounded hover:bg-green-100 transition">
          ホームへ戻る
        </Link>
      </div>
    </>
  );
}

export default KakeiboPage;
