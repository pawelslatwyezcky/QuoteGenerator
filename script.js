const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader'); 

//Get quotes from API
let apiQuotes = [];

// Show new Quote

function newQuote () {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check is author field is blank
if (!quote.author) {
    authorText.textContent = 'Unknown';
} else {
    authorText.textContent = quote.author;
}

// Check qupte length 

if(quote.text.length > 120) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}
    quoteText.textContent = quote.text;
    
    setTimeout(complete(),Math.random()*5000);
}

async function getQuotes () {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here
    }
}

// On load

getQuotes();


//Tweet a quote 

function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// EventListeners

newQuoteBtn.addEventListener('click', newQuote); 
twitterBtn.addEventListener('click', tweetQuote )

// show Loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}