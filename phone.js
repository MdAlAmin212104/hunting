
// https://openapi.programming-hero.com/api/phones?search=iphone
const loadPhone = async (searchPhone) => {
      const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
      const data = await res.json();
      const phones = data.data
     displayPhones(phones);
}


const displayPhones = phones => {
      const phoneContainer = document.getElementById('phone-container');
      phoneContainer.textContent = '';

      const showButton = document.getElementById("show-all-container");
      if(phones.length > 12){
            showButton.classList.remove ('hidden');
      }
      else{
            showButton.classList.add ('hidden');
      }

      phones = phones.slice (0, 12);
      phones.forEach (phone => {
            console.log(phone);
            const phoneCard = document.createElement('div');
            phoneCard.classList = "card p-5 bg-base-100 shadow-xl";
            phoneCard.innerHTML =`
                  <figure class ="p-5 bg-[#0D6EFD0D]"><img src=${phone.image} alt="Shoes" /></figure>
                  <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>${phone.slug}</p>
                        <div class="card-actions justify-center">
                              <button class="btn btn-primary">Show Details</button>
                        </div>
                  </div>
            `
            phoneContainer.appendChild(phoneCard);


      })
}
const handleSearch = () => {
      const searchField = document.getElementById('search-field');
      const text = searchField.value;
      console.log(text);
      loadPhone(text);
}
