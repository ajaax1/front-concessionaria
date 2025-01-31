import { useForm } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';

export function useUserForm() {
  const schema = yup.object({
    email: yup.string().required().email().max(255),
    name: yup.string().required().max(150),
    password: yup.string().required().min(6).max(255),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Senhas devem ser iguais'),
    role: yup.string().required().oneOf(['Admin', 'Editor']),
  });

  const { values, errors, defineField, handleSubmit } = useForm({
    validationSchema: schema,
  });

  const [email] = defineField('email');
  const [name] = defineField('name');
  const [password] = defineField('password');
  const [confirmPassword] = defineField('confirmPassword');
  const [role] = defineField('role');

  const onSubmit = handleSubmit((values) => {
    console.log('Usuário cadastrado:', values);
  });

  return { errors, email, name, password, confirmPassword, role, onSubmit };
}
