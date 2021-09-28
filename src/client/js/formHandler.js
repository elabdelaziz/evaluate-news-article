import "regenerator-runtime/runtime.js"; //becaue it's an async function
import validateUrl from "./validationChecker";
function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  // console.log(process.env.TARGET_PATH);
  //   Client.checkForName(formText);
  // console.log(validateUrl);
  !validateUrl(formText)
    ? alert("Invalid URL")
    : sendUrlToServer(
        `${process.env.PORT}/add` || "https://localhost:8081/add",
        { url: formText }
      ).then((finalData) => {
        // console.log(finalData);
        // document.getElementById("text").innerHTML = `text: ${finalData[0].text}`;

        document.getElementById(
          "agreement"
        ).innerHTML = `Agreement: ${finalData.agreement}`;

        document.getElementById(
          "confidence"
        ).innerHTML = `confidence: ${finalData.confidence}`;

        document.getElementById(
          "subjectivity"
        ).innerHTML = `subjectivity: ${finalData.subjectivity}`;

        document.getElementById(
          "irony"
        ).innerHTML = `irony: ${finalData.irony}`;

        document.getElementById(
          "score-tag"
        ).innerHTML = `score-tag: ${finalData.score_tag}`;
      });

  // console.log("::: Form Submitted :::");
  // fetch("http://localhost:8081/test")
  //   .then((res) => res.json())
  //   .then(function (res) {
  //     document.getElementById("results").innerHTML = res.message;
  //   });
}

const sendUrlToServer = async (url = "", data = {}) => {
  // console.log("testing data", data);
  // console.log("link", url);
  const serverResponse = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const serverResponseData = await serverResponse.json();
    // console.log("data received", serverResponseData);
    return serverResponseData;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };
