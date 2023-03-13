const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newquoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length > 40){
        quoteContainer.classList.add('long-txt');
    }
    else{
        quoteContainer.classList.remove('long-txt');
    }
    complete();
    quoteText.textContent = quote.text;
}

async function GetQuote(){
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch(err){
        // catching errors
    }
}
function newTweet(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteContainer.textContent}- ${authorText.textContent}`;
    window.open(twitterURL,'_blank');
}

// Event Listener
twitterBtn.addEventListener('click',newTweet);
newquoteBtn.addEventListener('click',newQuote);


// On Load
GetQuote();