const modal=document.querySelector('.modal');

const modalButton=document.querySelector('.modal-button');

const closeBtn=document.querySelector('.closeButton');
// console.log(modalButton);

modalButton.addEventListener('click',()=>{
    console.log("Hello")
    modal.classList.add('active');
})

closeBtn.addEventListener('click',()=>{
    modal.classList.remove('active');
})

// document.querySelector('button').addEventListener('click',()=>{
// radio=document.querySelectorAll('input');
//   for (let index = 0; index < radio.length; index++) {
//         if(radio[index].checked){
//             console.log(radio[index].value+" "+radio[index].name);
//         }
//   }
// });

    // getData();
    // async function getData(){
    //     const data=await fetch('/634349/post');
    //     const res=await data.json();

    //     console.log(res);
    // }




