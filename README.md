# Interactive Pink Invitation Card

A beautiful, interactive digital invitation card with a pink theme that can be customized and shared with loved ones.

## Features

- 🎁 Animated gift box that opens on tap
- 💕 Pink theme with floating hearts and confetti animations
- 📅 Calendar date display for the special day
- 📋 Customizable itinerary for planned activities
- 🔘 Interactive response buttons (Accept/Maybe)
- 📱 Mobile-friendly design
- ✏️ Customizable recipient name, sender name, invitation message, date, and itinerary
- 🔗 Easy sharing via URL

## How to Use

1. Open the `index.html` file in a web browser
2. Tap/click on the gift box to open it
3. Read the personalized invitation message, date, and itinerary
4. Respond to the invitation using the "Accept" or "Maybe" buttons
5. Use the "Back" button to return to the gift box view
6. Share the card using the "Share" button

### Option 1: Host the card online (recommended)

1. Upload the files to a free hosting service like GitHub Pages, Netlify, or Vercel.
2. Share the URL with your loved ones via Telegram or any messaging app.

### Option 2: Share locally

1. Compress the entire "Invitation Card" folder into a ZIP file.
2. Send the ZIP file to your loved ones.
3. Ask them to extract the ZIP and open the `index.html` file in their web browser.

## Customization

You can customize the card in two ways:

### 1. Using the Hidden Customization Shortcut

Press `Command+Option+C` on Mac (or `Ctrl+Alt+C` on Windows/Linux) on your keyboard to open the customization modal where you can change:
- Recipient's name
- Your name (sender)
- Invitation message
- Event date
- Itinerary items

*Note: This shortcut is intentionally hidden from the recipient*

### 2. Using URL Parameters

You can also customize the card by adding parameters to the URL:

```
index.html?to=Name&from=YourName&message=Your|Custom|Message&date=MM-DD-YYYY&itinerary=10:00AM-Breakfast|2:00PM-Movie
```

- `to`: The recipient's name
- `from`: Your name (sender)
- `message`: Invitation message (use | to separate paragraphs)
- `date`: Event date in MM-DD-YYYY format
- `itinerary`: List of activities (use | to separate items and - to separate time from activity)

Example:
```
index.html?to=Sarah&from=Adam&message=You're invited to my birthday party!|Join me for a fun-filled day of games and celebration.&date=02-27-2023&itinerary=10:00AM-Brunch|2:00PM-Games
```

## Credits

- Background music: SoundHelix
- Animations: Animate.css
- Fonts: Google Fonts (Dancing Script, Montserrat)
