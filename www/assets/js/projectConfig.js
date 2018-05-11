var taskConfigShow = document.querySelector("#taskboardConfig"),
    backViewLayerElem = document.querySelector("#backViewLayer"),
    projectConfigPopup = document.querySelector("#projectConfigPopup"),
    postTaskConfigForm = document.querySelector("#projectConfigForm"),
    taskboardTitleElem = document.querySelector("#taskboardTitle>span"),
    projectConfigPopupErrorElem = projectConfigPopup.querySelector(".error");

postTaskConfigForm.addEventListener("submit", postTaskConfig, true);
taskConfigShow.addEventListener("click", taskConfigShowClick, true);
backViewLayerElem.addEventListener("click", backViewLayerElemClick, true);
projectConfigPopupErrorElem.addEventListener("click", clickError, true);


function taskConfigShowClick(e) {
    e.preventDefault();
    projectConfigPopup.style.display = "block";
    backViewLayerElem.style.display = "block";
}

function backViewLayerElemClick() {
    projectConfigPopup.style.display = "none";
    backViewLayerElem.style.display = "none";
}

function postTaskConfig(e) {
    e.preventDefault();

    let formData = new FormData(postTaskConfigForm);
    let projectNewName = formData.get("name");
    let postTaskConfigJson = {
        "name": projectNewName,
        "description": formData.get("description"),
    };

    fetch("/project/update/" + projectId, {
        method: 'POST',
        body: JSON.stringify(postTaskConfigJson),
        credentials: "same-origin"
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        if (!json.success) {
            projectConfigPopupErrorElem.style.display = "block";
            projectConfigPopupErrorElem.innerText = json.message;
        } else {
            projectConfigPopupErrorElem.style.display = "none";
            taskboardTitleElem.innerText = projectNewName;
        }
    });
}