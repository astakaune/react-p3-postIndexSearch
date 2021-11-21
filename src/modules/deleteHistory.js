const deleteHistory = () => {
	document.querySelector(".btn-danger").addEventListener("click", (event) => {
        console.log(event);
		event.target.classList.add("hidden");
		localStorage.clear();
		document.querySelector(".list-group").innerHTML = "";
	});
};

export default deleteHistory;
