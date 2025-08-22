import { NextRequest, NextResponse } from 'next/server';

// Simple content-based tag recommender
const domainTags = {
  'healthcare': ['medical', 'clinical', 'patient', 'diagnosis', 'treatment', 'pharmaceutical'],
  'finance': ['trading', 'market', 'investment', 'risk', 'portfolio', 'crypto', 'blockchain'],
  'climate': ['weather', 'temperature', 'environment', 'sustainability', 'carbon', 'renewable'],
  'technology': ['ai', 'ml', 'software', 'hardware', 'computing', 'data-science'],
  'education': ['learning', 'academic', 'research', 'student', 'curriculum', 'assessment'],
  'retail': ['ecommerce', 'sales', 'customer', 'product', 'inventory', 'marketing'],
};

const commonTags = [
  'analytics', 'research', 'dataset', 'analysis', 'statistics', 'visualization',
  'machine-learning', 'deep-learning', 'neural-networks', 'classification',
  'regression', 'clustering', 'time-series', 'nlp', 'computer-vision'
];

function extractKeywords(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  return [...new Set(words)];
}

function recommendTags(title: string, description: string, domain?: string): string[] {
  const keywords = extractKeywords(`${title} ${description}`);
  const recommendations = new Set<string>();

  // Add domain-specific tags
  if (domain) {
    const domainKey = domain.toLowerCase();
    const domainSpecificTags = domainTags[domainKey as keyof typeof domainTags] || [];
    domainSpecificTags.forEach(tag => {
      if (keywords.some(keyword => keyword.includes(tag) || tag.includes(keyword))) {
        recommendations.add(tag);
      }
    });
  }

  // Add common tags based on content
  commonTags.forEach(tag => {
    if (keywords.some(keyword => keyword.includes(tag.replace('-', '')) || tag.includes(keyword))) {
      recommendations.add(tag);
    }
  });

  // Add direct keyword matches
  keywords.forEach(keyword => {
    if (keyword.length > 4 && !keyword.match(/^(the|and|for|with|from|this|that|have|will|been|were|are|was|is|a|an)$/)) {
      recommendations.add(keyword);
    }
  });

  return Array.from(recommendations).slice(0, 8); // Limit to 8 recommendations
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, domain } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const recommendedTags = recommendTags(title, description, domain);

    return NextResponse.json({
      tags: recommendedTags,
      confidence: recommendedTags.length > 0 ? 0.8 : 0.3
    });
  } catch (error) {
    console.error('AI recommendation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate tag recommendations' },
      { status: 500 }
    );
  }
}