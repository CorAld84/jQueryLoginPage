class Login {


    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateonSubmit();


    };

    // check the problem of repetition submit
    validateonSubmit() {

        let self = this;


        self.form.on('submit', (event) => {
            event.preventDefault();
            var error = 0;

            console.log(self.fields);

            self.fields.forEach (field => {

                if (self.validateFields(field) == false) {
                    error++;
                }
            });

            console.log(error);

            if (error == 0) {
                localStorage.setItem("auth", 1);
                console.log(self.form[0]['action']);
                self.form.submit();
                // check the submit problem after the course

            }

        });

    }

    validateFields(field) {


        if ($(`#${field}`).val().trim() === "") {
            this.setStatus(
                $(`#${field}`).attr('id'),
                `${$(`#${field}`).attr('id')} cannot be blank`,
                "error"
            );

            return false;

        } else {
            if ($(`#${field}`).attr('type') == "password") {
                if ($(`#${field}`).val().length < 8) {
                    this.setStatus(
                        $(`#${field}`).attr('id'),
                        `${$(`#${field}`).attr('id')} must be at least 8 characters`,
                        "error"
                    );
                    console.log("aldo 1");

                    return false;

                } else {
                    this.setStatus($(`#${field}`).attr('id'), null, "success");
                    console.log("aldo 2");
                    return true;
                };
            } else {
                this.setStatus($(`#${field}`).attr('id'), null, "success");
                console.log("aldo 3");
                return true;
            };
        };

    };

    setStatus(field, message, sta) {

        const errorMessage = $(`#${field}`).siblings(".error-message");


        if (sta == "success") {
            if (errorMessage) {
                errorMessage.text("");
            }
            $(`#${field}`).removeClass("input-error");
        };

        if (sta == "error") {
            errorMessage.text(message);
            $(`#${field}`).addClass("input-error");
        };
    };

};


const form = $("form");

if (form) {

    console.log(form);
    const fields = ["username", "password"];

    const validator = new Login(form, fields);
    console.log("@@@@@@")
    console.log(validator)
}


