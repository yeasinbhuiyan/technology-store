const inputField = document.getElementById('inputField')
const inputbtn = document.getElementById('inputBtn')




// start fetch

const phone = (searchText, num) => {


  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data, num))

}


// https://mdbcdn.b-cdn.net/img/new/slides/005.webp



// display phone 

const displayPhone = (data, num) => {
  document.getElementById('seeAllBtn').style.display = 'none'

  let newPhone;


  // jodi amra kono value na diye search di tahole ey error msg dibe

  if (data.length == 0) {

    return Swal.fire(
      'Sorry!!',
      'What Do You Want?',
      'question'
    )

  }
  else {


    // jodi sothike search di tahole ey loading hobe 


    let timerInterval
    Swal.fire({

      title: 'Wait A Second.',
      html: 'I will Give in <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,

      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })





  }



  // tarpor data length jodi 6 er beshi hoy tahole slice kore 6 ti kore display korbo 
  // and see all btn show korbo 



  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.innerHTML = ''

  if (data.length > 6 && num == 10) {
    let newData = data.slice(0, 6)
    newPhone = newData
    document.getElementById('seeAllBtn').style.display = 'block'


  }
  else {
    newPhone = data
    document.getElementById('seeAllBtn').style.display = 'none'
  }



  newPhone.forEach(element => {
    const isBookMark = checkBookMark(element.slug)


    const { image, phone_name, slug, brand } = element
    console.log(element)

    phoneContainer.innerHTML += `<div class="mt-5 ">

<div class="card mt-5 card-hover shadow-2xl w-[96%] glass">
<div class="text-3xl p-3">


<i onclick="${isBookMark ? `removeBookmark('${slug}')` :

        `handleBookmark('${slug}','${phone_name}','${brand}')`}" 


class="${isBookMark ? 'fa fa-bookmark' : 'fa-regular fa-bookmark'}"></i>



</div>

<figure class="pt-5 "><img class="rounded-box" src="${image}" alt="car!"/></figure>

<div class="card-body">
  <h2 class="card-title">${phone_name}</h2>
  <p> Necessitatibus dolorem iste adipisci, assumenda placeat quae?
  Repudiandae nulla perferendis repellendus cum eius adipisci nihil. Modi magni eius
  corrupti</p>
  
  <div class="card-actions justify-end">

 
<label  onclick="info('${slug}')" for="my-modal-5" class="fa-solid fa-info p-4 rounded-full text-black info"></label>

  </div>
</div>
</div> 
</div>`


  });
}


// modal er jonno id onclick er maddome fetch koresi

const info = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => displayInfo(data.data))
}




// then display koresi 



const displayInfo = (data) => {
  const infoContainer = document.getElementById('modal-body')
  infoContainer.innerHTML=''
  console.log(data)
  infoContainer.innerHTML = ` <div class="mt-4">
  <h1 class="text-2xl font-semibold">${data.name}
  </h1>
  <img class="rounded-box" src="${data.image}" alt="" style="width: 200px; height: 250px;">
  </div>
  <div>
<div class="mt-5">

<h3 class="text-xl">${data.mainFeatures.storage}
</h3>
<h3>${data.mainFeatures?.displaySize? data.mainFeatures.displaySize : "Not Found"}
</h3>
<h3>${data.mainFeatures?.memory? data.mainFeatures.memory : "Not Found"}
</h3>
<h3>${data.others?.Bluetooth? data.others.Bluetooth : "Not Found"}
</h3>
<h3>${data.others?.GPS? data.others.GPS :"Not Found"}
</h3>
<h3>${data.others?.USB? data.others.USB :"Not Found"}
</h3>
<h3>${data.others?.WLAN? data.others.WLAN :"Not Found"}
</h3>

<h3 class="text-2xl">${data.releaseDate}</h3>
</div>
  `


}










// book mark area 

const handleBookmark = (id, name, brand) => {

  const previous = JSON.parse(localStorage.getItem('BookMark'))
  const product = { id, name, brand }

  let bookmark = []

  if (previous) {
    const previous = JSON.parse(localStorage.getItem('BookMark'))
    const item = previous.find((p) => p.id == id)
    if (item) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Give Me Valid User Details!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    else {
      bookmark.push(...previous, product)
      localStorage.setItem('BookMark', JSON.stringify(bookmark))
    }


  }
  else {
    console.log('eta add nai ')
    bookmark.push(product)
    localStorage.setItem('BookMark', JSON.stringify(bookmark))
  }



}



// remove bookmark area 


const removeBookmark = (id) => {
  const previous = JSON.parse(localStorage.getItem('BookMark'))
  const remove = previous.filter((p) => p.id != id)
  localStorage.setItem('BookMark', JSON.stringify(remove))

}


// check bookmark


const checkBookMark = (id) => {

  const check = JSON.parse(localStorage.getItem('BookMark'))


  const checkMark = check?.find((p) => p.id == id)
  if (checkMark) {
    return true
  }
  else {
    return false
  }


}











// search btn 


document.getElementById('inputBtn').addEventListener('click', () => {
  const value = inputField.value
  phone(value, 10)

})

// see all btn 

document.getElementById('seeAllBtn').addEventListener('click', () => {

  const value = inputField.value
  phone(value)
})



// input enter 

inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("inputBtn").click();
  }
});

document.getElementById('input-btn').addEventListener('click', () => {
  const email = document.getElementById('input-email')
  const password = document.getElementById('input-password')




  if (email.value.length > 0 && password.value.length > 0) {
    email.value = ''
    password.value = ''
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Give Me Valid User Details!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }


})


const store = [


  'S',
  'St',
  'Sto',
  'Stor',
  'Store',
]

let num = 0;
setInterval(() => {
  if (num === store.length) {
    num = 0
  }
  const storeName = store[num]
  document.getElementById('store-name2').innerText = storeName
  num++






}, 500)






const question = [

  "  A",
  "  As",
  "Ask",
  " Aske",
  "  Asked",
  "Asked Q",
  "Asked Qu",
  " Asked Que",
  "  Asked Ques",
  "  Asked Quest",
  "  Asked Questi",
  "Asked Questio",
  "Asked Question",
  "  Asked Question?"

]




let num2 = 0;
setInterval(() => {
  if (num2 === question.length) {
    num2 = 0
  }
  const storeName = question[num2]
  document.getElementById('question-container').innerText = storeName
  num2++






}, 100)





// const question1 = [

//   'Wha',
//   'What i',
//   'What is t',
//   'What is te',
//   'What is tec',
//   'What is tech',
//   'What is techno',
//   'What is technolog',
//   'What is technology in',
//   'What is technology in o',
//   'What is technology in our',
//   'What is technology in our l',
//   'What is technology in our li',
//   'What is technology in our life?'
// ]

// const question2=document.getElementById('question-one')
// let num3=0
// setInterval(()=>{
//   if(num3== question1.length){
//     num3=0
//   }
//   const set = question1[num3]
//   question2.innerText=set
//   num3++

// },100)


// const question4 = [

//  'What ',
//  'What is' ,
//  'What is technology ',
//  'What is technology in ',
//  'What is technology in our',
//  'What is technology in our life?',
// ]

// const question3=document.getElementById('question-two')
// let num4=0
// setInterval(()=>{
//   if(num4== question4.length){
//     num4=0
//   }
//   const set = question4[num4]
//   question3.innerText=set
//   num4++

// },500)








const login =[
'L',
'LO',
'LOG',
'LOGI',
'LOGIN',
'LOGIN ',
'LOGIN I',
'LOGIN IN',
'LOGIN INF',
'LOGIN INFO',


  
]


const loginHeader = document.getElementById('login')

let num5=0

setInterval(()=>{
  if(num5== login.length){
    num5=0
  }
  const loading = login[num5]
  loginHeader.innerText=loading
  num5++
},150)




// device name 

// ipad
// iphone
// samsung
// oppo
// watch
// mate 
// nova
// reno

phone('iphone',10)