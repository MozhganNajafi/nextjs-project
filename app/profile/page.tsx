'use client';
import {
    Card,
    CardHeader,
    Flex,
    Avatar,
    Box,
    Heading,
    IconButton,
    Text,
    CardBody,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useAppContext } from '@/context/context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {

    const { state } = useAppContext();
    const router = useRouter();
    const [jobTitle, setJobTitle] = useState(state.jobTitle);
    const [username, setUsername] = useState(state.username);

    useEffect(() => {
        // console.log('username', username);
        // console.log('jobTitle', jobTitle);

        setUsername(state.username);
        setJobTitle(state.jobTitle);
    }, [state,]);

    const [isClient, setIsClient] = useState(false)

    // During React hydration, useEffect is called. This means browser APIs like window are available to use without hydration mismatches.
    useEffect(() => {
        setIsClient(true)
    }, [])

    const editForm = () => {
        router.push('/');
    }

    return (
        <Card maxW='md'>
            <CardHeader>
                <Flex>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='user avatar' src='/unisex-avatar.jpg' />
                        {isClient && <Box>
                            <Heading size='sm'>{username}</Heading>
                            <Text>{jobTitle}</Text>
                        </Box>
                        }
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<EditIcon />}
                        onClick={editForm}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    If you want to edit the Username or Job Title, you can click on the edit button above.
                </Text>
            </CardBody>
        </Card>
    )
}