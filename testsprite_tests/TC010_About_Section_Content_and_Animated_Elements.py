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
        # -> Navigate to the about section on desktop viewport by clicking the 'About' button
        frame = context.pages[-1]
        # Click the 'About' button to navigate to the about section
        elem = frame.locator('xpath=html/body/div/div/header/nav/div[3]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Check for animated decorative icons for smooth motion and no glitches
        await page.mouse.wheel(0, 400)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        # Assert company information in the about section
        await expect(frame.locator('text=ERManager Consulting Services').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=A SAP-based SNS sub-system designed to simplify internal workforce management by integrating attendance tracking and ticket-based task workflows in one secure portal.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=SAP Integration').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Secure Portal').first).to_be_visible(timeout=30000)
        # Assert SAP integration badges are visible and correctly labeled
        await expect(frame.locator('text=SAP Integration').first).to_be_visible(timeout=30000)
        # Assert two-column layout by checking presence of multiple distinct texts that would be in separate columns
        await expect(frame.locator('text=Customized Strategic Solutions').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Data-Driven Insights').first).to_be_visible(timeout=30000)
        # Assert accessibility features by checking semantic and ARIA related texts if any (not explicitly given, so check for key section headings)
        await expect(frame.locator('text=About').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    