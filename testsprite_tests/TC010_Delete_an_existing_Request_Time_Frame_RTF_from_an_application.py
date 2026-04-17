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

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:3000
        await page.goto("http://localhost:3000")
        
        # -> Open the Sign Up page by clicking the 'Sign Up' link in the header.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[2]/div/header/div/div/nav/div/div[3]/div[2]/a[2]').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Fill the signup form with UUID-based username and email, set a valid password, and submit the Create button.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[2]/form/div/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('testuser_a3f9b2f8-6b4d-4d5e-9f3c-2a1d4e5f6b7c')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[2]/form/div[2]/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('testuser_a3f9b2f8-6b4d-4d5e-9f3c-2a1d4e5f6b7c@appcrons-test.com')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[2]/form/div[3]/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('Password123!')
        
        # -> Submit the signup form by clicking the 'Create' button.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[2]/form/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Open the Create Application modal by clicking the 'New Application' button so we can create an app with UUID-based name and URL.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[3]/main/div/div/div/div[3]/div/div/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Fill the Application Name and URL fields with UUID-based values, then choose a Request Interval (select). Stop after setting the dropdown so the page can reflect any dependent changes before submitting.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/form/div/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('testapp_9c8f7e6d-5b4a-4321-9f0e-1d2c3b4a5e6f')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/form/div[2]/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('https://testapp-9c8f7e6d-5b4a-4321-9f0e-1d2c3b4a5e6f.appcrons-test.com/active')
        
        # -> Click the Submit button to create the application and wait for the app details page to load so I can add a Request Time Frame (select timezone first).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/form/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Enable the newly created application by toggling the enable switch so we can proceed to the application details and add a Request Time Frame.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/div/div[2]/div/label/div/input').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Close the enable-application modal (click the 'Skip' button) to reveal the application details page so we can add a Request Time Frame.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/div/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Click the 'Finish' button to close the modal and reveal the application details page so I can add a Request Time Frame (select timezone first).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/div/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Open the Add Request Time Frame modal by clicking the 'New' button, then select the timezone first (stop after setting timezone so dependent fields render).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[15]/main/div/div/div/div[3]/div/div/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Select a valid Start time, select a valid End time later than Start, then submit the Add Request Time Frame form to create the RTF.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[3]/div/div[2]/div/form/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Click the 'Delete' button in the confirmation dialog to confirm deletion of the Africa/Cairo 06:00AM - 11:00PM Request Time Frame.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[3]/div/div[2]/form/div[2]/button[2]').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        assert await frame.locator("xpath=//*[contains(., 'Request time frame deleted')]").nth(0).is_visible(), "A success notification saying 'Request time frame deleted' should be visible after confirming deletion.",
        assert not await frame.locator("xpath=//*[contains(., 'Africa/Cairo 06:00AM - 11:00PM')]").nth(0).is_visible(), "The Africa/Cairo 06:00AM - 11:00PM request time frame should no longer be visible in the list after confirming deletion."]}
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    