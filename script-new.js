document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // DOM elements
    const card = document.querySelector('.card');
    const cardFront = document.getElementById('card-front');
    const backBtn = document.getElementById('back-btn');
    const modal = document.getElementById('customize-modal');
    const closeBtn = document.querySelector('.close');
    const saveCustomBtn = document.getElementById('save-custom');
    const recipientNameInput = document.getElementById('recipient-name');
    const senderNameInput = document.getElementById('sender-name');
    const customMessageInput = document.getElementById('custom-message');
    
    // Open card when clicking on the gift box
    cardFront.addEventListener('click', function() {
        console.log('Card front clicked');
        card.classList.add('flipped');
        addConfetti();
    });
    
    // Back button functionality
    backBtn.addEventListener('click', function() {
        console.log('Back button clicked');
        card.classList.remove('flipped');
    });
    
    // Secret customize shortcut (Command+Option+C for Mac, Ctrl+Alt+C for Windows)
    document.addEventListener('keydown', function(event) {
        // For Mac: Command (metaKey) + Option (altKey) + C
        // For Windows/Linux: Ctrl + Alt + C
        if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === 'c') {
            console.log('Keyboard shortcut detected');
            openCustomizeModal();
        }
    });
    
    // Accept buttons functionality
    const acceptBtns = document.querySelectorAll('.accept-btn');
    if (acceptBtns.length > 0) {
        console.log('Accept buttons found:', acceptBtns.length);
        acceptBtns.forEach(btn => {
            btn.onclick = function() {
                console.log('Accept button clicked:', this.id);
                showAcceptResponse();
                return false;
            };
        });
    } else {
        console.error('No accept buttons found!');
    }
    
    // Function to add confetti effect
    function addConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.backgroundColor = getRandomPinkShade();
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Function to get random pink shades
    function getRandomPinkShade() {
        const pinkShades = [
            '#ffdeeb', '#fcc2d7', '#f783ac', '#f06595', '#d6336c', '#c2255c'
        ];
        return pinkShades[Math.floor(Math.random() * pinkShades.length)];
    }
    
    function openCustomizeModal() {
        modal.style.display = 'block';
        
        // Pre-fill with current values
        const recipientName = document.querySelector('.message h2').textContent.replace('To my amazing ', '');
        recipientNameInput.value = recipientName;
        
        const senderName = document.getElementById('signature').textContent;
        senderNameInput.value = senderName;
        
        // Get current paragraphs (first two paragraphs only)
        const paragraphs = document.querySelectorAll('.message p:not(.signature)');
        let currentMessage = '';
        if (paragraphs.length >= 2) {
            currentMessage = paragraphs[0].textContent.trim() + '\n\n' + paragraphs[1].textContent.trim();
        }
        customMessageInput.value = currentMessage.trim();
        
        // Get current date from calendar
        const month = document.querySelector('.calendar-header').textContent;
        const day = document.querySelector('.calendar-day').textContent;
        const year = document.querySelector('.calendar-year').textContent;
        const dateObj = new Date(`${month} ${day}, ${year}`);
        document.getElementById('event-date').valueAsDate = dateObj;
        
        // Get current itinerary
        const itineraryItems = document.querySelectorAll('.itinerary li');
        let itineraryText = '';
        itineraryItems.forEach(item => {
            itineraryText += item.textContent.trim() + '\n';
        });
        document.getElementById('itinerary').value = itineraryText.trim();
    }
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Save customizations
    saveCustomBtn.addEventListener('click', function() {
        const recipientName = recipientNameInput.value.trim() || 'girlfriend';
        const senderName = senderNameInput.value.trim() || 'Adam';
        const customMessage = customMessageInput.value.trim();
        const eventDate = document.getElementById('event-date').valueAsDate;
        const itineraryText = document.getElementById('itinerary').value.trim();
        
        // Update recipient name
        document.querySelector('.message h2').textContent = `To my amazing ${recipientName}`;
        
        // Update sender name
        document.getElementById('signature').textContent = senderName;
        
        // Update message content (first two paragraphs only)
        if (customMessage) {
            const paragraphs = customMessage.split('\n\n');
            const messageContainer = document.querySelector('.message');
            
            // Remove old paragraphs (not including itinerary and response)
            const oldParagraphs = document.querySelectorAll('.message > p:not(.signature)');
            oldParagraphs.forEach(p => p.remove());
            
            // Get reference points
            const itineraryDiv = document.querySelector('.itinerary');
            
            // Add new paragraphs before itinerary
            paragraphs.forEach((text, index) => {
                if (text.trim() && index < 2) { // Limit to first two paragraphs
                    const p = document.createElement('p');
                    p.textContent = text;
                    p.classList.add('animate__animated', 'animate__fadeIn');
                    p.style.animationDelay = `${index + 2}s`;
                    messageContainer.insertBefore(p, itineraryDiv);
                }
            });
        }
        
        // Update date in calendar
        if (eventDate) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            document.querySelector('.calendar-header').textContent = months[eventDate.getMonth()];
            document.querySelector('.calendar-day').textContent = eventDate.getDate();
            document.querySelector('.calendar-year').textContent = eventDate.getFullYear();
        }
        
        // Update itinerary
        if (itineraryText) {
            const items = itineraryText.split('\n');
            const itineraryList = document.querySelector('.itinerary ul');
            itineraryList.innerHTML = ''; // Clear existing items
            
            items.forEach(item => {
                if (item.trim()) {
                    const li = document.createElement('li');
                    // Check if item has time format (e.g., "10:00 AM - Activity")
                    if (item.includes('-')) {
                        const parts = item.split('-');
                        const timeSpan = document.createElement('span');
                        timeSpan.className = 'time';
                        timeSpan.textContent = parts[0].trim();
                        li.appendChild(timeSpan);
                        li.appendChild(document.createTextNode('- ' + parts[1].trim()));
                    } else {
                        li.textContent = item.trim();
                    }
                    itineraryList.appendChild(li);
                }
            });
        }
        
        // Close modal
        modal.style.display = 'none';
    });
    
    // Add floating hearts animation periodically
    setInterval(() => {
        if (card.classList.contains('flipped')) {
            createFloatingHeart();
        }
    }, 3000);
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('floating-heart');
        heart.style.left = Math.random() * 80 + 10 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        document.querySelector('.card-inside').appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    function showAcceptResponse() {
        console.log('Showing accept response');
        
        // Clear the entire message area
        const messageContainer = document.querySelector('.message');
        messageContainer.innerHTML = '';
        
        // Create confirmation page content
        const confirmationContent = document.createElement('div');
        confirmationContent.classList.add('confirmation-page', 'animate__animated', 'animate__fadeIn');
        
        confirmationContent.innerHTML = `
            <h2 class="animate__animated animate__heartBeat">LESGOOOO 💖</h2>
            <p class="animate__animated animate__fadeIn animate__delay-1s">Told you that you cant say no</p>
            <p class="animate__animated animate__fadeIn animate__delay-2s">I can't wait to spend this special day with you.</p>
            <p class="animate__animated animate__fadeIn animate__delay-3s">It's going to be amazing! (hopefully)</p>
            <p class="signature animate__animated animate__fadeIn animate__delay-4s">
                With love,<br>
                <span id="signature-confirm">Adam</span>
            </p>
        `;
        
        // Add the confirmation content to the message container
        messageContainer.appendChild(confirmationContent);
        
        // Update the signature on the confirmation page
        const signatureElement = document.getElementById('signature');
        if (signatureElement) {
            document.getElementById('signature-confirm').textContent = signatureElement.textContent;
        }
        
        // Add lots of floating hearts for celebration
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createFloatingHeart(), i * 150);
        }
    }
    
    // Check if URL has parameters for direct customization
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('recipient') || urlParams.has('message') || urlParams.has('sender') || urlParams.has('date') || urlParams.has('itinerary')) {
        // Fill in form fields
        if (urlParams.has('recipient')) recipientNameInput.value = urlParams.get('recipient');
        if (urlParams.has('sender')) senderNameInput.value = urlParams.get('sender');
        if (urlParams.has('message')) customMessageInput.value = decodeURIComponent(urlParams.get('message'));
        if (urlParams.has('date')) document.getElementById('event-date').value = urlParams.get('date');
        if (urlParams.has('itinerary')) document.getElementById('itinerary').value = decodeURIComponent(urlParams.get('itinerary'));
        
        // Auto-save customizations
        saveCustomBtn.click();
        
        // Auto-open the card
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1500);
    }
});
