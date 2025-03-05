import React, { useEffect, useState } from 'react';
import { Box, Button, VStack, Image, HStack, Link } from '@chakra-ui/react';
import RegisterAccount from './RegisterAccount';

function LoginPage({ onClose }) {
    const [opacity, setOpacity] = useState(0);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        setOpacity(1);
    }, []);

    const handleLogin = (provider) => {
        if (provider === 'google') {
            window.location.href = '/auth/google';
        } else {
            window.location.href = `/auth/${provider}`;
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <Box position="fixed" top="0" left="0" width="100%" height="100%" bg="rgba(0, 0, 0, 0.5)" display="flex" alignItems="center" justifyContent="center" style={{ opacity, transition: 'opacity 0.5s' }}>
            <Box bg="white" p={8} borderRadius="md" boxShadow="lg" position="relative" width="60%" height="100%" display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={8}>
                    <div className="g-signin2" data-onsuccess="onSignIn"></div>
                    <Button onClick={() => handleLogin('google')} colorScheme="red" size="lg" bg="white" color="black" borderRadius="full" width="350px" border="1px solid lightgrey">
                        <HStack justifyContent="space-between" width="100%">
                            <Image src="/path/to/google-logo.png" alt="Google" boxSize="20px" />
                            <span style={{ flex: 1, textAlign: 'center' }}>Sign in with Google</span>
                        </HStack>
                    </Button>
                    <Button onClick={() => handleLogin('facebook')} colorScheme="blue" size="lg" bg="white" color="black" borderRadius="full" width="350px" border="1px solid lightgrey">
                        <HStack justifyContent="space-between" width="100%">
                            <Image src="/path/to/facebook-logo.png" alt="Meta" boxSize="20px" />
                            <span style={{ flex: 1, textAlign: 'center' }}>Sign in with Meta</span>
                        </HStack>
                    </Button>
                    <Button onClick={() => handleLogin('linkedin')} colorScheme="blue" size="lg" bg="white" color="black" borderRadius="full" width="350px" border="1px solid lightgrey">
                        <HStack justifyContent="space-between" width="100%">
                            <Image src="/path/to/linkedin-logo.png" alt="LinkedIn" boxSize="20px" />
                            <span style={{ flex: 1, textAlign: 'center' }}>Sign in with LinkedIn</span>
                        </HStack>
                    </Button>
                    <Link onClick={() => setShowRegister(true)} color="teal.500" cursor="pointer">
                        Create account
                    </Link>
                </VStack>
            </Box>
            {showRegister && <RegisterAccount onClose={() => setShowRegister(false)} />}
        </Box>
    );
}

export default LoginPage;
