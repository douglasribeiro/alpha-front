import { FormControl } from "@angular/forms";

export class FormValidation{

    static cepValidator(control: FormControl) {

        const cep = control.value;
        if (cep && cep !== '') {
          const validacep = /^[0-9]{8}$/;
          return validacep.test(cep) ? null : { cepInvalido : true };
        }
        return null;
      }

}