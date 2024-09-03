import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export  async function GET() {
  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true, // Run in headless mode for faster performance
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Replace with your target URL
  const url = 'https://dshm.delhi.gov.in/mis/(S(c4wufkn4rlcyxyfv1qpqj3zp))/Private/frmFreeBedMonitoringReport.aspx'; // The URL where your table is located
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Scrape the table data
  const tableData = await page.evaluate(() => {
    // Get the rows from the table
    const rows = Array.from(document.querySelectorAll('table.DataGridBody tr'));

    // Extract data from each row
    return rows.map(row => {
      const columns = Array.from(row.querySelectorAll('td'));
      return {
        hospitalID: columns[0]?.innerText.trim() || '',
        hospitalName: columns[1]?.innerText.trim() || '',
        totalFreeBed: columns[2]?.innerText.trim() || '',
        totalFreeCriticalBedWithoutVentilator: columns[3]?.innerText.trim() || '',
        totalFreeCriticalBedWithVentilator: columns[4]?.innerText.trim() || '',
        totalFreeNonCriticalBed: columns[5]?.innerText.trim() || '',
        availableFreeCriticalBedWithoutVentilator: columns[6]?.innerText.trim() || '',
        availableFreeCriticalBedWithVentilator: columns[7]?.innerText.trim() || '',
        availableFreeNonCriticalBed: columns[8]?.innerText.trim() || '',
        hospitalPhoneNumber: columns[9]?.innerText.trim() || '',
        contactPersonName: columns[10]?.innerText.trim() || '',
      };
    });
  });

  // Close Puppeteer
  await browser.close();

  // Respond with the scraped data
  return NextResponse.json({
    status:200,
    tableData: tableData
  })
}
