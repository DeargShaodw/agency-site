const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(function(question){
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        answer.classList.toggle('open');
    })
});