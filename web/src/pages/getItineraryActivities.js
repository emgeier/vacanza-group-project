import MusicPlaylistClient from '../api/musicPlaylistClient';
import Header from '../components/header';
import BindingClass from '../util/bindingClass';
import DataStore from '../util/DataStore';

/**
 * Logic needed for the create playlist page of the website.
 */
class GetItineraryActivities extends BindingClass {
    constructor() {
        super();
        this.bindClassMethods(['mount', 'submit', 'addItineraryToPage'], this);
        this.dataStore = new DataStore();

        this.dataStore.addChangeListener(this.addItineraryToPage);
        this.header = new Header(this.dataStore);
    }
    /**
     * Add the header to the page and load the MusicPlaylistClient.
     //do we need another client??
     */
    mount() {
        document.getElementById('activities-of-itinerary').addEventListener('click', this.submit);

        this.header.addHeaderToPage();

        this.client = new MusicPlaylistClient();
    }
        /**
         * Method to run when the create itinerary submit button is pressed. Call the MusicPlaylistService to create the
         * playlist.
         */
        async submit(evt) {
            evt.preventDefault();

            const errorMessageDisplay = document.getElementById('error-message');
            errorMessageDisplay.innerText = ``;
            errorMessageDisplay.classList.add('hidden');

            const getButton = document.getElementById('activities-of-itinerary');
            const origButtonText = getButton.innerText;
            getButton.innerText = 'Loading...';
            //user input
            const tripName = document.getElementById('tripName').value;
            const email = document.getElementById('email').value;
            //get itinerary from database
            const itinerary = await this.client.getItinerary(email, tripName, (error) => {
                getButton.innerText = origButtonText;
                const errorMessageDisplay = document.getElementById('error-message');
                errorMessageDisplay.innerText = `Error: ${error.message}`;
                errorMessageDisplay.classList.remove('hidden');
            });
            this.dataStore.set('itinerary', itinerary);

            getButton.innerText = 'Complete';
            getButton.innerText = 'Submit to View';
        }
     addItineraryToPage() {
           const itinerary = this.dataStore.get('itinerary');
                if (itinerary == null) {
                    return;
                }
                document.getElementById('tripName').innerText = itinerary.tripName;

           const submitResultsContainer = document.getElementById('submit-results-container');
           const submitCriteriaDisplay  =   document.getElementById('submit-criteria-display');
           const submitResultsDisplay  =   document.getElementById('submit-results-display');

           const submitUsersDisplay  =   document.getElementById('users-display');
           const activityTableContainer = document.getElementById('activities-table-container');
           const activitiesContainer = document.getElementById('activities-container');

           activitiesContainer.classList.remove('hidden');
           submitResultsContainer.classList.remove('hidden');

           submitResultsDisplay.innerHTML = itinerary.cities;

           submitUsersDisplay.innerHTML = itinerary.users;

           const activities = itinerary.activities
           console.log(activities);

                if (activities == null) {
                     return '<h4>No activities found</h4>';
                }
                          let activityHtml = '';
                          let activity;
                              for (activity of activities) {
                              console.log(activity);
                              console.log(activity.name);
                              console.log(activity.cityCountry);
                              console.log(activity.kidFriendly);
                              const x = activity.kidFriendly === "True";
                              const a = activity.weatherPermitting === "True";
                              const j = activity.address != null;
                                console.log(x);
                                if(x == true) { var y = 'kid-friendly'} else {var y = ' '}
                                if(a == true) { var b = 'weather-permitting'} else {var b = ' '}
                                if(activity.address != null) {
                                    var c = activity.address;

                                    } else {var c = ' ';}
                                 activityHtml += `
                                <li class="activity">
                                 <span class="name">${activity.name}</span>
                                 <span class="space">${" : "}</span>
                                 <span class="place">${activity.cityCountry}</span>

                                 <span class="space">${"  :  "}</span>
                                 <span class="kidFriendly">${y}</span>

                                 <span class="space">${"  :  "}</span>
                                 <span class="weatherPermitting">${b}</span>

                                 <span class="space">${"  :  "}</span>
                                 <span href = "//https://www.google.com/maps/search/?api=1&parameters"
                                 class="address">${c}</span>


                                  </li>
                                        `;
                              }
                          document.getElementById('activities').innerHTML = activityHtml;
                          document.getElementById('view-itinerary-activities-form').reset;
            }



}
/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
console.log("main");
    const getItineraryActivities = new GetItineraryActivities();
    getItineraryActivities.mount();
};

window.addEventListener('DOMContentLoaded', main);