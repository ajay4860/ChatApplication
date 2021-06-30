const socket=io();

let na;
do{
    na=prompt("please enter your name to continue");
}while(!na);

let text_area=document.querySelector(".text_area");

let message_section=document.querySelector(".message_section");
text_area.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        send_message(e.target.value);
    }
});

function send_message(message){
    let mssg={
        user:na,
        content:message.trim()
    }

    append_message(mssg,"message_sent");

    socket.emit('message',mssg);
}

function append_message(mssg,type){
    let new_div=document.createElement("div");

    let classname=type;
    new_div.classList.add(classname);
    let markup=`<h3>${mssg.user}</h3>
                <p>${mssg.content}</p>`;
    
    new_div.innerHTML=markup;
    
    message_section.appendChild(new_div);           
}

socket.on('message_broadcast',(data)=>{
    append_message(data,"message_received");
})


