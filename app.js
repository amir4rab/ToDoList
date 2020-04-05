let pageStatus = null;

class DataManager{
    static S_initData(){
        if(window.localStorage.getItem(`toDoList`) === null){
            const data = {
                "Data":[
                    {
                        "title":"Done",
                        "task":"make an app",
                        "isDone": true
                    
                    },
                    {
                        "title":"no done",
                        "task":"Get a Life!",
                        "isDone": false
                    }
                ],
                "setting":{
                    "theme": "default"
                }
            };
            const sData = JSON.stringify(data)
            window.localStorage.setItem(`toDoList`, sData);
            return JSON.parse(window.localStorage.getItem(`toDoList`));
        }else{
            return JSON.parse(window.localStorage.getItem(`toDoList`));
        }
    }
    static S_getAllData(){
        return JSON.parse(window.localStorage.getItem(`toDoList`));
    }
    static S_setTheme(name){
        const data = JSON.parse(window.localStorage.getItem(`toDoList`));
        data.setting.theme = name;
        const sData = JSON.stringify(data);
        window.localStorage.setItem(`toDoList`, sData);
    }
    static S_deleteData(title){
        const data = JSON.parse(window.localStorage.getItem(`toDoList`));
        data.Data.forEach(object => {
            if(object.title === `${title}`){
                let index = data.Data.indexOf(object);
                const before = data.Data.slice(0,index);
                const after = data.Data.slice(index + 1 , data.Data.length);
                const newData = []
                newData.push(...before,...after);
                data.Data = newData;
            }
        });
        const sData = JSON.stringify(data);
        window.localStorage.setItem(`toDoList`, sData);
    }
    static S_setDone(title){
        const data = JSON.parse(window.localStorage.getItem(`toDoList`));
        data.Data.forEach(object => {
            if(object.title === `${title}`){
                let index = data.Data.indexOf(object);
                data.Data[index].isDone === false ? data.Data[index].isDone = true : data.Data[index].isDone = false;
            }
        });
        const sData = JSON.stringify(data);
        window.localStorage.setItem(`toDoList`, sData);
    }
    static S_setData(title,task){
        const data = JSON.parse(window.localStorage.getItem(`toDoList`));
        data.Data.push({"title": `${title}`,"task": `${task}`,"isDone": false});
        const sData = JSON.stringify(data);
        window.localStorage.setItem(`toDoList`, sData);
    }
    static S_ChekFor(title){
        const data = JSON.parse(window.localStorage.getItem(`toDoList`));
        let status = false;
        data.Data.forEach(object => {
            if(title === object.title){
                object.title === title ? status = true : status = false
            }
        });
        return status;
    }
}

class Ui{
    constructor(){
        Ui.S_initAnimations();
    }
    static S_loadPage(status){
        Ui.S_setTheme(DataManager.S_getAllData().setting.theme);
        if(status === `Home` && pageStatus != `Home`){
            const html = `<div class="input-section">
            <div class="input-group" style="position: relative;">
                <label id="titleLable">Task Title</label>
                <input id="titleInput" type="text">
            </div>
            <div class="input-group">
                <label>Task</label>
                <input id="taskInput" type="text">
            </div>
            <button id="submitBtn">Submit</button>
        </div>
        <div class="table-section">
            <table>
                <thead>
                    <tr>
                        <th class="th-title">
                            Title
                        </th>
                        <th class="th-task">
                            Task
                        </th>
                        <th class="th-btn">

                        </th>
                    </tr>
                </thead>
                <tbody id="tBody">
                </tbody>
            </table>
        </div>`;
            document.getElementById(`injectSection`).innerHTML =  html;
            DataManager.S_initData();
            Ui.S_setTable(DataManager.S_getAllData());
            document.getElementById("submitBtn").addEventListener('click',(e)=>{
                const title = document.getElementById("titleInput").value;
                const task = document.getElementById("taskInput").value;
                if(DataManager.S_ChekFor(title)){
                    document.getElementById("titleLable").className = `input-duplicate`;
                    document.getElementById("titleInput").className = `input-invalid`;
                    setTimeout(()=>{
                        document.getElementById("titleLable").className = ``;
                    document.getElementById("titleInput").className = ``;
                    },3000);
                }else{
                    if(task != `` && title!= ``){
                        DataManager.S_setData(title,task);
                        Ui.S_setTable(DataManager.S_getAllData());
                        document.getElementById("titleInput").value = ``;
                        document.getElementById("taskInput").value = ``;
                        document.getElementById("taskInput").className = ``;
                        document.getElementById("taskInput").placeholder = ``;
                    }
                    if(task === ``){
                        document.getElementById("taskInput").className = `input-invalid`;
                        document.getElementById("taskInput").placeholder = `fill the blanks :(`
                        setTimeout(()=>{
                            document.getElementById("taskInput").className = ``;
                        },3000);
                    }
                    if(title === ``){
                        document.getElementById("titleInput").className = `input-invalid`;
                        document.getElementById("titleInput").placeholder = `fill the blanks :(`
                        setTimeout(()=>{
                            document.getElementById("titleInput").className = ``;
                        },3000);
                }}
            });
        }else if(status === `Setting` && pageStatus != `Setting`){
            const setEventListner=()=>{
                const darkThemeBtn = document.getElementById("darkThemeBtn");
                darkThemeBtn.addEventListener('click',()=>Ui.S_setTheme("dark"));
                const defaultThemeBtn = document.getElementById("defaultThemeBtn");
                defaultThemeBtn.addEventListener('click',()=>Ui.S_setTheme("default"));
                DataManager.S_getAllData().setting.theme === "default"? defaultThemeBtn.checked = true : darkThemeBtn.checked = true;
            }
            const html = `<div class="card">
            <div class="card-title">Setting</div>
            <div class="card-body">
                <div class="about-group">
                    <div class="about-t">
                        Theme
                    </div>
                    <div class="about-b">
                        <div class="radio-btn-group">
                            <input class="radio-input" type="radio" value="default" name="themeBtn" id="defaultThemeBtn">
                            <label class="radio-label" for="defaultThemeBtn">Default</label>
                            <input class="radio-input" type="radio" value="dark" name="themeBtn" id="darkThemeBtn">
                            <label class="radio-label" for="darkThemeBtn">Dark</label>
                        </div>
                    </div>
                </div>
                <div class="about-group">
                    <div class="about-t">
                        Delete App Data
                    </div>
                    <div class="about-b">
                        <button class="delete-btn">
                            Delete All Data
                        </button>
                    </div>
                </div>   
                <div class="about-group">
                    <div class="about-t">
                        Back up Data to Cloud
                    </div>
                    <div class="about-b">
                        Comming soon
                    </div>
                </div>
            </div>
        </div>`;
            document.getElementById(`injectSection`).innerHTML =  html;
            setEventListner();
        }else if(status === `About` && pageStatus != `About`){
            const html = `<div class="card">
            <div class="card-title">About</div>
            <div class="card-body">
                <div class="about-b" style="max-width: 100%;margin:auto;text-align: center;">
                    This is a free brower base <a>To Do List</a>, feel free to look at the code at <a target="_" href="">Github</a>, codded 💙 love by <a target="_" href="https://github.com/amir4rab">Amir4rab</a>.
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-title">Details</div>
            <div class="card-body">
                <div class="about-group">
                    <div class="about-t">
                        crator
                    </div>
                    <div class="about-b">
                        <a target="_" href="https://github.com/amir4rab">Amir4rab</a>
                    </div>
                </div>
                <div class="about-group">
                    <div class="about-t">
                        Icons
                    </div>
                    <div class="about-b">
                        <a target="_" href="https://material.io/design/">material.io</a>
                    </div>
                </div>
                <div class="about-group">
                    <div class="about-t">
                        Version
                    </div>
                    <div class="about-b">
                        1.0.0
                    </div>
                </div>
            </div>
        </div>`;
            document.getElementById(`injectSection`).innerHTML =  html;
        }   
    }
    static S_setTheme(name){
        if(name === "dark" || name === "default"){
            DataManager.S_setTheme(name);
            document.body.className = name;
        }
    }
    static S_setTable(data){
        const tBody = document.getElementById(`tBody`);
        tBody.innerHTML = `` 
        function makeList(Data){
            const taskData = Array.from(Data.Data);
            taskData.forEach((object)=>{
                const {title,task,isDone} = object;

                const tr = document.createElement('tr');

                const tTitle = document.createElement(`td`);
                tTitle.className = `t-title`;
                tTitle.innerHTML = title;
                tr.appendChild(tTitle);

                const tTask = document.createElement(`td`);
                tTask.className = `t-task`;
                tTask.innerHTML = task;
                tr.appendChild(tTask);

                const tBtn = document.createElement(`td`);
                tBtn.className = `t-btn`;
                const tDoneBtn = document.createElement(`button`);
                tDoneBtn.className = `done-btn`;
                tDoneBtn.innerHTML = `Done`;
                //add EventListner
                tDoneBtn.addEventListener('click' ,doneBtnEvent)
                tBtn.appendChild(tDoneBtn);
                const tDeleteBtn = document.createElement(`button`);
                tDeleteBtn.className = `delete-btn`;
                tDeleteBtn.innerHTML = `Delete`;
                //add EventListner
                tDeleteBtn.addEventListener('click',(e)=>{
                    DataManager.S_deleteData(e.target.parentElement.parentElement.firstChild.innerHTML);
                    Ui.S_setTable(DataManager.S_getAllData());
                })
                tBtn.appendChild(tDeleteBtn);
                tr.appendChild(tBtn);

                if(isDone === true){
                    tr.className = `done`
                }
                
                tBody.appendChild(tr);
            })
        }
        makeList(data);
    }
    static S_setDone(data){
        data.className === 'done' ? data.className = '' : data.className = 'done';
    }
    static S_initAnimations(){
        const S_bubbleEffect = (id)=>{
            const button = document.getElementById(id)
            button.addEventListener('click',(e)=>{
                const setBtnDeActive = (id)=>{
                    id === "homeLink" ? document.getElementById("homeLink").className = "b-nav-active" : document.getElementById("homeLink").className = "";
                    id === "settingLink" ? document.getElementById("settingLink").className = "b-nav-active" : document.getElementById("settingLink").className = "";
                    id === "aboutLink" ? document.getElementById("aboutLink").className = "b-nav-active" : document.getElementById("aboutLink").className = "";
                }

                const bubble = document.createElement('span');
                bubble.style.left = (e.clientX - e.target.offsetLeft) + 'px';
                bubble.style.top = (e.clienty - e.target.offsetTop) + 'px';
                bubble.className = "bubble"
                button.appendChild(bubble);
                setBtnDeActive(id);

                setTimeout(()=>{bubble.remove()},2000);
                if(id === "homeLink"){
                    Ui.S_loadPage("Home");
                }else if(id === "settingLink"){
                    Ui.S_loadPage("Setting");
                }else if(id === "aboutLink"){
                    Ui.S_loadPage("About");
                }
            });
        }
        S_bubbleEffect("homeLink");
        S_bubbleEffect("settingLink");
        S_bubbleEffect("aboutLink");
    }
}

const doneBtnEvent = (e)=>{
    DataManager.S_setDone(e.target.parentElement.parentElement.firstChild.innerHTML);
    Ui.S_setDone(e.target.parentElement.parentElement);
}

const ui = new Ui();
// DataManager.S_initData();
// Ui.S_setTable(DataManager.S_getAllData());
Ui.S_loadPage(`Home`);