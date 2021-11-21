const formFilling = () => {
	var address_xhr;

	$("#address").autocomplete({
		minLength: 4,
		delay: 300,
		source: function (request, response) {
			var element = this.element;
			$(element).addClass("loading");

			if (address_xhr) {
				address_xhr.abort();
			}
			address_xhr = $.ajax({
				url: "https://api.postit.lt/",
				dataType: "json",
				crossDomain: true,
				data: {
					term: $.trim(request.term),
					limit: 20,
					key: "postit.lt-examplekey",
				},
				success: function (resp) {
					var r = [];
					if (!resp.success) {
						alert(resp.message);
						response(r);
						return;
					}

					for (var i = 0, l = resp.data.length; i < l; i++) {
						var t = "";
						var address = resp.data[i].address;

						if (resp.data[i].address === "") {
							//Šis atvejis nutinka tada, kai ieškoma ne pagal adresą, o pagal pašto kodą arba vietovę
							if (resp.data[i].mailbox !== "") {
								//Pvz.: ieškant pagal "00002" ar "Pašto dėžutė 1"
								address =
									"Pašto dėžutė " + resp.data[i].mailbox;
								t = address + ", " + resp.data[i].city;
							} else {
								//Pvz.: ieškant pagal "20100" ar "Bernotiškių k."
								t =
									resp.data[i].city +
									", " +
									resp.data[i].municipality;
							}
						} else {
							t = resp.data[i].address + ", " + resp.data[i].city;
						}
						r.push({
							label: t,
							value: address,
							address: address,
							city: resp.data[i].city,
							post_code: resp.data[i].post_code,
						});
						response(r);
					}
				},
				error: function () {
					response([]);
				},
				complete: function () {
					$(element).removeClass("loading");
				},
			});
		},
		select: function (event, ui) {
			$("#zipcode").val("LT-" + ui.item.post_code);
			$("#city").val(ui.item.city);
			$("#address").val(ui.item.address);
		},
	});
};

export default formFilling;
