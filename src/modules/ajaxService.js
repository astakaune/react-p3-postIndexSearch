
const ajaxService = (term) => {
	const url = "https://api.postit.lt/?term=";
	const key =
		"https://api.postit.lt/v2/?city=Vilnius&address=Savanorių+12&key=postit.lt-examplekey";
	return fetch(`${url}${term}&key=${key}`).then((response) =>
		response.json()
	);
};
export default ajaxService;
console.log("as esu");
