import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/fetch';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
    const { data: { user }, error } = await supabase.auth.api.getUserByCookie(req);

    if (error || !user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error || !user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, isIncome, amount, date } = body;

    if (!title || amount === undefined || !date) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    try {
        const record = await prisma.kakeibo.create({
        data: {
            title,
            isIncome,
            amount: parseInt(amount),
            date: new Date(date),
            auth_id: user.id,
        }
    });

        return NextResponse.json({ message: 'Created', record }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error', error: `${e}` }, { status: 500 });
    }
}
