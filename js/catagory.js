
const categoryLoad=()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=>displayAllCategory(data))
    .catch(error=>console.log(error))
}


const displayAllCategory=(categories)=>{
    const navContainer=document.getElementById('navbarNavAltMarkup');
    if(categories.status==true){
        for(let i=0;i<categories.data.news_category.length;i++){
           const navBar=document.createElement('div');
           navBar.classList.add('navbar-nav');
           navBar.innerHTML=`
                        <a class="nav-link" href='javascript:;' onclick="categoryDetails('${categories.data.news_category[i].category_id}','${categories.data.news_category[i].category_name}')">${categories.data.news_category[i].category_name}</a>
                      
           
           
           `;
           navContainer.appendChild(navBar);
        }
    }
}



const categoryDetails=(id,name)=>{
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res=>res.json())
    .then(data=>displayCategoryMoreInfo(data,name))
    .catch(error=>console.log(error))
    
}

const displayCategoryMoreInfo=(data,name)=>{
    const header=document.getElementById('header');
    header.innerText=`${data.data.length} items found for category ${name}`;
    header.style.display="block";
    const singlecard=document.getElementById('card-info');
    singlecard.innerHTML='';
    let result=data.data.sort(function(a,b){
         return(b.total_view - a.total_view);
    });
    if(data.status==true){
        for(let i=0;i<result.length;i++){

           


            const cardShow=document.createElement('div');
            cardShow.classList.add('card');
            cardShow.innerHTML=`
           
            <div class="row">
            <div class="col-md-3">
            <img src="${result[i].thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${result[i].title}</h5>
                <p class="card-text">${result[i].details}</p>
                <div class="d-flex justify-content-between" style="align-items:end;">
                    <div class="d-flex">
                        <div>
                            <img src="${result[i].author.img}" style="width: 32px; height:32px; border-radius:17px;"
                                alt="">
                        </div>
                        <div class="font-fix">
                            <h2>${result[i].author.name}</h2>
                            <p>${result[i].author.published_date}</p>
                        </div>
                    </div>
                    <p><i class="fa-regular fa-eye"></i> <span style="font:caption;">${result[i].total_view?result[i].total_view:'no views'}</span></p>
                
                    <button type="button" class="btn btn-primary"  onclick="getData('${result[i]._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
  More Details
</button>

                </div>
            </div>

        </div>
        </div>
        
    

            
            
            `;
            singlecard.appendChild(cardShow);
        }
    }
    else{
        const header=document.getElementById('header');
            header.innerText='';
        const cardShow=document.createElement('div');
        cardShow.classList.add('card');
        cardShow.innerHTML=`
        
         <h3 class="text-center text-danger mt-3">No Data found For this Category</h3>
        `;
        
        singlecard.appendChild(cardShow);

    }
}

const getData=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res=>res.json())
    .then(data=>displaySingleData(data.data))
    .catch(error=>console.log(error))
}

const displaySingleData=(data)=>{

  document.getElementById('title').innerText=data[0].title;
  document.getElementById('image').src=data[0].image_url;
  document.getElementById('an').innerText=data[0].author.name;
  let date = new Date(data[0].author.published_date).toDateString();
  document.getElementById('date').innerText=date;
  document.getElementById('details').innerText=data[0].details;




    
    
}
categoryLoad();