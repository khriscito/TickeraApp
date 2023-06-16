import * as yup from 'yup'

export const loginValidationSchema= yup.object().shape({

email: yup
.string()
.email()
.required('El email es requerido'),

password: yup
.string()
.min(5, 'contraseña corta')
.max(1000, 'contraseña muy larga')
.required('contraseña es requerida')
})