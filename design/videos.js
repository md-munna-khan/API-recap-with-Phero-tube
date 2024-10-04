console.log("video script added")


function getTimeString(time){
    const hour = parseInt(time / 3600 )
    let remainingSecond = time % 3600;
    const minutes = parseInt(remainingSecond / 60)
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minutes} minutes ago ${remainingSecond} second ago`;
 
}




//1 - fetch, load and show categories on html
// create load categories
const loadCategories = () =>{
    console.log(loadCategories)
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then(data =>displayCategories(data.categories))
    .catch((error)=> console.log(error))
}

const loadVideos = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data =>displayLoadVideos(data.videos))
    .catch((error =>console.log(error)))
};

// ================id==============
const categoriesVideo = (id) =>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res =>res.json())
    .then(data => {
        const activeBtn = document.getElementById(`btn-${id}`);
      console.log(activeBtn)
        displayLoadVideos(data.category)
    })
    .catch(error => console.log(error))
};


//======demo========================
const cardDemo={
    "category_id": "1003",
    "video_id": "aaaj",
    "thumbnail": "https://i.ibb.co/xgWL3vQ/kid-gorgeous.jpg",
    "title": "Kid Gorgeous",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/xsfkwN2/john.jpg",
            "profile_name": "John Mulaney",
            "verified": true
        }
    ],
    "others": {
        "views": "241K",
        "posted_date": ""
    },
    "description": "John Mulaney's 'Kid Gorgeous' has captured the hearts of many with 241K views. As a verified comedian, John delivers a masterclass in stand-up with clever anecdotes, quick wit, and relatable humor. This performance is a laugh-filled adventure through his unique take on life, politics, and pop culture."
}

// create display videos categories
const displayLoadVideos = (videos) =>{
   
    const videoContainer = document.getElementById("videos");
   if(videos.length ==0){
    videoContainer.classList.remove("grid")
    videoContainer.innerHTML = `
    <div class = "min-h-[300] flex flex-col  gap-5  justify-center items-center">
    <img src ="assets/icon.png"/>
    <h2 class = "text-xl font-bold text-center"> No Content Here In This 
    Category</h2>
    </div>
    
    `;
    return
   }else{
    videoContainer.classList.add("grid")
   }
    videoContainer.innerHTML = "";
    videos.forEach((video)=>{
        console.log(video)
        // create a card
        const card = document.createElement('div')
        card.classList = 'card card-compact'
        card.innerHTML=`
          <figure class= "h-[200px] relative">
    <img
      src=${video.thumbnail}
      class ="h-full w-full object-cover" 
      alt="Shoes" />
     ${
        video.others.posted_date?.length == 0? ""
        :` <span class ="absolute right-2 bottom-2 bg-black text-xs rounded p-1 text-white">${getTimeString( video.others.posted_date)}</span>`
     }
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
   <img class=" h-10 w-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
   </div>
   <div>
   <h2 class ="font-bold"> ${video.title}</h2>
 <div class="flex items-center gap-2">
   <p class ="text-gray-400">${video.authors[0].profile_name}</p>
  ${
    video.authors[0].verified === true ? ` <img class="w-5" src ="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/> `:""}


 </div>
   <p></p>
   </div>
  </div>
        
        `
videoContainer.append(card)
    })
}
// create display categories
const displayCategories = (categories) =>{
   const categoryContainer = document.getElementById("categories")

categories.forEach((item) =>{
    console.log(item)
    //create a button
    const buttonContainer = document.createElement('div')
   buttonContainer.innerHTML =`
   <button id="btn-${item.category_id}" onclick ="categoriesVideo(${item.category_id})" class = "btn category-btn">
   ${ item.category}
   </button>
   
   `;
    //add button to category container
categoryContainer.append( buttonContainer)
});
    

};

loadCategories();

loadVideos();
