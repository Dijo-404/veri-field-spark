import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const domain = searchParams.get('domain');
    const verified = searchParams.get('verified');
    const tags = searchParams.get('tags');

    let query = supabase
      .from('datasets')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (domain) {
      query = query.eq('domain', domain);
    }

    if (verified === 'true') {
      query = query.eq('verified', true);
    }

    if (tags) {
      const tagArray = tags.split(',');
      query = query.overlaps('tags', tagArray);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch datasets' }, { status: 500 });
    }

    return NextResponse.json({ datasets: data || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('datasets')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to create dataset' }, { status: 500 });
    }

    return NextResponse.json({ dataset: data }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}