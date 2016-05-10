$(document).ready(function(){
	var emailForm = $("#emailForm");
	var errorBox = $("#emailSubmitError");
	var errorBoxMessage = $("#emailSubmitErrorMessage");
	var retryBox = $("#emailSubmitTryAgainMessage");
	var emailInput = $("#emailAddress");
	var submitEmailButton = $("#submitEmailButton");
	var successMessage = $("#emailSuccessMessage");
	
	$("#emailForm").submit(function(event){
		var email = emailInput.val().trim();

		event.preventDefault();

		if(email === ""){
			ShowErrorMessage("Please enter an email.");
			HideRetryMessage();
			return;
		}

		SubmitEmail(email);
	});

	function ShowSuccessMessage(){
		emailForm.slideUp();
		successMessage.slideDown();
	}

	function HideErrorBox(){
		errorBox.slideUp();
	}

	function ShowErrorMessage(message){
		errorBox.slideDown();
		errorBoxMessage.html(message);
	}

	function HideErrorMessage(){
		errorBox.slideUp();
	}

	function ShowRetryMessage(){
		retryBox.show();
	}

	function HideRetryMessage(){
		retryBox.hide();
	}

	function SubmitEmail(email){
		HideRetryMessage();
		HideErrorMessage();
		submitEmailButton.prop("disabled", true);
		emailInput.prop("disabled", true);

		$.post("registerEmail.php", { "emailAddress": email })
		      .done(ProcessSaveResult)
		      .fail(function(){
			ShowErrorMessage("Sorry. I failed to add you to the mailing list<br>:(");
			ShowRetryMessage();
			submitEmailButton.prop("disabled", false);
			emailInput.prop("disabled", false);
		      });
		
	}

	function ProcessSaveResult(data){
		submitEmailButton.prop("disabled", false);
		emailInput.prop("disabled", false);

		var result = parseInt(data);
		if(result === SaveEmailResult.Success){
			ShowSuccessMessage();
			emailInput.val("");
			return;
		}

		if(result === SaveEmailResult.ErrorSaving
		   || result === SaveEmailResult.InvalidEmail){
			ShowRetryMessage();
		}

		var errorMessage = GetErrorForSaveEmailResult(result);
		ShowErrorMessage(errorMessage);
	}

	var SaveEmailResult = {
		Success: 1,
		ErrorSaving: 2,
		EmailExists: 3,
		EasterEgg: 4,
		InvalidEmail: 5
	};

	function GetErrorForSaveEmailResult(result){
		switch(result){
			case SaveEmailResult.ErrorSaving:
				return "Sorry, I failed to add you to the mailing list<br>:(";
			case SaveEmailResult.EmailExists:
				return "That email has already been added!";
			case SaveEmailResult.EasterEgg:
				return "R u avin a giggle?<br>We're the organisers...";
			case SaveEmailResult.InvalidEmail:
				return "That doesn't look like a valid email to me.";
		}
	}
});
