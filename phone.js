
// https://openapi.programming-hero.com/api/phones?search=iphone
const loadPhone = async (searchPhone, isShowAll) => {
      const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
      const data = await res.json();
      const phones = data.data
     displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
      const phoneContainer = document.getElementById('phone-container');
      phoneContainer.textContent = '';

      const showButton = document.getElementById("show-all-container");
      if(phones.length > 12 && !isShowAll){
            showButton.classList.remove ('hidden');
      }
      else{
            showButton.classList.add ('hidden');
      }
      if(!isShowAll){
            phones = phones.slice (0, 12);
      }

      phones.forEach (phone => {
            const phoneCard = document.createElement('div');
            phoneCard.classList = "card p-5 bg-base-100 shadow-xl";
            phoneCard.innerHTML =`
                  <figure class ="p-5 bg-[#0D6EFD0D]"><img src=${phone.image} alt="Shoes" /></figure>
                  <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>${phone.slug}</p>
                        <div class="card-actions justify-center">
                              <button onclick="showPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                  </div>
            `
            phoneContainer.appendChild(phoneCard);


      });
      // hide loading spinner
      toggleLoadingSpinner(false);
}

const showPhoneDetails = async (id)=> {
      console.log(id);
      const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
      const data = await res.json();
      console.log(data);
}



const handleSearch = (isShowAll) => {
      toggleLoadingSpinner(true);
      const searchField = document.getElementById('search-field');
      const text = searchField.value;
      loadPhone(text, isShowAll);
}



const toggleLoadingSpinner = (isLoading) => {
      const loadingSpinner = document.getElementById('loading-spinner');
      if(isLoading){
            loadingSpinner.classList.remove('hidden');
      }else{
            loadingSpinner.classList.add('hidden');
      }
}

const handleShowAll = () =>{
      handleSearch(true)
}