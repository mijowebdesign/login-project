

export const action = async ( prevState: any, formData: FormData) => {
    const email = formData.get('email') as string || '';
    const password = formData.get('password') as string || '';
    

    const errors: { email?: string; password?: string } = {};

    if (!email) {
        errors.email = 'Email je obavezan.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email nije u dobrom formatu.';
    }

    if (!password) {
        errors.password = 'Lozinka je obavezna.';
    } else if (password.length < 4) {
        errors.password = 'Lozinka mora imati najmanje 6 karaktera.';
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    // Ako su podaci validni, vrati ih nazad da se mogu koristiti u onLogin funkciji
    return { formData: { email, password } };
};