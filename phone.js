const url = 'https://openapi.programming-hero.com/api/phones?search=iphone';
const loadPhone = async () => {
      const res = await fetch (url);
      const data = await res.json();
      const phones = data.data
     console.log(phones);
}

loadPhone();