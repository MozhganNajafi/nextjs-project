'use client';
import { Box, Flex, HStack, Link } from '@chakra-ui/react';
import { AuthProvider } from '@/lib/AuthContext'
import { ProtectedRoutes } from '@/lib/ProtectedRoutes'
import NextLink from 'next/link';
interface Props {
    children: React.ReactNode
}

export function Navbar(props: Props) {
    const { children } = props;
    return (
        <AuthProvider>
            <ProtectedRoutes>
                <Box bg='#e9f7ef' px={4}>
                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                        <HStack spacing={8} alignItems={'center'}>
                            <Link as={NextLink} href='/'>
                                Home
                            </Link>
                            <Link as={NextLink} href='/profile'>
                                Profile
                            </Link>
                            <Link as={NextLink} href={`/information?page=1`}>
                                Information
                            </Link>
                        </HStack>
                    </Flex>
                </Box>
                <Box>{children}</Box>
            </ProtectedRoutes>
        </AuthProvider>
    )
}