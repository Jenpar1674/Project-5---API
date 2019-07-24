
let gallery = document.getElementById('gallery');
let defaultDisplay = gallery.style.display;
let usersOnPage = [];

//ajax to access api website and pull 12 random employees
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=US',
  dataType: 'json',
  success: function(data) {
    data.results.forEach(person => {
      empGallery(person);
    });
  }
});

//This section adds the ajax data. Creates gallery in correct format
let empGallery = (person) => {
  let profilePic = person.picture.large;
  let employeeName = person.name.first + " " + person.name.last;
  let employeeMail = person.email;
  let empLocation = person.location.city + ", " + person.location.state;
  
  let galleryCard =
      `<div class="card-img-container">
          <img class="card-img" src="${profilePic}" alt="profile picture">
      </div>
      <div class="card-info-container"><h3 id="name" class="card-name cap">${employeeName}</h3>
          <p class="card-text">${employeeMail}</p>
          <p class="card-text cap">${empLocation}</p>
      </div>`;
  let cardDiv = document.createElement("div"); 
  cardDiv.setAttribute('class', 'card');
  cardDiv.setAttribute('id', employeeName + " card");
  cardDiv.innerHTML = galleryCard;         
  gallery.appendChild(cardDiv);
  makeModal(profilePic, employeeName, employeeMail, person);

  // displays the cards modal when clicked
  cardDiv.addEventListener('click', (e) => {
    for(let i = 0; i < e.path.length; i++) {
      if(e.path[i].classList.contains('card')) {
        let selectedCard = e.path[i].lastChild.firstChild.innerHTML;
        let findCard = document.getElementById(selectedCard);
        findCard.style.display = defaultDisplay;
        findCard.setAttribute('class','modal-container active');
        break;
      };
    }
  });
}; 


//This section creates the modal element 
let makeModal = (profilePic, employeeName, employeeMail, person) => {
  usersOnPage.push(employeeName);
  let userCity = person.location.city;
  let userNumber = person.cell;
  let fullAddress = person.location.street + ", " + person.location.city + ", " + person.location.state + " " + person.location.postcode;
  let userBirthday1 = person.dob.date;
  userBirthday = userBirthday1.substring(0,10);
  let modalContent =
      `<div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${profilePic}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${employeeName}</h3>
              <p class="modal-text">${employeeMail}</p>
              <p class="modal-text cap">${userCity}</p>
              <hr>
              <p class="modal-text">${userNumber}</p>
              <p class="modal-text">${fullAddress}</p>
              <p class="modal-text">Birthday: ${userBirthday}</p>
          </div>
      
      </div>`;
  let cardModal = document.createElement('div');     
  cardModal.setAttribute('class','modal-container');  
  cardModal.setAttribute('id', employeeName);
  cardModal.style.display = 'none';
  cardModal.innerHTML = modalContent;       
  document.body.appendChild(cardModal); 

  //Hides the modal if the X button is clicked
  let xButton = cardModal.firstChild.firstChild;
  xButton.addEventListener('click', () =>{
    cardModal.style.display = 'none';
  });

  


}
