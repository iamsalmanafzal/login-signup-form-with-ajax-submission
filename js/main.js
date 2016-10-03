$(document).ready(function(){
	$.fn.extend({
	    animateCss: function (animationName) {
	        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	        this.addClass('animated ' + animationName).one(animationEnd, function() {
	            $(this).removeClass('animated ' + animationName);
	        });
	    }
	});

	$( document ).ajaxStart(function() {
	  console.log('ajax Start');
	});

	//hide or show password
	$('.password-show-hide').on('click', function(){
		console.log('here');
		var $this= $(this),
			$passwordField = $this.parent().find('input');
		
		// Changing input type
		if( $passwordField.attr('type') == "password" ) {
			$passwordField.attr('type', 'text');
		}else {
			$passwordField.attr('type', 'password');
		}

		// Changing Icon
		if( $this.find('i').hasClass('fa-eye') ) {
			$this.find('i').removeClass('fa-eye').addClass('fa-eye-slash');
		}else {
			$this.find('i').removeClass('fa-eye-slash').addClass('fa-eye');
		}
	});

	// creating Tabs functionality
	$('.form-tabs li').on('click', function() {
		var $this = $(this),
			thisAttr = $this.attr('data-tab');

		$this.siblings().removeClass('active');
		$this.addClass('active');
		// removing Active Class from all tabs
		$('div.tab').removeClass('active');
		// removing Error Classes 
		$('div.tab').find('fieldset').removeClass('error animated bounce');

		// checking Mobile Devices with ModernizrJs
		if ( !navigator.userAgent.match(/Mobi/) ) {
			// adding "Flip" effect animation for desktop browsers 
			$('div.tab[data-tab="'+thisAttr+'"]').addClass('active').animateCss('flipInY');
		}else {
			$('div.tab[data-tab="'+thisAttr+'"]').addClass('active').animateCss('fadeIn');
		}

	});
	$('.forgetYourPassword').on('click', function () {
		
		$('.form-tabs li').removeClass('active')
		// removing Active Class from all tabs
		$('div.tab').removeClass('active');
		// removing Error Classes 
		$('div.tab').find('fieldset').removeClass('error animated bounce');

		$('div.tab[data-tab="forget-form"]').addClass('active').animateCss('flipInY');

		// body...
	})

	// Check Required Field
	$('[name="sumit"]').on('click', function () {
		console.log('click submit');
		var $this = $(this),
			$thisForm = $this.parents('form:first'),
			re = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm

		$thisForm.find("input").each(function() {
			var $field = $(this),
				$fieldVal = $field.val()
				$fieldName = $field.attr('name');
				$fieldType = $field.attr('type');


			// Adding error class if field have no value.
			if(!$fieldVal) {
				$field.parents('fieldset:first').addClass('error').animateCss('bounce');
			}else if($fieldType == "email") { // Checking Email Validation 
				if(!re.test($fieldVal)){
					$field.parents('fieldset:first').addClass('error').animateCss('bounce');
				}else {
					$field.parents('fieldset:first').removeClass('error');
				}
			}else {
				$field.parents('fieldset:first').removeClass('error');
			}
		})
		// checking error Length
		var errorLength = $thisForm.find(".error").length;

		if(!errorLength) {
			$this.attr('disabled','disabled').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
			// Added "SetTimeout" to show submit process 
			setTimeout(function() {
				FormSubmit($thisForm)
			} , 3000);
		}
	})

	function FormSubmit(form) {
        $.ajax({
            type: 'POST', // Just for Testing
            url: '', // Add you file url
            data: form.serialize(),
            success: function (data) {
            	console.log('Success');
            	// adding Success message to button
            	form.find('button').attr('disabled','disabled').html('Successful!! Form Submited. ');
            	// Reset the button
            	setTimeout(function() {
            		form.find('button').removeAttr('disabled').html('Submit');
            	}, 2500);
            	// Empty all input fields within the form
                form.find('input').val('')
            },
            error: function (error) {
            }
        });
	}

});
