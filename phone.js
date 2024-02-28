
// https://openapi.programming-hero.com/api/phones?search=iphone
const loadPhone = async (searchPhone = '13', isShowAll) => {
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
                              <button onclick="handlePhoneDetails('${phone.slug}'), showDetails_modal.showModal()" class="btn btn-primary">Show Details</button>
                        </div>
                  </div>
            `
            phoneContainer.appendChild(phoneCard);


      });
      // hide loading spinner
      toggleLoadingSpinner(false);
}

const handlePhoneDetails = async (id)=> {
      const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
      const data = await res.json();
      const phone = data.data;
      
      showPhoneDetails(phone);
}

const showPhoneDetails = (phone)  => {
      // show modal 
      // const phoneName = document.getElementById('phone-name');
      // phoneName.innerText = phone.name;
      const showDetailsContainer = document.getElementById('show-details-container');
      showDetailsContainer.innerHTML = `
            <img class="mx-auto py-12" src="${phone.image}" alt="">
            <h3 class="text-xl font-bold">${phone.name}</h3>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <p><span class="font-bold">Storage :</span> ${phone?.mainFeatures?.storage}</p>
            <p><span class="font-bold">Display :</span> ${phone?.mainFeatures?.displaySize}</p>
            <p><span class="font-bold">Chip-set :</span> ${phone?.mainFeatures?.chipSet}</p>
            <p><span class="font-bold">Memory :</span> ${phone?.mainFeatures?.memory}</p>
            <p><span class="font-bold">Slug :</span> ${phone?.slug}</p>
            <p><span class="font-bold">Release-date :</span> ${phone?.releaseDate}</p>
            <p><span class="font-bold">Brand :</span>${phone?.brand}</p>
            <p><span class="font-bold">GPS :</span>${phone?.others?.GPS || "NO GPS"}</p>
      
      `

      showDetails_modal.showModal();

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

loadPhone()