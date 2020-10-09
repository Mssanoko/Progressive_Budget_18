let db;

//create a new db request 
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    //create object store called "pending" and set autoIncrement to true

    const db = event.target.result;
    db.createObjectStore("pending", {autoIncrement: true});
};

request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine) {
        checkDatabase();
    }
};  

request.onerror = function(event) {
    console.log("Oups!" + event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    store.add(record);
}
// listen for app coming back online
window.addEventListener("online", checkDatabase)