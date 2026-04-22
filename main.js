const video = document.getElementById("video");

const form = document.getElementById("form");
const form_v1 = "https://docs.google.com/forms/d/e/1FAIpQLSfQ59ljr7GEc-PN5Vqj5RZcqzcsPExNL1xL3GZ_RA-jpwXx0A/formResponse";
const form_v2 = "https://docs.google.com/forms/d/16op7u3XCD9jYARsK_jGV_cy71U52JbxGoXI3nGSP_9c/formResponse";

const answer_A = document.getElementById("A");
const answer_B = document.getElementById("B");
const answers_v1 = "entry.1743089635";
const answers_v2 = "entry.31583965";

window.addEventListener("load", () => {
    let source = document.createElement("source");
    let provided_video = "";
    let provided_form = "";
    let provided_ansset = "";

    if(Math.floor(Math.random() * 2) == 0) {
        provided_video = "v1.webm";
        provided_form = form_v1;
        provided_ansset = answers_v1;
    } else {
        provided_video = "v2.webm";
        provided_form = form_v2;
        provided_ansset = answers_v2;
    }

    video.appendChild(source);
    source.setAttribute("src", provided_video);
    source.setAttribute("type", "video/webm");

    form.setAttribute("action", provided_form);
    answer_A.setAttribute("name", provided_ansset);
    answer_B.setAttribute("name", provided_ansset);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if(!answer_A.checked && !answer_B.checked) {
            return;
        }

        $.ajax({
            url: provided_form,
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: $("form").serialize(),
            complete: () => { window.location.href = "submitted.html"; } 
        });
    });

    video.load();
    video.play();
});