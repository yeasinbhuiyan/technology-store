// 
// const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
const inputField = document.getElementById('inputField')
const inputbtn = document.getElementById('inputBtn')


const phone = (searchText, num) => {


  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data, num))

}
// https://mdbcdn.b-cdn.net/img/new/slides/005.webp
const displayPhone = (data, num) => {

  let newPhone;

  if (data.length == 0) {

    return Swal.fire(
      'Sorry!!',
      'What Do You Want?',
      'question'
    )

  }
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


const info = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => displayInfo(data.data))
}
const displayInfo = (data) => {
  const infoContainer = document.getElementById('modal-body')
  console.log(data)
  infoContainer.innerHTML = ` <div class="mt-4">
  <h1 class="text-2xl font-semibold">${data.name}
  </h1>
  <img class="rounded-box" src="${data.image}" alt="" style="width: 200px; height: 200px;">
  </div>
  <div>
<div class="mt-5">

<h3 class="text-xl">${data.mainFeatures.storage}
</h3>
<h3>${data.mainFeatures.displaySize}
</h3>
<h3>${data.mainFeatures.memory}
</h3>
<h3>${data.others.Bluetooth}
</h3>
<h3>${data.others.GPS}
</h3>
<h3>${data.others.USB}
</h3>
<h3>${data.others.WLAN}
</h3>

<h3 class="text-2xl">${data.releaseDate}</h3>
</div>
  `


}

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




const removeBookmark = (id) => {
  const previous = JSON.parse(localStorage.getItem('BookMark'))
  const remove = previous.filter((p) => p.id != id)
  localStorage.setItem('BookMark', JSON.stringify(remove))

}

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












document.getElementById('inputBtn').addEventListener('click', () => {
  const value = inputField.value
  phone(value, 10)

})



document.getElementById('seeAllBtn').addEventListener('click', () => {

  const value = inputField.value
  phone(value)
})


document.getElementById('input-btn').addEventListener('click', () => {
  const email = document.getElementById('input-email')
  const password = document.getElementById('input-password')




  if (email.value.length > 0 && password.value.length > 0) {
    email.value = ''
    password.value = ''
    // console.log('yess')
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

// const storeName =document.getElementById('store-name')
let num = 0;
setInterval(() => {
  if (num === store.length) {
    num = 0
  }
  const storeName = store[num]
  // document.getElementById('store-name').innerText = storeName
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
  // document.getElementById('store-name').innerText = storeName
  document.getElementById('question-container').innerText = storeName
  num2++






}, 100)


// loadSpinner

// const loadSpinner=(loading)=>{
//   const spinner =document.getElementById('spinner')
//   if(loading){
//   spinner.classList.remove('hidden')
//   }
//   else{
//     spinner.classList.add('hidden')

//   }

// }



// const images =[

//   'phone.jpg',
//   'phone.jpg',
//   'phone.jpg',
//   'phone.jpg',

// ]

// const phoneImg = document.getElementById('phone-img')
// let num=0;

// setInterval(()=>{
//   // console.log(num++)

//   if(num === images.length){
//     num=0
//   }

//   const image = images[num]
//   num++
//   phoneImg.setAttribute('src',image)
//   console.log(image)

// },1000)




phone('iphone', 10)
