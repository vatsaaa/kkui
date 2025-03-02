import React, { useEffect, useState } from 'react';
import { Box, Button, VStack, Image, HStack, Link } from '@chakra-ui/react';

function RegisterAccount({ onClose }) {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setOpacity(1);
    }, []);

    const handleSignUp = (provider) => {
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
            <Box bg="white" p={8} borderRadius="md" boxShadow="lg" position="relative" width="50%" height="100%" display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={4}>
                    <Button onClick={() => handleSignUp('google')} colorScheme="red" size="lg" bg="white" color="black" borderRadius="full" width="250px" border="1px solid lightgrey">
                        <HStack>
                            <Image src="/path/to/google-logo.png" alt="Google" boxSize="20px" />
                            <span>Sign up with Google</span>
                        </HStack>
                    </Button>
                    <Button onClick={() => handleSignUp('facebook')} colorScheme="blue" size="lg" bg="white" color="black" borderRadius="full" width="250px" border="1px solid lightgrey">
                        <HStack>
                            <Image src="/path/to/facebook-logo.png" alt="Meta" boxSize="20px" />
                            <span>Sign up with Meta</span>
                        </HStack>
                    </Button>
                    <Button onClick={() => handleSignUp('linkedin')} colorScheme="blue" size="lg" bg="white" color="black" borderRadius="full" width="250px" border="1px solid lightgrey">
                        <HStack>
                            <Image src="/path/to/linkedin-logo.png" alt="LinkedIn" boxSize="20px" />
                            <span>Sign up with LinkedIn</span>
                        </HStack>
                    </Button>
                    <Link onClick={onClose} color="teal.500" cursor="pointer">
                        Sign in
                    </Link>
                </VStack>
            </Box>
        </Box>
    );
}

export default RegisterAccount;
