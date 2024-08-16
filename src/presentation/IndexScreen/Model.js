class Subsection {
    constructor(id, title_ar, title_en, price, section_id) {
      this.id = id;
      this.title_ar = title_ar;
      this.title_en = title_en;
      this.price = price;
      this.section_id = section_id;
    }
  }
  
  class Section {
    constructor(id, image, title_ar, title_en, subsection) {
      this.id = id;
      this.image = image;
      this.title_ar = title_ar;
      this.title_en = title_en;
      this.subsection = subsection.map(
        (sub) =>
          new Subsection(
            sub.id,
            sub.title_ar,
            sub.title_en,
            sub.price,
            sub.section_id
          )
      );
    }
  }
  
  class ResponseData {
    constructor(ads, section) {
      this.ads = ads;
      this.section = section.map(
        (sec) =>
          new Section(sec.id, sec.image, sec.title_ar, sec.title_en, sec.subsection)
      );
    }
  }
  
  class ApiResponse {
    constructor(data, message, status) {
      this.data = new ResponseData(data.ads, data.section);
      this.message = message;
      this.status = status;
    }
  }
  

     // try {
      //   const response = await fetch('http://webappkwidsoft.site/tanzeef/public/api/home/index');
      //   const jsonResponse = await response.json();

      //   if (jsonResponse.status === 200) {
      //     setNewsItems(jsonResponse.data.section); // Adjust this according to your API structure
      //   } else {
      //     console.error('Failed to fetch data:', jsonResponse.message);
      //   }
      // } catch (error) {
      //   console.error('Error fetching data:', error);
      // }