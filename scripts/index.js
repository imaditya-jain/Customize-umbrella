document.addEventListener("DOMContentLoaded", function () {
    // Get all the elements
    const variants = document.querySelectorAll('.variant');
    const fileInput = document.getElementById("upload");
    const umbrella = document.querySelector(".umbrella");
    const loaderIcons = document.querySelectorAll(".loader-icon");
    const uploadedImage = document.querySelector(".uploaded-image");
    const uploadBtn = document.querySelector(".upload-btn");
    const removeBtn = document.querySelector(".remove-btn");
    const uploadText = uploadBtn.querySelector("p");

    function showLoaders() {
        loaderIcons.forEach(loader => loader.classList.remove("invisible"));
    }

    function hideLoaders() {
        loaderIcons.forEach(loader => loader.classList.add("invisible"));
    }

    // Set the first variant as active by default
    document.body.style.backgroundColor = document.querySelector('.variant.active')?.dataset.color || '#fff';
    uploadBtn.style.backgroundColor = document.querySelector('.variant.active')?.dataset.color2 || '#fff';

    // Function to update the background color and image
    function updateBackgroundAndImage(variant) {
        document.body.style.backgroundColor = variant.dataset.color;
        uploadBtn.style.backgroundColor = variant.dataset.color2;

        if (!uploadedImage.classList.contains("invisible")) {
            showLoaders();
            uploadedImage.classList.add("invisible");
            umbrella.classList.add("invisible");

            setTimeout(() => {
                hideLoaders()
                umbrella.src = variant.dataset.img;
                uploadedImage.classList.remove("invisible");
                umbrella.classList.remove("invisible");
            }, 1000);
        } else {
            umbrella.src = variant.dataset.img;
        }
    }

    // event delagation: Add one event listener to the parent element instead of adding multiple event listeners to each child element.
    // This way we can avoid memory leaks and improve performance.

    document.querySelector('.variations').addEventListener('click', function (e) {
        if (e.target.classList.contains('variant')) {
            document.querySelectorAll('.variant').forEach(variant => variant.classList.remove('active'));
            e.target.classList.add('active');
            updateBackgroundAndImage(e.target);
        }
    });

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            showLoaders();
            uploadedImage.classList.add("invisible");
            umbrella.classList.add("invisible");
            uploadText.textContent = file.name;

            const reader = new FileReader();
            reader.onload = function (e) {
                setTimeout(() => {
                    hideLoaders()
                    uploadedImage.src = e.target.result;
                    uploadedImage.classList.remove("invisible");
                    umbrella.classList.remove("invisible");
                    removeBtn.classList.remove("invisible");
                }, 1600);
            };

            reader.readAsDataURL(file);
        }
    });

    removeBtn.addEventListener("click", function () {
        uploadedImage.classList.add("invisible");
        uploadedImage.src = "";
        fileInput.value = "";
        removeBtn.classList.add("invisible");
        uploadText.textContent = "Upload Logo";
    });
});
