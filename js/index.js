//Cordova
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    load();
    calendar();
}


//Aufgaben laden, beim Start des Browsers
$(document).ready(function(){

    var windowHeight = $(window).innerHeight();
    $('body').css({'height':windowHeight});
    
    load();
    calendar();
    checkDueDate();
    
});

var date;
var time;

function calendar() {
    date = new Date();
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
      
    time = new Date();
    var hour = String(time.getHours()).padStart(2, '0');
    var minute = String(time.getMinutes()).padStart(2, '0');
      
    date = year + '-' + month + '-' + day;
    time = hour + ':' + minute;
      
    document.getElementById("calendar").value = date;
    document.getElementById("time").value = time;
}

function checkDueDate() {

    document.querySelectorAll(".task-item").forEach(function(task) {
        if (task.dataset.date < date) {
            task.children[0].style.color = "red";
        }
        if (task.dataset.date == date) {
            task.children[0].style.color = "orange";
        }
        if (task.dataset.date > date) {
            task.children[0].style.color = "var(--font-color)";
        }
    })
}

function getTaskToDo() {

    if (document.getElementById("todo").style.display == "none") {
        //To-Do-Liste anzeigen und Hintergrund zu ausgewählt ändern
        document.getElementById("todo").style.display = "inherit";
        document.getElementById("button-todo").style.backgroundColor = "var(--secondary-color)";
        document.getElementById("market").style.display = "none";
        document.getElementById("button-market").style.backgroundColor = "var(--primary-color)";

        //Aufgabenliste als Ausgewählt speichern, für erneutes Laden
        window.localStorage.setItem("list", "todo");

        //Alle Elemente ausstellen
        document.getElementById("todo-buttons").style.display = "inherit";
        document.getElementById("market-buttons").style.display = "none";
        document.getElementById("input").style.display = "none";
        document.getElementById("date-time").style.display = "none";
        document.getElementById("amount").style.display = "none";
        document.getElementById("todo-input-icon").classList.replace("fa-minus", "fa-plus");
        document.getElementById("calendar-icon").classList.replace("fa-calendar-minus", "fa-calendar-plus");
        
        //HTML Größen anpassen
        document.getElementById("header").style.height = "8em";
        document.getElementById("main").style.top = "8em";
        document.getElementById("main").style.height = "calc(100vh - 11em)";

    } else {
        //To-Do-Liste entfernen
        document.getElementById("todo").style.display = "none";
        document.getElementById("button-todo").style.backgroundColor = "var(--primary-color)";
        document.getElementById("todo-buttons").style.display = "none";

        //Aufgabenliste aus localStorage entfernen
        window.localStorage.setItem("list", "null");

        //Alle Elemente entfernen
        document.getElementById("input").style.display = "none";
        document.getElementById("date-time").style.display = "none";
        document.getElementById("todo-input-icon").classList.replace("fa-minus", "fa-plus");
        document.getElementById("calendar-icon").classList.replace("fa-calendar-minus", "fa-calendar-plus");
        document.getElementById("header").style.height = "8em";
        document.getElementById("main").style.top = "8em";
        document.getElementById("main").style.height = "calc(100vh - 11em)";
    }
}

function getTaskMarket() {

    if (document.getElementById("market").style.display == "none") {
        //Einkaufsiste anzeigen und Hintergrund zu ausgewählt ändern
        document.getElementById("todo").style.display = "none";
        document.getElementById("button-todo").style.backgroundColor = "var(--primary-color)";
        document.getElementById("market").style.display = "inherit";
        document.getElementById("button-market").style.backgroundColor = "var(--secondary-color)";

        //Einkaufsliste als Ausgewählt speichern, für erneutes Laden
        window.localStorage.setItem("list", "market");

        //Alle Elemente ausstellen
        document.getElementById("market-buttons").style.display = "inherit";
        document.getElementById("todo-buttons").style.display = "none";
        document.getElementById("input").style.display = "none";
        document.getElementById("date-time").style.display = "none";
        document.getElementById("amount").style.display = "none";
        document.getElementById("market-input-icon").classList.replace("fa-minus", "fa-plus");
        document.getElementById("amount-icon").classList.replace("fa-cart-arrow-down", "fa-cart-plus");

        //HTML Größen anpassen
        document.getElementById("header").style.height = "8em";
        document.getElementById("main").style.top = "8em";
        document.getElementById("main").style.height = "calc(100vh - 11em)";
        
    } else {
        //Einkaufsliste entfernen
        document.getElementById("market").style.display = "none";
        document.getElementById("button-market").style.backgroundColor = "var(--primary-color)";
        document.getElementById("market-buttons").style.display = "none";

        //Einkaufsliste aus localStorage entfernen
        window.localStorage.setItem("list", "null");

        //Alle Elemente entfernen
        document.getElementById("input").style.display = "none";
        document.getElementById("amount").style.display = "none";
        document.getElementById("market-input-icon").classList.replace("fa-minus", "fa-plus");
        document.getElementById("amount-icon").classList.replace("fa-cart-arrow-down", "fa-cart-plus");
        document.getElementById("header").style.height = "8em";
        document.getElementById("main").style.top = "8em";
        document.getElementById("main").style.height = "calc(100vh - 11em)";
    }
}

function addTask() {
    //Text in Eingabefeld erhalten
    var input = document.getElementById("todo-input").value;

    var inputDate = document.getElementById("calendar").value;
    var inputDateHTML = new Date(document.getElementById("calendar").value);
    var inputDateYear = inputDateHTML.getFullYear();
    var inputDateMonth = String(inputDateHTML.getMonth() + 1).padStart(2, '0');
    var inputDateDay = String(inputDateHTML.getDate()).padStart(2, '0');
    inputDateHTML = inputDateDay + '.' + inputDateMonth + '.' + inputDateYear;

    var inputTime = document.getElementById("time").value;

    var inputAmount = document.getElementById("input-amount").value;
    var inputUnit = document.getElementById("unit").value;

    //Testen welche Liste ausgewählt ist oder ob keine ausgewählt wurde
    if (document.getElementById("todo").style.display == "inherit") {
        newTaskDiv = document.getElementById("todo");
    } else if (document.getElementById("market").style.display == "inherit") {
        newTaskDiv = document.getElementById("market");
    } else {
        alert("Aufgabenliste oder Einkaufsliste auswählen!");
        error = true;
    }

    if (error != true) {
        //Testen ob das Eingabefeld leer ist
        if (input.length == 0) {
            alert("Eingabe ist leer");
            var error = true;
        } else {
            //Div erstellen für Aufgabe
            var newTask = document.createElement("div");
            newTask.className = "task-item";
            newTask.setAttribute("onclick", "taskFocus(this);");
            newTask.onclick = function() {taskFocus(this);};

            //Erstelldatum in Data-Attribut eintragen
            newTask.dataset.createdDate = new Date();
            //Status ob abgeschlossen in Data-Attribut eintragen
            newTask.dataset.finished = "0";

            newTaskDiv.appendChild(newTask);

            //Div erstellen für Datum und Uhrzeit bzw. Menge und Einheit
            var divAddition = document.createElement("div");
            divAddition.className = "task-item-addition";

            //Bei ToDo-Liste Datum und Uhrzeit anlegen
            if (document.getElementById("todo").style.display == "inherit") {
                
                var calendarCheck = document.getElementById("calendar-check");
                var clockCheck = document.getElementById("time-check");
                //Datum und Uhrzeit sind ausgeschaltet
                if (calendarCheck.dataset.checked == "false" && clockCheck.dataset.checked == "false") {
                    //Kein Datum oder Uhrzeit wird angezeigt
                    divAddition.style.display = "none";
                    //Spätes Datum, damit es immer als unterstes angezeigt wird
                    newTask.dataset.dueDate = "9999-12-31T00:00";
                } else
                //Datum ist aktiviert, Uhrzeit ist ausgeschaltet
                if (calendarCheck.dataset.checked == "true" && clockCheck.dataset.checked == "false") {
                    //Datum wird angezeigt
                    divAddition.innerHTML = inputDateHTML;
                    //Fälligkeitsdatum in Data-Attribut eintragen
                    newTask.dataset.dueDate = inputDate + "T" + inputTime;
                    newTask.dataset.date = inputDate;
                } else
                //Datum und Uhrzeit sind aktiviert
                if (calendarCheck.dataset.checked == "true" && clockCheck.dataset.checked == "true") {
                    //Datum und Uhrzeit wird angezeigt
                    divAddition.innerHTML = inputDateHTML + "<br>" + inputTime;
                    newTask.dataset.dueDate = inputDate + "T" + inputTime;
                    newTask.dataset.date = inputDate;
                }
                //Datum und Uhrzeit sind ausgeschaltet
                if (calendarCheck.dataset.checked == "false" && clockCheck.dataset.checked == "true") {
                    //Kein Datum oder Uhrzeit wird angezeigt
                    divAddition.style.display = "none";
                    //Spätes Datum, damit es immer als unterstes angezeigt wird
                    newTask.dataset.dueDate = "9999-12-31T00:00";
                }

                newTask.appendChild(divAddition);
                newTaskDiv.appendChild(newTask);
            }

            //Bei Einkaufsliste Menge und Einheit anlegen
            if (document.getElementById("market").style.display == "inherit") {
                if(document.getElementById("input-amount").value == "") {
                    //Keine Menge
                    divAddition.style.display = "none";
                    newTask.appendChild(divAddition);
                } else {
                    //Menge
                    divAddition.innerHTML = inputAmount + " " + inputUnit;
                    newTask.appendChild(divAddition);
                }
            }

            //Div erstellen für Text
            var divText = document.createElement("div");
            divText.className = "task-item-text";
            divText.innerHTML = input;
            newTask.appendChild(divText);

            //Div erstellen für Abschließen und Löschen
            var buttonGroup = document.createElement("div");
            buttonGroup.className = "task-button-group";
            newTask.appendChild(buttonGroup);

            //Button zum Abschließen
            var buttonLeft = document.createElement("button");
            buttonLeft.className = "task-button";
            buttonLeft.style.borderBottomLeftRadius = "0.5em";
            buttonLeft.setAttribute("onclick", "finishTask(this);");
            buttonLeft.onclick = function() {finishTask(this);};
            buttonGroup.appendChild(buttonLeft);

            //Icon Haken
            var iconLeft = document.createElement("i");
            iconLeft.className = "task-icon far fa-calendar-check";
            buttonLeft.appendChild(iconLeft);

            //Button zum Löschen
            var buttonRight = document.createElement("button");
            buttonRight.className = "task-button";
            buttonRight.style.borderBottomRightRadius = "0.5em";
            buttonRight.setAttribute("onclick", "deleteTask(this);");
            buttonRight.onclick = function() {deleteTask(this);};
            buttonGroup.appendChild(buttonRight);

            //Icon Mülleimer
            var iconRight = document.createElement("i");
            iconRight.className = "task-icon far fa-trash-alt";
            buttonRight.appendChild(iconRight);

            //Div zum Abschließen und Löschen erstmal auf Display: none setzen
            buttonGroup.style.display = "none";

            //Eingabe leeren
            document.getElementById("todo-input").value = "";

            //Kalendar erneueren
            calendar();

            //Farbliche Kennzeichnung, wenn nur noch wenig Zeit zum Fertigstellen existiert
            checkDueDate();

            //App Stand speichern
            save();
        }
    }
}

function taskFocus(taskItem) {
    if (taskItem.children[2].style.display == "none") {

        //Anzeigen von task-button-group
        taskItem.children[2].style.display = "inherit";

        //Padding von task-item anpassen
        taskItem.style.paddingBottom = "2.5em";
    }
    else {

        //Ausblenden von task-button-group
        taskItem.children[2].style.display = "none";

        //Padding von task-item anpassen
        taskItem.style.paddingBottom = "1em";
    }
}

function deleteTask(taskButton) {
    //Div task-item löschen
    taskButton.parentNode.parentNode.parentNode.removeChild(taskButton.parentNode.parentNode);

    //App Stand speichern
    save();
}

function finishTask(taskButton) {

    if (taskButton.parentNode.parentNode.children[1].style.color != "green") {
        //task-item abschließen
        taskButton.parentNode.parentNode.children[1].style.color = "green";
        taskButton.parentNode.parentNode.children[1].style.fontWeight = "500";
        taskButton.firstElementChild.className = "task-icon far fa-calendar-times";

        //Data-Attribut auf abgeschlossen setzen
        taskButton.parentNode.parentNode.dataset.finished = "1";

        //App Stand speichern nach 10 Milisekunden
        setTimeout(save, 10);

    } else {
        //task-item neu öffnen
        taskButton.parentNode.parentNode.children[1].style.color = "var(--font-color)";
        taskButton.parentNode.parentNode.children[1].style.fontWeight = "inherit";
        taskButton.firstElementChild.className = "task-icon far fa-calendar-check";

        //Data-Attribut auf nicht abgeschlossen setzen
        taskButton.parentNode.parentNode.dataset.finished = "0";

        //App Stand speichern nach 10 Milisekunden
        setTimeout(save, 10);
    }
}

function save() {

    //Alle Task Buttons ausblenden
    var className = document.getElementsByClassName("task-button-group");
    var length;
    for (length = 0; length < className.length; length++) {
        className[length].style.display = "none";
        className[length].parentNode.style.paddingBottom = "1em";
    }

    //Inhalt von Aufgabenliste als LocalStorage speichern
    var saveTodo = document.getElementById("todo").innerHTML;
    window.localStorage.setItem("saveTodo", saveTodo);

    //Inhalt von Einkaufsliste als LocalStorage speichern
    var saveMarket = document.getElementById("market").innerHTML;
    window.localStorage.setItem("saveMarket", saveMarket);
}
    
function load() {

    //Inhalt von LocalStorage in Aufgabenliste laden
    if (window.localStorage.getItem("saveTodo") != null) {
        document.getElementById("todo").innerHTML = window.localStorage.getItem("saveTodo")
    }

    //Inhalt von LocalStorage in Einkaufsliste laden
    if (window.localStorage.getItem("saveMarket") != null) {
        document.getElementById("market").innerHTML = window.localStorage.getItem("saveMarket")
    }

    //Dark- oder Lightmode laden
    if (window.localStorage.getItem("lightmode") == null || window.localStorage.getItem("lightmode") == "false") {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    //Ausgewählte Liste laden
    if (window.localStorage.getItem("list") == "todo") {
        getTaskToDo();
    } else if (window.localStorage.getItem("list") == "market") {
        getTaskMarket();
    }
}

function deleteList() {
    //Testen welche Liste ausgewählt ist oder ob keine ausgewählt wurde
    if (document.getElementById("todo").style.display == "inherit") {
        /*//LocalStorage von Aufgabenliste löschen
        localStorage.removeItem("saveTodo");
        //Seite neuladen
        location.reload();*/

        var html = document.getElementById("todo");

    } else if (document.getElementById("market").style.display == "inherit") {
        /*//LocalStorage von Einkaufsliste löschen
        localStorage.removeItem("saveMarket");
        //Seite neuladen
        location.reload();*/

        var html = document.getElementById("market");

    } else {
        alert("Aufgabenliste oder Einkaufsliste auswählen!");
        error = true;
    }
    
    html.querySelectorAll(".task-item").forEach(function(task) {
        task.parentElement.removeChild(task);
    })
    
    save();
    
}

function toggleDarkLightMode() {

    if (document.documentElement.getAttribute("data-theme") == "dark") {
        //Lightmode
        document.getElementById("toggleMode-icon").className = "fa fa-sun";
        window.localStorage.setItem("lightmode", "true");
        
        document.documentElement.setAttribute('data-theme', 'light');
    }
    else {
        //Darkmode
        document.getElementById("toggleMode-icon").className = "far fa-sun";
        window.localStorage.setItem("lightmode", "false");

        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function sortByDueDate() {

    //Testen welche Liste ausgewählt ist oder ob keine ausgewählt wurde
    if (document.getElementById("todo").style.display == "inherit") {
        var html = $("#todo");
    } else if (document.getElementById("market").style.display == "inherit") {
        var html = $("#market");
    } else {
        alert("Aufgabenliste oder Einkaufsliste auswählen!");
        error = true;
    }

    var tasks = html.children('.task-item').detach().get();
  
    tasks.sort(function(a, b) {
      return new Date(a.dataset.dueDate) - new Date(b.dataset.dueDate);
    });
  
    html.append(tasks);

    save();
}

function sortByCreatedDate() {

    //Testen welche Liste ausgewählt ist oder ob keine ausgewählt wurde
    if (document.getElementById("todo").style.display == "inherit") {
        var html = $("#todo");
    } else if (document.getElementById("market").style.display == "inherit") {
        var html = $("#market");
    } else {
        alert("Aufgabenliste oder Einkaufsliste auswählen!");
        error = true;
    }

    var tasks = html.children('.task-item').detach().get();
  
    tasks.sort(function(a, b) {
      return new Date(a.dataset.createdDate) - new Date(b.dataset.createdDate);
    });
  
    html.append(tasks);

    save();
}

function sortByFinished() {

    //Testen welche Liste ausgewählt ist oder ob keine ausgewählt wurde
    if (document.getElementById("todo").style.display == "inherit") {
        var html = $("#todo");
    } else if (document.getElementById("market").style.display == "inherit") {
        var html = $("#market");
    } else {
        alert("Aufgabenliste oder Einkaufsliste auswählen!");
        error = true;
    }

    var tasks = html.children('.task-item').detach().get();
  
    tasks.sort(function(a, b) {
      return a.dataset.finished - b.dataset.finished;
    });

    html.append(tasks);

    save();
}

function deleteFinishedTasks() {
    //Testen welche Liste ausgewählt ist oder ob keine ausgewählt wurde
    if (document.getElementById("todo").style.display == "inherit") {
        var html = document.getElementById("todo");
    } else if (document.getElementById("market").style.display == "inherit") {
        var html = document.getElementById("market");
    }

    html.querySelectorAll(".task-item[data-finished='1']").forEach(function(task) {
        task.parentElement.removeChild(task);
      })

      save();
}

function activateCalendar() {

    var calendar = document.getElementById("calendar");
    var checkIconCalendar = document.getElementById("calendar-check");

    if (calendar.classList.contains("linethrough") == true) {
        calendar.classList.remove("linethrough");
        checkIconCalendar.dataset.checked = "true";
        checkIconCalendar.classList.replace("fa-square", "fa-check-square");
    } else {
        calendar.classList.add("linethrough");
        checkIconCalendar.dataset.checked = "false";
        checkIconCalendar.classList.replace("fa-check-square", "fa-square");
    }
}

function activateTime() {

    var calendar = document.getElementById("calendar");
    var clock = document.getElementById("time");
    var checkIconCalendar = document.getElementById("calendar-check");
    var checkIconClock = document.getElementById("time-check");

    if (clock.classList.contains("linethrough") == true) {
        clock.classList.remove("linethrough");
        checkIconClock.dataset.checked = "true";
        checkIconClock.classList.replace("fa-square", "fa-check-square");

        calendar.classList.remove("linethrough");
        checkIconCalendar.dataset.checked = "true";
        checkIconCalendar.classList.replace("fa-square", "fa-check-square");
    } else {
        clock.classList.add("linethrough");
        checkIconClock.dataset.checked = "false";
        checkIconClock.classList.replace("fa-check-square", "fa-square");

        /*calendar.classList.add("linethrough");
        checkIconCalendar.dataset.checked = "false";
        checkIconCalendar.classList.replace("fa-check-square", "fa-square");*/
    }
}

function getInputField(button) {

    if (document.getElementById("input").style.display == "none") {

        document.getElementById("input").style.display = "inherit";
        button.firstElementChild.classList.replace("fa-plus", "fa-minus");
        document.getElementById("calendar-check").dataset.checked = "false";
        document.getElementById("header").style.height = "12em";
        document.getElementById("main").style.top = "12em";
        document.getElementById("main").style.height = "calc(100vh - 15em)";

    } else {

        document.getElementById("input").style.display = "none";
        button.firstElementChild.classList.replace("fa-minus", "fa-plus");
        document.getElementById("date-time").style.display = "none";
        document.getElementById("calendar-icon").classList.replace("fa-calendar-minus", "fa-calendar-plus");
        document.getElementById("amount").style.display = "none";
        document.getElementById("amount-icon").classList.replace("fa-cart-arrow-down", "fa-cart-plus");
        document.getElementById("calendar-check").dataset.checked = "false";
        document.getElementById("header").style.height = "8em";
        document.getElementById("main").style.top = "8em";
        document.getElementById("main").style.height = "calc(100vh - 11em)";
    }
}

function getDateTimeField(button) {
    
    if (document.getElementById("date-time").style.display == "none") {

        //Datum aktivieren
        var calendar = document.getElementById("calendar");
        var checkIconCalendar = document.getElementById("calendar-check");
        calendar.classList.remove("linethrough");
        checkIconCalendar.dataset.checked = "true";
        checkIconCalendar.classList.replace("fa-square", "fa-check-square");

        document.getElementById("date-time").style.display = "inherit";
        button.firstElementChild.classList.replace("fa-calendar-plus", "fa-calendar-minus");
        document.getElementById("input").style.display = "inherit";
        document.getElementById("todo-input-icon").classList.replace("fa-plus", "fa-minus");
        document.getElementById("header").style.height = "15em";
        document.getElementById("main").style.top = "15em";
        document.getElementById("main").style.height = "calc(100vh - 18em)";

    } else {
        document.getElementById("calendar-check").dataset.checked = "false";

        document.getElementById("date-time").style.display = "none";
        button.firstElementChild.classList.replace("fa-calendar-minus", "fa-calendar-plus");
        document.getElementById("header").style.height = "12em";
        document.getElementById("main").style.top = "12em";
        document.getElementById("main").style.height = "calc(100vh - 15em)";
    }
}

function getAmountField(button) {
    if (document.getElementById("amount").style.display == "none") {

        document.getElementById("amount").style.display = "inherit";
        button.firstElementChild.classList.replace("fa-cart-plus", "fa-cart-arrow-down");
        document.getElementById("input").style.display = "inherit";
        document.getElementById("market-input-icon").classList.replace("fa-plus", "fa-minus");
        document.getElementById("header").style.height = "15em";
        document.getElementById("main").style.top = "15em";
        document.getElementById("main").style.height = "calc(100vh - 18em)";

    } else {

        document.getElementById("amount").style.display = "none";
        button.firstElementChild.classList.replace("fa-cart-arrow-down", "fa-cart-plus");
        document.getElementById("header").style.height = "12em";
        document.getElementById("main").style.top = "12em";
        document.getElementById("main").style.height = "calc(100vh - 15em)";
    }
}