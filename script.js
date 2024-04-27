sendBtn = document.querySelector('.send')
textAreaInput = document.querySelector('#send_text')
EnteredData = null;
sendBtn.disabled = true;


  
textAreaInput.addEventListener('keypress', (event) => { 
     if(event.target.value != ''){
      sendBtn.disabled = false;
     if (event.key === 'Enter') populateHTML()  
    } },
     sendBtn.addEventListener('click', populateHTML));
    


function copyContent(responseData){
    console.log("copied")
    console.log(responseData);
    navigator.clipboard.writeText(responseData);

}

function populateHTML(){
 EnteredData = textAreaInput.value.trim();
 createElement(EnteredData, "myself")
 setTimeout(function(){ showAnimation()},
                                  500)  
getResponse();
 } 


function createElement(EnteredData, className){
    createdDiv = document.createElement('div')
    createdDiv.classList.add('chat')
    createdDiv.classList.add(className)

addHTML = ` <div class="chat-content">
              <div class="chat-details">
    <img src="./assets/user.png" width="100" height="100">
    <p>${EnteredData}</p>
</div>
</div>`

createdDiv.innerHTML = addHTML
document.querySelector('.chat-container').appendChild(createdDiv);
textAreaInput.value = '';

}

function showAnimation(){

    createdDiv_anime = document.createElement('div')
createdDiv_anime.classList.add('chat')
createdDiv_anime.classList.add('chatgpt')

animationHTML = ` <div class="chat-content">
<div class="chat-details">
    <img src="./assets/diamond.png" width="100" height="100">
 <div class="typing-animation">
    <div class="typing-dots" style="--delays: 0.2s"></div>
    <div class="typing-dots" style="--delays: 0.3s"></div>
    <div class="typing-dots" style="--delays: 0.42s"></div>
 </div>
 </div>
 </div> `

createdDiv_anime.innerHTML = animationHTML
document.querySelector('.chat-container').appendChild(createdDiv_anime);

}

function getResponse(){
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key= AIzaSyBLObQvVQY2WMg8TsfHFfXtYlud4Pg1QxA';
    const data = {
    contents: [
        {
        parts: [
            {
            text: EnteredData
            }
        ]
        }
    ]
    };

    fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
    })
    .then(response => {
    return response.json();
    })
    .then(data => {
        console.log(data);
        response_data = data.candidates[0].content.parts[0].text;
        showResponse ();
    })
}

function showResponse(){
    responseHTML = ` <div class="chat-content">
      <div class="chat-details">
    <img src="./assets/diamond.png" width="100" height="100">
    <p id="response">${response_data}</p>
    </div>
    <div class="copy"><i class="fa fa-clone"></i></div>
     </div>`
    createdDiv_anime.innerHTML = responseHTML;


    scrolable_container = document.querySelector('.chat-container');
    scrolable_container.scrollTop = scrolable_container.scrollHeight;

    updateCopyButtons();
    
}

function updateCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy');
    copyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const responseData = button.parentElement.querySelector('#response').innerHTML;
        copyContent(responseData);
      });
    });
  }



