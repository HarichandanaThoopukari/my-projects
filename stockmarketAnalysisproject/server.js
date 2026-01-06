const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Comprehensive mock stock data for demonstration
const mockStockData = {
  // IT Sector
  'TCS': { price: 3500, sector: 'IT', recommendation: 'BUY', marketCap: '13.2L Cr', pe: 25.4, dividend: 1.2 },
  'INFY': { price: 1500, sector: 'IT', recommendation: 'HOLD', marketCap: '6.1L Cr', pe: 22.8, dividend: 1.8 },
  'WIPRO': { price: 400, sector: 'IT', recommendation: 'HOLD', marketCap: '2.3L Cr', pe: 18.2, dividend: 2.1 },
  'HCLTECH': { price: 1200, sector: 'IT', recommendation: 'BUY', marketCap: '3.2L Cr', pe: 20.1, dividend: 1.5 },
  'TECHM': { price: 1100, sector: 'IT', recommendation: 'BUY', marketCap: '1.8L Cr', pe: 19.5, dividend: 1.9 },
  'LTIM': { price: 4500, sector: 'IT', recommendation: 'STRONG BUY', marketCap: '1.3L Cr', pe: 28.2, dividend: 0.8 },
  'MPHASIS': { price: 2200, sector: 'IT', recommendation: 'BUY', marketCap: '42K Cr', pe: 24.1, dividend: 1.1 },
  'COFORGE': { price: 4800, sector: 'IT', recommendation: 'HOLD', marketCap: '28K Cr', pe: 26.8, dividend: 0.9 },
  
  // Banking Sector
  'HDFC': { price: 1800, sector: 'Banking', recommendation: 'STRONG BUY', marketCap: '4.8L Cr', pe: 18.5, dividend: 1.4 },
  'ICICIBANK': { price: 900, sector: 'Banking', recommendation: 'BUY', marketCap: '6.2L Cr', pe: 16.2, dividend: 1.8 },
  'SBIN': { price: 550, sector: 'Banking', recommendation: 'BUY', marketCap: '4.9L Cr', pe: 12.8, dividend: 2.2 },
  'KOTAKBANK': { price: 1800, sector: 'Banking', recommendation: 'HOLD', marketCap: '3.4L Cr', pe: 22.1, dividend: 0.9 },
  'AXISBANK': { price: 1100, sector: 'Banking', recommendation: 'BUY', marketCap: '3.2L Cr', pe: 15.6, dividend: 1.6 },
  'INDUSINDBK': { price: 1200, sector: 'Banking', recommendation: 'BUY', marketCap: '1.1L Cr', pe: 18.9, dividend: 1.3 },
  'BANDHANBNK': { price: 200, sector: 'Banking', recommendation: 'HOLD', marketCap: '32K Cr', pe: 14.2, dividend: 2.5 },
  
  // Energy Sector
  'RELIANCE': { price: 2500, sector: 'Energy', recommendation: 'BUY', marketCap: '16.8L Cr', pe: 19.8, dividend: 1.1 },
  'ONGC': { price: 180, sector: 'Energy', recommendation: 'HOLD', marketCap: '2.3L Cr', pe: 8.5, dividend: 4.2 },
  'IOC': { price: 95, sector: 'Energy', recommendation: 'HOLD', marketCap: '1.1L Cr', pe: 6.2, dividend: 5.8 },
  'BPCL': { price: 350, sector: 'Energy', recommendation: 'BUY', marketCap: '75K Cr', pe: 9.1, dividend: 3.2 },
  'HPCL': { price: 280, sector: 'Energy', recommendation: 'HOLD', marketCap: '40K Cr', pe: 7.8, dividend: 4.1 },
  'GAIL': { price: 120, sector: 'Energy', recommendation: 'BUY', marketCap: '78K Cr', pe: 11.2, dividend: 3.5 },
  
  // Telecom Sector
  'BHARTIARTL': { price: 800, sector: 'Telecom', recommendation: 'HOLD', marketCap: '4.5L Cr', pe: 28.5, dividend: 0.6 },
  'JIO': { price: 250, sector: 'Telecom', recommendation: 'BUY', marketCap: '1.8L Cr', pe: 22.1, dividend: 1.2 },
  'VODAFONE': { price: 12, sector: 'Telecom', recommendation: 'SELL', marketCap: '8K Cr', pe: 45.2, dividend: 0.0 },
  
  // FMCG Sector
  'ITC': { price: 450, sector: 'FMCG', recommendation: 'BUY', marketCap: '5.6L Cr', pe: 24.8, dividend: 3.2 },
  'HINDUNILVR': { price: 2500, sector: 'FMCG', recommendation: 'STRONG BUY', marketCap: '5.9L Cr', pe: 65.2, dividend: 1.8 },
  'NESTLEIND': { price: 18000, sector: 'FMCG', recommendation: 'HOLD', marketCap: '1.7L Cr', pe: 78.5, dividend: 1.2 },
  'DABUR': { price: 550, sector: 'FMCG', recommendation: 'BUY', marketCap: '95K Cr', pe: 45.8, dividend: 1.9 },
  'BRITANNIA': { price: 4200, sector: 'FMCG', recommendation: 'BUY', marketCap: '1.0L Cr', pe: 52.1, dividend: 1.4 },
  'MARICO': { price: 480, sector: 'FMCG', recommendation: 'HOLD', marketCap: '62K Cr', pe: 38.9, dividend: 2.1 },
  
  // Pharmaceuticals
  'SUNPHARMA': { price: 1000, sector: 'Pharmaceuticals', recommendation: 'BUY', marketCap: '2.4L Cr', pe: 28.5, dividend: 1.8 },
  'DRREDDY': { price: 5500, sector: 'Pharmaceuticals', recommendation: 'HOLD', marketCap: '92K Cr', pe: 32.1, dividend: 1.2 },
  'CIPLA': { price: 1200, sector: 'Pharmaceuticals', recommendation: 'BUY', marketCap: '98K Cr', pe: 25.8, dividend: 1.5 },
  'BIOCON': { price: 280, sector: 'Pharmaceuticals', recommendation: 'BUY', marketCap: '52K Cr', pe: 35.2, dividend: 0.8 },
  'LUPIN': { price: 800, sector: 'Pharmaceuticals', recommendation: 'HOLD', marketCap: '36K Cr', pe: 28.9, dividend: 1.1 },
  'AUROPHARMA': { price: 950, sector: 'Pharmaceuticals', recommendation: 'BUY', marketCap: '25K Cr', pe: 22.4, dividend: 1.6 },
  
  // Financial Services
  'BAJAJFINSV': { price: 1200, sector: 'Financial Services', recommendation: 'BUY', marketCap: '1.8L Cr', pe: 18.5, dividend: 1.2 },
  'BAJAJHIND': { price: 1400, sector: 'Financial Services', recommendation: 'BUY', marketCap: '85K Cr', pe: 15.8, dividend: 1.8 },
  'BAJAJHINDAL': { price: 1500, sector: 'Financial Services', recommendation: 'BUY', marketCap: '95K Cr', pe: 16.2, dividend: 1.5 },
  'HDFCAMC': { price: 3200, sector: 'Financial Services', recommendation: 'STRONG BUY', marketCap: '1.2L Cr', pe: 42.1, dividend: 0.9 },
  'ICICIGI': { price: 1200, sector: 'Financial Services', recommendation: 'BUY', marketCap: '1.1L Cr', pe: 28.5, dividend: 1.1 },
  'SBILIFE': { price: 1200, sector: 'Financial Services', recommendation: 'HOLD', marketCap: '1.3L Cr', pe: 35.8, dividend: 0.8 },
  
  // Automotive
  'BAJAJ-AUTO': { price: 1300, sector: 'Automotive', recommendation: 'BUY', marketCap: '38K Cr', pe: 18.2, dividend: 2.8 },
  'MARUTI': { price: 9500, sector: 'Automotive', recommendation: 'HOLD', marketCap: '2.8L Cr', pe: 28.5, dividend: 1.2 },
  'TATAMOTORS': { price: 450, sector: 'Automotive', recommendation: 'BUY', marketCap: '1.5L Cr', pe: 15.8, dividend: 1.9 },
  'M&M': { price: 1400, sector: 'Automotive', recommendation: 'BUY', marketCap: '1.7L Cr', pe: 22.1, dividend: 2.2 },
  'HEROMOTOCO': { price: 2800, sector: 'Automotive', recommendation: 'HOLD', marketCap: '56K Cr', pe: 25.8, dividend: 1.8 },
  'EICHERMOT': { price: 3200, sector: 'Automotive', recommendation: 'BUY', marketCap: '88K Cr', pe: 32.5, dividend: 1.4 },
  
  // Steel & Metals
  'BAJAJHINDALSTEEL': { price: 1600, sector: 'Steel', recommendation: 'BUY', marketCap: '52K Cr', pe: 12.8, dividend: 2.5 },
  'TATASTEEL': { price: 120, sector: 'Steel', recommendation: 'HOLD', marketCap: '1.4L Cr', pe: 8.5, dividend: 4.2 },
  'JSWSTEEL': { price: 750, sector: 'Steel', recommendation: 'BUY', marketCap: '1.8L Cr', pe: 15.2, dividend: 1.8 },
  'SAIL': { price: 85, sector: 'Steel', recommendation: 'HOLD', marketCap: '35K Cr', pe: 6.8, dividend: 3.5 },
  'HINDALCO': { price: 450, sector: 'Metals', recommendation: 'BUY', marketCap: '1.0L Cr', pe: 18.5, dividend: 2.1 },
  'VEDL': { price: 280, sector: 'Metals', recommendation: 'HOLD', marketCap: '1.1L Cr', pe: 22.8, dividend: 1.5 },
  
  // Cement
  'ULTRACEMCO': { price: 7500, sector: 'Cement', recommendation: 'BUY', marketCap: '2.1L Cr', pe: 28.5, dividend: 1.2 },
  'SHREECEM': { price: 25000, sector: 'Cement', recommendation: 'HOLD', marketCap: '1.8L Cr', pe: 35.2, dividend: 0.8 },
  'GRASIM': { price: 1800, sector: 'Cement', recommendation: 'BUY', marketCap: '1.2L Cr', pe: 25.8, dividend: 1.9 },
  'AMBUJACEM': { price: 450, sector: 'Cement', recommendation: 'BUY', marketCap: '88K Cr', pe: 22.1, dividend: 2.2 },
  
  // Power & Utilities
  'NTPC': { price: 180, sector: 'Power', recommendation: 'BUY', marketCap: '1.7L Cr', pe: 8.5, dividend: 4.8 },
  'POWERGRID': { price: 220, sector: 'Power', recommendation: 'HOLD', marketCap: '2.1L Cr', pe: 12.2, dividend: 3.5 },
  'ADANIPORTS': { price: 750, sector: 'Infrastructure', recommendation: 'BUY', marketCap: '1.6L Cr', pe: 18.5, dividend: 1.8 },
  'ADANIGREEN': { price: 1200, sector: 'Renewable Energy', recommendation: 'STRONG BUY', marketCap: '1.9L Cr', pe: 45.2, dividend: 0.5 },
  
  // Media & Entertainment
  'ZEEL': { price: 180, sector: 'Media', recommendation: 'HOLD', marketCap: '17K Cr', pe: 28.5, dividend: 1.2 },
  'SUNTV': { price: 450, sector: 'Media', recommendation: 'BUY', marketCap: '18K Cr', pe: 22.8, dividend: 2.1 },
  'NETWORK18': { price: 85, sector: 'Media', recommendation: 'HOLD', marketCap: '8K Cr', pe: 35.2, dividend: 0.8 },
  
  // Real Estate
  'DLF': { price: 450, sector: 'Real Estate', recommendation: 'BUY', marketCap: '1.1L Cr', pe: 25.8, dividend: 1.5 },
  'GODREJPROP': { price: 1200, sector: 'Real Estate', recommendation: 'HOLD', marketCap: '28K Cr', pe: 32.1, dividend: 1.8 },
  'SUNTECK': { price: 380, sector: 'Real Estate', recommendation: 'BUY', marketCap: '12K Cr', pe: 18.5, dividend: 2.2 },
  
  // Airlines & Travel
  'INDIGO': { price: 2200, sector: 'Airlines', recommendation: 'HOLD', marketCap: '88K Cr', pe: 45.2, dividend: 0.0 },
  'SPICEJET': { price: 45, sector: 'Airlines', recommendation: 'SELL', marketCap: '3K Cr', pe: 0, dividend: 0.0 },
  'MAKEMYTRIP': { price: 2800, sector: 'Travel', recommendation: 'BUY', marketCap: '15K Cr', pe: 0, dividend: 0.0 },
  
  // E-commerce & Technology
  'ZOMATO': { price: 85, sector: 'E-commerce', recommendation: 'HOLD', marketCap: '72K Cr', pe: 0, dividend: 0.0 },
  'PAYTM': { price: 650, sector: 'Fintech', recommendation: 'HOLD', marketCap: '42K Cr', pe: 0, dividend: 0.0 },
  'NYKAA': { price: 180, sector: 'E-commerce', recommendation: 'BUY', marketCap: '42K Cr', pe: 0, dividend: 0.0 },
  'POLICYBZR': { price: 1200, sector: 'Fintech', recommendation: 'HOLD', marketCap: '18K Cr', pe: 0, dividend: 0.0 }
};

// Generate investment advice based on portfolio
function generateAdvice(portfolio) {
  const totalStocks = portfolio.length;
  const totalShares = portfolio.reduce((sum, p) => sum + p.shares, 0);
  
  let advice = `📊 PORTFOLIO ANALYSIS REPORT\n`;
  advice += `================================\n\n`;
  advice += `Portfolio Overview:\n`;
  advice += `• Total Stocks: ${totalStocks}\n`;
  advice += `• Total Shares: ${totalShares}\n\n`;
  
  advice += `Stock-wise Analysis:\n`;
  advice += `===================\n`;
  
  portfolio.forEach(stock => {
    const data = mockStockData[stock.symbol] || { 
      price: 'N/A', 
      sector: 'Unknown', 
      recommendation: 'N/A',
      marketCap: 'N/A',
      pe: 'N/A',
      dividend: 'N/A'
    };
    advice += `\n${stock.symbol} (${stock.shares} shares):\n`;
    advice += `• Current Price: ₹${data.price}\n`;
    advice += `• Sector: ${data.sector}\n`;
    advice += `• Recommendation: ${data.recommendation}\n`;
    advice += `• Market Cap: ${data.marketCap}\n`;
    advice += `• P/E Ratio: ${data.pe}\n`;
    advice += `• Dividend Yield: ${data.dividend}%\n`;
    
    if (data.price !== 'N/A') {
      const value = data.price * stock.shares;
      advice += `• Portfolio Value: ₹${value.toLocaleString()}\n`;
    }
  });
  
  advice += `\n\nInvestment Recommendations:\n`;
  advice += `========================\n`;
  
  // Analyze portfolio composition
  const sectors = {};
  portfolio.forEach(stock => {
    const data = mockStockData[stock.symbol];
    if (data) {
      sectors[data.sector] = (sectors[data.sector] || 0) + stock.shares;
    }
  });
  
  advice += `\n1. Portfolio Diversification:\n`;
  Object.entries(sectors).forEach(([sector, shares]) => {
    const percentage = ((shares / totalShares) * 100).toFixed(1);
    advice += `   • ${sector}: ${percentage}% (${shares} shares)\n`;
  });
  
  advice += `\n2. Key Recommendations:\n`;
  
  // Sector-specific recommendations
  Object.entries(sectors).forEach(([sector, shares]) => {
    const percentage = ((shares / totalShares) * 100).toFixed(1);
    if (percentage > 40) {
      advice += `   • ⚠️  ${sector} is over-weighted (${percentage}%) - Consider rebalancing\n`;
    } else if (percentage > 25) {
      advice += `   • ✅ ${sector} allocation looks good (${percentage}%)\n`;
    } else {
      advice += `   • 📊 ${sector} is under-weighted (${percentage}%) - Consider adding more\n`;
    }
  });
  
  // Market cap analysis
  const largeCapStocks = portfolio.filter(stock => {
    const data = mockStockData[stock.symbol];
    return data && data.marketCap && data.marketCap.includes('L Cr');
  }).length;
  
  const midCapStocks = portfolio.filter(stock => {
    const data = mockStockData[stock.symbol];
    return data && data.marketCap && data.marketCap.includes('K Cr') && !data.marketCap.includes('L Cr');
  }).length;
  
  advice += `\n   • Market Cap Distribution: ${largeCapStocks} Large Cap, ${midCapStocks} Mid Cap\n`;
  
  // P/E ratio analysis
  const avgPE = portfolio.reduce((sum, stock) => {
    const data = mockStockData[stock.symbol];
    return sum + (data && data.pe && data.pe !== 'N/A' ? data.pe : 0);
  }, 0) / portfolio.length;
  
  if (avgPE > 0) {
    advice += `   • Average P/E Ratio: ${avgPE.toFixed(1)} ${avgPE > 25 ? '(High - Growth stocks)' : avgPE < 15 ? '(Low - Value stocks)' : '(Moderate)'}\n`;
  }
  
  // Dividend analysis
  const dividendStocks = portfolio.filter(stock => {
    const data = mockStockData[stock.symbol];
    return data && data.dividend && data.dividend > 2;
  }).length;
  
  advice += `   • High Dividend Stocks: ${dividendStocks}/${totalStocks} (${((dividendStocks/totalStocks)*100).toFixed(1)}%)\n`;
  
  advice += `\n3. Risk Assessment:\n`;
  const riskLevel = totalStocks < 5 ? 'HIGH' : totalStocks < 10 ? 'MEDIUM' : 'LOW';
  const diversification = Object.keys(sectors).length < 3 ? 'POOR' : Object.keys(sectors).length < 5 ? 'FAIR' : 'GOOD';
  
  advice += `   • Portfolio Risk: ${riskLevel} (${totalStocks} stocks)\n`;
  advice += `   • Diversification: ${diversification} (${Object.keys(sectors).length} sectors)\n`;
  advice += `   • Concentration Risk: ${Object.values(sectors).some(s => (s/totalShares)*100 > 30) ? 'HIGH' : 'LOW'}\n`;
  
  advice += `\n4. Sector Analysis:\n`;
  Object.entries(sectors).forEach(([sector, shares]) => {
    const percentage = ((shares / totalShares) * 100).toFixed(1);
    const sectorStocks = portfolio.filter(stock => {
      const data = mockStockData[stock.symbol];
      return data && data.sector === sector;
    });
    
    const avgPE = sectorStocks.reduce((sum, stock) => {
      const data = mockStockData[stock.symbol];
      return sum + (data && data.pe && data.pe !== 'N/A' ? data.pe : 0);
    }, 0) / sectorStocks.length;
    
    advice += `   • ${sector}: ${percentage}% (${sectorStocks.length} stocks, Avg P/E: ${avgPE.toFixed(1)})\n`;
  });
  
  advice += `\n5. Next Steps:\n`;
  advice += `   • 📅 Review quarterly performance and rebalance if needed\n`;
  advice += `   • 💰 Consider systematic investment in under-weighted sectors\n`;
  advice += `   • 📈 Monitor market trends and earnings reports\n`;
  advice += `   • 🎯 Set stop-loss levels for high-risk positions\n`;
  advice += `   • 📊 Track portfolio performance against benchmark indices\n`;
  
  return advice;
}

// Routes
app.post('/analyze', (req, res) => {
  try {
    const { portfolio } = req.body;
    
    if (!portfolio || !Array.isArray(portfolio)) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Invalid portfolio data' 
      });
    }
    
    if (portfolio.length === 0) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Portfolio cannot be empty' 
      });
    }
    
    // Generate advice
    const summary = generateAdvice(portfolio);
    
    // Calculate billing (mock)
    const baseCost = 0.50; // $0.50 per portfolio
    const perAdviceCost = 0.10; // $0.10 per stock
    const totalCost = baseCost + (portfolio.length * perAdviceCost);
    
    res.json({
      ok: true,
      result: {
        summary: summary,
        portfolio: portfolio,
        analysisDate: new Date().toISOString()
      },
      billing: {
        amount: totalCost,
        perPortfolio: baseCost,
        perAdvice: perAdviceCost,
        currency: 'USD'
      }
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Internal server error' 
    });
  }
});

app.get('/usage/summary', (req, res) => {
  // Mock usage summary
  res.json({
    totalRequests: 15,
    totalCost: 7.50,
    last24Hours: {
      requests: 3,
      cost: 1.20
    },
    averagePortfolioSize: 4.2,
    mostAnalyzedStocks: ['TCS', 'INFY', 'RELIANCE'],
    lastUpdated: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Stock Consultant Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Ready to analyze portfolios!`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server gracefully...');
  process.exit(0);
});
