'use client';
import { useAppContext } from '@/context/context';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    ButtonGroup,
    Input,
    Button,
    Card,
    CardHeader,
    Heading,
    CardBody,
    Alert,
    AlertTitle,
    AlertIcon,
    Box,
    AlertDescription
} from '@chakra-ui/react';
import { useState } from 'react';

type ErrorObjectModel = {
    username: boolean;
    jobTitle: boolean;
};

export function UserForm() {
    const { state, updateContext } = useAppContext();
    const defaultErrorModel: ErrorObjectModel = {
        username: false,
        jobTitle: false,
    };

    const [inputErrors, setInputErrors] = useState(defaultErrorModel);
    const [username, setUsername] = useState<string>(state.username);
    const [jobTitle, setJobTitle] = useState<string>(state.jobTitle);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    // Function to reset form inputs
    const reset = () => {
        setUsername('');
        setJobTitle('');
        updateContext({ username: '', jobTitle: '' });
    }

    // Function to handle input change
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>, input: string) => {
        if (input === 'username') {
            setUsername(event.target.value);
        } else {
            setJobTitle(event.target.value);
        }
    }

    // Function to validate form inputs
    const validate = (): boolean => {
        const newErrors: ErrorObjectModel = { ...defaultErrorModel };

        let isValid: boolean = true;
        if (!username) {
            newErrors['username'] = true;
            isValid = false;
            setIsSaved(false);
        }
        if (!jobTitle) {
            newErrors['jobTitle'] = true;
            isValid = false;
            setIsSaved(false);
        }
        setInputErrors(newErrors);
        return isValid;
    }

    // Function to handle save button click
    const saveHandler = () => {
        const isValid = validate();

        if (isValid) {
            updateContext({ username: username, jobTitle: jobTitle });
            setIsSaved(true);
        }
    }

    return (
        <>
            {isSaved && <Alert status='success'>
                <AlertIcon />
                <Box>
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                        Your details has been received. Thank you!
                    </AlertDescription>
                </Box>
            </Alert>
            }
            <Card>
                <CardHeader>
                    <Heading size='lg'>User Details</Heading>
                </CardHeader>

                <CardBody>
                    <FormControl mb={6} isInvalid={inputErrors.username} isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' value={username} placeholder='Username' onChange={(e) => changeHandler(e, 'username')} />
                        {inputErrors.username && <FormErrorMessage mb='4'>Username is required.</FormErrorMessage>}
                    </FormControl>

                    <FormControl mb={6} isInvalid={inputErrors.jobTitle} isRequired>
                        <FormLabel>Job title</FormLabel>
                        <Input type='text' value={jobTitle} placeholder='Job title' onChange={(e) => changeHandler(e, 'jobTitle')} />
                        {inputErrors.jobTitle && <FormErrorMessage mb='4'>Job title is required.</FormErrorMessage>}
                    </FormControl>

                    <ButtonGroup variant='outline' spacing='6'>
                        <Button colorScheme='teal' variant='solid' onClick={saveHandler}>Save</Button>
                        <Button onClick={reset}>Reset</Button>
                    </ButtonGroup>
                </CardBody>
            </Card>
        </>
    )
}