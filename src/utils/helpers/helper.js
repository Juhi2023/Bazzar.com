export function generateDailyData(apiData) {
  if(!apiData){
    return []
  }
  
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
    // convert API data into a lookup map
    const revenueMap = apiData &&  Object.fromEntries(
      apiData?.map(item => [item.date, item.revenue])
    );
  
    const result = [];
    let current = new Date(start);
  
    while (current <= end) {
      const dateStr = current.toISOString().split("T")[0]; // YYYY-MM-DD
      result.push({
        date: dateStr,
        revenue: revenueMap[dateStr] || 0, // 0 if not in API
      });
      current.setDate(current.getDate() + 1); // next day
    }
  
    return result;
  }

  export const  generateMonthlyData=(apiData = []) =>{
    const year = 2025; // or use new Date().getFullYear()
    const monthlyRevenue = Array(12).fill(0); // Jan → Dec
  
    apiData?.forEach(item => {
      const [itemYear, monthStr] = item.date.split("-");
      const monthIndex = parseInt(monthStr, 10) - 1; // 0-based index
      if (parseInt(itemYear, 10) === year) {
        monthlyRevenue[monthIndex] = item.revenue;
      }
    });
  
    return monthlyRevenue;
  }
  