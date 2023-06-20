import {
  clear,
  start,
  createCarouselItem,
  appendCarousel,
} from "./Carousel.js";
// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
const dogBreed = document.querySelector("#dogBreed");
const bredFor = document.querySelector("#bredFor");
// const countryName = document.querySelector("#countryBox");
const lifeSpan = document.querySelector("#life-span");
const bottomSection = document.querySelector("#bottomSection");
const heightInfo = document.querySelector("#height-info");
const weightInfo = document.querySelector("#weight-info");
const defaultImage = document.querySelector("#default-image");

  axios.defaults.headers.common["x-api-key"] =
  "DEMO_API_KEY";

const data = {
  country_flag_url: "",
  images: [],
  breeds: [],
  selected_breed: {},
  current_image: {},
};

async function initialLoad() {
  try {
    
    let response = await axios.get("https://api.thedogapi.com/v1/breeds/");
    data.breeds = response.data;
    console.log("-- (" + data.breeds.length + ") Breeds from TheCatAPI.com");
    for (let i = 0; i < data.breeds.length; i++) {
      const breed = data.breeds[i];

      let newBreedOption = document.createElement("option");

      newBreedOption.value = i;
      newBreedOption.innerHTML = `${breed.name}`;
      breedSelect.append(newBreedOption);
    }
    console.log(data.breeds);
  } catch (err) {
    console.log(err);
  }
}

breedSelect.addEventListener("change", getDogInfo);

async function getDogInfo() {
  let breedInfo = [];
  // infoDump.innerHTML = "";
  bottomSection.innerHTML = "";
  // clear();
  breedInfo = data.breeds[breedSelect.value];
  data.selected_breed = breedInfo.name;
  console.log(data.selected_breed);
  // =================================================================
  // if (breedInfo.country_code !== undefined) {
    // data.country_flag_url = `https://github.com/lipis/flag-icons/blob/main/flags/1x1/${breedInfo.country_code}.svg`;
    // countryIcon.src = data.country_flag_url;
  // } 
  // ========================================= ^^ Country flag testing
  dogBreed.innerText = breedInfo.name;
  let bredForExists = "bred_for" in breedInfo;
  console.log(bredForExists);
  if (bredForExists == false) {
    bredFor.innerText = "Bred for: N/A";
  } else {
    if (breedInfo.bred_for !== undefined || breedInfo.bredFor !== "") {
      bredFor.innerText = `Bred for ${breedInfo.bred_for.toLowerCase()}.`;
    } else {
      bredFor.innerText = "Bred for: N/A";
    }
  }
  if (breedInfo.origin !== undefined && breedInfo.origin !== "") {
    let originInfo = document.createElement('span')
    originInfo.setAttribute("class", "inline-block bg-white px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2")
    originInfo.innerText = breedInfo.origin;
    bottomSection.appendChild(originInfo);
    console.log(originInfo);
  } else if (breedInfo.country_code !== undefined && breedInfo.country_code !== "") {
    let countryCode = document.createElement('span')
    countryCode.setAttribute("class", "inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2")
    countryCode.innerText = breedInfo.country_code;
    bottomSection.appendChild(countryCode);
    console.log(countryCode);
  }
  let tempString = breedInfo.temperament.split(",");
  console.log(tempString);
  for(let i=0; i<tempString.length; i++){
    let newTemperament = document.createElement('span')
    newTemperament.setAttribute('class', 'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2')
    newTemperament.innerText = tempString[i];
    bottomSection.appendChild(newTemperament);
    // document.getElementById('temp'[i+1]).innerText = tempString[i];
    console.log(newTemperament);
  }

  lifeSpan.innerText = `Life Span: ${breedInfo.life_span}`;
  heightInfo.innerText = `Height: ${breedInfo.height.imperial} inches`;
  weightInfo.innerText = `Weight: ${breedInfo.weight.imperial} pounds`;
  console.log(breedInfo);
  console.log(data.breeds[breedSelect.value].id);
  // getDogPics();
  if (breedInfo.image.url !== undefined || breedInfo.image.url !== "") {
    defaultImage.setAttribute("src", breedInfo.image.url);
  }
}

initialLoad();

/**
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 *  - Be creative with how you create DOM elements and HTML.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

async function getDogPics(){
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${
        data.breeds[breedSelect.value].id
      }`,
      // {
      //   onDownloadProgress: (progressEvent) => {
      //     updateProgress(progressEvent);
      //   }
      // }
    );
    data.images = response.data;
    for (const image of data.images) {
      let newImage = createCarouselItem(
        image.url,
        `${image.name} image`,
        image.id
      );
      appendCarousel(newImage);
      start();
      console.log(newImage);
    }
  } catch (err) {
    console.log(err);
  }
}
/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
