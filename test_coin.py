from playwright.sync_api import sync_playwright
import time

def test_coin():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000")

        # Click the coin
        page.click("#flip-coin")

        # Wait for the animation to finish
        # The animation duration is 0.85s (from CSS coin-flip), and then a setTimeout of 2000ms.
        # Let's just wait 1.5 seconds for safety.
        page.wait_for_timeout(1500)

        # Check the style of the inner element
        transform = page.evaluate('document.querySelector(".coin-inner").style.transform')
        print(f"Transform after 1 click: {transform}")
        assert transform == "rotateY(0deg)" or transform == "rotateY(180deg)"

        # Click again
        page.click("#flip-coin")
        page.wait_for_timeout(1500)
        transform2 = page.evaluate('document.querySelector(".coin-inner").style.transform')
        print(f"Transform after 2 clicks: {transform2}")
        assert transform2 == "rotateY(0deg)" or transform2 == "rotateY(180deg)"

        print("Test passed!")
        browser.close()

if __name__ == "__main__":
    test_coin()
