//  G L O B A L    V A R I A B L E S
let displayMeals, displaySearchBox, dispyContactBox, Category, area, ingredient;
displayMeals = document.querySelector('#mealsGallery');
displaySearchBox = $("#searchBox");
dispyContactBox = $('#contactBox');
Category = $('#Category');
area = $('#area');
ingredient = $('#ingredient');
// Laoding Hider
$(document).ready(_=> {
  $('.loading-screen').fadeOut(1000,function(){
    $('body').css('overflow', 'auto')
  });
})
// C O L L A P S E  ---  S I D E B A R  ---  F U N C T I O N
$('#btnToggle').click(function(){
  $('#btnToggle').attr("class", "bi bi-list h1 text-black");

if($('#sideBar').css('left') == "-256px") {
  $('#btnToggle').attr("class", "bi-x-lg h1 text-black");
  $('#sideBar').animate({left:'0px'}, 600);
  $('.my-link').slideDown(750);
} else {
  $('#btnToggle').attr("class", "bi bi-list h1 text-black");
  $('#sideBar').animate({left:"-256px"}, 500)
  $('.my-link').slideUp(500);
}
});
//// G E T  ---  R A N D O M  ---  20  M E A L
let getMeals = async _ => {
  displayMeals.innerHTML = '';
  dispyContactBox.addClass('d-none');
  for (let i = 0; i < 20; i++) {
  let myUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;
  var response = await fetch(myUrl);
  var finalResponse = await response.json();  
    displayMeals.innerHTML += `
    <div class="col-md-3">
      <div class="meal-box-random position-relative overflow-hidden rounded-2 cursor-pointer">
        <img src="${finalResponse.meals[0].strMealThumb}" alt="${finalResponse.meals[0].strMeal}" class="w-100 rounded-3">
        <div id="${finalResponse.meals[0].idMeal}" class="layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${finalResponse.meals[0].strMeal}</h3>
        </div>
    </div>
    `
  }
  $('.layer').click((e) => {
    getMealDetails(e.currentTarget.id)
  })
};
getMeals();
let getMealDetails = async (id) => {
  displayMeals.innerHTML = '';
  dispyContactBox.addClass('d-none');
  displaySearchBox.html("");
  let myUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  var response = await fetch(myUrl);
  var finalResponse = await response.json();
  console.log(finalResponse);
  displayMeals.innerHTML += `
  <div id="mealDetails" class="container mx-auto row py-3 g-4">
  <div class="col-md-4">
    <img src="${finalResponse.meals[0].strMealThumb}" alt="meal" class="w-100">
    <h2 class="text-white mt-1">${finalResponse.meals[0].strMeal}</h2>
  </div>
  <div class="col-md-8 d-flex flex-column align-items-start">
    <h2>Instructions</h2>
    <p>${finalResponse.meals[0].strInstructions}</p>
    <h3>Area: <span>${finalResponse.meals[0].strArea}</span></h3>
    <h3>Category: <span>${finalResponse.meals[0].strCategory}</span></h3>
    <h3>Recipes : <span></span></h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${getIngredients(finalResponse)}
    </ul>
    <div class="resources d-flex align-items-center justify-content-center">
      <a href="${finalResponse.meals[0].strSource}" target="_blank" class="btn btn-success me-2">Source</a>
      <a href="${finalResponse.meals[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
  </div>
</div>
    `
    function getIngredients(finalResponse) {
      let ul = ``;
      for (let i = 1; i < 20; i++) {
        if(`${finalResponse.meals.strIngredient}${i}`) {
        let ingredient = `
        <li class="alert alert-info m-2 p-1">${finalResponse.meals[0].strIngredient1}</li>
        <li class="alert alert-info m-2 p-1">${finalResponse.meals[0].strIngredient2}</li>
        <li class="alert alert-info m-2 p-1">${finalResponse.meals[0].strIngredient3}</li>
        <li class="alert alert-info m-2 p-1">${finalResponse.meals[0].strIngredient4}</li>
        <li class="alert alert-info m-2 p-1">${finalResponse.meals[0].strIngredient5}</li>
        <li class="alert alert-info m-2 p-1">${finalResponse.meals[0].strIngredient6}</li>
        <li class="alert alert-info m-2 p-1">${finalResponse.meals[0].strIngredient7}</li>
        `;
          ul += `
          ${ingredient}
          `
          return ul
        } else {
          break;
        }
      }
    }
  }
//// G E T  ---  M E A L  ---  C A T E G O R I E S
Category.click(async _=> {
  displayCategories = displayMeals;
  displayCategories.innerHTML = '';
  dispyContactBox.addClass('d-none');
  displaySearchBox.html("");
  let myUrl = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  var response = await fetch(myUrl);
  var finalResponse = await response.json();
  for (let i = 0; i < finalResponse.categories.length; i++) {
  displayCategories.innerHTML += `
  <div class="col-md-3">
  <div class="meal-box position-relative overflow-hidden rounded-2 cursor-pointer">
    <img src="${finalResponse.categories[i].strCategoryThumb}" alt="${finalResponse.categories[i].strCategory}" class="w-100 rounded-3">
    <div class="layer position-absolute d-flex align-items-center text-black p-2">
      <h3 class="mb-3 header">${finalResponse.categories[i].strCategory}</h3>
      <p class="px-1 text-center">${finalResponse.categories[i].strCategoryDescription.split(" ").splice(0, 38).join(" ")}</p>
    </div>
  </div>
    `
    $('.layer').click((e) => {
      displayCategories.innerHTML =" ";
      getSingleCategory(e.currentTarget.childNodes[1].innerText)
    })
  }
})
;
// G E T  ---  S I N G L E  ---  C A T E G O R Y  ---  M E A L S
let getSingleCategory = async (category) => {
    displayMeals.innerHTML = '';
    let myUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    var response = await fetch(myUrl);
    var finalResponse = await response.json();
    for (let i = 0; i < finalResponse.meals.length; i++) {
      displayMeals.innerHTML += `
      <div class="col-md-3">
  <div class="meal-box position-relative overflow-hidden rounded-2 cursor-pointer">
    <img src="${finalResponse.meals[i].strMealThumb}" alt="${finalResponse.meals[i].strMeal}" class="w-100 rounded-3">
    <div  id="${finalResponse.meals[0].idMeal}" class="layer position-absolute d-flex align-items-center text-black p-2">
      <h3 class="mb-3 header">${finalResponse.meals[i].strMeal}</h3>
    </div>
  </div>
      `
      $('.layer').click((e) => {
        getMealDetails(e.currentTarget.id)
      })
    }
  }
// G E T  ---  A L L  ---  A R E A S
area.click(async _=> {
  let displayAreas = displayMeals;
  displayAreas.innerHTML = ' ';
  dispyContactBox.addClass('d-none');
  displaySearchBox.html("");
  let myUrl = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
  var response = await fetch(myUrl);
  var finalResponse = await response.json();
  for (let i = 0; i < finalResponse.meals.length; i++) {
    displayAreas.innerHTML += `
    <div class="area-box col-md-3 d-flex flex-column mt-5 justify-content-center align-items-center">
      <i class="area-icon bi bi-houses-fill"></i>
      <h3 class="area-name">${finalResponse.meals[i].strArea}</h3>
    </div>
    `
    $('.area-box').click((e) => {
      displayAreas.innerHTML ="";
      getSingleArea(e.currentTarget.childNodes[3].innerText)
    })
  }
})
// G E T  ---  S I N G L E  ---  A R E A  ---  M E A L S
let getSingleArea = async (area) => {
  displayMeals.innerHTML = '';
  dispyContactBox.innerHTML = ' ';
  let myUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  var response = await fetch(myUrl);
  var finalResponse = await response.json();
  for (let i = 0; i < finalResponse.meals.length; i++) {
    displayMeals.innerHTML += `
    <div class="col-md-3">
  <div class="meal-box position-relative overflow-hidden rounded-2 cursor-pointer">
    <img src="${finalResponse.meals[i].strMealThumb}" alt="${finalResponse.meals[i].strMeal}" class="w-100 rounded-3">
    <div  id="${finalResponse.meals[0].idMeal}" class="layer position-absolute d-flex align-items-center text-black p-2">
    <h3 class="mb-3 header">${finalResponse.meals[i].strMeal}</h3>
  </div>
  </div>
    `
    $('.layer').click((e) => {
      getMealDetails(e.currentTarget.id)
    })
  }
}
// G E T  ---  A L L  ---  I N G R E D I E N T S
ingredient.click(async _=> {
  let displayIngredients = displayMeals;
  dispyContactBox.addClass('d-none');
  displayIngredients.innerHTML = '';
  displaySearchBox.html("");
  let myUrl = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
  var response = await fetch(myUrl);
  var finalResponse = await response.json();
  for (let i = 0; i < 20; i++) {
    displayIngredients.innerHTML += `
  <div class="ingredient-box col-md-3 d-flex flex-column mt-5 justify-content-between align-items-center">
    <i class="basket bi bi-basket3-fill"></i>
    <h3 class="mb-3">${finalResponse.meals.slice(0, 99)[i].strIngredient}</h3>
    <p class="text-center">${finalResponse.meals.slice(0, 99)[i].strDescription.split(" ").splice(0, 38).join(" ")}</p>
  </div>
    `
      $('.ingredient-box').click((e) => {
        displayIngredients.innerHTML ="";
        getSingleIngredient(e.currentTarget.childNodes[3].innerText)
      })
  }
});
// G E T  ---  S I N G L E  ---  I N G R E D I E N T  ---  M E A L S
let getSingleIngredient = async (ingredient) => {
  displayMeals.innerHTML = '';
  let myUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  var response = await fetch(myUrl);
  var finalResponse = await response.json();
  for (let i = 0; i < finalResponse.meals.length; i++) {
    displayMeals.innerHTML += `
    <div class="col-md-3">
  <div class="meal-box position-relative overflow-hidden rounded-2 cursor-pointer">
    <img src="${finalResponse.meals[i].strMealThumb}" alt="${finalResponse.meals[i].strMeal}" class="w-100 rounded-3">
    <div id="${finalResponse.meals[0].idMeal}" class="layer position-absolute d-flex align-items-center text-black p-2">
    <h3 class="mb-3 header">${finalResponse.meals[i].strMeal}</h3>
  </div>
  </div>
    `
    $('.layer').click((e) => {
      getMealDetails(e.currentTarget.id)
    })
  }
}
// G E T  ---  S E A R C H  ---  S E C T I O N
$('#search').click(_=>{
  displayMeals.innerHTML = ' ';
  dispyContactBox.addClass('d-none');
  displaySearchBox = $("#searchBox");
  displaySearchBox.html(`
    <div class="col-md-6">
      <input
        type="text"
        id="byName"
        class="form-control
        bg-transparent"
        placeholder="Search By Name">
    </div>
    <div class="col-md-6">
      <input
        type="text"
        id="byFirstLetter"
        class="form-control
        bg-transparent"
        placeholder="Search By First Letter"
        maxlength="1">
    </div>
`);
// Get Searched Meals
/////////////By Name
let searchName = $("#byName");
searchName.keyup(()=>{
let searchTerm = searchName.val();
getMealsByName(searchTerm);
});
/////////////By First Letter
let searchLetter = $("#byFirstLetter");
searchLetter.keyup(()=>{
let searchTerm = searchLetter.val();
getMealsByLetter(searchTerm);
})
})
/////////////Search By Name Function
async function getMealsByName(searchTerm) {
  let displayMeals = document.querySelector('#mealsGallery');
  displayMeals.innerHTML = '';
  let myUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  var response = await fetch(myUrl);
  var finalResponse = await response.json();
  for (let i = 0; i < 20; i++) {
    displayMeals.innerHTML += `
    <div class="col-md-3">
      <div class="meal-box position-relative overflow-hidden rounded-2 cursor-pointer">
        <img src="${finalResponse.meals[i].strMealThumb}" alt="${finalResponse.meals[i].strMeal}" class="w-100 rounded-3">
        <div  id="${finalResponse.meals[0].idMeal}" class="layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${finalResponse.meals[i].strMeal}</h3>
        </div>
    </div>
    `
    $('.layer').click((e) => {
      getMealDetails(e.currentTarget.id)
    })
  }
};
/////////////Search By First Letter Function
async function getMealsByLetter(searchTerm) {
  let displayMeals = document.querySelector('#mealsGallery');
  displayMeals.innerHTML = '';
  let myUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`;
  var response = await fetch(myUrl);
  var finalResponse = await response.json();
  for (let i = 0; i < 20; i++) {
    displayMeals.innerHTML += `
    <div class="col-md-3">
      <div class="meal-box position-relative overflow-hidden rounded-2 cursor-pointer">
        <img src="${finalResponse.meals[i].strMealThumb}" alt="${finalResponse.meals[i].strMeal}" class="w-100 rounded-3">
        <div id="${finalResponse.meals[0].idMeal}" class="layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${finalResponse.meals[i].strMeal}</h3>
        </div>
    </div>
    `
    $('.layer').click((e) => {
      getMealDetails(e.currentTarget.id)
    })
  }
};
// G E T  ---  C O N T A C T  ---  S E C T I O N
$('#contact').click(_=>{
  displayMeals.innerHTML = ' ';
  displaySearchBox.html("");
  dispyContactBox.removeClass('d-none');
  dispyContactBox.addClass('d-block');
  dispyContactBox.innerHTML = `
  <div id="contactBox" class="inner py-3 g-4 text-center w-75 mx-auto">
        <div class="container row">
          <div class="col-md-6 my-3">
            <input
              type="text"
              id="name"
              class="form-control
              bg-transparent"
              placeholder="Enter your name">
              <div id="warnningName" class="alert alert-danger w-100 mt-2 d-none ">
                Special characters and numbers not allowed
              </div>
            </div>
            
            <div class="col-md-6 my-3">
              <input
              type="text"
              id="email"
              class="form-control
              bg-transparent"
              placeholder="Enter your Email">
              <div id="warnningEmail" class="alert alert-danger w-100 mt-2 d-none ">
                Email not valid *exemple@yyy.com
              </div>
            </div>
      
          <div class="col-md-6 my-3">
            <input
              type="text"
              id="phone"
              class="form-control
              bg-transparent"
              placeholder="Enter your phone">
              <div id="warnningPhone" class="alert alert-danger w-100 mt-2 d-none ">
                Enter valid Phone Number
              </div>
          </div>
      
          <div class="col-md-6 my-3">
            <input
              type="number"
              min="1"
              max="100"
              id="age"
              class="form-control bg-transparent"
              placeholder="Enter your age">
              <div id="warnningAge" class="alert alert-danger w-100 mt-2 d-none ">
                Enter valid Age
              </div>
          </div>
      
          <div class="col-md-6 my-3">
            <input
              type="password"
              id="password"
              class="form-control
              bg-transparent"
              placeholder="Enter your password">
              <div id="warnningPassword" class="alert alert-danger w-100 mt-2 d-none ">
                Enter valid password *Minimum eight characters, at least one letter and one number*
              </div>
          </div>
          
          <div class="col-md-6 my-3">
            <input
              type="password"
              id="repassword"
              class="form-control
              bg-transparent"
              placeholder="Repassword">
          </div>
          <div id="warnningRepassword" class="alert alert-danger w-100 mt-2 d-none ">
            Enter valid repassword
          </div>
        </div>
        <button id="subBtn" class="btn btn-outline-danger px-3 mt-3" disabled >Submit</button>
      </div>
  `;

});
//////////////VALIDATION////////////////////////
//// Variables
  let userName, userEmail,userPhone, userPassword, userAge, userRepassword, submitBtn;
//// enable btn vars
  let nameOk, emailOk, phoneOk, ageOk, passOk, repasswordOk;
//=================================================================================================================
///////==================================-----------VALIDATION-----------==================================////////
// get values from user
userName           = $('#name'),
userEmail          = $('#email'),
userPhone          = $('#phone'),
userAge            = $('#age'),
userPassword       = $('#password'),
userRepassword     = $('#repassword');
// sign Submit Button
submitBtn          = document.querySelector("#subBtn");
////////////////////////////////////////
// 1- Validate userName ===>
function validateUserName() {
  var regex = /^([a-z ,.'\s-]){5,25}$/gi;
  if (regex.test(userName.val())) {
    return true
  } else {
    return false
  }
};
userName.keyup(_=> {
  let testValidation = validateUserName();
  if(!testValidation) {
    warnningName.removeClass("d-none");
    warnningName.addClass("d-block");
    return
  } else {
    warnningName.addClass("d-none");
    warnningName.removeClass("d-block");
  }
});
let warnningName = $("#warnningName");
//=======================================================================
//=======================================================================
// 2- Validate userEmail ===>
function validateUserEmail() {
  var regex = /(^[A-Za-z\._\-0-9]*[@][A-Za-z]*(\.com)$)/gi;
  if (regex.test(userEmail.val())) {
    return true
  } else {
    return false
  }
};
userEmail.keyup(_=> {
  let testValidation = validateUserEmail();
  if(!testValidation) {
    warnningEmail.removeClass("d-none");
    warnningEmail.addClass("d-block");
  } else {
    warnningEmail.addClass("d-none");
    warnningEmail.removeClass("d-block");
  }
});
let warnningEmail = $("#warnningEmail");
//=======================================================================
//=======================================================================
// 3- Validate userPhone ===>
function validateUserPhone() {
    var regex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
    if (regex.test(userPhone.val())) {
      return true
    } else {
      return false
    }
};
userPhone.keyup(_=> {
  let testValidation = validateUserPhone();
  if(!testValidation) {
    warnningPhone.removeClass("d-none");
    warnningPhone.addClass("d-block");
  } else {
    warnningPhone.removeClass("d-block");
    warnningPhone.addClass("d-none");
  }
});
let warnningPhone = $("#warnningPhone");
//=======================================================================
//=======================================================================
// 4- Validate userAge ===>
function validateUserAge() {
  var regex = /^(1[2-9]|[2-9]\d)$/gi;
  if (regex.test(userAge.val())) {
    return true
  } else {
    return false
  }
};
userAge.keyup(_=> {
  let testValidation = validateUserAge();
  if(!testValidation) {
    warnningAge.removeClass("d-none");
    warnningAge.addClass("d-block");

  } else {
    warnningAge.removeClass("d-block");
    warnningAge.addClass("d-none");
  }
});
let warnningAge = $("#warnningAge");
//=======================================================================
//=======================================================================
//// 5- Validate userPassword ===>
function validateUserPassword() {
  var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/gi;
  if (regex.test(userPassword.val())) {
    return true
  } else {
    return false
  }
};
userPassword.keyup(_=> {
  let testValidation = validateUserPassword();
  if(!testValidation) {
    warnningPassword.removeClass("d-none");
    warnningPassword.addClass("d-block");
  } else {
    warnningPassword.removeClass("d-block");
    warnningPassword.addClass("d-none");
  }
}); 
let warnningPassword = $("#warnningPassword");
//// 6- Validate userRePassword ===>
let warnningRepassword = $("#warnningRepassword");
userRepassword.keyup(_=> {
  if(userRepassword.val() !== userPassword.val()) {
    warnningRepassword.removeClass("d-none");
    warnningRepassword.addClass("d-block");
  } else {
    warnningRepassword.removeClass("d-block");
    warnningRepassword.addClass("d-none");
  };
  if(validateUserName() == true && validateUserEmail() == true && validateUserPhone() == true && validateUserAge() == true && validateUserPassword() == true && userRepassword.val() == userPassword.val()) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;;
  }
});