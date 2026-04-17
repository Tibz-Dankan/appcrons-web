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
        
        # -> Open the Sign Up page so we can create a fresh account.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[2]/div/header/div/div/nav/div/div[3]/div[2]/a[2]').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Fill the signup form with UUID-based username and email, set a valid password, and submit the form by clicking the Create button.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[2]/form/div/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('testuser_8f3e2c9b-1a4f-4c6d-9a4b-2e5f7c8a9b0c')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[2]/form/div[2]/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('testuser_8f3e2c9b-1a4f-4c6d-9a4b-2e5f7c8a9b0c@appcrons-test.com')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[2]/form/div[3]/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('Password123!')
        
        # -> Click the Create button to submit the signup form and create a fresh account.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[2]/form/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Open the 'New' app creation flow from the dashboard by clicking the 'New' button so we can create a new application.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[3]/header/div/div[2]/div[3]/div/div/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Fill the New Application form with UUID-based Application Name and URL, choose a Request Interval, and submit the form (click Submit).
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/form/div/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('app_3b2e1f9a-7c4d-40e2-9f88-5b6a1c2d3e4f')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/form/div[2]/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('https://app-3b2e1f9a-7c4d-40e2-9f88-5b6a1c2d3e4f.appcrons-test.com/active')
        
        # -> Click Submit to create the new application and wait for the app details page to load so we can add a Request Time Frame (timezone → start → end → submit).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/form/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Enable the newly created application by toggling the enable switch in the modal; after the UI updates, proceed to the application details page so we can add a Request Time Frame (select timezone first).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/div/div[2]/div/label/div/input').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Close the onboarding modal (use the 'Skip' button) so the app details page is visible, then add a Request Time Frame (select timezone first, then start and end times).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/div/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Click the 'Finish' button in the onboarding modal to close it so the dashboard / app list is visible, then open the created application's details to add a Request Time Frame (timezone → start → end → submit).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[4]/div/div[2]/div/div[2]/div/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Click the 'New' button in the Request Time Frame panel to open the Add RTF modal, then select a timezone first (per test rules).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[15]/main/div/div/div/div[3]/div/div/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Click the Submit button to add the Request Time Frame, wait for the UI to show a success notification, then verify the new time range appears in the existing time ranges list.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[3]/div/div[2]/div/form/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Click the Submit button to add the Request Time Frame, wait for the UI to show success, then verify the new time range appears in the existing time ranges list.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[3]/div/div[2]/div/form/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        assert await frame.locator("xpath=//*[contains(., 'Time range added successfully')]").nth(0).is_visible(), "The application should show a success notification after adding the time range.",
        assert await frame.locator("xpath=//*[contains(., 'UTC')]").nth(0).is_visible(), "The new request time frame should appear in the existing time ranges list after submission.",
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    