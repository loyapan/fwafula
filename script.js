var form = document.getElementById('contact-from');

// Add a submit form event listener
form.addEventListener('submit',function(event){
    //Prevent form submission behavior
    event.preventDefault();

    // Get the form data
    var data = new FormData(form);

    //Use the fetch API to submit form data to the backend
    fetch('/contact',{
        method: 'POST',
        body: data  
    }).then(function(response){
        if (!response.ok) {
            // Display an error Message
            form.innerHTML = '<p>Sorry there was an error submitting your message. Plese try again later.</p>';
        } else {
            // Display a thank you message
            form.innerHTML = '<p>Thank you for your message!</p>';
        }
    })
})