"use client";

import { Button, ChakraProvider, Text, Checkbox, Flex, Input, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { supabase } from "../../../lib/supabase-client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js"
// import { prisma } from "../../../../lib/prisma";

export default async function Kakeibo() {
  
    const kakeibos = await prisma.kakeibo.findMany();
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [isIncome, setIsIncome] = useState(false);
    const [amount, setAmount] = useState('');
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const getUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("ユーザー取得エラー", error);
          return;
        }
        setUser(data.user);  // data.user.id を auth_id として使える
      };
      
      getUser();
    }, []);
      
    
    // 現在日時の文字列の先頭10文字をスライス
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10)); 
    const [sum, setSum] = useState<number>(0)
    // 今月を取得
    const [currentMonth, setCurrentMonth] = useState(() => {
        const today =new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });
    // 前月を取得
    const handlePrevMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() -1, 1));
    }
    
    const addKakeibo = async () => {
        if (!user) return alert('ユーザがログインしていません');
        const data = {
            title: title,
            isIncome: isIncome,
            date: date,
            amount: parseInt(amount),
            auth_id: user.id,
        };

        const response = await fetch('/api/kakeibo', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            alert('保存しました');
        } else { 
            alert('保存に失敗');
        }
    };

    // const updateSum = async () => {
    //     // 現在の月の収支を再計算
    //     const { min, max } = getMonthStartAndEnd(currentMonth);
    //     const { data, error } = await supabase
    //         .from('kakeibo')
    //         .select('amount, isIncome')
    //         .gte('date', min)
    //         .lte('date', max);

    //     if (error) {
    //         console.error(error);
    //         return;
    //     }

    //     const total = data?.reduce((acc, record) => {
    //         return record.isIncome ? acc + record.amount : acc - record.amount;
    //     }, 0) || 0;

    //     setSum(total);
    // };
        
    // 翌月を取得
    const handleNextMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() +1, 1));
    }
  
    const getMonthStartAndEnd = (date: Date) => {
        const start = new Date(date.getFullYear(), date.getMonth(), 2);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 1); // 末日
        return {
        min: start.toISOString().slice(0, 10),
        max: end.toISOString().slice(0, 10),
        };
    };
  
    const { min, max } = getMonthStartAndEnd(currentMonth);

  return (
    <ChakraProvider>
      <div>
        <Text fontSize="2x1">家計簿アプリ</Text>
        <Flex align="center" justifyContent="space-between" my="4">
          <Button onClick={handlePrevMonth}>←</Button>
          <Text fontSize="lg">
            {currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月
          </Text>
          <Button onClick={handleNextMonth}>→</Button>
        </Flex>
        <Box mb="8px">
          <Input
            placeholder="タイトルを入力" 
            mb="4px" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Input 
            placeholder="金額を入力" 
            mb="4px" 
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <Input
            type="date"
            mb="4px"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min = {min}
            max = {max}
          />
          <Flex align="center" justifyContent="space-between">
            <Checkbox 
              onChange={() => setIsIncome(!isIncome)}
              isChecked={isIncome}
            >
              入金
            </Checkbox>
            <Button colorScheme="teal" onClick={addKakeibo}>
              追加  
            </Button>
          </Flex>
        </Box>
        <Text fontSize="xl" mt="4">
          合計: {sum}円  
        </Text>
        </div>
    </ChakraProvider>
  );
}

