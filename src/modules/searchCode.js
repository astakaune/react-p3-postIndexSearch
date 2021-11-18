import ajaxService from "./ajaxService";
import storeSearch from "./storeSearch";

const searchCode = () => {
	document.querySelector("form").addEventListener("submit", (event) => {
		event.preventDefault(); //formos numatytoji elgsena, siusti duomenis i back enda. sustabdome siuntima ir keiciame numatyta formos elgsena.
		const searchTerm = document.querySelector(".term").value;
		let searchResponce;
		ajaxService(searchTerm)
			.then((result) => searchResponce = result)
			.then(() => console.log(searchResponce)) //atsakymas i console.log
			.then(() => {
				if (searchResponce.total === 1) {
					document.querySelector(".result").value =
						searchResponce.data[0].post_code;
                    storeSearch(searchResponce.data[0].post_code, searchResponce.data[0]);
				} else {
					document.querySelector("main").innerHTML += "<p>Error</p>";
				}
			});
	});
};

export default searchCode;
