'use client';
import { useRouter, usePathname } from 'next/navigation';
import useAuth from '@/lib/useAuth';
import {
    AlertDescription,
    AlertTitle,
    AlertIcon,
    Alert,
    Button
} from '@chakra-ui/react';

export const ProtectedRoutes = ({ children }) => {
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    // Function to redirect to homepage
    const goHome = () => {
        router.push('/');
    }
    // Render alert if user is not authenticated and tries to access protected routes
    if (!isAuthenticated && (pathname.startsWith("/profile") || pathname.startsWith("/information"))) {
        return (
            <Alert
                status='error'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                gap='20px'
                margin='0 auto'
            >
                <AlertIcon />
                <AlertTitle>You are not authorised to view this page!</AlertTitle>
                <AlertDescription>Please enter your details first.</AlertDescription>
                <Button colorScheme='teal' variant='solid' onClick={goHome}>Return to Homepage</Button>
            </Alert>
        );
    }

    return children;
};
