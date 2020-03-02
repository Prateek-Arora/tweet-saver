// Varibales-------------
const tweetList = document.querySelector('#tweet-list');

// Event Listeners-------
eventListener();

function eventListener(){
    // Submit formm.
    document.querySelector('#form').addEventListener('submit', newTweet);

    // Remove 'li' from tweetList.
    tweetList.addEventListener('click', removeTweet);

    // Document/
    document.addEventListener('DOMContentLoaded' , refreshPage);
}


// Functions--------------

function newTweet(e){
    e.preventDefault();

    // Read the tweet.
    const tweet = document.querySelector('#tweet').value;

    // Create removeBtn.
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    // Create 'li' element.
    const li = document.createElement('li');
    li.textContent = tweet;

    // Add the removeBtn to 'li'.
    li.appendChild(removeBtn);

    // Add 'li' to the tweetList.
    tweetList.appendChild(li);

    addTweetLocalStorage(tweet);
}

// Removes the tweet.
function removeTweet(e){
    const removeElement = e.target.parentElement;
    if(e.target.classList.contains('remove-tweet')){
        removeElement.remove();
    }

    // Remove from Local Storage.
    removeTweetLocalStorage(removeElement.textContent);
}

// Adds tweet into Local Storage.
function addTweetLocalStorage(tweet){
    let tweets = getTweetsLocalStorage();

    // Add tweet into array tweets.
    tweets.push(tweet);

    // Add the array into Local Storage.
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Get values from Local Storage.
function getTweetsLocalStorage(){
    let tweets;
    let tweetsLS = localStorage.getItem('tweets');

    // if the value is null,create an empty array.
    if(tweetsLS === null){
        tweets = [];
    }
    else{
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

// Reloads the values from Local Storage on refreshing the page.
function refreshPage(){
    let tweets = getTweetsLocalStorage();

    // Use a loop to iterate and display all elements from array.
    tweets.forEach(function(tweet) {
        // Create removeBtn.
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        // Create 'li' element.
        const li = document.createElement('li');
        li.textContent = tweet;

        // Add the removeBtn to 'li'.
        li.appendChild(removeBtn);

        // Add 'li' to the tweetList.
        tweetList.appendChild(li);
    });
}

// Removes the tweet from Local Storage.
function removeTweetLocalStorage(tweet){
    // Get tweets from Storage in array form.
    let tweets = getTweetsLocalStorage();

    // Remove 'X' from the tweets.
    const tweetDelete = tweet.substring(0, tweet.length-1);

    // Search for the tweet.
    tweets.forEach(function(tweetLS, index) {
        if(tweetLS === tweetDelete){
            tweets.splice(index, 1);
        }
    });

    // Add the remaining array into the Local Storage.
    localStorage.setItem('tweets', JSON.stringify(tweets));
}