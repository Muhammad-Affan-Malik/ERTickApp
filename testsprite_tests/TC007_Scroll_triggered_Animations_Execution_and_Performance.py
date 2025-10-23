import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:4173", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Scroll vertically through the entire landing page to trigger animations.
        await page.mouse.wheel(0, 1000)
        

        # -> Continue scrolling down to trigger animations in all major sections and observe animation behavior.
        await page.mouse.wheel(0, 1000)
        

        # -> Continue scrolling down to trigger animations in all major sections and observe animation behavior.
        await page.mouse.wheel(0, 1000)
        

        # -> Scroll further down to reveal the footer section and observe its animation behavior.
        await page.mouse.wheel(0, 500)
        

        # -> Confirm animations do not repeat on re-entry by scrolling back up and down. Observe smoothness and performance during this process.
        await page.mouse.wheel(0, -1500)
        

        # -> Scroll down again to confirm animations remain smooth and do not repeat, while monitoring performance.
        await page.mouse.wheel(0, 1500)
        

        # -> Perform a final scroll through the page slowly to observe animation smoothness and confirm no jank or performance issues during transitions.
        await page.mouse.wheel(0, -1000)
        

        await page.mouse.wheel(0, 1000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=One Work Platform To Manage Attendance & Tasks Effortlessly').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Seamless Ticketing, Smarter Support').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Real-time updates').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Simplified workflow').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Insightful reports').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Overview').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Attendance').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Incident Management').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Leave Requests').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Requirements').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ticket Chat').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ticket Status').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Time Tracking').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Agent Dashboard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Customized Strategic Solutions').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=In-Depth Expertise').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Data-Driven Insights').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Who We Are').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ERManager Implementation & Support').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ERTickAPP').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=About ERManager Consulting Services').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Seamless Ticketing, Smarter Support transform the way you manage support').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contact Us').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Website: https://ermanagercs.com/').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Phone: +923352828371').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Head Office Address').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Plot# 225/1/ P.E.C.H.S Block 2, Karachi, Sindh,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pakistan.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Days Open').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Monday to Friday 9:00 am to 6:00 pm').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=© 2025, Designed and Developed by').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    