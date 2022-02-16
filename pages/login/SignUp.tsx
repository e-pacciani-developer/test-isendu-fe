import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { User } from '../../models/user';
import { usersService } from '../../services/user.service';

interface SignUpProps {
  signInAfterSignUp: (user: User) => void;
}

const SignUp: React.VFC<SignUpProps> = ({ signInAfterSignUp }) => {
  const { register, handleSubmit } = useForm();

  /**
   * Creates the user and calls the callback to sign in after user creation
   */
  const onSubmit = handleSubmit(async data => {
    const formData = data as User;

    try {
      const user = await usersService.createUser(formData);
      toast.success('Your account has been created successfully');

      signInAfterSignUp(user);
    } catch (e) {}
  });

  return (
    <form onSubmit={onSubmit}>
      <VStack>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input {...register('name', { required: true })} type="text" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>
          <Input
            {...register('dateOfBirth', {
              required: true,
              setValueAs: (val: string) => new Date(val),
            })}
            type="date"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input {...register('address', { required: true })} type="text" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="name">Email</FormLabel>
          <Input {...register('email', { required: true })} type="text" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <Input {...register('phone', { required: true })} type="text" />
        </FormControl>

        <Button
          type="submit"
          onClick={onSubmit}
          w="100%"
          style={{ marginTop: '2rem' }}
          colorScheme={'facebook'}
        >
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default SignUp;
